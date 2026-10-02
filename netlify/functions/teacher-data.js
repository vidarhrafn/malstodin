// Framvinda nemenda í bekkjum kennarans – aðeins eigin nemendur.
// Inntak: { course }. Skilar bekkjum kennarans í áfanganum og nemendum þeirra
// ásamt framvindu og stöðu bókaraðgangs.
const { db, handler, HttpError, requireTeacher, classesForTeacher } = require('./_shared/firebase');

const COURSES = ['isat1ia', 'isat1ic'];

function accessStatus(userAccess, course) {
  const a = userAccess && userAccess[course];
  if (!a || !a.activated_at) return { status: 'none', expiresAt: null };
  const exp = a.expires_at && a.expires_at.toDate ? a.expires_at.toDate() : null;
  return { status: exp && exp < new Date() ? 'expired' : 'active', expiresAt: exp ? exp.toISOString() : null };
}

// Staða einnar æfingar: { status, correct?, total? }.
// Æfing sem einhvern tíma var lokið telst lokið (completed_at helst þó nemandi opni hana
// aftur og 'opened' skrifist yfir status). correct/total aðeins ef bæði eru gild.
function progressEntry(p) {
  const entry = { status: (p.status === 'completed' || p.completed_at) ? 'completed' : (p.status || 'opened') };
  if (Number.isInteger(p.correct) && Number.isInteger(p.total) && p.total > 0 && p.correct >= 0) {
    entry.correct = Math.min(p.correct, p.total);
    entry.total = p.total;
  }
  return entry;
}

exports.handler = handler(async (event, body) => {
  const me = await requireTeacher(event);
  const course = String(body.course || '');
  if (!COURSES.includes(course)) throw new HttpError(400, 'Óþekktur áfangi');

  const classes = (await classesForTeacher(me.uid))
    .filter(d => d.data().course === course)
    .map(d => ({ id: d.id, name: d.data().name, semester: d.data().semester || '', archived: !!d.data().archived }))
    .sort((a, b) => (a.archived - b.archived) || a.name.localeCompare(b.name, 'is'));

  // Nemendur í bekkjunum (nemandi getur verið í fleiri en einum bekk)
  const byUid = new Map();
  for (const c of classes) {
    const members = await db.collection('class_members').where('class_id', '==', c.id).get();
    members.docs.forEach(d => {
      const m = d.data();
      if (!byUid.has(m.uid)) byUid.set(m.uid, { uid: m.uid, email: m.email || '', classIds: [] });
      byUid.get(m.uid).classIds.push(c.id);
    });
  }

  const students = await Promise.all([...byUid.values()].map(async (s) => {
    const [accessSnap, progressSnap] = await Promise.all([
      db.collection('user_access').doc(s.uid).get(),
      db.collection('progress').doc(s.uid).collection(course).get(),
    ]);
    const progress = {};
    progressSnap.docs.forEach(d => { progress[d.id] = progressEntry(d.data()); });
    return { ...s, access: accessStatus(accessSnap.exists ? accessSnap.data() : null, course), progress };
  }));

  students.sort((a, b) => a.email.localeCompare(b.email));
  return { classes, students, fetchedAt: new Date().toISOString() };
});
