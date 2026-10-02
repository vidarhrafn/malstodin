// Kennaralisti – aðeins kerfisstjórar.
// action: 'list' | 'add' | 'remove' | 'setRole'
const { admin, db, handler, HttpError, requireAdmin, bootstrapAdminEmails } = require('./_shared/firebase');

const ROLES = ['teacher', 'admin'];

exports.handler = handler(async (event, body) => {
  const me = await requireAdmin(event);
  const { action } = body;

  if (action === 'list') {
    const snap = await db.collection('teachers').get();
    const bootstrap = bootstrapAdminEmails();
    const teachers = snap.docs.map(d => {
      const t = d.data();
      return {
        uid: d.id,
        email: t.email || '',
        name: t.name || '',
        role: t.role || 'teacher',
        addedBy: t.added_by || '',
        addedAt: t.added_at ? t.added_at.toDate().toISOString() : null,
        bootstrap: bootstrap.includes((t.email || '').toLowerCase()),
      };
    }).sort((a, b) => a.email.localeCompare(b.email));
    return { teachers };
  }

  if (action === 'add') {
    const email = String(body.email || '').trim().toLowerCase();
    const name = String(body.name || '').trim();
    const role = ROLES.includes(body.role) ? body.role : 'teacher';
    if (!email) throw new HttpError(400, 'Sláðu inn netfang');

    let user;
    try { user = await admin.auth().getUserByEmail(email); }
    catch { throw new HttpError(404, 'Enginn notandi með þetta netfang. Kennarinn þarf að skrá sig inn einu sinni á Málstöðina fyrst.'); }

    await db.collection('teachers').doc(user.uid).set({
      email,
      name: name || user.displayName || '',
      role,
      added_by: me.email,
      added_at: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    return { ok: true, uid: user.uid };
  }

  if (action === 'remove' || action === 'setRole') {
    const uid = String(body.uid || '');
    if (!uid) throw new HttpError(400, 'UID vantar');
    if (uid === me.uid) throw new HttpError(400, 'Þú getur ekki breytt eigin aðgangi');

    const ref = db.collection('teachers').doc(uid);
    const snap = await ref.get();
    if (!snap.exists) throw new HttpError(404, 'Kennari finnst ekki');
    if (bootstrapAdminEmails().includes((snap.data().email || '').toLowerCase())) {
      throw new HttpError(400, 'Þessi kerfisstjóri er skilgreindur í Netlify (BOOTSTRAP_ADMIN_EMAILS) og verður ekki fjarlægður hér');
    }

    if (action === 'remove') {
      await ref.delete();
    } else {
      if (!ROLES.includes(body.role)) throw new HttpError(400, 'Ógilt hlutverk');
      await ref.update({ role: body.role });
    }
    return { ok: true };
  }

  throw new HttpError(400, 'Óþekkt aðgerð');
});
