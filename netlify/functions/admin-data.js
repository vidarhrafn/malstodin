const admin = require('firebase-admin');

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
    const { adminPassword, course } = JSON.parse(event.body);

    // Lykilorðsathugun
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Rangt lykilorð' }) };
    }

    // Bekkir hvers nemanda (uid → áfangi → [heiti bekkja])
    const [classesSnap, membersSnap] = await Promise.all([
      db.collection('classes').get(),
      db.collection('class_members').get(),
    ]);
    const classById = {};
    classesSnap.docs.forEach(d => { classById[d.id] = d.data(); });
    const classesByUid = {};
    membersSnap.docs.forEach(d => {
      const m = d.data();
      const cls = classById[m.class_id];
      if (!cls) return;
      classesByUid[m.uid] = classesByUid[m.uid] || {};
      (classesByUid[m.uid][cls.course] = classesByUid[m.uid][cls.course] || []).push(cls.name);
    });

    // Sækja alla notendur með aðgang
    const accessSnapshot = await db.collection('user_access').get();
    const users = [];

    for (const doc of accessSnapshot.docs) {
      const data = doc.data();
      const uid = doc.id;

      // Sækja Firebase Auth upplýsingar um notandann
      let email = 'Óþekkt';
      let displayName = '';
      let createdAt = null;
      let lastSignIn = null;

      try {
        const userRecord = await admin.auth().getUser(uid);
        email = userRecord.email || userRecord.providerData?.[0]?.email || 'Óþekkt';
        displayName = userRecord.displayName || '';
        createdAt = userRecord.metadata?.creationTime || null;
        lastSignIn = userRecord.metadata?.lastSignInTime || null;
      } catch {
        // Notandi eyðdur úr Auth en enn í Firestore
      }

      // Fara í gegnum alla áfanga sem notandinn hefur aðgang að
      for (const [courseId, courseData] of Object.entries(data)) {
        if (!courseData || typeof courseData !== 'object' || !courseData.expires_at) continue;

        // Sía eftir áfanga ef tilgreint
        if (course && courseId !== course) continue;

        const expiresAt = courseData.expires_at.toDate();
        const activatedAt = courseData.activated_at ? courseData.activated_at.toDate() : null;
        const now = new Date();
        const isExpired = now > expiresAt;

        users.push({
          uid,
          email,
          displayName,
          createdAt,
          lastSignIn,
          course: courseId,
          expiresAt: expiresAt.toISOString(),
          activatedAt: activatedAt ? activatedAt.toISOString() : null,
          codeUsed: courseData.code_used || 'Óþekkt',
          classes: (classesByUid[uid] || {})[courseId] || [],
          isExpired,
          daysLeft: isExpired ? 0 : Math.ceil((expiresAt - now) / (1000 * 60 * 60 * 24)),
        });
      }
    }

    // Sækja kóðaupplýsingar
    const codesSnapshot = await db.collection('access_codes').get();
    const codes = [];

    for (const doc of codesSnapshot.docs) {
      const data = doc.data();
      if (course && data.course !== course) continue;

      codes.push({
        code: doc.id,
        course: data.course,
        expiresAt: data.expires_at ? data.expires_at.toDate().toISOString() : null,
        // ÍSAN1ÍB telur use_count; ÍSAT1ÍA/ÍC merkja einnota kóða með activated
        useCount: data.use_count || (data.activated ? 1 : 0),
        lastUsedAt: data.last_used_at ? data.last_used_at.toDate().toISOString() : null,
      });
    }

    // Tölfræði
    const stats = {
      totalUsers: users.length,
      activeUsers: users.filter(u => !u.isExpired).length,
      expiredUsers: users.filter(u => u.isExpired).length,
      totalCodes: codes.length,
      usedCodes: codes.filter(c => c.useCount > 0).length,
    };

    return {
      statusCode: 200,
      body: JSON.stringify({ users, codes, stats }),
    };

  } catch (err) {
    console.error('admin-data villa:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Villa kom upp: ' + err.message }) };
  }
};
