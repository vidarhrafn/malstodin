// Innlausn bókarkóða fyrir ÍSAT1ÍA og ÍSAT1ÍC.
// Sama hegðun og áður var í login.html: hver kóði nýtist einu sinni og
// gildistími aðgangs kemur úr kóðanum sjálfum.
const { admin, db, handler, HttpError, requireUser } = require('./_shared/firebase');

const COURSES = ['isat1ia', 'isat1ic'];

// Kóðar hafa verið vistaðir með mismunandi há-/lágstöfum – reyna eins og login.html gerði
async function findCodeRef(code) {
  for (const id of [...new Set([code, code.toLowerCase(), code.toUpperCase()])]) {
    const ref = db.collection('access_codes').doc(id);
    if ((await ref.get()).exists) return ref;
  }
  return null;
}

exports.handler = handler(async (event, body) => {
  const token = await requireUser(event);
  const code = String(body.code || '').trim();
  const course = String(body.course || '');

  if (!code) throw new HttpError(400, 'Sláðu inn kóða.');
  if (!COURSES.includes(course)) throw new HttpError(400, 'Óþekkt námskeið.');
  if (code.includes('/')) throw new HttpError(404, 'Kóðinn er ekki til.');

  const codeRef = await findCodeRef(code);
  if (!codeRef) throw new HttpError(404, 'Kóðinn er ekki til.');

  const userRef = db.collection('user_access').doc(token.uid);

  // Færsla (transaction) tryggir að tveir geti ekki innleyst sama kóða samtímis
  const expiresAt = await db.runTransaction(async (tx) => {
    const codeSnap = await tx.get(codeRef);
    const c = codeSnap.data();

    if (c.activated)         throw new HttpError(409, 'Þessi kóði hefur þegar verið notaður.');
    if (c.course !== course) throw new HttpError(403, 'Þessi kóði gildir ekki fyrir þetta námskeið.');
    if (c.expires_at && c.expires_at.toDate() < new Date()) throw new HttpError(403, 'Þessi kóði er útrunninn.');

    const now = admin.firestore.FieldValue.serverTimestamp();
    tx.update(codeRef, { activated: true, activated_at: now, activated_by: token.uid });
    tx.set(userRef, {
      email: token.email || '',
      [course]: {
        activated_at: now,
        code_used:    codeSnap.id,
        expires_at:   c.expires_at || null,
        // Eldri hópasvið – stjórnborðið notar þau þar til bekkir taka við (áfangi 4)
        class:        c.class    || null,
        semester:     c.semester || null,
      },
    }, { merge: true });

    return c.expires_at ? c.expires_at.toDate().toISOString() : null;
  });

  return { success: true, course, expiresAt };
});
