// Málfarsábending í samtölum (lestextar, myndlýsing).
// window.malfarsAbending(setning) → Promise<string>: "Mundu að …" eða "ENGIN".
//
// Vandinn sem þetta leysir: gpt-4o-mini „leiðrétti“ réttar setningar (t.d. „með risarækjum“ →
// „risarækjum“) og bjó til rangar reglur („spila á nýtt hljóðfæri“ → „á nýju hljóðfæri“).
// Lausn: nákvæmara líkan, strangari fyrirmæli, JSON-svar og athugun í kóða – ábending er
// aðeins sýnd ef „rangt“ stendur í setningu nemandans og „rétt“ er önnur mynd sem stendur þar ekki.
(function () {
  const KERFI = `Þú ert nákvæmur íslenskukennari. Nemandi á A1–A2 stigi skrifaði setningu í samtali.
Verkefni: finna EINA málfræði- eða stafsetningarvillu sem þú ert ALVEG viss um (kyn, tala, fall, beyging, stafsetning).

Reglur:
- Flest svör nemenda eru rétt. Ef setningin er rétt, eða gæti verið rétt, er engin villa.
- Íslenska leyfir oft fleiri en eina rétta mynd. Leiðréttu aldrei það sem er leyfilegt.
- Hugsaðu um hvaða fall forsetning eða sögn stýrir í ÞESSU samhengi áður en þú leiðréttir fall
  (t.d. „spila á gítar“ er þolfall og rétt; „með vinum“ er þágufall og rétt).
- Ekki leiðrétta stíl, orðaval, orðaröð, greinarmerki, há- eða lágstafi, erlend orð eða sérnöfn.
- „rangt“ verður að vera orðrétt úr setningu nemandans. „rett“ verður að vera önnur mynd.

Svaraðu EINUNGIS með JSON, ekkert annað:
{"villa": false}
eða
{"villa": true, "rangt": "orð eða orðasamband úr setningunni", "rett": "rétta myndin", "abending": "Ein stutt, hlý setning á einfaldri íslensku sem byrjar á 'Mundu að' og endar á 😊"}`;

  const ord = (s) => ' ' + String(s || '').toLowerCase()
    .replace(/[.,!?;:"'„“”()]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';

  window.malfarsAbending = async function (setning) {
    try {
      const r = await fetch('/.netlify/functions/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'system', content: KERFI }, { role: 'user', content: setning }],
          max_tokens: 150, model: 'gpt-4o', temperature: 0,
        }),
      });
      const data = await r.json();
      if (!r.ok || data.error) return 'ENGIN';
      const hreint = String(data.content || '').replace(/```json\s*/g, '').replace(/```/g, '').trim();
      const svar = JSON.parse(hreint.slice(hreint.indexOf('{'), hreint.lastIndexOf('}') + 1));
      if (!svar || svar.villa !== true) return 'ENGIN';
      const nem = ord(setning), rangt = ord(svar.rangt), rett = ord(svar.rett);
      const gilt = rangt.trim() && rett.trim() && rangt !== rett &&
        nem.includes(rangt) &&      // villan stendur í raun í setningunni
        !nem.includes(rett) &&      // „rétta“ myndin er ekki þegar þar (leiðrétting í sjálfa sig)
        /^Mundu að/i.test(String(svar.abending || '').trim());
      return gilt ? String(svar.abending).trim() : 'ENGIN';
    } catch (e) {
      return 'ENGIN'; // Engin ábending frekar en röng
    }
  };
})();
