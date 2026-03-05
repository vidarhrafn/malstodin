# Málstöðin – Hönnunarstaðall

Þetta skjal er leiðarvísir fyrir alla síðugerð í Málstöðinni. Þegar ný síða er búin til eða eldri uppfærð skal fylgja þessum stöðlum í öllum atriðum.

---

## 1. Síðutegundir og litaþema

Þrjár tegundir af æfingaríhlutum eru til. Sérhver tegund hefur sitt litaþema sem heldur í gegn í öllum gluggum, hnappar og merkimiðum.

| Tegund | Emoji | Litaþema |
|---|---|---|
| Lestexti | 📖 | Blátt (`blue-600`) |
| Hlustunaræfing | 🎧 | Grænt (`green-600`) |
| Spjallæfing | 💬 | Blátt (`blue-600`) |

> **Athugasemd um spjall:** Spjallæfingar nota `blue-600` sem aðallita (ekki purple). `purple-600` er eingöngu notaður í andstæðuæfingar (þar sem tvær myndir/hugtök eru borin saman).

Litaþemið á við um: hnappa, virka flipa, hljóðspilara, leiðbeiningabox og framvindureit.

---

## 2. HTML haus (head)

Sama uppbygging á öllum síðum:

```html
<!DOCTYPE html>
<html lang="is">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[Emoji] [Tegund] [Nr]: [Heiti] – Málstöðin</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  ...
</head>
```

**Titill í vafraflipa:**

- `📖 Lestexti 1: Áhugamál – Málstöðin`
- `🎧 Hlustun 1: Áhugamál – Málstöðin`
- `💬 Spjall 1: Áhugamál – Málstöðin`

---

## 3. Bakgrunnur og leturgerð

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  background: linear-gradient(to bottom, #f8f7f4 0%, #e8e6e1 100%);
  min-height: 100vh;
}
```

Þetta er fast á öllum síðum, breytist ekki eftir tegund.

---

## 4. Haus (header)

Fastur hvítur haus efst, ekki sticky. Uppbygging:

```jsx
<header className="bg-white shadow-sm border-b border-gray-200">
  <div className="max-w-4xl mx-auto px-6 py-8">
    <button onClick={() => window.history.back()}
      className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block font-light">
      ← Til baka
    </button>
    <h1 className="text-3xl font-light text-gray-800 mb-2">
      [Emoji] [Tegund] [Nr]: [Heiti]
    </h1>
    <p className="text-gray-500 text-sm font-light">[Undirtitill] · A1–A2</p>
  </div>
</header>
```

Undirtitlar eftir tegund:

- Lestexti: `Lesskilningur · A1–A2`
- Hlustun: `Hlustunarverkefni · A1–A2`
- Spjall: `Samtalsæfing · A1–A2`

**Persónumerkimiðar** – litlir pillur efst í hægrihorninu á header, eingöngu á hlustunar- og spjallsíðum þar sem nafngreindar persónur koma við sögu:

```jsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs 
  font-medium bg-blue-100 text-blue-800 mr-1">
  Sigríður
</span>
```

---

## 5. Leiðbeiningabox

Á öllum þremur síðutegundum, beint undir haus í `<main>`. Litir eftir þema:

```jsx
// Lestexti – blátt
<div className="bg-blue-50 border border-blue-200 border-l-4 border-l-blue-500 rounded-lg p-4 mb-6">

// Hlustun – grænt
<div className="bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-lg p-4 mb-6">

// Spjall – blátt
<div className="bg-blue-50 border border-blue-200 border-l-4 border-l-blue-500 rounded-lg p-4 mb-6">
```

Innihald eftir tegund:

**Lestexti:**
```
📖 Lestu textann hægt og rólega
✏️ Svaraðu krossaspurningunum
📝 Svaraðu stuttum spurningum með heilum setningum
💬 Ræddu spurningarnar með AI
```

**Hlustun:**
```
📘 Lestu lykilorðin hér að neðan fyrst
🎧 Hlustaðu á samtalið 2–3 sinnum
✏️ Svaraðu öllum flokkum spurninga
🔓 Þegar allt er lokið opnast textinn
```

**Spjall:**
```
💬 Spjallaðu um efnið með AI-kennaranum
🔄 Ef þú færð rangt: prófaðu að laga setninguna
✅ Þegar þú hefur lokið öllum efnisþáttum ertu búin/n
```

---

## 6. Lykilorðahluti (aðeins hlustun)

Fellanlegur hluti (`▼ Sýna` / `▲ Fela`) með gulum kortum fyrir hvert orð. Sjálfgefið opinn (`true`). Kemur á undan hljóðspilaranum.

```jsx
// Hvert lykilorðakort
<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
  <div className="font-medium text-sm">{orð} <span className="text-gray-500">({kyn})</span></div>
  <div className="text-xs text-gray-600 font-light">{skýring}</div>
