# Bekkir og bókaraðgangur – verkáætlun

Þetta skjal er minni verkefnisins. Hver áfangi er sjálfstæður, er vistaður (commit + push)
þegar honum lýkur og virkar með núverandi Firestore-reglum. Ef samtal slitnar heldur
næsta lota áfram frá fyrsta óloknum áfanga hér að neðan.

Grein: `claude/busy-cori-c4s6nx`

---

## Markmið

- **Bókaraðgangur** (límmiði í bók → 6 mánaða / dagsettur aðgangur) helst óbreyttur.
- **Bekkir:** kennari býr til bekk með einum bekkjarkóða; nemendur ganga í hann og birtast
  á stjórnborði kennarans.
- Bókaraðgangur og bekkjaraðild eru **óháð** hvort öðru.
- Hver kennari sér **aðeins sína nemendur**.
- Kerfið á **ekki að vera háð einum manni**: allir kennarar geta búið til bókarkóða,
  kerfisstjórar (fleiri en einn) geta bætt við kennurum.

## Ákvarðanir sem hafa verið teknar

| Atriði | Ákvörðun |
|---|---|
| Gildistími | Óbreyttur í bili (fengið úr kóðanum). Framlenging með greiðslugátt síðar. |
| Innskráningarsíða nemenda | **Engin útlitsbreyting.** Ekkert „Ganga í bekk“ þar. |
| Skráning í bekk | Aðeins með hlekk `malstodin.org/bekkur?kodi=XXXXXX` (Canvas / QR í tíma). |
| Eldri hópar (`h1`, `h2`, `ÍSAT1ÍA-1`) | Hunsaðir. Gögnum mögulega eytt síðar (Viðar staðfestir). |
| Sýnileiki | Hver kennari sér aðeins nemendur í eigin bekkjum. |
| Bókarkóðar | Allir kennarar geta búið til og prentað. Kóðalisti sameiginlegur; netfang innleysanda sést aðeins ef nemandinn er í bekk kennarans eða kennarinn bjó kóðann til. |
| Kennarar | Ekki harðkóðaðir. Geymdir í Firestore (`teachers`). Kerfisstjórar bæta við/fjarlægja. |
| Kerfisstjórar | Viðar + Sigurþór Einarsson. |
| Öryggi | Vafri snertir aðeins eigin gögn notanda. Allt annað fer í gegnum Netlify-föll (admin SDK). |

## Gagnalíkan (Firestore)

Óbreytt:
- `access_codes/{kóði}` – `{ course, class, semester, expires_at, activated, … }` + nýtt `created_by`
- `user_access/{uid}` – `{ email, isat1ia: { activated_at, expires_at, code_used }, isat1ic: {…} }`
- `progress/{uid}/{course}/{æfing}`

Nýtt:
- `teachers/{uid}` – `{ email, name, role: 'teacher' | 'admin', added_by, added_at }`
- `classes/{classId}` – `{ name, course, semester, join_code, teacher_uid, teacher_email, created_at, archived }`
- `class_members/{classId}_{uid}` – `{ class_id, uid, email, course, teacher_uid, joined_at }`

Bekkjarkóði: 6 stafir, hástafir, án bandstriks (t.d. `K7QM4P`). Bókarkóðar hafa alltaf bandstrik.

## Áfangar

Staða: ⬜ ekki byrjað · 🟨 í vinnslu · ✅ lokið

### ✅ Áfangi 1 – Kennaralisti í Firestore
- `netlify/functions/_shared/` – sameiginleg Firebase-frumstilling og `requireTeacher()`
- `netlify/functions/teacher-me.js` – „er ég kennari/kerfisstjóri?“
- `netlify/functions/teachers.js` – kerfisstjóri: lista / bæta við (eftir netfangi) / fjarlægja
- Uppsetning fyrstu kerfisstjóra: fallið les umhverfisbreytu `BOOTSTRAP_ADMIN_EMAILS` ef
  `teachers` er tómt (svo enginn þurfi að skrifa beint í gagnagrunninn)
- `stjornbord.html` – nota `teacher-me` í stað `ADMIN_UIDS`; nýr flipi „Kennarar“ (aðeins kerfisstjórar)
- Prófað með gervi-Firebase (bootstrap, óstaðfest netfang hafnað, bæta við/fjarlægja, vernd á eigin aðgangi og bootstrap-stjórum).

**Gangsetning áfanga 1** (gera ÁÐUR en greinin er sameinuð `main`):
1. Netlify → Site configuration → Environment variables → Add a variable:
   `BOOTSTRAP_ADMIN_EMAILS` = `vidarhrafn@gmail.com,sibbbi@gmail.com`
2. Sameina / birta. Viðar skráir sig inn á `stjornbord.html` með Google (vidarhrafn@gmail.com).
3. Flipinn 👥 Kennarar → bæta við `borghildurrr@gmail.com` (Jóhanna, Kennari) og
   `vhs@tskoli.is` (Viðar, Kerfisstjóri) ef sá reikningur á að virka líka.
4. Jóhanna prófar að skrá sig inn.

### ✅ Áfangi 2 – Innlausn bókarkóða á þjóni
- `netlify/functions/redeem-code.js` – sama hegðun og nú (einnota, gildistími úr kóða)
- `isat1ia/login.html`, `isat1ic/login.html` – kalla á fallið; **útlit óbreytt**
- Nýtt: innlausn í færslu (transaction) svo tveir geti ekki notað sama kóða samtímis;
  `activated_at` og `activated_by` á kóðanum fyllast nú út (voru alltaf `null`).
