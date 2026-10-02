// Prófanir á Firestore-reglum (firestore.rules) í Firestore-hermi.
//
// Keyrsla (þarf Java og Node):
//   mkdir /tmp/rt && cd /tmp/rt && npm init -y && npm i firebase-tools@13 @firebase/rules-unit-testing@3 firebase@10
//   cp <repo>/firestore.rules <repo>/tests/firestore-rules.test.mjs .
//   echo '{"firestore":{"rules":"firestore.rules"},"emulators":{"firestore":{"port":8080}}}' > firebase.json
//   npx firebase emulators:exec --only firestore --project malstodin-test "node firestore-rules.test.mjs"
//
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';
const env = await initializeTestEnvironment({ projectId: 'malstodin-test',
  firestore: { rules: fs.readFileSync('firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 } });
await env.withSecurityRulesDisabled(async ctx => {
  const db = ctx.firestore();
  await setDoc(doc(db, 'user_access/anna'), { email: 'anna@x.is', isat1ic: { activated_at: new Date() } });
  await setDoc(doc(db, 'user_access/bjarki'), { email: 'b@x.is' });
  await setDoc(doc(db, 'progress/bjarki/isat1ic/lestextar_01'), { status: 'completed' });
  await setDoc(doc(db, 'access_codes/uogs-abc'), { course: 'isat1ic', activated: false });
  await setDoc(doc(db, 'classes/c1'), { name: 'x' });
  await setDoc(doc(db, 'class_members/c1_anna'), { uid: 'anna' });
  await setDoc(doc(db, 'teachers/viddi'), { role: 'admin' });
});
const anna = env.authenticatedContext('anna').firestore();
const anon = env.unauthenticatedContext().firestore();
let ok = 0, bad = 0;
const t = async (name, p) => { try { await p; ok++; console.log('✓', name); } catch (e) { bad++; console.log('✗', name, e.message); } };
// Það sem síðurnar gera í dag – verður að virka
await t('les eigin user_access', assertSucceeds(getDoc(doc(anna, 'user_access/anna'))));
await t('nýr notandi les eigin user_access sem er ekki til', assertSucceeds(getDoc(doc(env.authenticatedContext('nyr').firestore(), 'user_access/nyr'))));
await t('skrifar eigin framvindu (setDoc merge)', assertSucceeds(setDoc(doc(anna, 'progress/anna/isat1ic/hlustun_01'), { status: 'opened', updated_at: serverTimestamp() }, { merge: true })));
await t('uppfærir eigin framvindu', assertSucceeds(setDoc(doc(anna, 'progress/anna/isat1ic/hlustun_01'), { status: 'completed' }, { merge: true })));
await t('les eigin framvindu (getDocs)', assertSucceeds(getDocs(collection(anna, 'progress/anna/isat1ic'))));
await t('skrifar framvindu í exercises (umsokn/synis)', assertSucceeds(setDoc(doc(anna, 'progress/anna/exercises/k7'), { status: 'opened' }, { merge: true })));
// Það sem á að vera lokað
await t('les EKKI user_access annarra', assertFails(getDoc(doc(anna, 'user_access/bjarki'))));
await t('listar EKKI user_access', assertFails(getDocs(collection(anna, 'user_access'))));
await t('gefur sér EKKI aðgang sjálf', assertFails(setDoc(doc(anna, 'user_access/anna'), { isat1ia: { activated_at: new Date() } }, { merge: true })));
await t('les EKKI framvindu annarra', assertFails(getDocs(collection(anna, 'progress/bjarki/isat1ic'))));
await t('skrifar EKKI í framvindu annarra', assertFails(setDoc(doc(anna, 'progress/bjarki/isat1ic/x'), { status: 'completed' })));
await t('les EKKI bókarkóða', assertFails(getDoc(doc(anna, 'access_codes/uogs-abc'))));
await t('listar EKKI bókarkóða', assertFails(getDocs(collection(anna, 'access_codes'))));
await t('virkjar EKKI kóða sjálf', assertFails(updateDoc(doc(anna, 'access_codes/uogs-abc'), { activated: true })));
await t('býr EKKI til kóða', assertFails(setDoc(doc(anna, 'access_codes/fake-1'), { course: 'isat1ic' })));
await t('gerir sig EKKI að kennara', assertFails(setDoc(doc(anna, 'teachers/anna'), { role: 'admin' })));
await t('les EKKI kennaralista', assertFails(getDocs(collection(anna, 'teachers'))));
await t('les EKKI bekki', assertFails(getDocs(collection(anna, 'classes'))));
await t('les EKKI eigin bekkjaraðild beint', assertFails(getDoc(doc(anna, 'class_members/c1_anna'))));
await t('gengur EKKI í bekk framhjá falli', assertFails(setDoc(doc(anna, 'class_members/c1_x'), { uid: 'anna' })));
await t('eyðir EKKI gögnum annarra', assertFails(deleteDoc(doc(anna, 'user_access/bjarki'))));
await t('óinnskráður les EKKI neitt', assertFails(getDoc(doc(anon, 'user_access/anna'))));
await t('óinnskráður skrifar EKKI framvindu', assertFails(setDoc(doc(anon, 'progress/anna/isat1ic/x'), { status: 'x' })));
await env.cleanup();
console.log(`\n${ok} stóðust, ${bad} féllu`);
process.exit(bad ? 1 : 0);
