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
      /* teikn: false — „hæð" er tvírætt (húshæð vs. mæling) og of óskýrt eitt og sér á skjá */
      { is: 'hæð', en: 'floor, storey', kafli: 1, persona: 'Blokkin', teikn: false,
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
      { is: 'þreytt/þreyttur', en: 'tired', kafli: 2, persona: 'Aminata', teikn: true,
        visbending: 'Þannig líður þér þegar þig vantar svefn.' },

      /* --- Kafli 3: Gunnar og Björn --- */
      { is: 'uppgefin/uppgefinn', en: 'exhausted', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
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
      { is: 'svekkt/svekktur', en: 'disappointed, upset', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
        visbending: 'Þannig líður þér þegar liðið þitt tapar leiknum.' },
      { is: 'að tapa', en: 'to lose (a game)', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
        visbending: 'Að vinna ekki leikinn — hitt liðið skoraði fleiri mörk.' },
      { is: 'sturta', en: 'shower', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
        visbending: 'Þú stendur undir henni og vatnið kemur að ofan.' },
      { is: 'matarréttur', en: 'dish (food)', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
        visbending: 'Matur sem er eldaður og borinn fram, til dæmis fiskur með kartöflum.' },
      { is: 'að smakka', en: 'to taste, to try', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
        visbending: 'Að setja lítið af mat upp í sig til að finna bragðið.' },
      { is: 'matvönd/matvandur', en: 'fussy about food', kafli: 3, persona: 'Gunnar og Björn', teikn: true,
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
        { visbending: 'Lítill hlutur úr málmi sem opnar hurð.', svar: 'lykill' }
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
      spurningamyndunAhersla:
        'Þrep 2-3. Áherslan er á (a) rétt spurnarfornafn (hvaðan, hvað, hvers, hvar, hvenær) og ' +
        '(b) rétta orðaröð — sögn á undan frumlagi: „Hvað heitir þú?" en ekki „Hvað þú heitir?". ' +
        '„Hvaðan kemur þú?" og „hvaðan ert þú?" eru bæði rétt.',
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

  /* ================= LOTA 2 — kaflar 4-6 ================= */
  2: {
    titill: 'Frístundir, samfélag og framtíð',
    kaflar: 'kaflar 4-6',
    ord: [
      /* --- Kafli 4: Tóti --- */
      { is: 'að vera í stuði', en: 'to be in the mood', kafli: 4, persona: 'Tóti', teikn: false,
        visbending: 'Að vera í góðu skapi og til í að gera eitthvað skemmtilegt.' },
      { is: 'að fresta', en: 'to postpone', kafli: 4, persona: 'Tóti', teikn: false,
        visbending: 'Að ákveða að gera eitthvað seinna en þú ætlaðir.' },
      { is: 'búningsklefi', en: 'changing room', kafli: 4, persona: 'Tóti', teikn: true,
        visbending: 'Herbergi í sundlauginni þar sem þú skiptir um föt.' },
      { is: 'skápur', en: 'locker, cupboard', kafli: 4, persona: 'Tóti', teikn: true,
        visbending: 'Þar setur þú fötin þín og læsir á meðan þú ert í lauginni.' },
      { is: 'sundföt', en: 'swimwear', kafli: 4, persona: 'Tóti', teikn: true,
        visbending: 'Fötin sem þú ferð í áður en þú ferð ofan í laugina.' },
      { is: 'handklæði', en: 'towel', kafli: 4, persona: 'Tóti', teikn: true,
        visbending: 'Þú notar það til að þurrka þig eftir sturtu.' },
      { is: 'heitur pottur', en: 'hot tub, jacuzzi', kafli: 4, persona: 'Tóti', teikn: true,
        visbending: 'Í sundlauginni situr fólk í honum í heitu vatni og spjallar.' },
      { is: 'sirkússýning', en: 'circus show', kafli: 4, persona: 'Tóti', teikn: true,
        visbending: 'Þar sem fólk gerir listir í loftinu og áhorfendur klappa.' },
      { is: 'plötusnúður', en: 'DJ', kafli: 4, persona: 'Tóti', teikn: true,
        visbending: 'Sá sem velur og spilar tónlist á skemmtun.' },
      { is: 'að sjá til', en: 'to wait and see', kafli: 4, persona: 'Tóti', teikn: false,
        visbending: 'Að ákveða ekki strax heldur bíða og athuga hvernig fer.' },

      /* --- Kafli 5: Tariq --- */
      { is: 'strætó', en: 'bus', kafli: 5, persona: 'Tariq', teikn: true,
        visbending: 'Stór gulur bíll sem margir ferðast með í borginni.' },
      { is: 'stoppistöð', en: 'bus stop', kafli: 5, persona: 'Tariq', teikn: true,
        visbending: 'Þar bíður þú eftir strætó.' },
      { is: 'bílstjóri', en: 'driver', kafli: 5, persona: 'Tariq', teikn: true,
        visbending: 'Sá sem keyrir strætó eða annan bíl.' },
      { is: 'að skipta um vagn', en: 'to change buses', kafli: 5, persona: 'Tariq', teikn: false,
        visbending: 'Að fara úr einum strætó og upp í annan á leiðinni.' },
      { is: 'miðbær', en: 'town centre', kafli: 5, persona: 'Tariq', teikn: true,
        visbending: 'Hjarta borgarinnar þar sem margar búðir og kaffihús eru.' },
      { is: 'hávaði', en: 'noise', kafli: 5, persona: 'Tariq', teikn: true,
        visbending: 'Of mikið og of hátt hljóð sem truflar þig.' },
      { is: 'tónlist', en: 'music', kafli: 5, persona: 'Tariq', teikn: true,
        visbending: 'Þetta hlustar þú á — til dæmis með gítar eða píanó.' },
      { is: 'að trufla', en: 'to disturb', kafli: 5, persona: 'Tariq', teikn: false,
        visbending: 'Að ónáða einhvern sem er að vinna eða sofa.' },
      { is: 'að hafa hátt', en: 'to be loud', kafli: 5, persona: 'Tariq', teikn: true,
        visbending: 'Að tala eða spila tónlist svo hátt að nágrannarnir heyra.' },
      { is: 'að lækka', en: 'to turn down', kafli: 5, persona: 'Tariq', teikn: true,
        visbending: 'Að minnka hljóðið í tónlistinni eða sjónvarpinu.' },
      { is: 'að sofna', en: 'to fall asleep', kafli: 5, persona: 'Tariq', teikn: true,
        visbending: 'Að byrja að sofa.' },
      { is: 'að rata', en: "to find one's way", kafli: 5, persona: 'Tariq', teikn: false,
        visbending: 'Að finna réttu leiðina án þess að villast.' },

      /* --- Kafli 6: Dagný --- */
      { is: 'leiga', en: 'rent', kafli: 6, persona: 'Dagný', teikn: false,
        visbending: 'Peningarnir sem þú borgar mánaðarlega fyrir íbúð sem þú býrð í en átt ekki.' },
      { is: 'leigusali', en: 'landlord', kafli: 6, persona: 'Dagný', teikn: true,
        visbending: 'Sá sem á íbúðina og þú borgar honum á hverjum mánuði.' },
      { is: 'flutningar', en: 'moving house', kafli: 6, persona: 'Dagný', teikn: true,
        visbending: 'Þegar þú ferð með allt dótið þitt í nýja íbúð.' },
      { is: 'flutningakassi', en: 'moving box', kafli: 6, persona: 'Dagný', teikn: true,
        visbending: 'Þú setur bækur og dót í hann þegar þú ert að pakka fyrir flutninga.' },
      { is: 'að pakka', en: 'to pack', kafli: 6, persona: 'Dagný', teikn: true,
        visbending: 'Að setja allt dótið sitt ofan í kassa fyrir flutninga.' },
      { is: 'flutningabíll', en: 'moving van', kafli: 6, persona: 'Dagný', teikn: true,
        visbending: 'Stór bíll sem flytur húsgögn og kassa í nýja íbúð.' },
      { is: 'nám', en: 'studies', kafli: 6, persona: 'Dagný', teikn: false,
        visbending: 'Það sem þú gerir í skóla — lærir, skilar verkefnum og tekur próf.' },
      { is: 'próf', en: 'exam', kafli: 6, persona: 'Dagný', teikn: true,
        visbending: 'Þú skrifar svör í kyrrþey og færð einkunn í lokin.' },
      { is: 'námsráðgjafi', en: 'student counsellor', kafli: 6, persona: 'Dagný', teikn: false,
        visbending: 'Sá sem hjálpar nemendum að velja áfanga og hugsa um framtíðina.' },
      { is: 'sjúkraliði', en: 'practical nurse', kafli: 6, persona: 'Dagný', teikn: true,
        visbending: 'Sá sem hjálpar hjúkrunarfræðingum að sinna sjúklingum á spítala.' },
      { is: 'framtíð', en: 'future', kafli: 6, persona: 'Dagný', teikn: false,
        visbending: 'Tíminn sem er ekki kominn enn — á morgun, næsta ár, eftir tíu ár.' },
      { is: 'draumur', en: 'dream', kafli: 6, persona: 'Dagný', teikn: true,
        visbending: 'Eitthvað sem þig langar mjög mikið að gera eða verða seinna.' },
      { is: 'álag', en: 'pressure, strain', kafli: 6, persona: 'Dagný', teikn: false,
        visbending: 'Þegar of mikið er að gera og þér líður illa út af því.' }
    ],

    ordasambond: [
      { is: 'að koma sér fyrir', en: 'to settle in' },
      { is: 'að láta (einhvern) vita', en: 'to let someone know' },
      { is: 'að hressa sig við', en: 'to recharge / freshen up' },
      { is: 'í boði', en: 'available / on offer' },
      { is: 'að slíta sambandi', en: 'to break up (with someone)' },
      { is: 'að vera í veikindafríi', en: 'to be on sick leave' },
      { is: 'að gleyma sér alveg', en: 'to lose oneself completely' },
      { is: 'að taka tillit til', en: 'to be considerate of' },
      { is: 'að vera með eitthvað á hreinu', en: 'to be clear about something' },
      { is: 'sem betur fer', en: 'fortunately / luckily' },
      { is: 'að finna fyrir álagi', en: 'to feel pressure / stress' },
      { is: 'að taka eitt skref í einu', en: 'to take one step at a time' }
    ],

    sjalfsprof: {
      ordaforði: [
        { visbending: 'Herbergi í sundlauginni þar sem þú skiptir um föt.', svar: 'búningsklefi' },
        { visbending: 'Þar bíður þú eftir strætó.', svar: 'stoppistöð' },
        { visbending: 'Að finna réttu leiðina án þess að villast.', svar: 'að rata' },
        { visbending: 'Sá sem á íbúðina og þú borgar honum á hverjum mánuði.', svar: 'leigusali' },
        { visbending: 'Sá sem hjálpar nemendum að velja áfanga og hugsa um framtíðina.', svar: 'námsráðgjafi' }
      ],

      hlustun: [
        { texti: 'Tóti ætlaði að fara í sund á laugardaginn en hann var ekki í stuði. Hann frestaði því til sunnudags.',
          spurning: 'Hvenær fór Tóti í sund?',
          valkostir: ['Á laugardaginn.', 'Á sunnudaginn.', 'Hann fór alls ekki.'],
          rett: 1 },
        { texti: 'Tariq tekur strætó í vinnuna á hverjum morgni. Hann þarf að skipta um vagn í miðbænum.',
          spurning: 'Hvar skiptir Tariq um vagn?',
          valkostir: ['Við sundlaugina.', 'Í miðbænum.', 'Fyrir utan heimilið sitt.'],
          rett: 1 },
        { texti: 'Dagný talaði við námsráðgjafann. Hana langar að verða sjúkraliði en hún fann fyrir miklu álagi fyrir prófin.',
          spurning: 'Hvað langar Dagnýju að verða?',
          valkostir: ['Námsráðgjafi.', 'Sjúkraliði.', 'Hjúkrunarfræðingur.'],
          rett: 1 }
      ],

      lesskilningur: {
        texti: 'Tariq Benali býr í íbúð 4D. Hann er frá Casablanca í Marokkó og er lærður bakari. ' +
               'Á hverjum morgni tekur hann strætó í vinnuna og þarf að skipta um vagn í miðbænum. ' +
               'Fyrst rataði hann ekki og fór stundum upp í rangan vagn. Á kvöldin hlustar Tariq á tónlist. ' +
               'Eitt kvöldið hafði hann of hátt og nágranninn bankaði upp á og bað hann að lækka. ' +
               'Tariq baðst afsökunar og lofaði að taka tillit til annarra í húsinu.',
        spurningar: [
          { spurning: 'Hvaðan er Tariq?', valkostir: ['Frá Marokkó', 'Frá Póllandi', 'Frá Senegal'], rett: 0 },
          { spurning: 'Hvað þarf hann að gera á leiðinni í vinnuna?', valkostir: ['Hjóla síðasta spölinn.', 'Skipta um vagn í miðbænum.', 'Ganga yfir Hlemm.'], rett: 1 },
          { spurning: 'Af hverju bankaði nágranninn upp á?', valkostir: ['Tónlistin var of há.', 'Tariq var að flytja.', 'Hann vantaði lykil.'], rett: 0 }
        ]
      },

      /* Þrep 4-6: þátíð, hvert/hvar, ópersónulegar sagnir */
      spurningamyndunAhersla:
        'Þrep 4-6. Áherslan er á (a) rétta sagnbeygingu í þátíð („Hvað gerðir þú…?", „Hvenær fórstu…?"), ' +
        '(b) aðgreiningu hvert/hvar — hvert táknar hreyfingu, hvar táknar staðsetningu, og ' +
        '(c) ópersónulegar sagnir sem taka aukafall: langa tekur þolfall („Hvað langar þig að verða?") ' +
        'og líka tekur þágufall („Hvernig líkar þér…?"). Nefndu sérstaklega ef nemandinn notar ' +
        'nefnifall þar sem aukafall á að vera.',
      spurningamyndun: [
        { verkefni: 'Þú vilt vita hvað Tóti gerði um helgina. Hvað spyrðu hann?',
          daemi: 'Hvað gerðir þú um helgina?' },
        { verkefni: 'Þú vilt vita hvert Tariq fer eftir vinnu. Hvað spyrðu hann?',
          daemi: 'Hvert ferð þú eftir vinnu?' },
        { verkefni: 'Þú vilt vita hvað Dagnýju langar að verða í framtíðinni. Hvað spyrðu hana?',
          daemi: 'Hvað langar þig til að verða?' }
      ],

      thyding: [
        { is: 'að koma sér fyrir', en: 'to settle in' },
        { is: 'að taka tillit til', en: 'to be considerate of' },
        { is: 'að taka eitt skref í einu', en: 'to take one step at a time' }
      ],

      opin: {
        spurning: 'Segðu frá því hvað þig langar að gera í framtíðinni. Hvaða nám eða vinnu hefur þú áhuga á?',
        leidbeining: 'Skrifaðu 3-4 setningar. Notaðu orð úr kafla 6, til dæmis nám, framtíð, draumur eða álag.'
      }
    }
  },

  /* ================= LOTA 3 — kaflar 7-9 ================= */
  3: {
    titill: 'Vinna, heilsa og heimilislíf',
    kaflar: 'kaflar 7-9',
    ord: [
      /* --- Kafli 7: Páll --- */
      { is: 'gjaldþrot', en: 'bankruptcy', kafli: 7, persona: 'Páll', teikn: false,
        visbending: 'Þegar fyrirtæki á enga peninga lengur og verður að hætta rekstri.' },
      { is: 'að missa vinnuna', en: "to lose one's job", kafli: 7, persona: 'Páll', teikn: false,
        visbending: 'Þegar þú hættir í starfi þínu án þess að vilja það sjálf/ur.' },
      { is: 'atvinnulaus', en: 'unemployed', kafli: 7, persona: 'Páll', teikn: false,
        visbending: 'Sá sem hefur enga vinnu og er að leita að starfi.' },
      { is: 'starfsauglýsing', en: 'job advertisement', kafli: 7, persona: 'Páll', teikn: true,
        visbending: 'Texti á netinu eða í blaði þar sem fyrirtæki leitar að fólki í vinnu.' },
      { is: 'laus staða', en: 'vacancy', kafli: 7, persona: 'Páll', teikn: false,
        visbending: 'Starf sem enginn er í og hægt er að sækja um.' },
      { is: 'að sækja um', en: 'to apply', kafli: 7, persona: 'Páll', teikn: false,
        visbending: 'Að senda fyrirtæki beiðni um að fá starfið.' },
      { is: 'umsókn', en: 'application', kafli: 7, persona: 'Páll', teikn: true,
        visbending: 'Skjalið sem þú sendir þegar þig langar í starfið.' },
      { is: 'ferilskrá', en: 'CV, résumé', kafli: 7, persona: 'Páll', teikn: true,
        visbending: 'Blað sem sýnir hvar þú hefur unnið og hvað þú hefur lært.' },
      { is: 'meðmæli', en: 'reference', kafli: 7, persona: 'Páll', teikn: false,
        visbending: 'Þegar einhver sem þekkir þig segir vinnuveitanda að þú sért góður starfsmaður.' },
      { is: 'reynsla', en: 'experience', kafli: 7, persona: 'Páll', teikn: false,
        visbending: 'Það sem þú kannt af því að þú hefur gert það áður.' },
      { is: 'viðtal', en: 'interview', kafli: 7, persona: 'Páll', teikn: true,
        visbending: 'Samtal þar sem vinnuveitandi spyr þig spurninga áður en hann ræður þig.' },
      { is: 'áreiðanleg/áreiðanlegur', en: 'reliable', kafli: 7, persona: 'Páll', teikn: false,
        visbending: 'Sá sem stendur alltaf við það sem hann lofar.' },
      { is: 'stundvís', en: 'punctual', kafli: 7, persona: 'Páll', teikn: true,
        visbending: 'Sá sem kemur alltaf á réttum tíma.' },

      /* --- Kafli 8: Rakel --- */
      { is: 'gigt', en: 'arthritis', kafli: 8, persona: 'Rakel', teikn: false,
        visbending: 'Langvinnur sjúkdómur í liðunum sem gerir hreyfingar sárar, oft í hnjám og fingrum.' },
      { is: 'hné', en: 'knee', kafli: 8, persona: 'Rakel', teikn: true,
        visbending: 'Liðurinn á miðjum fætinum sem beygist þegar þú sest niður.' },
      { is: 'verkur', en: 'pain, ache', kafli: 8, persona: 'Rakel', teikn: true,
        visbending: 'Það sem þú finnur þegar eitthvað er sárt í líkamanum.' },
      { is: 'stíf/stífur', en: 'stiff', kafli: 8, persona: 'Rakel', teikn: true,
        visbending: 'Þannig er líkaminn á morgnana þegar erfitt er að hreyfa sig.' },
      { is: 'verkjatafla', en: 'painkiller', kafli: 8, persona: 'Rakel', teikn: true,
        visbending: 'Lítil tafla sem þú tekur þegar eitthvað er sárt.' },
      { is: 'heilsugæsla', en: 'health centre', kafli: 8, persona: 'Rakel', teikn: true,
        visbending: 'Staður í hverfinu þar sem þú hittir lækni eða hjúkrunarfræðing.' },
      { is: 'að panta tíma', en: 'to book an appointment', kafli: 8, persona: 'Rakel', teikn: false,
        visbending: 'Að hringja og fá ákveðinn tíma hjá lækni.' },
      { is: 'veðurspá', en: 'weather forecast', kafli: 8, persona: 'Rakel', teikn: true,
        visbending: 'Í sjónvarpinu er sagt hvernig veðrið verður á morgun.' },
      { is: 'kvef', en: 'a cold', kafli: 8, persona: 'Rakel', teikn: true,
        visbending: 'Þú ert með nefrennsli, hnerrar og ert slöpp/slappur í nokkra daga.' },
      { is: 'hálsbólga', en: 'sore throat', kafli: 8, persona: 'Rakel', teikn: true,
        visbending: 'Það er sárt að kyngja.' },
      { is: 'eyrnabólga', en: 'ear infection', kafli: 8, persona: 'Rakel', teikn: true,
        visbending: 'Sýking sem gerir mjög sárt inni við hlustina — algeng hjá litlum börnum.' },
      { is: 'lyfseðill', en: 'prescription', kafli: 8, persona: 'Rakel', teikn: true,
        visbending: 'Blað frá lækni sem leyfir þér að fá ákveðið lyf.' },
      { is: 'apótek', en: 'pharmacy', kafli: 8, persona: 'Rakel', teikn: true,
        visbending: 'Búð þar sem þú sækir lyfin þín.' },

      /* --- Kafli 9: Hulda og Davíð --- */
      { is: 'að fara á fætur', en: 'to get up', kafli: 9, persona: 'Hulda og Davíð', teikn: true,
        visbending: 'Að standa upp úr rúminu á morgnana.' },
      { is: 'að snúsa', en: 'to hit snooze', kafli: 9, persona: 'Hulda og Davíð', teikn: true,
        visbending: 'Að ýta á takkann á vekjaraklukkunni og sofa fimm mínútur í viðbót.' },
      { is: 'að fara í sturtu', en: 'to take a shower', kafli: 9, persona: 'Hulda og Davíð', teikn: true,
        visbending: 'Að þvo sér undir rennandi vatni á morgnana.' },
      { is: 'að klæða sig', en: 'to get dressed', kafli: 9, persona: 'Hulda og Davíð', teikn: true,
        visbending: 'Að fara í fötin sín.' },
      { is: 'að laga kaffi', en: 'to make coffee', kafli: 9, persona: 'Hulda og Davíð', teikn: true,
        visbending: 'Að hella upp á fyrir morgunmatinn.' },
      { is: 'að drífa sig', en: 'to hurry up', kafli: 9, persona: 'Hulda og Davíð', teikn: true,
        visbending: 'Að flýta sér af því að þú ert orðin/n sein/n.' },
      { is: 'uppþvottavél', en: 'dishwasher', kafli: 9, persona: 'Hulda og Davíð', teikn: true,
        visbending: 'Vél í eldhúsinu sem þvær diska og glös.' },
      { is: 'rusl', en: 'rubbish', kafli: 9, persona: 'Hulda og Davíð', teikn: true,
        visbending: 'Það sem þú hendir og ferð með út í tunnu.' },
      { is: 'að lofa', en: 'to promise', kafli: 9, persona: 'Hulda og Davíð', teikn: false,
        visbending: 'Að segja að þú munir örugglega gera eitthvað.' },
      { is: 'að pirra', en: 'to annoy', kafli: 9, persona: 'Hulda og Davíð', teikn: true,
        visbending: 'Að fara í taugarnar á einhverjum.' },
      { is: 'að tuða', en: 'to nag', kafli: 9, persona: 'Hulda og Davíð', teikn: true,
        visbending: 'Að segja aftur og aftur við einhvern að hann eigi að gera eitthvað.' },
      { is: 'að hvíla sig', en: 'to rest', kafli: 9, persona: 'Hulda og Davíð', teikn: true,
        visbending: 'Að leggjast niður og gera ekki neitt í smá stund.' },
      { is: 'að hekla', en: 'to crochet', kafli: 9, persona: 'Hulda og Davíð', teikn: true,
        visbending: 'Að búa til teppi eða húfu með einni nál og garni.' }
    ],

    ordasambond: [
      { is: 'að fara á hausinn', en: 'to go bankrupt' },
      { is: 'að vinna sig upp', en: "to work one's way up" },
      { is: 'að spyrja fyrir einhvern', en: 'to put in a good word for someone' },
      { is: 'að finna fyrir létti', en: 'to feel relief' },
      { is: 'að koma sér í gang', en: 'to get going' },
      { is: 'að láta lækni líta á eitthvað', en: 'to have something looked at by a doctor' },
      { is: 'að fresta einhverju', en: 'to postpone something' },
      { is: 'maður getur aldrei treyst veðrinu', en: 'you can never trust the weather' },
      { is: 'að fá far með einhverjum', en: 'to get a ride with someone' },
      { is: 'brjálað að gera', en: 'extremely busy / swamped' },
      { is: 'þetta er alveg komið gott', en: "that's quite enough now" }
    ],

    sjalfsprof: {
      ordaforði: [
        { visbending: 'Blað sem sýnir hvar þú hefur unnið og hvað þú hefur lært.', svar: 'ferilskrá' },
        { visbending: 'Sá sem kemur alltaf á réttum tíma.', svar: 'stundvís' },
        { visbending: 'Staður í hverfinu þar sem þú hittir lækni eða hjúkrunarfræðing.', svar: 'heilsugæsla' },
        { visbending: 'Vél í eldhúsinu sem þvær diska og glös.', svar: 'uppþvottavél' },
        { visbending: 'Búð þar sem þú sækir lyfin þín.', svar: 'apótek' }
      ],

      hlustun: [
        { texti: 'Páll missti vinnuna þegar flutningafyrirtækið fór á hausinn. Núna er hann atvinnulaus í fyrsta skipti á ævinni.',
          spurning: 'Af hverju missti Páll vinnuna?',
          valkostir: ['Hann varð veikur.', 'Fyrirtækið fór á hausinn.', 'Hann sagði sjálfur upp.'],
          rett: 1 },
        { texti: 'Rakel er með gigt í hægra hnénu. Á morgnana er hún stíf og þarf góðan tíma til að koma sér í gang.',
          spurning: 'Hvenær er verst hjá Rakel?',
          valkostir: ['Á morgnana.', 'Á kvöldin.', 'Um helgar.'],
          rett: 0 },
        { texti: 'Hulda bað Davíð að taka úr uppþvottavélinni. Hann var búinn að lofa því í gær en hafði frestað því.',
          spurning: 'Hvað hafði Davíð lofað?',
          valkostir: ['Að fara út með ruslið.', 'Að taka úr uppþvottavélinni.', 'Að laga kaffi.'],
          rett: 1 }
      ],

      lesskilningur: {
        texti: 'Páll Steinarsson býr einn í íbúð 1D og hefur búið lengi í blokkinni. Hann var flutningabílstjóri í mörg ár, ' +
               'en fyrirtækið fór á hausinn og Páll missti vinnuna. Í fyrsta skipti á ævinni er hann atvinnulaus. ' +
               'Hann skoðar starfsauglýsingar á hverjum degi og hefur skrifað nýja ferilskrá. ' +
               'Aminata, nágranni hans, sagði honum frá lausri stöðu í móttökunni á hótelinu þar sem hún vinnur. ' +
               'Hún lofaði að spyrja fyrir hann. Páli létti mikið.',
        spurningar: [
          { spurning: 'Hvað starfaði Páll áður?', valkostir: ['Hann var bakari.', 'Hann var flutningabílstjóri.', 'Hann vann á hóteli.'], rett: 1 },
          { spurning: 'Hvernig frétti Páll af lausu stöðunni?', valkostir: ['Í blaðinu.', 'Frá Aminötu, nágranna sínum.', 'Á netinu.'], rett: 1 },
          { spurning: 'Hvernig leið Páli í lokin?', valkostir: ['Honum létti.', 'Hann varð reiður.', 'Hann varð svekktur.'], rett: 0 }
        ]
      },

      /* Þrep 7-9: flóknari spurnarorð og föll, núliðin tíð, neitun */
      spurningamyndunAhersla:
        'Þrep 7-9. Áherslan er á (a) flóknari spurnarorð og föll — hversu lengi, hvers vegna, hvers konar, ' +
        'hvern í þolfalli; (b) ópersónulegar sagnir í þágufalli: líða tekur þágufall („Hvernig líður þér?" ' +
        'en ekki „Hvernig líður þú?"), og núliðna tíð með „vera búin/n að"; og (c) neitandi spurningar ' +
        '(„Ertu ekki búinn að…?") þar sem svarið getur verið já eða jú. ' +
        'Nefndu sérstaklega ef nemandinn notar nefnifall þar sem þágufall á að vera.',
      spurningamyndun: [
        { verkefni: 'Þú vilt vita hversu lengi Páll vann sem flutningabílstjóri. Hvað spyrðu hann?',
          daemi: 'Hversu lengi vannstu sem flutningabílstjóri?' },
        { verkefni: 'Þú vilt vita hvernig Rakel líður í hnénu í dag. Hvað spyrðu hana?',
          daemi: 'Hvernig líður þér í hnénu?' },
        { verkefni: 'Davíð hefur ekki tekið úr uppþvottavélinni. Þú vilt spyrja hann að því. Hvað spyrðu?',
          daemi: 'Ertu ekki búinn að taka úr uppþvottavélinni?' }
      ],

      thyding: [
        { is: 'að fara á hausinn', en: 'to go bankrupt' },
        { is: 'að koma sér í gang', en: 'to get going' },
        { is: 'brjálað að gera', en: 'extremely busy / swamped' }
      ],

      opin: {
        spurning: 'Segðu frá morgninum þínum. Hvað gerir þú frá því að þú vaknar og þangað til þú ferð út?',
        leidbeining: 'Skrifaðu 3-4 setningar. Notaðu orð úr kafla 9, til dæmis að fara á fætur, að klæða sig eða að drífa sig.'
      }
    }
  },
  /* ================= LOTA 4 — kaflar 10-12 ================= */
  4: {
    titill: 'Verslun, þjónusta og fjölskylda',
    kaflar: 'kaflar 10-12',
    ord: [
      /* --- Kafli 10: Linh --- */
      { is: 'sæt/sætur', en: 'sweet', kafli: 10, persona: 'Linh', teikn: true,
        visbending: 'Svona bragðast sykur, hunang og súkkulaði.' },
      { is: 'súr', en: 'sour', kafli: 10, persona: 'Linh', teikn: true,
        visbending: 'Svona bragðast sítróna.' },
      { is: 'sölt/saltur', en: 'salty', kafli: 10, persona: 'Linh', teikn: true,
        visbending: 'Svona bragðast sjórinn og franskar kartöflur.' },
      { is: 'bragðsterk/bragðsterkur', en: 'spicy', kafli: 10, persona: 'Linh', teikn: true,
        visbending: 'Svona er matur með miklu chilli — það brennur í munninum.' },
      { is: 'að bjóða', en: 'to offer', kafli: 10, persona: 'Linh', teikn: true,
        visbending: 'Að segja við einhvern: viltu smakka? eða viltu koma með?' },
      { is: 'hrísgrjón', en: 'rice', kafli: 10, persona: 'Linh', teikn: true,
        visbending: 'Lítil hvít korn sem eru soðin í vatni og borðuð með kjöti.' },
      { is: 'svínakjöt', en: 'pork', kafli: 10, persona: 'Linh', teikn: true,
        visbending: 'Kjöt sem margir borða en er bannað í sumum trúarbrögðum.' },
      { is: 'geggjuð/geggjaður', en: 'awesome', kafli: 10, persona: 'Linh', teikn: false,
        visbending: 'Óformlegt orð sem ungt fólk notar þegar eitthvað er alveg frábært.' },
      { is: 'búðarkassi', en: 'till, checkout', kafli: 10, persona: 'Linh', teikn: true,
        visbending: 'Þar borgar þú áður en þú ferð út úr búðinni.' },
      { is: 'fastakúnni', en: 'regular customer', kafli: 10, persona: 'Linh', teikn: false,
        visbending: 'Sá sem kemur alltaf í sömu búðina og starfsfólkið þekkir hann.' },
      { is: 'viðskiptavinur', en: 'customer', kafli: 10, persona: 'Linh', teikn: true,
        visbending: 'Sá sem kaupir eitthvað í búð eða fær þjónustu.' },
      { is: 'skiptimynt', en: 'change (coins)', kafli: 10, persona: 'Linh', teikn: true,
        visbending: 'Litlu peningarnir sem þú færð til baka.' },
      { is: 'ódýr', en: 'cheap', kafli: 10, persona: 'Linh', teikn: true,
        visbending: 'Þetta kostar lítið.' },

      /* --- Kafli 11: Sigríður --- */
      { is: 'að panta', en: 'to order', kafli: 11, persona: 'Sigríður', teikn: true,
        visbending: 'Að segja þjóninum hvað þig langar í.' },
      { is: 'rúnstykki', en: 'bread roll', kafli: 11, persona: 'Sigríður', teikn: true,
        visbending: 'Lítið hringlaga brauð sem þú færð á kaffihúsi.' },
      { is: 'að smyrja', en: 'to butter, to spread', kafli: 11, persona: 'Sigríður', teikn: true,
        visbending: 'Að setja smjör eða ost á brauðið.' },
      { is: 'að hita', en: 'to heat up', kafli: 11, persona: 'Sigríður', teikn: true,
        visbending: 'Að setja matinn í ofn eða örbylgjuofn svo hann verði heitur.' },
      { is: 'posi', en: 'card terminal', kafli: 11, persona: 'Sigríður', teikn: true,
        visbending: 'Lítið tæki þar sem þú setur kortið þitt til að borga.' },
      { is: 'hárgreiðslustofa', en: 'hair salon', kafli: 11, persona: 'Sigríður', teikn: true,
        visbending: 'Staður þar sem fólk vinnur við hárið á þér.' },
      { is: 'vaskur', en: 'sink, basin', kafli: 11, persona: 'Sigríður', teikn: true,
        visbending: 'Þarna er hárið þvegið áður en byrjað er að vinna með það.' },
      { is: 'hárnæring', en: 'conditioner', kafli: 11, persona: 'Sigríður', teikn: true,
        visbending: 'Sett í hárið eftir sjampó svo það verði mjúkt.' },
      { is: 'að snyrta', en: 'to trim', kafli: 11, persona: 'Sigríður', teikn: true,
        visbending: 'Að taka örlítið af — bara laga, ekki breyta miklu.' },
      { is: 'að klippa', en: 'to cut (hair)', kafli: 11, persona: 'Sigríður', teikn: true,
        visbending: 'Að nota skæri á hárið.' },
      { is: 'sídd', en: 'length (of hair)', kafli: 11, persona: 'Sigríður', teikn: true,
        visbending: 'Hversu langt hárið er.' },
      { is: 'endar', en: 'ends (of hair)', kafli: 11, persona: 'Sigríður', teikn: true,
        visbending: 'Neðsti hluti hársins, sá sem er oft slitinn og þurr.' },

      /* --- Kafli 12: Marta --- */
      { is: 'ættarnafn', en: 'family name, surname', kafli: 12, persona: 'Marta', teikn: false,
        visbending: 'Nafn sem öll fjölskyldan ber og gengur á milli kynslóða — algengt erlendis en sjaldgæft á Íslandi.' },
      { is: 'fyrrverandi', en: 'ex-, former', kafli: 12, persona: 'Marta', teikn: false,
        visbending: 'Sá sem var maki þinn en er það ekki lengur.' },
      { is: 'stjúppabbi', en: 'stepfather', kafli: 12, persona: 'Marta', teikn: true,
        visbending: 'Maðurinn sem mamma þín býr með en er ekki pabbi þinn.' },
      { is: 'hálfbróðir', en: 'half-brother', kafli: 12, persona: 'Marta', teikn: true,
        visbending: 'Strákur sem á sama pabba eða sömu mömmu og þú, en ekki bæði.' },
      { is: 'hálfsystir', en: 'half-sister', kafli: 12, persona: 'Marta', teikn: true,
        visbending: 'Stelpa sem á sama pabba eða sömu mömmu og þú, en ekki bæði.' },
      { is: 'ættingjar', en: 'relatives, kin', kafli: 12, persona: 'Marta', teikn: true,
        visbending: 'Allt fólkið sem er skylt þér — frænkur, frændur, afar og ömmur.' },
      { is: 'að alast upp', en: 'to grow up', kafli: 12, persona: 'Marta', teikn: true,
        visbending: 'Að vaxa úr grasi á ákveðnum stað.' },
      { is: 'heimþrá', en: 'homesickness', kafli: 12, persona: 'Marta', teikn: false,
        visbending: 'Sú tilfinning að vilja komast heim til landsins sem þú kemur frá.' },
      { is: 'að sakna', en: 'to miss someone / something', kafli: 12, persona: 'Marta', teikn: true,
        visbending: 'Að hugsa til einhvers sem er langt í burtu og finnast tómlegt án hans.' },
      { is: 'einmana', en: 'lonely', kafli: 12, persona: 'Marta', teikn: true,
        visbending: 'Þannig líður þér þegar þú ert ein/n og enginn er nálægt.' },
      { is: 'að venjast', en: 'to get used to', kafli: 12, persona: 'Marta', teikn: false,
        visbending: 'Að hætta smám saman að finnast eitthvað skrítið.' }
    ],

    ordasambond: [
      { is: 'að vera sjúk/ur í eitthvað', en: 'to be crazy about something' },
      { is: 'ekkert spes', en: 'nothing special' },
      { is: 'að fá til baka', en: 'to get change back' },
      { is: 'gerðu svo vel', en: 'here you go' },
      { is: 'ég vildi gjarnan…', en: 'I would like…' },
      { is: 'mætti ég…?', en: 'may I…?' },
      { is: 'að taka ekki of mikið af', en: 'to not take off too much' },
      { is: 'nákvæmlega passlegt', en: 'exactly right' },
      { is: 'að vera kennd/ur við einhvern', en: 'to be named after someone' },
      { is: 'að vera ekki inni í myndinni', en: "to not be part of someone's life" },
      { is: 'að fá heimþrá', en: 'to get homesick' },
      { is: 'að tilheyra tveimur stöðum', en: 'to belong to two places' }
    ],

    sjalfsprof: {
      ordaforði: [
        { visbending: 'Þar borgar þú áður en þú ferð út úr búðinni.', svar: 'búðarkassi' },
        { visbending: 'Litlu peningarnir sem þú færð til baka.', svar: 'skiptimynt' },
        { visbending: 'Lítið tæki þar sem þú setur kortið þitt til að borga.', svar: 'posi' },
        { visbending: 'Sett í hárið eftir sjampó svo það verði mjúkt.', svar: 'hárnæring' },
        { visbending: 'Sú tilfinning að vilja komast heim til landsins sem þú kemur frá.', svar: 'heimþrá' }
      ],

      hlustun: [
        { texti: 'Linh vinnur á kassanum í Krónunni. Hún þekkir marga fastakúnna og heilsar þeim með nafni.',
          spurning: 'Hvar vinnur Linh?',
          valkostir: ['Á kaffihúsi.', 'Á kassanum í Krónunni.', 'Á hárgreiðslustofu.'],
          rett: 1 },
        { texti: 'Hólmfríður vildi gjarnan láta snyrta hárið en bað Sigríði að taka ekki of mikið af. Sigríður jafnaði bara endana.',
          spurning: 'Hvað gerði Sigríður?',
          valkostir: ['Klippti mikið af.', 'Jafnaði bara endana.', 'Litaði hárið.'],
          rett: 1 },
        { texti: 'Marta er frá Póllandi og hefur búið á Íslandi í fjögur ár. Fyrsta veturinn fékk hún mikla heimþrá en smám saman vandist hún nýja lífinu.',
          spurning: 'Hvernig leið Mörtu fyrsta veturinn?',
          valkostir: ['Hún fékk mikla heimþrá.', 'Henni fannst allt frábært.', 'Hún vildi flytja strax aftur.'],
          rett: 0 }
      ],

      lesskilningur: {
        texti: 'Marta býr í íbúð 3D og er frá Póllandi. Hún hefur búið á Íslandi í fjögur ár. ' +
               'Fjölskyldan hennar er á dreif: pabbi hennar býr í Þýskalandi, mamma hennar í Póllandi, ' +
               'og Marta á hálfsystur sem hún hittir sjaldan. Á Íslandi fannst Mörtu skrítið að fólk væri ' +
               'ekki með ættarnafn heldur kennt við föður sinn eða móður. Fyrsta veturinn var hún einmana ' +
               'og fékk mikla heimþrá. Smám saman vandist hún og kynntist Aminötu, nágranna sínum. ' +
               'Núna finnst henni hún tilheyra tveimur stöðum.',
        spurningar: [
          { spurning: 'Hversu lengi hefur Marta búið á Íslandi?', valkostir: ['Í fjögur ár.', 'Í fjóra mánuði.', 'Í fjórtán ár.'], rett: 0 },
          { spurning: 'Hvað fannst Mörtu skrítið á Íslandi?', valkostir: ['Veðrið.', 'Að fólk sé ekki með ættarnafn.', 'Maturinn.'], rett: 1 },
          { spurning: 'Hvernig líður henni núna?', valkostir: ['Hún finnur að hún tilheyrir tveimur stöðum.', 'Hún vill flytja heim.', 'Hún þekkir engan.'], rett: 0 }
        ]
      },

      /* Þrep 10-12: óbeinar spurningar, kurteisi, eignarfallsstýring */
      spurningamyndunAhersla:
        'Þrep 10-12. Áherslan er á (a) óbeinar spurningar með kurteisisformi („Gætirðu sagt mér hvað þetta kostar?"), ' +
        'þar sem orðaröðin inni í aukasetningunni er EKKI eins og í beinni spurningu; ' +
        '(b) óskir og skilyrta kurteisi („Ég vildi gjarnan…", „Mætti ég…?"); og ' +
        '(c) sagnir sem stýra eignarfalli — sakna tekur eignarfall („Hvers saknar þú?" en ekki „Hvað saknar þú?"). ' +
        'Nefndu sérstaklega ef nemandinn notar beina spurningaorðaröð inni í óbeinni spurningu.',
      spurningamyndun: [
        { verkefni: 'Þú vilt vita hvað hrísgrjónin kosta en vilt spyrja mjög kurteislega. Hvað spyrðu Linh?',
          daemi: 'Gætirðu sagt mér hvað hrísgrjónin kosta?' },
        { verkefni: 'Þú ert á hárgreiðslustofunni og vilt láta snyrta hárið aðeins. Hvernig biður þú Sigríði um það kurteislega?',
          daemi: 'Ég vildi gjarnan láta snyrta hárið aðeins. / Mætti ég fá að láta snyrta endana?' },
        { verkefni: 'Þú vilt vita hvers Marta saknar mest frá Póllandi. Hvað spyrðu hana?',
          daemi: 'Hvers saknar þú mest?' }
      ],

      thyding: [
        { is: 'ekkert spes', en: 'nothing special' },
        { is: 'að vera ekki inni í myndinni', en: "to not be part of someone's life" },
        { is: 'að tilheyra tveimur stöðum', en: 'to belong to two places' }
      ],

      opin: {
        spurning: 'Segðu frá fjölskyldunni þinni. Hverjir eru í henni og hvar búa þau?',
        leidbeining: 'Skrifaðu 3-4 setningar. Notaðu orð úr kafla 12, til dæmis ættingjar, hálfsystir, að alast upp eða að sakna.'
      }
    }
  },

  /* ================= LOTA 5 — kaflar 13-15 ================= */
  5: {
    titill: 'Tilfinningar, hátíðir og árið sem leið',
    kaflar: 'kaflar 13-15',
    ord: [
      /* --- Kafli 13: Ísak og Emil --- */
      { is: 'hrifin/hrifinn af', en: 'fond of, taken with', kafli: 13, persona: 'Ísak og Emil', teikn: false,
        visbending: 'Þegar þér finnst einhver eða eitthvað mjög skemmtilegt og aðlaðandi.' },
      { is: 'ástfangin/ástfanginn', en: 'in love', kafli: 13, persona: 'Ísak og Emil', teikn: true,
        visbending: 'Þegar þú elskar einhvern og hugsar um hann allan daginn.' },
      { is: 'feimin/feiminn', en: 'shy', kafli: 13, persona: 'Ísak og Emil', teikn: true,
        visbending: 'Þannig er sá sem þorir varla að tala við ókunnuga.' },
      { is: 'óörugg/óöruggur', en: 'insecure', kafli: 13, persona: 'Ísak og Emil', teikn: false,
        visbending: 'Þannig líður þér þegar þú treystir ekki sjálfum þér.' },
      { is: 'vandræðaleg/vandræðalegur', en: 'awkward', kafli: 13, persona: 'Ísak og Emil', teikn: true,
        visbending: 'Þannig er staðan þegar allir þegja og enginn veit hvað á að segja.' },
      { is: 'að roðna', en: 'to blush', kafli: 13, persona: 'Ísak og Emil', teikn: true,
        visbending: 'Kinnarnar verða rauðar þegar einhver segir eitthvað sem kemur þér úr jafnvægi.' },
      { is: 'að virða', en: 'to respect', kafli: 13, persona: 'Ísak og Emil', teikn: false,
        visbending: 'Að koma vel fram við einhvern og taka mark á skoðunum hans.' },
      { is: 'gamanmynd', en: 'comedy', kafli: 13, persona: 'Ísak og Emil', teikn: true,
        visbending: 'Bíómynd sem á að láta þig hlæja.' },
      { is: 'hryllingsmynd', en: 'horror film', kafli: 13, persona: 'Ísak og Emil', teikn: true,
        visbending: 'Bíómynd sem á að hræða þig.' },
      { is: 'hasarmynd', en: 'action film', kafli: 13, persona: 'Ísak og Emil', teikn: true,
        visbending: 'Bíómynd með bílaeltingaleikjum og sprengingum.' },
      { is: 'sammála', en: 'in agreement', kafli: 13, persona: 'Ísak og Emil', teikn: true,
        visbending: 'Þegar þið tvö eruð á sömu skoðun.' },
      { is: 'ósammála', en: 'in disagreement', kafli: 13, persona: 'Ísak og Emil', teikn: true,
        visbending: 'Þegar þið tvö eruð á ólíkri skoðun.' },

      /* --- Kafli 14: Begga --- */
      { is: 'að halda veislu', en: 'to throw a party', kafli: 14, persona: 'Begga', teikn: true,
        visbending: 'Að bjóða mörgum heim og gera sér glaðan dag.' },
      { is: 'óvænt/óvæntur', en: 'unexpected', kafli: 14, persona: 'Begga', teikn: false,
        visbending: 'Þannig er það sem enginn átti von á.' },
      { is: 'leyndarmál', en: 'secret', kafli: 14, persona: 'Begga', teikn: true,
        visbending: 'Eitthvað sem þú mátt ekki segja neinum frá.' },
      { is: 'að baka', en: 'to bake', kafli: 14, persona: 'Begga', teikn: true,
        visbending: 'Að búa til köku eða brauð í ofni.' },
      { is: 'að skreyta', en: 'to decorate', kafli: 14, persona: 'Begga', teikn: true,
        visbending: 'Að gera fallegt fyrir hátíð eða veislu með ljósum og litum.' },
      { is: 'blöðrur', en: 'balloons', kafli: 14, persona: 'Begga', teikn: true,
        visbending: 'Litaðar og loftfylltar, hengdar upp í afmæli.' },
      { is: 'gjöf', en: 'gift', kafli: 14, persona: 'Begga', teikn: true,
        visbending: 'Það sem þú færð pakkað inn á afmælinu þínu.' },
      { is: 'afmæliskort', en: 'birthday card', kafli: 14, persona: 'Begga', teikn: true,
        visbending: 'Þessu fylgir kveðja og undirskrift, oft með gjöfinni.' },
      { is: 'blóm', en: 'flowers', kafli: 14, persona: 'Begga', teikn: true,
        visbending: 'Vaxa í garðinum og eru oft gefin þegar einhver á afmæli.' },
      { is: 'myndaalbúm', en: 'photo album', kafli: 14, persona: 'Begga', teikn: true,
        visbending: 'Bók full af ljósmyndum frá liðnum árum.' },
      { is: 'heimagerð/heimagerður', en: 'homemade', kafli: 14, persona: 'Begga', teikn: true,
        visbending: 'Þannig er það sem einhver bjó til sjálfur heima, ekki keypt í búð.' },

      /* --- Kafli 15: Kristjana og Fannar --- */
      { is: 'gamlárskvöld', en: "New Year's Eve", kafli: 15, persona: 'Kristjana og Fannar', teikn: true,
        visbending: 'Síðasta kvöld ársins, 31. desember.' },
      { is: 'flugeldar', en: 'fireworks', kafli: 15, persona: 'Kristjana og Fannar', teikn: true,
        visbending: 'Þeir lýsa upp himininn með hvellum og litum um áramótin.' },
      { is: 'miðnætti', en: 'midnight', kafli: 15, persona: 'Kristjana og Fannar', teikn: true,
        visbending: 'Klukkan tólf á nóttunni.' },
      { is: 'áramótaheit', en: "New Year's resolution", kafli: 15, persona: 'Kristjana og Fannar', teikn: false,
        visbending: 'Það sem þú lofar sjálfum þér að gera betur á nýju ári.' },
      { is: 'markmið', en: 'goal', kafli: 15, persona: 'Kristjana og Fannar', teikn: false,
        visbending: 'Eitthvað sem þú ætlar að ná og vinnur að skref fyrir skref.' },
      { is: 'jólamatur', en: 'Christmas dinner', kafli: 15, persona: 'Kristjana og Fannar', teikn: true,
        visbending: 'Maturinn sem fjölskyldan borðar saman á hátíðinni í desember.' },
      { is: 'hangikjöt', en: 'smoked lamb', kafli: 15, persona: 'Kristjana og Fannar', teikn: true,
        visbending: 'Reykt kindakjöt sem margir Íslendingar borða um jólin.' },
      { is: 'aðfangadagur', en: 'Christmas Eve', kafli: 15, persona: 'Kristjana og Fannar', teikn: true,
        visbending: '24. desember, þegar pakkarnir eru opnaðir á Íslandi.' },
      { is: 'hefð', en: 'tradition', kafli: 15, persona: 'Kristjana og Fannar', teikn: false,
        visbending: 'Eitthvað sem fjölskyldan gerir alltaf eins, ár eftir ár.' },
      { is: 'útilega', en: 'camping trip', kafli: 15, persona: 'Kristjana og Fannar', teikn: true,
        visbending: 'Þegar þú sefur í tjaldi úti í náttúrunni.' },
      { is: 'tjaldsvæði', en: 'campsite', kafli: 15, persona: 'Kristjana og Fannar', teikn: true,
        visbending: 'Staður úti á landi þar sem margir mega gista í tjöldum.' },
      { is: 'húsbíll', en: 'camper van', kafli: 15, persona: 'Kristjana og Fannar', teikn: true,
        visbending: 'Bíll sem þú getur sofið og eldað í.' }
    ],

    ordasambond: [
      { is: 'að vera skotin/n í einhverjum', en: 'to have a crush on someone' },
      { is: 'að vera á lausu', en: 'to be single / available' },
      { is: 'að gera sig að fífli', en: 'to make a fool of oneself' },
      { is: 'að gefa einhverju séns', en: 'to give something a chance' },
      { is: 'að finna málamiðlun', en: 'to find a compromise' },
      { is: 'að koma einhverjum á óvart', en: 'to surprise someone' },
      { is: 'að þegja yfir leyndarmáli', en: 'to keep a secret' },
      { is: 'að halda upp á eitthvað', en: 'to celebrate something' },
      { is: 'að redda einhverju', en: 'to sort something out' },
      { is: 'að strengja áramótaheit', en: "to make a New Year's resolution" },
      { is: 'að taka sig á', en: 'to pull oneself together' },
      { is: 'þrátt fyrir allt', en: 'despite everything' },
      { is: 'ekkert betra en', en: 'nothing better than' }
    ],

    sjalfsprof: {
      ordaforði: [
        { visbending: 'Bíómynd sem á að hræða þig.', svar: 'hryllingsmynd' },
        { visbending: 'Eitthvað sem þú mátt ekki segja neinum frá.', svar: 'leyndarmál' },
        { visbending: 'Bók full af ljósmyndum frá liðnum árum.', svar: 'myndaalbúm' },
        { visbending: '24. desember, þegar pakkarnir eru opnaðir á Íslandi.', svar: 'aðfangadagur' },
        { visbending: 'Bíll sem þú getur sofið og eldað í.', svar: 'húsbíll' }
      ],

      hlustun: [
        { texti: 'Ísak er skotinn í Emblu en hann er mjög feiminn og þorir ekki að segja neitt. Emil vinur hans segir honum að gefa því séns.',
          spurning: 'Hvað ráðleggur Emil?',
          valkostir: ['Að gleyma Emblu.', 'Að gefa því séns.', 'Að bíða í heilt ár.'],
          rett: 1 },
        { texti: 'Begga ætlar að halda óvænta veislu fyrir Veru. Hulda ætlar að baka köku og allir þurfa að þegja yfir leyndarmálinu.',
          spurning: 'Hvað á Hulda að gera?',
          valkostir: ['Skreyta stofuna.', 'Baka köku.', 'Kaupa blóm.'],
          rett: 1 },
        { texti: 'Á gamlárskvöld horfðu Kristjana og Fannar á sjónvarpið og fóru svo út á miðnætti að sjá flugeldana.',
          spurning: 'Hvað gerðu þau á miðnætti?',
          valkostir: ['Fóru að sofa.', 'Fóru út að sjá flugeldana.', 'Borðuðu jólamat.'],
          rett: 1 }
      ],

      lesskilningur: {
        texti: 'Bergþóra, eða Begga eins og allir kalla hana, býr í íbúð 4C og hefur búið í Dúfnahólum ' +
               'í meira en tuttugu ár. Hún þekkir alla í húsinu. Í haust ákvað hún að halda óvænta veislu ' +
               'fyrir Veru, sem átti stórafmæli. Begga bað Huldu að baka köku og Tariq að redda blöðrum. ' +
               'Allir þurftu að þegja yfir leyndarmálinu í tvær vikur. Aminata keypti blóm og Begga bjó til ' +
               'myndaalbúm með myndum frá liðnum árum. Veru fannst heimagerða gjöfin best af öllu.',
        spurningar: [
          { spurning: 'Hversu lengi hefur Begga búið í Dúfnahólum?', valkostir: ['Í meira en tuttugu ár.', 'Í tvö ár.', 'Í tvær vikur.'], rett: 0 },
          { spurning: 'Hvað átti Tariq að gera?', valkostir: ['Baka köku.', 'Redda blöðrum.', 'Kaupa blóm.'], rett: 1 },
          { spurning: 'Hvaða gjöf fannst Veru best?', valkostir: ['Blómin.', 'Kakan.', 'Heimagerða myndaalbúmið.'], rett: 2 }
        ]
      },

      /* Þrep 13-15: skoðanir og rök, samanburður, skildagatíð */
      spurningamyndunAhersla:
        'Þrep 13-15. Áherslan er á (a) spurningar um skoðanir og rök þar sem nemandinn notar samanburð ' +
        '— frekar/heldur og en („Af hverju vilt þú frekar sjá hasarmynd en gamanmynd?"); ' +
        '(b) miðstig með ópersónulegu finnast sem tekur þágufall („Hvor gjöfin finnst þér persónulegri?" ' +
        'en ekki „Hvor gjöfin finnur þú persónulegri?"); og ' +
        '(c) skildagatíð — myndi + nafnháttur í aðalsetningu og þátíð viðtengingarháttar í ef-setningu ' +
        '(„Hvað myndir þú gera ef þú ættir frí?"). ' +
        'Nefndu sérstaklega ef nemandinn notar nefnifall með finnast eða framsöguhátt í ef-setningunni.',
      spurningamyndun: [
        { verkefni: 'Þú vilt vita hvers vegna Emil vill frekar sjá hasarmynd en gamanmynd. Hvað spyrðu hann?',
          daemi: 'Af hverju vilt þú frekar sjá hasarmynd en gamanmynd?' },
        { verkefni: 'Þú vilt vita hvora gjöfina Beggu finnst persónulegri — blómin eða myndaalbúmið. Hvað spyrðu hana?',
          daemi: 'Hvor gjöfin finnst þér persónulegri?' },
        { verkefni: 'Þú vilt vita hvað Kristjana myndi gera ef hún ætti frí alla áramótahelgina. Hvað spyrðu hana?',
          daemi: 'Hvað myndir þú gera ef þú ættir frí?' }
      ],

      thyding: [
        { is: 'að gera sig að fífli', en: 'to make a fool of oneself' },
        { is: 'að redda einhverju', en: 'to sort something out' },
        { is: 'þrátt fyrir allt', en: 'despite everything' }
      ],

      opin: {
        spurning: 'Segðu frá hátíð sem þú heldur upp á. Hvað gerir fjölskyldan þín og hvaða hefðir eru mikilvægar?',
        leidbeining: 'Skrifaðu 3-4 setningar. Notaðu orð úr kafla 15, til dæmis hefð, jólamatur, að skreyta eða markmið.'
      }
    }
  }
};
