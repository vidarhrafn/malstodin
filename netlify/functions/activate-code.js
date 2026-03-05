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

    // Athuga hvort kóðinn sjálfur sé útrunninn (of gamall til að innleysa)
    const now = new Date();
    const codeExpiresAt = codeData.expires_at.toDate();
    if (now > codeExpiresAt) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Þessi kóði er of gamall til að innleysa', expired: true }) };
    }

    // Athuga hvort notandi hafi þegar gildan aðgang
    const accessRef = db.collection('user_access').doc(uid);
    const accessDoc = await accessRef.get();
    const accessData = accessDoc.exists ? accessDoc.data() : {};

    if (accessData[course] && accessData[course].expires_at) {
      const existingExpiry = accessData[course].expires_at.toDate();
      if (now < existingExpiry) {
        // Þegar með gildan aðgang - breyta engu
        return {
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            expiresAt: existingExpiry.toISOString(),
            alreadyActive: true,
          })
        };
      }
    }

    // Fyrsta innleysting eða endurnýjun - 6 mánuðir frá NÚNA
    const expiresAt = new Date(now);
    expiresAt.setMonth(expiresAt.getMonth() + 6);

    accessData[course] = {
      expires_at: admin.firestore.Timestamp.fromDate(expiresAt),
      activated_at: admin.firestore.Timestamp.now(),
      code_used: code.trim().toUpperCase(),
    };

    await accessRef.set(accessData, { merge: true });

    // Halda utan um hve oft kóðinn hefur verið notaður
    await codeRef.update({
      last_used_at: admin.firestore.Timestamp.now(),
      use_count: admin.firestore.FieldValue.increment(1),
    });

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
