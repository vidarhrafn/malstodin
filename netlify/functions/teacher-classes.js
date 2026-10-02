// Bekkir kennara. Hver kennari sér og breytir aðeins eigin bekkjum.
// action: 'list' | 'create' | 'archive' | 'members' | 'removeMember'
const crypto = require('crypto');
const { admin, db, handler, HttpError, requireTeacher } = require('./_shared/firebase');

const COURSES = ['isat1ia', 'isat1ic'];
const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // ekki I, L, O, 0, 1

function randomJoinCode() {
  let s = '';
  for (let i = 0; i < 6; i++) s += CODE_CHARS[crypto.randomInt(CODE_CHARS.length)];
  return s;
}

async function uniqueJoinCode() {
  for (let i = 0; i < 20; i++) {
    const code = randomJoinCode();
    const hit = await db.collection('classes').where('join_code', '==', code).limit(1).get();
    if (hit.empty) return code;
  }
  throw new Error('Gat ekki búið til einstakan bekkjarkóða');
}

const iso = (t) => (t && t.toDate ? t.toDate().toISOString() : null);

// Sækir bekk og staðfestir að kennarinn eigi hann
async function ownClass(me, classId) {
  if (!classId || String(classId).includes('/')) throw new HttpError(400, 'Bekk vantar');
  const ref = db.collection('classes').doc(String(classId));
  const snap = await ref.get();
  if (!snap.exists || snap.data().teacher_uid !== me.uid) throw new HttpError(404, 'Bekkur finnst ekki');
  return { ref, data: snap.data() };
}

function accessStatus(userAccess, course) {
  const a = userAccess && userAccess[course];
  if (!a || !a.activated_at) return { status: 'none', expiresAt: null };
  const exp = a.expires_at && a.expires_at.toDate ? a.expires_at.toDate() : null;
  return { status: exp && exp < new Date() ? 'expired' : 'active', expiresAt: exp ? exp.toISOString() : null };
}

exports.handler = handler(async (event, body) => {
  const me = await requireTeacher(event);
  const { action } = body;

  if (action === 'list') {
    const snap = await db.collection('classes').where('teacher_uid', '==', me.uid).get();
    const classes = await Promise.all(snap.docs.map(async (d) => {
      const c = d.data();
      const members = await db.collection('class_members').where('class_id', '==', d.id).get();
      return {
        id: d.id,
        name: c.name,
        course: c.course,
        semester: c.semester || '',
        joinCode: c.join_code,
        archived: !!c.archived,
        createdAt: iso(c.created_at),
        memberCount: members.size,
      };
    }));
    classes.sort((a, b) => (a.archived - b.archived) || (b.createdAt || '').localeCompare(a.createdAt || ''));
    return { classes };
  }

  if (action === 'create') {
    const name = String(body.name || '').trim().slice(0, 80);
    const course = String(body.course || '');
    const semester = String(body.semester || '').trim().slice(0, 20);
    if (!name) throw new HttpError(400, 'Gefðu bekknum heiti');
    if (!COURSES.includes(course)) throw new HttpError(400, 'Veldu áfanga');

    const joinCode = await uniqueJoinCode();
    const ref = await db.collection('classes').add({
      name, course, semester,
      join_code: joinCode,
      teacher_uid: me.uid,
      teacher_email: me.email,
      teacher_name: me.name || '',
      archived: false,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { id: ref.id, joinCode };
  }

  if (action === 'archive') {
    const { ref } = await ownClass(me, body.classId);
    await ref.update({ archived: !!body.archived });
    return { ok: true };
  }

  if (action === 'members') {
    const { data: cls } = await ownClass(me, body.classId);
    const snap = await db.collection('class_members').where('class_id', '==', body.classId).get();
    const members = await Promise.all(snap.docs.map(async (d) => {
      const m = d.data();
      const ua = await db.collection('user_access').doc(m.uid).get();
      return {
        uid: m.uid,
        email: m.email || '',
        joinedAt: iso(m.joined_at),
        access: accessStatus(ua.exists ? ua.data() : null, cls.course),
      };
    }));
    members.sort((a, b) => a.email.localeCompare(b.email));
    return { members };
  }

  if (action === 'removeMember') {
    await ownClass(me, body.classId);
    const uid = String(body.uid || '');
    if (!uid || uid.includes('/')) throw new HttpError(400, 'Nemanda vantar');
    await db.collection('class_members').doc(`${body.classId}_${uid}`).delete();
    return { ok: true };
  }

  throw new HttpError(400, 'Óþekkt aðgerð');
});
