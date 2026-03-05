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
    const { idToken, code, course } = JSON.parse(event.body);

    if (!idToken || !code || !course) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Gögn vantar' }) };
    }

    // Staðfesta Firebase token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Sækja kóðann úr Firestore
    const codeRef = db.collection('access_codes').doc(code.trim().toUpperCase());
    const codeDoc = await codeRef.get();

    if (!codeDoc.exists) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Kóðinn finnst ekki' }) };
    }

    const codeData = codeDoc.data();

    // Athuga hvort kóðinn sé fyrir réttan áfanga
    if (codeData.course !== course) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Kóðinn er ekki fyrir þennan áfanga' }) };
    }

    // Athuga hvort kóðinn sé útrunninn
    const now = new Date();
    const expiresAt = codeData.expires_at.toDate();
    if (now > expiresAt) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Kóðinn er útrunninn', expired: true }) };
    }

    // Skrá aðgang fyrir notandann í user_access collection
    const accessRef = db.collection('user_access').doc(uid);
    const accessDoc = await accessRef.get();

    const accessData = accessDoc.exists ? accessDoc.data() : {};

    // Bæta við eða uppfæra aðgang að þessum áfanga
    accessData[course] = {
      expires_at: codeData.expires_at,
      activated_at: admin.firestore.Timestamp.now(),
      code_used: code.trim().toUpperCase(),
    };

    await accessRef.set(accessData, { merge: true });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        expiresAt: expiresAt.toISOString(),
      })
    };

  } catch (err) {
    console.error('activate-code villa:', err);
    if (err.code === 'auth/id-token-expired') {
      return { statusCode: 401, body: JSON.stringify({ error: 'Innskráning útrunnin' }) };
    }
    return { statusCode: 500, body: JSON.stringify({ error: 'Villa kom upp' }) };
  }
};
