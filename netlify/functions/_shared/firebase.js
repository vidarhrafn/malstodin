// Sameiginleg Firebase-frumstilling og auðkenning fyrir Netlify-föll.
// Mappan _shared/ er ekki fall í sjálfu sér – hún er bara sótt með require().

const admin = require('firebase-admin');

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

const db = admin.firestore();

// ── Svör ──────────────────────────────────────────────────────
function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// ── Auðkenning ───────────────────────────────────────────────
// Staðfestir Firebase ID token úr „Authorization: Bearer …“ haus.
async function requireUser(event) {
  const header = event.headers.authorization || event.headers.Authorization || '';
  const idToken = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!idToken) throw new HttpError(401, 'Innskráning vantar');
  try {
    return await admin.auth().verifyIdToken(idToken);
  } catch {
    throw new HttpError(401, 'Innskráning útrunnin, skráðu þig inn aftur');
  }
}

// Netföng í umhverfisbreytunni BOOTSTRAP_ADMIN_EMAILS eru alltaf kerfisstjórar.
// Það tryggir að kerfið læsist aldrei úti, jafnvel þótt teachers-safnið tæmist.
function bootstrapAdminEmails() {
  return (process.env.BOOTSTRAP_ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);
}

function isBootstrapAdmin(token) {
  const email = (token.email || '').toLowerCase();
  // Krafa um staðfest netfang (Google-innskráning er alltaf staðfest)
  return !!email && token.email_verified === true && bootstrapAdminEmails().includes(email);
}

// Skilar { uid, email, name, role } eða null ef notandinn er ekki kennari.
// Bootstrap-kerfisstjórar fá sjálfkrafa færslu í teachers-safninu.
async function getTeacher(token) {
  const ref = db.collection('teachers').doc(token.uid);
  const snap = await ref.get();
  const data = snap.exists ? snap.data() : null;

  if (isBootstrapAdmin(token)) {
    if (!data || data.role !== 'admin') {
      await ref.set({
        email: token.email.toLowerCase(),
        name: (data && data.name) || token.name || '',
        role: 'admin',
        added_by: 'bootstrap',
        added_at: (data && data.added_at) || admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    }
    return { uid: token.uid, email: token.email.toLowerCase(), name: (data && data.name) || token.name || '', role: 'admin', bootstrap: true };
  }

  if (!data) return null;
  return { uid: token.uid, email: data.email || token.email || '', name: data.name || '', role: data.role || 'teacher', bootstrap: false };
}

async function requireTeacher(event) {
  const token = await requireUser(event);
  const teacher = await getTeacher(token);
  if (!teacher) throw new HttpError(403, 'Þú hefur ekki aðgang að stjórnborðinu');
  return teacher;
}

async function requireAdmin(event) {
  const teacher = await requireTeacher(event);
  if (teacher.role !== 'admin') throw new HttpError(403, 'Aðeins kerfisstjórar');
  return teacher;
}

// Vefur utan um handler: les JSON, grípur villur og skilar íslenskum villuboðum.
function handler(fn) {
  return async (event) => {
    if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
    let body = {};
    try { body = event.body ? JSON.parse(event.body) : {}; }
    catch { return json(400, { error: 'Ógild beiðni' }); }
    try {
      return json(200, await fn(event, body));
    } catch (err) {
      if (err instanceof HttpError) return json(err.statusCode, { error: err.message });
      console.error(err);
      return json(500, { error: 'Villa kom upp' });
    }
  };
}

module.exports = {
  admin, db, HttpError, handler,
  requireUser, requireTeacher, requireAdmin, getTeacher, bootstrapAdminEmails,
};