- `class`/`semester` er enn afritað í `user_access` þar til áfangi 4 tekur við.
- Prófað með gervi-Firebase: tómur, óþekktur, rangur áfangi, útrunninn, há-/lágstafir,
  endurnotkun, og að aðgangur að hinum áfanganum haldist.

**Prófun eftir birtingu:** nýr nemandi skráir sig inn á `/isat1ia/login.html`, virkjar
ónotaðan kóða og lendir á námskeiðssíðunni. Reyna sama kóða aftur með öðrum reikningi →
„Þessi kóði hefur þegar verið notaður.“

### ✅ Áfangi 3 – Bekkir og skráning
- `netlify/functions/teacher-classes.js` – list / create / archive / members / removeMember (aðeins eigin bekkir)
- `netlify/functions/join-class.js` – peek / join; óháð bókaraðgangi
- `bekkur/index.html` – síða fyrir hlekkinn úr Canvas (`/bekkur?kodi=XXXXXX`), sama útlit og login;
  innskráning → staðfesta bekk → ganga í hann → „Fara á námskeiðið“ eða „Virkja kóða úr bók“
- `stjornbord.html` – flipi 🏫 Bekkir: búa til bekk, afrita hlekk, sýna QR á skjávarpa,
  nemendalisti með stöðu bókaraðgangs, fjarlægja nemanda, setja í geymslu
- Prófað með gervi-Firebase (eigin bekkir eingöngu, há-/lágstafir og bandstrik í kóða,
  endurtekin skráning, bekkur í geymslu, staða bókaraðgangs: virkur/útrunninn/enginn).
- Ekki prófað í vafra – gera eftir birtingu.

**Prófun eftir birtingu:** kennari býr til bekk → opnar hlekkinn í huliðsglugga →
skráir sig inn sem nemandi → gengur í bekkinn → nemandinn birtist undir 👥 Nemendur.

### ⬜ Áfangi 4 – Stjórnborð: framvinda eftir bekkjum
- `netlify/functions/teacher-data.js` – aðeins eigin nemendur + framvinda
- `stjornbord.html` – framvindutafla eftir bekk (í stað `user_access.class`), ↻ uppfæra + sjálfvirk 30 sek.
- `redeem-code.js` – hætta að afrita `class`/`semester` í `user_access`

### ⬜ Áfangi 5 – Bókarkóðar í gegnum fall
- `netlify/functions/teacher-codes.js` – búa til (með `created_by`) / lista (með persónuverndarsíu)
- `stjornbord.html` – kóðaflipi og kortaprentun nota fallið

### ⬜ Áfangi 6 – Admin-gátt
- `admin/index.html`, `admin-data.js` – bæta við ÍSAT1ÍA, laga talningu notaðra kóða, sýna bekki

### ⬜ Áfangi 7 – Nýjar Firestore-reglur
- `firestore.rules` í repó + leiðbeiningar skref fyrir skref (Rules Playground, Publish, afturköllun)
- Prófunarlisti fyrir og eftir

## Opnar spurningar

- [x] Netföng við UID-in – sjá töflu hér að neðan
- [x] Sigurþór Einarsson = sibbbi@gmail.com (kerfisstjóri)
- [ ] Eyða gögnum eldri hópa? (síðar)

Fyrrum `ADMIN_UIDS` (fjarlægt úr `stjornbord.html` í áfanga 1):

| UID | Netfang | Hlutverk í nýju kerfi |
|---|---|---|
| `T08EOXfVZxQO13BJyCXDElR6apD2` | vhs@tskoli.is (Viðar) | Kerfisstjóri – bætt við í stjórnborði |
| `MM8vUelStVSl8eNlBSSVrgq0GW52` | vidarhrafn@gmail.com (Viðar, aðal) | Kerfisstjóri – `BOOTSTRAP_ADMIN_EMAILS` |
| `dfWBTm0O5daqXESYH6WvN5zvz7x2` | sibbbi@gmail.com (Sigurþór) | Kerfisstjóri – `BOOTSTRAP_ADMIN_EMAILS` |
| `00hPDLPXQnVFwGMBTH4drNUdj822` | borghildurrr@gmail.com (Jóhanna) | Kennari – bætt við í stjórnborði |
| `AQ5xRpv41caDHy8p6KEQ`, `8YUmu5gsTxTG8XnFkWFY` | – (ekki Auth-notendur) | Fellt niður |

⚠️ Meðan gömlu Firestore-reglurnar gilda (fram að áfanga 7) getur tæknikunnugur innskráður
notandi skrifað sig sjálfur í `teachers`. Það lagast með nýju reglunum.

## Atriði sem fundust í könnun (til minnis)

- Núverandi reglan `match /{document=**} { allow read, write: if request.auth != null; }`
  leyfir öllum innskráðum að lesa/skrifa allt, líka `access_codes` (hún ógildir takmörkunina þar).
- `admin/index.html` vantar ÍSAT1ÍA; „Kóðar notaðir“ telur `use_count` sem ÍA/ÍC skrifa aldrei.
- `activate-code.js` (ÍSAN1ÍB) gefur 6 mánuði frá virkjun; ÍA/ÍC nota fasta dagsetningu úr kóða.