</div>
```

---

## 7. Hljóðspilari (aðeins hlustun)

Fastur efst (sticky, z-50) þegar notandinn skrollar. Þema: grænt.

```css
.sticky-player {
  position: sticky;
  top: 0;
  z-index: 50;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.08);
}
```

Inniheldur:
- Spila/pása hnappur (kringlóttur, `bg-green-600`)
- Texti: `🎧 Hlusta á samtalið`
- Hraðatakkar: `0.75×` · `1×` · `1.25×` (sjálfgefið `1×`)
- Framvindulína (`<audio>` element með `currentTime` / `duration`)

---

## 8. Flipar (tabs)

Alltaf sticky efst (z-40), kemur fyrir neðan sticky-player ef hann er til staðar. Flipaslán er hluti af hvítu spjaldi sem efnið er í.

```css
.tab-btn { transition: all 0.2s; position: relative; }
.tab-btn:not(.active):hover { background: #f3f4f6; }
.tab-btn.active { background: white; color: #2563eb; font-weight: 500; }
.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px; left: 0; right: 0;
  height: 3px;
  background: #2563eb;
  border-radius: 2px 2px 0 0;
}
```

Þegar flipa er lokið (`done: true`) birtist `✓` við hliðina á titlinum.

**Flipar eftir tegund:**

Lestexti:
1. `✓ Krossaspurningar`
2. `📝 Stuttar spurningar`
3. `💬 Umræðuspurningar`

Hlustun:
1. `🔵 Þýðingar`
2. `✅ Rétt/Rangt`
3. `🔵 Krossaspurningar`
4. `📝 Stuttar spurningar`

> **Athugasemd:** Þýðingaflipinn (1) er sérstakur – hann notar JSON endurgjöf með `detected_language` og `feedback_native` þannig að nemandinn fær endurgjöf á sínu eigin móðurmáli. Sjá kafla 17.

Spjall: Engin flipar – efni er línulegt (ein umræða í einu, þema-titill sýnilegur efst).

---

## 9. Svarmöguleikar (MC og Rétt/Rangt)

```css
.answer-option {
  border: 2px solid #e5e7eb;
  transition: all 0.2s;
  cursor: pointer;
}
.answer-option:hover:not(.opt-disabled) { border-color: #93c5fd; background: #eff6ff; }
.answer-option.opt-selected   { border-color: #3b82f6; background: #eff6ff; }
.answer-option.opt-correct    { border-color: #22c55e; background: #f0fdf4; }
.answer-option.opt-incorrect  { border-color: #ef4444; background: #fef2f2; }
.answer-option.opt-disabled   { cursor: default; }
```

Þegar niðurstaða er komin: `✓` til hægri á réttum valkosti, `✗` á röngum völdum. Kringlótt radio-táknið breytir um lit samhliða (`border-blue-500 bg-blue-500` → `border-green-500 bg-green-500` o.s.frv.).

**Krossaspurningar eru alltaf stokkaðar** (`useMemo` með shuffle við fyrstu keyrslu) svo sömu valkostirnir séu ekki alltaf í sömu röð.

---

## 10. FeedbackBadge (AI endurgjöf)

Samræmd útfærsla á öllum síðum. Notar `score` (0–5):

| Stig | Litur | Merking |
|---|---|---|
| 4–5 | Grænt (`green-50 / green-200 / green-700`) | Rétt / vel gert |
| 2–3 | Amber (`amber-50 / amber-200 / amber-700`) | Nokkuð rétt |
| 0–1 | Rautt (`red-50 / red-200 / red-700`) | Rangt / reyndu aftur |

```jsx
const FeedbackBadge = ({ score, message }) => {
  const color = score >= 4 ? 'green' : score >= 2 ? 'amber' : 'red';
  const colors = {
    green: 'bg-green-50 border-green-200 text-green-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    red:   'bg-red-50 border-red-200 text-red-700',
  };
  return (
    <div className={`mt-3 p-3 rounded-lg border ${colors[color]}`}>
      <div className="font-medium text-sm mb-1">Stig: {score}/5</div>
      <p className="text-sm font-light">{message}</p>
      <button className="text-xs underline mt-2 opacity-70">Reyna aftur</button>
    </div>
  );
};
```

---

## 11. Framvinduraking

Fast neðst á skjánum (`fixed bottom-0`) á öllum síðutegundum. Litaþema eftir síðutegund.

```jsx
<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
  <div className="max-w-4xl mx-auto px-6 py-3 flex gap-2">
    {tabs.map((tab, i) => (
      <button key={i}
        onClick={() => setActiveTab(i)}
        className={`flex-1 py-2 rounded-lg text-sm font-light transition-colors
          ${tab.done
            ? 'bg-blue-600 text-white'       // lokinn – þemalitaður
            : 'bg-gray-100 text-gray-500'}`}  // ólokinn – grár
      >
        {tab.done ? '✓ ' : ''}{tab.label}
      </button>
    ))}
  </div>
</div>
```

`pb-20` á `<main>` til að gefa pláss fyrir fasta framvindusiku.

---

## 12. Lokakassi þegar öllum flipum er lokið

**Hlustun** – þegar öllum flipum er lokið birtist:

```jsx
<div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center fade-in">
  <div className="text-4xl mb-3">🎉</div>
  <h3 className="text-xl font-light text-green-800 mb-2">Vel gert!</h3>
  <p className="text-green-700 font-light text-sm mb-4">
    Þú hefur lokið öllum verkefnum.
  </p>
  <button onClick={() => setShowText(!showText)}
    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
    transition-colors font-light text-sm">
    {showText ? '▲ Fela samtalið' : '▼ Sýna samtalið'}
  </button>
</div>
```

Textinn er sýndur sem spjallbólur litaðar eftir persónum (hver persóna fær sinn lit).

**Lestexti** – textinn er sýnilegur frá byrjun (fellanlegur ef langur). Enginn sérstakur lokakassi.

**Spjall** – enginn lokakassi, spjallið lýkur þegar öllum þemum er lokið.

---

## 13. Spjallviðmót (aðeins spjall)

```jsx
// Spjallgluggi
<div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
  <div style={{ minHeight: 400, maxHeight: 500, overflowY: 'auto' }}
    className="p-4 space-y-4">
    {messages.map((msg, i) => (
      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-xs px-4 py-2 rounded-xl text-sm font-light
          ${msg.role === 'user'
            ? 'bg-blue-100 text-blue-900'
            : 'bg-gray-100 text-gray-800'}`}>
          {msg.content}
        </div>
      </div>
    ))}
  </div>
</div>
```

- `max-w-2xl` (þrengra en aðrar síður)
- Innsláttarsvæði fast neðst í spjallglugganum (ekki sama og framvinduraking)
- Þema-titill sést efst í spjallinum, ekki sem flipar
- Umræðuþema eru línuleg: þema 1 → þema 2 → þema 3
- Lykilorðahluti (`📘 Lykilorð`) fyrir neðan spjallgluggann
- Endurgjöf á málfari: rautt border (`bg-red-50 text-red-700 border-2 border-red-200 italic`)

---

## 14. Max-width og bil

| Síðutegund | Max-width |
|---|---|
| Lestexti | `max-w-4xl` |
| Hlustun | `max-w-4xl` |
| Spjall | `max-w-2xl` |

```jsx
<main className="max-w-4xl mx-auto px-6 mt-6 space-y-4 pb-20">
```

`pb-20` er alltaf til staðar til að gefa pláss fyrir fasta framvindusiku neðst.

---

## 15. JavaScript stíll

Alltaf nútímalegur stíll:

```javascript
// ✅ Rétt
const checkAnswer = async (i) => {
  const ans = shortAnswers[i].trim();
  if (!ans) return;
  // ...
};

// ❌ Rangt
function checkAnswer(i) {
  var ans = shortAnswers[i].trim();
  // ...
}
```

- `const` / `let` (aldrei `var`)
- Arrow functions
- `async/await` (ekki `.then()` keðjur)
- Destructuring þar sem við á
- `useMemo` fyrir útreiknaðar gildi (t.d. stokkun á svarmöguleikum)

---

## 16. OpenAI API kall

Samræmt mynstur á öllum síðum:

```javascript
async function callOpenAI(messages, maxTokens = 120, temperature = 0.2) {
  const r = await fetch('/.netlify/functions/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages,
      max_tokens: maxTokens,
      model: 'gpt-4o-mini',
      temperature,
    }),
  });
  const data = await r.json();
  if (!r.ok || data.error) throw new Error(data.error || `HTTP ${r.status}`);
  return data.content;
}
```

**Stigagjöf (0–5) – standard prompt mynstur:**

```javascript
`Svaraðu EINUNGIS á þessu formi:
STIG: [tala 0-5]
ENDURGJÖF: [ein setning, vinaleg og hvetjandi á íslensku]`

// Parse:
const stigMatch = result.match(/STIG:\s*(\d)/);
const endurgjofMatch = result.match(/ENDURGJÖF:\s*(.+)/);
const score = stigMatch ? parseInt(stigMatch[1]) : 0;
const msg = endurgjofMatch ? endurgjofMatch[1].trim() : result.trim();
```

**Sveigjanleiki í mati:**
- Kynbeygíng: **enginn** sveigjanleiki þegar æfingin fjallar sérstaklega um kyn
- Stafsetning: lítill sveigjanleiki (t.d. `eldhus` = `eldhús`)
- Frjálsar setningar: sveigjanlegur

---

## 17. Þýðingaflipinn – sérstök útfærsla

Þýðingaflipinn (fyrsti flipi hlustunaræfinga) er frábrugðinn öðrum flipum. Hann notar `gpt-4o` (ekki mini) og JSON endurgjöf:

```javascript
// Kerfisskilaboð til OpenAI
const sys = `Þú ert íslenskukennari sem metur þýðingar nemenda.

ÍSLENSKA ORÐIÐ: "${orð}"
SVAR NEMANDA: "${svar}"

SKILAÐU JSON (BARA JSON, EKKERT ANNAÐ):
{
  "correct": boolean,
  "detected_language": "nafn tungumálsins (t.d. enska, pólska, spænska)",
  "feedback_is": "Endurgjöf á íslensku",
  "feedback_native": "Endurgjöf á greinda tungumálinu",
  "correct_translation": "Góð þýðing ef rangt, annars null"
}`;
```

Þetta þýðir að nemandinn fær endurgjöf á sínu eigin móðurmáli — lykilþáttur þegar verið er að kenna íslensku sem annað mál.

---

## 18. Azure TTS (hljóðlestur)

Samræmt mynstur á öllum síðum þar sem hljóðlestur er notaður:

```javascript
async function playAudio(text, onEnd) {
  try {
    const r = await fetch('/.netlify/functions/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text_to_speak: text }),
    });
    const data = await r.json();
    if (!r.ok || data.error || !data.audio_base64) { onEnd?.(); return; }
    const audio = new Audio(`data:audio/mp3;base64,${data.audio_base64}`);
    audio.onended = () => onEnd?.();
    audio.onerror = () => onEnd?.();
    await audio.play().catch(() => onEnd?.());
    return audio;
  } catch (e) {
    console.error(e);
    onEnd?.();
  }
}
```

`ListenPill` hnappur sýnir `animate-pulse` á 🔊 meðan hljóð er að spilast.

---

## 19. Fadeinn hreyfing

Ein `fadeIn` skilgreining á öllum síðum:

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeIn 0.35s ease both; }
```

Notuð þegar: flipaefni opnast, endurgjöf birtist, textahlutir opnast.

---

## 20. Skráaheiti og möppur

```
/
├── index.html                        ← Aðalforsíða
├── admin/
│   └── index.html                    ← Stjórnborð (lykilorðsvarið)
├── isan1ib/
│   ├── index.html                    ← Námskeiðsvalmynd (Firebase vernduð)
│   ├── login.html                    ← Innskráningarsíða
│   └── kafli[nr]/[heiti].html
├── isat1ia/
│   ├── index.html
│   ├── login.html
│   ├── lestextar/[heiti].html
│   ├── hlustanir/hlustun[nr]_[heiti].html
│   └── spjall/spjall[nr]_[heiti].html
└── isat1ic/
    └── [sama uppbygging]
```

Nota alltaf lágstafi og undirstrik, **engar sérstæðar íslenskar stafir** í skráarheitum (`ae` ekki `æ`, `th` ekki `þ` o.s.frv.).

---

## 21. Almennar hönnunarreglur

- **Farsímamiðuð:** Allt sem er sticky/fast er hannað með þumalfingur í huga. Neðri framvindusika er aðgengilegri en hliðar-sidebar.
- **`font-light`** er sjálfgefið fyrir meginmál. `font-medium` eða `font-semibold` aðeins þar sem sérstök áhersla þarf.
- **Engar þungar skuggir** – `shadow-sm` er hámark nema í sticky-player (`shadow-lg`) og spjallglugga (`shadow-xl`).
- **`rounded-xl`** á spjöld og kortum. `rounded-lg` á minni íhlutum (input, takkar, svarmöguleikar).
- Allar litabreytingar með `transition-colors` eða `transition: all 0.2s`.
- **Hvatning:** Öll endurgjöf á alltaf að vera vinaleg og hvetjandi, byrja gjarnan með „Frábært!" eða „Gott!".
- **Allt viðmót á íslensku** – takkar, leiðbeiningar, villumeldingar, endurgjöf.

---

## 22. Firebase aðgangsstýring

Námskeiðssíður sem eru seldar með aðgangskóða eru verndaðar með Firebase Authentication. Þetta á **ekki** við um ÍSAT1ÍA og ÍSAT1ÍC að svo stöddu — þau eru opin meðan á tilraunakennslunni stendur (vor 2026). Firebase kemur þar í gagnið í ágúst 2026.

### Hvenær þarf Firebase?
- `index.html` skrár námskeiða sem eru seldar með aðgangskóða (t.d. ÍSAN1ÍB)
- `login.html` skrá fyrir hvert slíkt námskeið

### Firebase kóðabútur — efst í `<head>` á vernduðum index síðum

```html
<script type="module">
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
  import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

  const firebaseConfig = {
    apiKey: "AIzaSyDhmWC3YG-eJqTQgTj3otO7tLdo1Zjzh-4",
    authDomain: "malstodin-90f85.firebaseapp.com",
    projectId: "malstodin-90f85",
    storageBucket: "malstodin-90f85.firebasestorage.app",
    messagingSenderId: "190485777754",
    appId: "1:190485777754:web:070d4a35eaa9d65e8b3763"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  onAuthStateChanged(auth, async (user) => {
    if (!user) { window.location.href = '/[námskeið]/login.html'; return; }
    try {
      const idToken = await user.getIdToken();
      const res = await fetch('/.netlify/functions/auth-firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, course: '[námskeið_id]' })
      });
      if (!res.ok) { window.location.href = '/[námskeið]/login.html'; return; }
      const data = await res.json();
      window.__currentUser = { email: user.email, uid: user.uid, expiresAt: data.expiresAt };
      window.__firebaseAuth = auth;
      window.dispatchEvent(new Event('auth-ready'));
    } catch { window.location.href = '/[námskeið]/login.html'; }
  });
</script>
```

### Netlify functions sem Firebase kerfið notar

| Function | Hlutverk |
|---|---|
| `verify-code.js` | Staðfestir aðgangskóða úr bók |
| `activate-code.js` | Skráir 6 mánaða aðgang við fyrstu innlausn |
| `auth-firebase.js` | Staðfestir session token og aðgangsrétt |
| `admin-data.js` | Sækir gögn fyrir stjórnborð (lykilorðsvarið) |

### `netlify.toml` — SECRETS_SCAN_OMIT_PATHS

Firebase frontend lyklar eru **öruggir** að geyma í HTML (þetta er hönnun Firebase). En Netlify secrets scanner stoppar deploy ef hann finnur þá. Lausnin er að bæta vernduðum skrám við í `netlify.toml`:

```toml
[build]
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"

[build.environment]
  SECRETS_SCAN_OMIT_PATHS = "isan1ib/index.html,isan1ib/login.html"
```

Þegar nýtt námskeið er bætt við með Firebase vernd þarf að bæta `[námskeið]/index.html,[námskeið]/login.html` við `SECRETS_SCAN_OMIT_PATHS` með kommu.

### Netlify Environment Variables sem þarf

| Breyta | Lýsing |
|---|---|
| `FIREBASE_PROJECT_ID` | `malstodin-90f85` |
| `FIREBASE_SERVICE_ACCOUNT` | Allt JSON innihald service account skrárinnar |
| `ADMIN_PASSWORD` | Lykilorð fyrir stjórnborðið á `/admin/` |

---

## 23. Sérsniðnar síðutegundir (other)

Auk lestexta, hlustana og spjalls eru til nokkrar sérsniðnar síðutegundir sem fylgja sínu eigin mynstri. Þær eiga að nota sama bakgrunn, sama haus og sama `font-light` stíl en þurfa ekki að fylgja flipakerfi eða framvindusiku.

### Orðapróf
Spurningaleikur með margvalssvör eða stuttar spurningar. Notar `ProgressBar` efst og `FeedbackBadge` fyrir endurgjöf. Lokar á niðurstöðuskjá með heildarstigum.

### Flashcards
Snúningskort með íslensku orði á forsíðu og þýðingu á baksíðu. Nota `useMemo` til að stokka kortin. Hafa „Næsta kort" og „Fyrra kort" hnappa.

### Teiknileikur
Leikur þar sem notandi teiknar og AI giskar eða notandi giskar á hvað er teiknað. Notar canvas element. Sérstakt útlit — fylgir ekki hefðbundnum flipum.

### Hraðstefnumót / Spjallleikir
Skipulagðar samræðuæfingar með sérstakt flæði. Nota `max-w-2xl` og spjallviðmót (kafli 13).
