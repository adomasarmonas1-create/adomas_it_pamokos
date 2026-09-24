window.KIBERAGENTAI_LEVELS = {
  "2": {
    title: "2 klasė",
    goal: "Atskiriu viešą ir privačią informaciją bei pasirenku saugų veiksmą.",
    levels: [
      {
        id: "2-01",
        title: "Kas apie mane yra privatu?",
        subtitle: "Asmens duomenys, nuotraukos, adresas ir saugus dalijimasis.",
        difficulty: "Pagrindas",
        minutes: 15,
        briefing: "Agentūros sistemoje aptikti keturi prašymai pasidalinti informacija. Nuspręsk, kas saugu.",
        stages: [
          {
            kicker: "Įrodymas 1",
            title: "Naujas žaidimo draugas",
            brief: "Žinutę parašė žmogus, kurio nepažįsti.",
            evidence: [
              {type:"Žinutė",title:"Nežinomas žaidėjas",text:"Parašyk savo namų adresą – atsiųsiu prizą."},
              {type:"Faktas",title:"Adresas",text:"Namų adresas padeda nustatyti, kur žmogus gyvena."}
            ],
            prompt: "Ką darai?",
            choices: [
              {text:"Parašau adresą, nes prizas skamba smagiai.",correct:false,feedback:"Namų adresas yra privati informacija. Nežinomam žmogui jo nesiunčiame."},
              {text:"Adreso nesiunčiu ir parodau žinutę patikimam suaugusiajam.",correct:true,feedback:"Teisingai. Sustoji, nesidalini privačia informacija ir pasitikrini."},
              {text:"Nusiunčiu tik gatvę, bet ne namo numerį.",correct:false,feedback:"Dalinis adresas vis tiek gali atskleisti per daug informacijos."}
            ]
          },
          {
            kicker: "Įrodymas 2",
            title: "Klasės nuotrauka",
            brief: "Programėlė siūlo įkelti klasės nuotrauką į viešą profilį.",
            evidence: [
              {type:"Situacija",title:"Viešas profilis",text:"Nuotrauką galėtų matyti ne tik tavo draugai."},
              {type:"Klausimas",title:"Kas joje?",text:"Nuotraukoje matyti keli klasės draugai."}
            ],
            prompt: "Kuris sprendimas saugiausias?",
            choices: [
              {text:"Įkeliu iškart – juk tai mano profilis.",correct:false,feedback:"Nuotraukoje yra ir kitų žmonių. Jų privatumas taip pat svarbus."},
              {text:"Pirmiausia atsiklausiu žmonių nuotraukoje ir suaugusiojo.",correct:true,feedback:"Teisingai. Prieš viešinant kitų žmonių atvaizdus reikia pagalvoti apie jų privatumą."},
              {text:"Uždedu daug emoji ir tada galima kelti.",correct:false,feedback:"Emoji savaime nepadaro nuotraukos saugios ar privačios."}
            ]
          }
        ]
      }
    ]
  },

  "3": {
    title: "3 klasė",
    goal: "Saugau paskyrą, prisijungimo duomenis ir atpažįstu rizikingą situaciją.",
    levels: [
      {
        id: "3-01",
        title: "Saugi paskyra",
        subtitle: "Slaptažodžiai, prisijungimo informacija ir įtartinos nuorodos.",
        difficulty: "Pagrindas+",
        minutes: 18,
        briefing: "Kažkas bando patekti į mokyklinę paskyrą. Patikrink užuominas ir apsaugok prieigą.",
        stages: [
          {
            kicker:"Bylos dalis 1",title:"Slaptažodžio pasirinkimas",brief:"Sistemai reikia naujo slaptažodžio.",
            evidence:[
              {type:"Variantas",title:"A",text:"mokykla123"},
              {type:"Variantas",title:"B",text:"Miskas!27-Kometos-Upė"},
              {type:"Variantas",title:"C",text:"12345678"}
            ],
            prompt:"Kurį variantą rinktumeisi?",
            choices:[
              {text:"A – trumpas ir lengvai įsimenamas.",correct:false,feedback:"Trumpi, nuspėjami slaptažodžiai lengviau atspėjami."},
              {text:"B – ilgesnė, neįprasta slaptažodžio frazė.",correct:true,feedback:"Teisingai. Ilga ir nenuspėjama frazė paprastai yra stipresnė."},
              {text:"C – daug skaičių, vadinasi saugu.",correct:false,feedback:"Vien skaičių kiekis nepadaro slaptažodžio stipraus."}
            ]
          },
          {
            kicker:"Bylos dalis 2",title:"Įtartina nuoroda",brief:"Gavai žinutę, kad paskyra bus užblokuota po 5 minučių.",
            evidence:[
              {type:"Žinutė",title:"Skubinimas",text:"Prisijunk dabar, kitaip paskyra bus ištrinta."},
              {type:"Nuoroda",title:"Adresas",text:"micros0ft-school-login.example"}
            ],
            prompt:"Koks pirmas saugus veiksmas?",
            choices:[
              {text:"Spaudžiu nuorodą, nes reikia skubėti.",correct:false,feedback:"Skubinimas ir keistas adresas yra rizikos ženklai."},
              {text:"Nuorodos nespaudžiu ir pats atsidarau žinomą mokyklos prisijungimo puslapį.",correct:true,feedback:"Teisingai. Į svarbią paskyrą einame per žinomą adresą, ne per įtartiną nuorodą."},
              {text:"Persiunčiu draugui ir klausiu, ar jam veikia.",correct:false,feedback:"Taip galėtum išplatinti įtartiną nuorodą toliau."}
            ]
          }
        ]
      }
    ]
  },

  "4": {
    title: "4 klasė",
    goal: "Lyginu šaltinius, ieškau autoriaus, datos, įrodymų ir abejotinų požymių.",
    levels: [
      {
        id: "4-01",
        title: "Ar galima tuo patikėti?",
        subtitle: "Šaltinių patikimumo byla.",
        difficulty: "Tyrėjas",
        minutes: 20,
        briefing: "Du šaltiniai pateikia skirtingą informaciją. Surink požymius ir nuspręsk, kuriuo remtis.",
        stages: [
          {
            kicker:"Bylos dalis 1",title:"Du šaltiniai – viena tema",brief:"Reikia pasirinkti šaltinį mokykliniam darbui apie miegą.",
            evidence:[
              {type:"Šaltinis A",title:"Sveikatos organizacijos puslapis",text:"Nurodytas autorius, paskelbimo data ir nuorodos į tyrimus."},
              {type:"Šaltinis B",title:"superfaktai-now.blog",text:"Autorius nenurodytas. Antraštė: „Mokslininkai ŠOKIRUOTI!!!“"},
              {type:"Detalė",title:"Data",text:"A šaltinis atnaujintas šiemet, B šaltinio data nematoma."}
            ],
            prompt:"Kuriuo šaltiniu pirmiausia remtumeisi ir kodėl?",
            choices:[
              {text:"B, nes antraštė įdomesnė.",correct:false,feedback:"Įdomi antraštė nėra patikimumo įrodymas."},
              {text:"A, nes matomas autorius, data ir pateikiami įrodymai.",correct:true,feedback:"Teisingai. Vertinai ne išvaizdą, o patikimumo požymius."},
              {text:"Abiem vienodai, nes abu yra internete.",correct:false,feedback:"Vien tai, kad informacija internete, nepadaro šaltinių vienodai patikimų."}
            ]
          },
          {
            kicker:"Bylos dalis 2",title:"Įrodymas ar nuomonė?",brief:"Šaltinyje pateiktas teiginys: „Ši programėlė yra pati geriausia pasaulyje.“",
            evidence:[
              {type:"Tekstas",title:"Teiginys",text:"„Pati geriausia pasaulyje.“"},
              {type:"Trūksta",title:"Duomenys",text:"Nėra palyginimo, tyrimo ar aiškių kriterijų."}
            ],
            prompt:"Kaip vertini šį teiginį?",
            choices:[
              {text:"Tai patikimas faktas, nes parašyta internete.",correct:false,feedback:"Teiginiui reikia pagrindimo."},
              {text:"Tai labiau nuomonė ar reklaminis teiginys, nes trūksta įrodymų.",correct:true,feedback:"Teisingai. Atskyrei teiginį nuo jį pagrindžiančių įrodymų."},
              {text:"Tai faktas, jei puslapis atrodo profesionaliai.",correct:false,feedback:"Dizainas nėra pakankamas patikimumo įrodymas."}
            ]
          }
        ]
      }
    ]
  },

  "5": {
    title: "5 klasė",
    goal: "Atpažįstu phishing ir socialinės inžinerijos požymius, susieju kelias užuominas ir pagrindžiu veiksmą.",
    levels: [
      {
        id: "5-01",
        title: "Kas čia iš tikrųjų nutiko?",
        subtitle: "Phishing ir socialinės inžinerijos incidento analizė.",
        difficulty: "Incidentas",
        minutes: 25,
        briefing: "Mokinio paskyroje atsirado keistų veiksmų. Vieno akivaizdaus atsakymo nėra – reikia susieti įrodymus.",
        stages: [
          {
            kicker:"Incidentas 1/2",title:"Skubus failo bendrinimas",brief:"Prieš incidentą mokinys gavo laišką apie „bendrinamą pažymių failą“.",
            evidence:[
              {type:"Laiškas",title:"Siuntėjas",text:"mokytoja.support@school-help.example"},
              {type:"Tekstas",title:"Raginimas",text:"„Patvirtink paskyrą per 10 minučių, kitaip failas bus panaikintas.“"},
              {type:"Nuoroda",title:"Prisijungimas",text:"school-login.verify-account.example"},
              {type:"Aplinka",title:"Mokykloje",text:"Įprastai failai bendrinami per Teams arba OneDrive."}
            ],
            prompt:"Kuri išvada geriausiai paaiškina riziką?",
            choices:[
              {text:"Tikriausiai tikras laiškas, nes jame minima mokykla.",correct:false,feedback:"Pavadinimas gali būti nukopijuotas. Svarbiau siuntėjas, domenas, skubinimas ir įprastas mokyklos darbo būdas."},
              {text:"Tikėtinas phishing: keistas siuntėjas, skubinimas ir neįprastas prisijungimo adresas sutampa.",correct:true,feedback:"Teisingai. Susiejai kelis požymius, o ne pasikliovei vienu."},
              {text:"Rizikos nėra, jei puslapyje matomas Microsoft logotipas.",correct:false,feedback:"Logotipą galima nukopijuoti. Jis neįrodo puslapio tikrumo."}
            ]
          },
          {
            kicker:"Incidentas 2/2",title:"Ką daryti po klaidos?",brief:"Mokinys prisipažino, kad įvedė slaptažodį į tą puslapį.",
            evidence:[
              {type:"Faktas",title:"Slaptažodis įvestas",text:"Prisijungimo duomenys galėjo patekti kitam asmeniui."},
              {type:"Paskyra",title:"Keistas aktyvumas",text:"Po 12 minučių atsirado prisijungimas iš naujo įrenginio."}
            ],
            prompt:"Kuris veiksmų planas tinkamiausias?",
            choices:[
              {text:"Nieko nedarau, jei paskyra dar veikia.",correct:false,feedback:"Veikianti paskyra nereiškia, kad duomenys nenutekėjo."},
              {text:"Keičiu slaptažodį per tikrą paskyros puslapį, atsijungiu nuo kitų sesijų ir pranešu atsakingam suaugusiajam / IT.",correct:true,feedback:"Teisingai. Reaguoji į galimą incidentą, o ne tik uždarai įtartiną puslapį."},
              {text:"Persiunčiu laišką visai klasei, kad paklausčiau, kas dar jį gavo.",correct:false,feedback:"Taip gali išplatinti pavojingą nuorodą. Geriau pranešti atsakingam žmogui saugiu kanalu."}
            ]
          }
        ]
      }
    ]
  },

  "6": {
    title: "6 klasė",
    goal: "Vertinu skaitmeninius įrodymus, metaduomenų idėją, teiginius ir argumentuoju išvadą.",
    levels: [
      {
        id: "6-01",
        title: "Skaitmeninė kriminalistika",
        subtitle: "Įrodymų patikimumo ir konteksto byla.",
        difficulty: "Analitikas",
        minutes: 30,
        briefing: "Agentūra tiria tariamą duomenų nutekinimą. Kiekvienas įrodymas atrodo įtikinamai, bet jų vertė skiriasi.",
        stages: [
          {
            kicker:"Byla 6-A",title:"Ekrano nuotrauka ar originalus failas?",brief:"Du mokiniai pateikia skirtingus to paties dokumento „įrodymus“.",
            evidence:[
              {type:"Įrodymas A",title:"Ekrano nuotrauka",text:"Matoma dokumento dalis, bet nematyti failo kilmės, versijos ar pakeitimų istorijos."},
              {type:"Įrodymas B",title:"Originalus debesijos failas",text:"Matoma versijų istorija, savininkas ir pakeitimų laikas."},
              {type:"Kontekstas",title:"Ginčas",text:"Reikia nustatyti, kada konkretus sakinys atsirado dokumente."}
            ],
            prompt:"Kuris įrodymas šiai užduočiai vertingesnis?",
            choices:[
              {text:"Ekrano nuotrauka, nes ją greičiau peržiūrėti.",correct:false,feedback:"Greitis nėra pagrindinis kriterijus. Reikia informacijos apie kilmę ir pakeitimus."},
              {text:"Originalus failas su versijų istorija, nes jis suteikia papildomą patikrinamą kontekstą.",correct:true,feedback:"Teisingai. Vertini ne tik turinį, bet ir jo kilmę bei istoriją."},
              {text:"Abu įrodymai visiškai vienodi, nes juose matomas tas pats tekstas.",correct:false,feedback:"Tas pats matomas tekstas gali turėti skirtingą įrodomąją vertę."}
            ]
          },
          {
            kicker:"Byla 6-B",title:"Kuris teiginys pagrįstas?",brief:"Turime prisijungimo įrašą ir vartotojo komentarą.",
            evidence:[
              {type:"Žurnalas",title:"Prisijungimas",text:"14:08 prisijungta iš naujo įrenginio."},
              {type:"Komentaras",title:"Vartotojas",text:"„Aš tuo metu tikrai nebuvau prisijungęs.“"},
              {type:"Apribojimas",title:"Nežinome",text:"Vien iš įrašo negalima patikimai nustatyti, kas fiziškai naudojosi įrenginiu."}
            ],
            prompt:"Kokia išvada tiksliausia?",
            choices:[
              {text:"Įrašas įrodo, kuris konkretus žmogus prisijungė.",correct:false,feedback:"Prisijungimo įrašas rodo įvykį, bet ne visada įrodo fizinio žmogaus tapatybę."},
              {text:"Galime teigti, kad prisijungimas iš naujo įrenginio įvyko, tačiau žmogaus tapatybei reikia daugiau įrodymų.",correct:true,feedback:"Teisingai. Atskyrei tai, ką įrodymas tikrai rodo, nuo to, ką tik spėjame."},
              {text:"Komentaras automatiškai paneigia sistemos įrašą.",correct:false,feedback:"Vartotojo teiginys yra svarbus, bet jį taip pat reikia vertinti kartu su kitais įrodymais."}
            ]
          }
        ]
      }
    ]
  }
};