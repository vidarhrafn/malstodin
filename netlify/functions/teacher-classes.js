// Bekkir kennara. Kennari sér og breytir aðeins bekkjum sem hann kennir
// (sem eigandi eða meðkennari).
//
// action:
//   'list'          – mínir bekkir
//   'create'        – nýr bekkur (ég verð eigandi)
//   'archive'       – setja í geymslu / opna aftur (allir kennarar bekkjarins)
//   'members'       – nemendur bekkjarins og staða bókaraðgangs
//   'removeMember'  – fjarlægja nemanda
//   'addTeacher'    – bæta við meðkennara (eigandi eða kerfisstjóri)
//   'removeTeacher' – fjarlægja meðkennara (eigandi, kerfisstjóri, eða kennarinn sjálfur)
//   'listAll'       – allir bekkir, án nemendagagna (aðeins kerfisstjóri)
//   'transfer'      – gera annan kennara að eiganda (eigandi eða kerfisstjóri)
const crypto = require('crypto');
const { admin, db, handler, HttpError, requireTeacher, isTeacherOf, classesForTeacher } = require('./_shared/firebase');

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

// Allir kennarar bekkjarins, eigandi fremst
const teacherUids = (c) => [...new Set([c.teacher_uid, ...(c.teacher_uids || [])].filter(Boolean))];

async function getClass(classId) {
  if (!classId || String(classId).includes('/')) throw new HttpError(400, 'Bekk vantar');
  const ref = db.collection('classes').doc(String(classId));
  const snap = await ref.get();
  if (!snap.exists) throw new HttpError(404, 'Bekkur finnst ekki');
  return { ref, id: snap.id, data: snap.data() };
}

// Sækir bekk og staðfestir að kennarinn kenni hann
async function myClass(me, classId) {
  const c = await getClass(classId);
  if (!isTeacherOf(c.data, me.uid)) throw new HttpError(404, 'Bekkur finnst ekki');
  return c;
}

// Eigandi eða kerfisstjóri
async function managedClass(me, classId) {
  const c = await getClass(classId);
  if (c.data.teacher_uid !== me.uid && me.role !== 'admin') {
    throw new HttpError(403, 'Aðeins eigandi bekkjarins eða kerfisstjóri getur gert þetta');
  }
  return c;
}

async function teacherByEmail(email) {
  const e = String(email || '').trim().toLowerCase();
  if (!e) throw new HttpError(400, 'Sláðu inn netfang kennara');
  const snap = await db.collection('teachers').where('email', '==', e).limit(1).get();
  if (snap.empty) throw new HttpError(404, `${e} er ekki skráður kennari. Kerfisstjóri þarf fyrst að bæta honum við.`);
  return { uid: snap.docs[0].id, ...snap.docs[0].data() };
}

async function teacherInfo(uids) {
  const docs = await Promise.all(uids.map(uid => db.collection('teachers').doc(uid).get()));
  return docs.map((d, i) => ({
    uid: uids[i],
    email: d.exists ? d.data().email || '' : '',
    name: d.exists ? d.data().name || '' : '',
  }));
}

function accessStatus(userAccess, course) {
  const a = userAccess && userAccess[course];
  if (!a || !a.activated_at) return { status: 'none', expiresAt: null };
  const exp = a.expires_at && a.expires_at.toDate ? a.expires_at.toDate() : null;
  return { status: exp && exp < new Date() ? 'expired' : 'active', expiresAt: exp ? exp.toISOString() : null };
}

async function summarize(d) {
  const c = d.data();
  const [members, teachers] = await Promise.all([
    db.collection('class_members').where('class_id', '==', d.id).get(),
    teacherInfo(teacherUids(c)),
  ]);
  return {
    id: d.id,
    name: c.name,
    course: c.course,
    semester: c.semester || '',
    joinCode: c.join_code,
    archived: !!c.archived,
    createdAt: iso(c.created_at),
    memberCount: members.size,
    ownerUid: c.teacher_uid,
    teachers,
  };
}

const sortClasses = (list) =>
  list.sort((a, b) => (a.archived - b.archived) || (b.createdAt || '').localeCompare(a.createdAt || ''));

exports.handler = handler(async (event, body) => {
  const me = await requireTeacher(event);
  const { action } = body;

  if (action === 'list') {
    const docs = await classesForTeacher(me.uid);
    return { classes: sortClasses(await Promise.all(docs.map(summarize))) };
  }

  if (action === 'listAll') {
    if (me.role !== 'admin') throw new HttpError(403, 'Aðeins kerfisstjórar');
    const snap = await db.collection('classes').get();
    return { classes: sortClasses(await Promise.all(snap.docs.map(summarize))) };
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
      teacher_uids: [me.uid],
      teacher_email: me.email,
      teacher_name: me.name || '',
      archived: false,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { id: ref.id, joinCode };
  }

  if (action === 'archive') {
    const { ref } = await myClass(me, body.classId);
    await ref.update({ archived: !!body.archived });
    return { ok: true };
  }

  if (action === 'members') {
    const { id, data: cls } = await myClass(me, body.classId);
    const snap = await db.collection('class_members').where('class_id', '==', id).get();
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
    const { id } = await myClass(me, body.classId);
    const uid = String(body.uid || '');
    if (!uid || uid.includes('/')) throw new HttpError(400, 'Nemanda vantar');
    await db.collection('class_members').doc(`${id}_${uid}`).delete();
    return { ok: true };
  }

  if (action === 'addTeacher') {
    const { ref, data } = await managedClass(me, body.classId);
    const t = await teacherByEmail(body.email);
    if (teacherUids(data).includes(t.uid)) throw new HttpError(400, `${t.email} kennir þegar þennan bekk`);
    await ref.update({ teacher_uids: admin.firestore.FieldValue.arrayUnion(data.teacher_uid, t.uid) });
    return { ok: true };
  }

  if (action === 'removeTeacher') {
    const uid = String(body.uid || '');
    const c = await getClass(body.classId);
    const allowed = c.data.teacher_uid === me.uid || me.role === 'admin' || (uid === me.uid && isTeacherOf(c.data, me.uid));
    if (!allowed) throw new HttpError(403, 'Aðeins eigandi bekkjarins eða kerfisstjóri getur gert þetta');
    if (uid === c.data.teacher_uid) throw new HttpError(400, 'Ekki er hægt að fjarlægja eiganda bekkjarins. Færðu bekkinn fyrst til annars kennara.');
    await c.ref.update({ teacher_uids: admin.firestore.FieldValue.arrayRemove(uid) });
    return { ok: true };
  }

  if (action === 'transfer') {
    const { ref, data } = await managedClass(me, body.classId);
    const t = await teacherByEmail(body.email);
    if (t.uid === data.teacher_uid) throw new HttpError(400, `${t.email} á þegar þennan bekk`);
    // Fyrri eigandi verður meðkennari – hægt að fjarlægja hann á eftir
    await ref.update({
      teacher_uid: t.uid,
      teacher_email: t.email || '',
      teacher_name: t.name || '',
      teacher_uids: admin.firestore.FieldValue.arrayUnion(data.teacher_uid, t.uid),
    });
    return { ok: true };
  }

  throw new HttpError(400, 'Óþekkt aðgerð');
});
