const admin = require('firebase-admin');

// Frumstilla Firebase Admin einu sinni
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  // Aðeins POST leyfð
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { code } = JSON.parse(event.body);

    if (!code) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Kóði vantar' }) };
    }

    // Leita að kóðanum í Firestore
    const codeRef = db.collection('access_codes').doc(code.trim().toUpperCase());
    const codeDoc = await codeRef.get();

    // Er kóðinn til?
    if (!codeDoc.exists) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Kóðinn er ekki gildur' })
      };
    }

    const data = codeDoc.data();

    // Er kóðinn útrunninn?
    const now = new Date();
    const expiresAt = data.expires_at.toDate();
    if (now > expiresAt) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Kóðinn er útrunninn', expired: true })
      };
    }

    // Er kóðinn fyrir réttan áfanga?
    return {
      statusCode: 200,
      body: JSON.stringify({
        valid: true,
        course: data.course,
        expiresAt: expiresAt.toISOString(),
      })
    };

  } catch (err) {
    console.error('verify-code villa:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Villa kom upp' })
    };
  }
};
