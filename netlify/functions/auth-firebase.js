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
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { idToken, course } = JSON.parse(event.body);

    if (!idToken) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Token vantar' }) };
    }

    // Staðfesta Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Athuga hvort notandi hafi gildan aðgang að þessum áfanga
    const accessRef = db.collection('user_access').doc(uid);
    const accessDoc = await accessRef.get();

    if (!accessDoc.exists) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Enginn aðgangur skráður fyrir þennan notanda' })
      };
    }

    const accessData = accessDoc.data();
    const courseAccess = accessData[course];

    if (!courseAccess) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: `Enginn aðgangur að ${course}` })
      };
    }

    // Er aðgangurinn útrunninn?
    const now = new Date();
    const expiresAt = courseAccess.expires_at.toDate();

    if (now > expiresAt) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Aðgangur útrunninn', expired: true })
      };
    }

    // Allt í lagi!
    return {
      statusCode: 200,
      body: JSON.stringify({
        valid: true,
        uid,
        course,
        expiresAt: expiresAt.toISOString(),
      })
    };

  } catch (err) {
    console.error('auth-firebase villa:', err);
    // Token ógilt eða útrunnið
    if (err.code === 'auth/id-token-expired' || err.code === 'auth/argument-error') {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Innskráning útrunnin, skráðu þig inn aftur' })
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Villa kom upp' })
    };
  }
};
