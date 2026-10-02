// Nemandi gengur í bekk með bekkjarkóða (hlekkur malstodin.org/bekkur?kodi=XXXXXX).
// Óháð bókaraðgangi: hægt er að ganga í bekk áður en bókarkóði er virkjaður.
// action: 'peek' (skoða bekk áður en gengið er í hann) | 'join'
const { admin, db, handler, HttpError, requireUser } = require('./_shared/firebase');

function normalizeCode(code) {
  return String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function hasActiveAccess(userAccess, course) {
  const a = userAccess && userAccess[course];
  if (!a || !a.activated_at) return false;
  return !(a.expires_at && a.expires_at.toDate() < new Date());
}

exports.handler = handler(async (event, body) => {
  const token = await requireUser(event);
  const code = normalizeCode(body.code);
  if (code.length !== 6) throw new HttpError(400, 'Bekkjarkóði á að vera 6 stafir.');

  const hit = await db.collection('classes').where('join_code', '==', code).limit(1).get();
  if (hit.empty) throw new HttpError(404, 'Enginn bekkur með þennan kóða. Athugaðu hlekkinn frá kennaranum.');
  const classDoc = hit.docs[0];
  const cls = classDoc.data();
  if (cls.archived) throw new HttpError(410, 'Þessi bekkur er ekki lengur opinn. Hafðu samband við kennarann.');

  const memberRef = db.collection('class_members').doc(`${classDoc.id}_${token.uid}`);
  const [memberSnap, accessSnap] = await Promise.all([
    memberRef.get(),
    db.collection('user_access').doc(token.uid).get(),
  ]);

  const info = {
    className: cls.name,
    course: cls.course,
    semester: cls.semester || '',
    teacherName: cls.teacher_name || cls.teacher_email || '',
    alreadyMember: memberSnap.exists,
    hasAccess: hasActiveAccess(accessSnap.exists ? accessSnap.data() : null, cls.course),
  };

  if (body.action === 'join' && !memberSnap.exists) {
    await memberRef.set({
      class_id: classDoc.id,
      uid: token.uid,
      email: token.email || '',
      course: cls.course,
      teacher_uid: cls.teacher_uid,
      joined_at: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  return info;
});
