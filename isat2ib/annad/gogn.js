/* ÍSAT2ÍB — Áfangastöðvar: sameiginleg gagnaskrá
 *
 * Allar fjórar leikjavélar (flasskort, ordagata, teiknileikur, sjalfsprof)
 * lesa ?lota=1..5 úr slóðinni og sækja hingað.
 *
 * Reitir í ord[]:
 *   is          íslenska orðið
 *   en          ensk viðmiðun — AÐEINS til AI-mats, ekki birt nemanda
 *   kafli       kaflanúmer (1-15)
 *   persona     hver kaflinn fjallar um — birt sem merki í teiknileiknum
 *   teikn       true ef orðið er hægt að teikna án orða
 *   visbending  ein setning á einfaldri íslensku — Azure les hana í orðagátunni
 *
 * Rangir valkostir í orðagátunni eru dregnir sjálfkrafa úr öðrum orðum
 * sömu lotu — engir handskrifaðir afvegaleiðendur.
 */

window.AFANGASTODVAR = {

  /* ================= LOTA 1 — kaflar 1-3 ================= */
  1: {
    titill: 'Kynning og daglegt líf',
    kaflar: 'kaflar 1-3',
    ord: [
      /* --- Kafli 1: Blokkin --- */
      { is: 'fjölbýlishús', en: 'apartment building', kafli: 1, persona: 'Blokkin', teikn: true,
        visbending: 'Stórt hús þar sem margar fjölskyldur búa, hver í sinni íbúð.' },
      { is: 'íbúð', en: 'flat, apartment', kafli: 1, persona: 'Blokkin', teikn: true,
        visbending: 'Heimili einnar fjölskyldu inni í stóru húsi.' },
      { is: 'hæð', en: 'floor, storey', kafli: 1, persona: 'Blokkin', teikn: true,
        visbending: 'Húsið er fjórar svona hátt. Þú ferð upp á þá þriðju með lyftunni.' },
      { is: 'stigagangur', en: 'stairwell', kafli: 1, persona: 'Blokkin', teikn: true,
        visbending: 'Sameiginlegt rými með tröppum þar sem þú gengur upp á milli hæða.' },
      { is: 'anddyri', en: 'entrance hall', kafli: 1, persona: 'Blokkin', teikn: true,
        visbending: 'Fyrsta rýmið sem þú kemur inn í þegar þú opnar útidyrnar.' },
      { is: 'lyfta', en: 'lift, elevator', kafli: 1, persona: 'Blokkin', teikn: true,
        visbending: 'Hún fer upp og niður og þú þarft ekki að ganga.' },
      { is: 'íbúi', en: 'resident', kafli: 1, persona: 'Blokkin', teikn: false,
        visbending: 'Manneskja sem býr í húsinu.' },
      { is: 'nágranni', en: 'neighbour', kafli: 1, persona: 'Blokkin', teikn: false,
        visbending: 'Sá sem býr við hliðina á þér.' },
      { is: 'kjallari', en: 'basement', kafli: 1, persona: 'Blokkin', teikn: true,
        visbending: 'Neðsta hæðin, oft að hluta undir jörðinni.' },
      { is: 'geymsla', en: 'storage room', kafli: 1, persona: 'Blokkin', teikn: true,
        visbending: 'Lítið rými þar sem þú setur dót sem þú notar ekki daglega.' },
      { is: 'þvottahús', en: 'laundry room', kafli: 1, persona: 'Blokkin', teikn: true,
        visbending: 'Herbergi með vélum þar sem íbúarnir þvo fötin sín.' },
      { is: 'garður', en: 'garden, yard', kafli: 1, persona: 'Blokkin', teikn: true,
        visbending: 'Grænt svæði fyrir utan húsið með grasi og trjám.' },
      { is: 'húsfélag', en: "residents' association", kafli: 1, persona: 'Blokkin', teikn: false,
        visbending: 'Íbúarnir hittast og ákveða saman hvað á að gera við húsið.' },

      /* --- Kafli 2: Aminata --- */
      { is: 'einstæð móðir', en: 'single mother', kafli: 2, persona: 'Aminata', teikn: false,
        visbending: 'Kona sem býr ein með börnunum sínum.' },
      { is: 'sonur', en: 'son', kafli: 2, persona: 'Aminata', teikn: false,
        visbending: 'Strákur, barn foreldra sinna.' },
      { is: 'dóttir', en: 'daughter', kafli: 2, persona: 'Aminata', teikn: false,
        visbending: 'Stelpa, barn foreldra sinna.' },
      { is: 'móttaka', en: 'reception desk', kafli: 2, persona: 'Aminata', teikn: true,
        visbending: 'Þar sem gestir koma fyrst inn á hóteli og fá lykil að herberginu.' },
      { is: 'dagvakt', en: 'day shift', kafli: 2, persona: 'Aminata', teikn: false,
        visbending: 'Vinna frá morgni og fram á síðdegi.' },
      { is: 'næturvakt', en: 'night shift', kafli: 2, persona: 'Aminata', teikn: false,
        visbending: 'Vinna á meðan flestir aðrir sofa.' },
      { is: 'þrif', en: 'cleaning', kafli: 2, persona: 'Aminata', teikn: true,
        visbending: 'Að gera hreint — ryksuga, skúra og þurrka af.' },
      { is: 'hótel', en: 'hotel', kafli: 2, persona: 'Aminata', teikn: true,
        visbending: 'Hús þar sem ferðamenn gista og borga fyrir herbergi.' },
      { is: 'morgunmatur', en: 'breakfast', kafli: 2, persona: 'Aminata', teikn: true,
        visbending: 'Fyrsta máltíð dagsins.' },
      { is: 'að vakna', en: 'to wake up', kafli: 2, persona: 'Aminata', teikn: true,
        visbending: 'Að opna augun og hætta að sofa.' },
      { is: 'að vekja', en: 'to wake someone up', kafli: 2, persona: 'Aminata', teikn: true,
        visbending: 'Að láta einhvern annan hætta að sofa.' },
      { is: 'heimanám', en: 'homework', kafli: 2, persona: 'Aminata', teikn: true,
        visbending: 'Verkefni sem nemandi gerir heima eftir skóla.' },
      { is: 'lykill', en: 'key', kafli: 2, persona: 'Aminata', teikn: true,
        visbending: 'Lítill hlutur úr málmi sem opnar hurð.' },
      { is: 'þreytt', en: 'tired', kafli: 2, persona: 'Aminata', teikn: true,
        visbending: 'Þannig líður þér þegar þig vantar svefn.' },

      /* --- Kafli 3: Gunnar og Björn --- */
      { is: 'uppgefinn', en: 'exhausted', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
        visbending: 'Alveg búinn á því eftir langan og erfiðan dag.' },
      { is: 'að gefast upp', en: 'to give up', kafli: 3, persona: 'Gunnar og Björn', teikn: false,
        visbending: 'Að hætta að reyna af því að þetta er of erfitt.' },
      { is: 'trygging', en: 'insurance', kafli: 3, persona: 'Gunnar og Björn', teikn: false,
        visbending: 'Þú borgar á hverjum mánuði og færð pening ef eitthvað slæmt gerist.' },
      { is: 'þjálfari', en: 'coach, trainer', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
        visbending: 'Sá sem stjórnar æfingum hjá íþróttaliði.' },
      { is: 'sjúkraþjálfari', en: 'physiotherapist', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
        visbending: 'Sá sem hjálpar þér að jafna þig eftir meiðsli.' },
      { is: 'að jafna sig', en: 'to recover', kafli: 3, persona: 'Gunnar og Björn', teikn: false,
        visbending: 'Að verða góður aftur eftir veikindi eða meiðsli.' },
      { is: 'svekktur', en: 'disappointed, upset', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
        visbending: 'Þannig líður þér þegar liðið þitt tapar leiknum.' },
      { is: 'að tapa', en: 'to lose (a game)', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
        visbending: 'Að vinna ekki leikinn — hitt liðið skoraði fleiri mörk.' },
      { is: 'sturta', en: 'shower', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
        visbending: 'Þú stendur undir henni og vatnið kemur að ofan.' },
      { is: 'réttur', en: 'dish (food)', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
        visbending: 'Matur sem er eldaður og borinn fram, til dæmis fiskur með kartöflum.' },
      { is: 'að smakka', en: 'to taste, to try', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
        visbending: 'Að setja lítið af mat upp í sig til að finna bragðið.' },
      { is: 'matvandur', en: 'fussy about food', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
        visbending: 'Sá sem borðar bara fáar tegundir af mat og vill ekki prófa nýtt.' }
    ],

    ordasambond: [
      { is: 'að koma sér vel', en: 'to come in handy / be useful' },
      { is: 'að skiptast á', en: 'to take turns' },
      { is: 'framundan', en: 'coming up / ahead' },
      { is: 'að bjarga sér', en: "to manage on one's own" },
      { is: 'að banka upp á', en: "to knock on someone's door" },
      { is: 'að gera sitt besta', en: "to do one's best" },
      { is: 'alveg búinn á því', en: 'completely done with it / fed up' }
    ],

    sjalfsprof: {
      /* Liður 1 — orðaforði: nemandi skrifar orðið út frá lýsingu */
      ordaforði: [
        { visbending: 'Sameiginlegt rými með tröppum þar sem þú gengur upp á milli hæða.', svar: 'stigagangur' },
        { visbending: 'Herbergi með vélum þar sem íbúarnir þvo fötin sín.', svar: 'þvottahús' },
        { visbending: 'Þar sem gestir koma fyrst inn á hóteli og fá lykil.', svar: 'móttaka' },
        { visbending: 'Sá sem hjálpar þér að jafna þig eftir meiðsli.', svar: 'sjúkraþjálfari' },
        { visbending: 'Sá sem borðar bara fáar tegundir af mat.', svar: 'matvandur' }
      ],

      /* Liður 2 — hlustun: Azure les setninguna, nemandi velur rétt svar */
      hlustun: [
        { texti: 'Aminata vinnur í móttökunni á hóteli. Áður vann hún við þrif.',
          spurning: 'Hvað gerir Aminata núna?',
          valkostir: ['Hún vinnur við þrif.', 'Hún vinnur í móttöku.', 'Hún vinnur á veitingastað.'],
          rett: 1 },
        { texti: 'Björn er sjúkraþjálfari og spilar handbolta. Í gær tapaði liðið hans og hann var mjög svekktur.',
          spurning: 'Af hverju var Björn svekktur?',
          valkostir: ['Hann meiddist á æfingu.', 'Liðið hans tapaði.', 'Hann komst ekki á æfingu.'],
          rett: 1 },
        { texti: 'Í blokkinni er þvottahús í kjallaranum. Íbúarnir skiptast á að nota það.',
          spurning: 'Hvar er þvottahúsið?',
          valkostir: ['Á fyrstu hæð.', 'Úti í garði.', 'Í kjallaranum.'],
          rett: 2 }
      ],

      /* Liður 3 — lesskilningur */
      lesskilningur: {
        texti: 'Aminata býr í íbúð 1B í fjölbýlishúsinu við Dúfnahóla 10. Hún er einstæð móðir og á tvö börn. ' +
               'Á morgnana vaknar hún klukkan sex og vekur börnin. Hún smyr nesti og fer með þau í skólann áður en hún ' +
               'fer sjálf í vinnuna. Aminata vinnur á hóteli. Fyrst vann hún við þrif en núna er hún í móttökunni ' +
               'og er á dagvakt. Hún er stolt af því hvað hún hefur náð langt.',
        spurningar: [
          { spurning: 'Í hvaða íbúð býr Aminata?', valkostir: ['1B', '2C', '3A'], rett: 0 },
          { spurning: 'Hvað gerir hún áður en hún fer í vinnuna?', valkostir: ['Hún þrífur íbúðina.', 'Hún fer með börnin í skólann.', 'Hún fer í sund.'], rett: 1 },
          { spurning: 'Á hvaða vakt er hún núna?', valkostir: ['Næturvakt', 'Helgarvakt', 'Dagvakt'], rett: 2 }
        ]
      },

      /* Liður 4 — spurningamyndun, þrep 2-3: hvaðan / hvað / hvers / hvar / hvenær */
      spurningamyndun: [
        { verkefni: 'Þú vilt vita frá hvaða landi Aminata kemur. Hvað spyrðu hana?',
          daemi: 'Hvaðan kemur þú? / Hvaðan ert þú?' },
        { verkefni: 'Þú vilt vita hvar Björn vinnur. Hvað spyrðu hann?',
          daemi: 'Hvar vinnur þú?' },
        { verkefni: 'Þú vilt vita hvenær handboltaleikurinn var. Hvað spyrðu?',
          daemi: 'Hvenær var leikurinn?' }
      ],

      /* Liður 5 — orðasambönd: nemandi þýðir á móðurmál sitt */
      thyding: [
        { is: 'að bjarga sér', en: "to manage on one's own" },
        { is: 'að banka upp á', en: "to knock on someone's door" },
        { is: 'alveg búinn á því', en: 'completely done with it / fed up' }
      ],

      /* Liður 6 — opin spurning, AI metur 0-5 */
      opin: {
        spurning: 'Segðu frá húsinu þar sem þú býrð. Hvað er þar? Hverjir eru nágrannar þínir?',
        leidbeining: 'Skrifaðu 3-4 setningar. Notaðu orð úr kafla 1, til dæmis íbúð, hæð, stigagangur, nágranni eða garður.'
      }
    }
  },

  /* ================= LOTUR 2-5 — bíða frystingar ================= */
  2: null,
  3: null,
  4: null,
  5: null
};
