// Bókarkóðar – allir kennarar geta búið til og séð kóða.
// Persónuvernd: netfang þess sem innleysti kóða sést aðeins ef kennarinn bjó
// kóðann til eða nemandinn er í bekk kennarans.
// action: 'list' | 'create'
const crypto = require('crypto');
const { admin, db, handler, HttpError, requireTeacher } = require('./_shared/firebase');

const COURSE_PREFIX = { isat1ic: 'uogs', isat1ia: 'fih' };
const SUFFIX_CHARS = 'abcdefghjkmnpqrstuvwxyz23456789';

const iso = (t) => (t && t.toDate ? t.toDate().toISOString() : null);

function randomCodeId(course) {
  let s = '';
  for (let i = 0; i < 3; i++) s += SUFFIX_CHARS[crypto.randomInt(SUFFIX_CHARS.length)];
  return COURSE_PREFIX[course] + '-' + s;
}

// Nemendur í bekkjum kennarans
async function myStudentUids(me) {
  const classes = await db.collection('classes').where('teacher_uid', '==', me.uid).get();
  const uids = new Set();
  for (const c of classes.docs) {
    const members = await db.collection('class_members').where('class_id', '==', c.id).get();
    members.docs.forEach(d => uids.add(d.data().uid));
  }
  return uids;
}

exports.handler = handler(async (event, body) => {
  const me = await requireTeacher(event);
  const course = String(body.course || '');
  if (!COURSE_PREFIX[course]) throw new HttpError(400, 'Óþekktur áfangi');

  if (body.action === 'list') {
    const snap = await db.collection('access_codes').where('course', '==', course).get();
    const codes = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Eldri kóðar hafa ekki activated_by – finna innleysanda í user_access
    const redeemerByCode = {};
    const usersSnap = await db.collection('user_access').get();
    const emailByUid = {};
    usersSnap.docs.forEach(d => {
      const u = d.data();
      emailByUid[d.id] = u.email || '';
      const a = u[course];
      if (a && a.code_used) redeemerByCode[a.code_used] = { uid: d.id, activatedAt: a.activated_at };
    });

    const mine = await myStudentUids(me);

    return {
      codes: codes.map(c => {
        const legacy = redeemerByCode[c.id] || {};
        const redeemerUid = c.activated_by || legacy.uid || null;
        const visible = !!redeemerUid && (c.created_by === me.uid || mine.has(redeemerUid));
        return {
          id: c.id,
          batch: c.batch || c.class || '',
          semester: c.semester || '',
          expiresAt: iso(c.expires_at),
          activated: !!c.activated,
          activatedAt: iso(c.activated_at) || iso(legacy.activatedAt),
          createdBy: c.created_by_email || '',
          redeemer: c.activated ? (visible ? (emailByUid[redeemerUid] || '') : null) : null,
        };
      }).sort((a, b) => a.id.localeCompare(b.id)),
    };
  }

  if (body.action === 'create') {
    const count = parseInt(body.count, 10);
    const batch = String(body.batch || '').trim().slice(0, 40);
    const semester = String(body.semester || '').trim().slice(0, 20);
    const expires = String(body.expiresAt || '');
    if (!count || count < 1 || count > 50) throw new HttpError(400, 'Fjöldi verður að vera 1–50.');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(expires)) throw new HttpError(400, 'Veldu gildistíma.');
    const expiresAt = new Date(expires + 'T23:59:59Z');
    if (isNaN(expiresAt) || expiresAt < new Date()) throw new HttpError(400, 'Gildistími verður að vera í framtíðinni.');

    const existing = new Set((await db.collection('access_codes').where('course', '==', course).get()).docs.map(d => d.id));
    const ids = [];
    for (let i = 0; i < count; i++) {
      let id, attempts = 0;
      do {
        id = randomCodeId(course);
        if (++attempts > 200) throw new HttpError(500, 'Gat ekki búið til einstakan kóða.');
      } while (existing.has(id));
      existing.add(id);
      ids.push(id);
    }

    const wb = db.batch();
    ids.forEach(id => wb.create(db.collection('access_codes').doc(id), {
      course, batch, semester,
      expires_at: admin.firestore.Timestamp.fromDate(expiresAt),
      activated: false, activated_at: null, activated_by: null,
      created_by: me.uid,
      created_by_email: me.email,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    }));
    await wb.commit();
    return { codes: ids };
  }

  throw new HttpError(400, 'Óþekkt aðgerð');
});
