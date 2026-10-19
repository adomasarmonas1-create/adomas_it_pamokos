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
    "title": "3 klasė",
    "goal": "Tiriu skaitmenines užuominas, saugau savo paskyrą ir atpažįstu apgaulingus prašymus.",
    "levels": [
      {
        "id": "3-01",
        "title": "Operacija „Užrakinta paskyra“",
        "subtitle": "4 kambariai, 8 tyrimo sprendimai, įrodymų atvertimas ir 3 gyvybės.",
        "difficulty": "Jaunasis agentas",
        "minutes": 23,
        "mode": "field-mission",
        "lives": 3,
        "briefing": "Į mokyklos virtualią saugyklą kažkas mėgina patekti svetimu vardu. Pereik keturis saugumo kambarius, išnagrinėk užuominas ir sustabdyk įsibrovimą.",
        "intro": "AGENTŪROS SIGNALAS 03: pastebėtas bandymas prisijungti prie mokyklos sistemos. Pirmiausia patikrink duris, tada žinutes, asmens duomenis ir paskyros atkūrimą. Kiekviename etape atversk VISAS įrodymų korteles, tik tada priimk sprendimą. Turi 3 apsaugos skydus.",
        "outro": "Saugykla apsaugota! Atpažinai įtartinus prašymus, pasirinkai saugius prisijungimo veiksmus ir išsaugojai slaptus duomenis. Tikras agentas tikrina užuominas prieš spręsdamas.",
        "rooms": [
          {
            "name": "Prisijungimo vartai",
            "caption": "01 · Slaptažodžių terminalas",
            "symbol": "▣"
          },
          {
            "name": "Netikros žinutės",
            "caption": "02 · Signalų koridorius",
            "symbol": "⌁"
          },
          {
            "name": "Slaptų duomenų saugykla",
            "caption": "03 · Privatumo sektorius",
            "symbol": "▤"
          },
          {
            "name": "Paskyros gelbėjimas",
            "caption": "04 · Valdymo centras",
            "symbol": "◈"
          }
        ],
        "stages": [
          {
            "room": 1,
            "kicker": "1 kambarys · 1/2",
            "title": "Kurie vartai tvirčiausi?",
            "brief": "Įsilaužėlis bandė atspėti lengvus slaptažodžius. Pasirink stipriausią iš trijų pavyzdžių.",
            "evidence": [
              {
                "type": "FAILAS 01",
                "title": "Dažnas slaptažodis",
                "text": "12345678 randamas tarp dažniausių ir lengvai atspėjamų slaptažodžių."
              },
              {
                "type": "FAILAS 02",
                "title": "Asmeninė užuomina",
                "text": "mokykla123 susijęs su žmogaus kasdienybe – tokie žodžiai nuspėjami."
              },
              {
                "type": "FAILAS 03",
                "title": "Neįprasta frazė",
                "text": "Klevas!Orbitas-58_Ziema yra ilgesnis ir sunkiau nuspėjamas pavyzdys; jo niekur nenaudok kaip savo tikro slaptažodžio."
              }
            ],
            "prompt": "Kuris pavyzdys stipriausias ir kodėl?",
            "choices": [
              {
                "text": "mokykla123 – labai lengva prisiminti.",
                "correct": false,
                "feedback": "Patogus prisiminimas dar nereiškia saugumo. Mokykla ir skaičiai nuspėjami."
              },
              {
                "text": "Klevas!Orbitas-58_Ziema – ilga, neįprasta frazė.",
                "correct": true,
                "feedback": "Ilgis ir nenuspėjamumas gerokai apsunkina spėjimą. Tikro slaptažodžio negalima rinktis iš pamokoje matytų pavyzdžių."
              },
              {
                "text": "12345678 – daug skaitmenų, vadinasi sudėtinga.",
                "correct": false,
                "feedback": "Nuosekliai einantys skaičiai labai lengvai atspėjami."
              }
            ],
            "lesson": "Nenaudok savo tikrojo slaptažodžio net žaidime."
          },
          {
            "room": 1,
            "kicker": "1 kambarys · 2/2",
            "title": "Draugo prašymas",
            "brief": "Tavo draugas sako, kad pamiršo prisijungimą ir nori pasinaudoti tavo paskyra.",
            "evidence": [
              {
                "type": "POKALBIS",
                "title": "Draugas",
                "text": "„Duok man tik trumpam slaptažodį, tuoj grąžinsiu.“"
              },
              {
                "type": "TAISYKLĖ",
                "title": "Paskyros savininkas",
                "text": "Visi veiksmai, atliekami tavo paskyra, gali būti priskirti tau."
              },
              {
                "type": "ALTERNATYVA",
                "title": "Pagalbos kelias",
                "text": "Draugas gali kreiptis į mokytoją ar atsakingą suaugusįjį, kad saugiai atkurtų prieigą."
              }
            ],
            "prompt": "Ką patartum draugui?",
            "choices": [
              {
                "text": "Pasakau slaptažodį, bet prašau jo niekam nesakyti.",
                "correct": false,
                "feedback": "Net geram draugui slaptažodžio atskleisti nereikia."
              },
              {
                "text": "Leidžiu prisijungti tik tada, kai niekas nemato.",
                "correct": false,
                "feedback": "Aplinkinių nebuvimas nepaverčia svetimo prisijungimo saugiu."
              },
              {
                "text": "Slaptažodžio neduodu ir pasiūlau kreiptis pagalbos dėl savo paskyros.",
                "correct": true,
                "feedback": "Puiku. Padedame draugui neatskleisdami savo prisijungimo duomenų."
              }
            ],
            "lesson": "Draugiškumas ir saugumas gali veikti kartu."
          },
          {
            "room": 2,
            "kicker": "2 kambarys · 1/2",
            "title": "Penkių minučių spąstai",
            "brief": "Tavo ekrane pasirodo žinutė: „Paskyra bus ištrinta po 5 min.!“",
            "evidence": [
              {
                "type": "ŽINUTĖ",
                "title": "Skubos spaudimas",
                "text": "Prašoma veikti tuoj pat, kad nespėtum patikrinti informacijos."
              },
              {
                "type": "ADRESAS",
                "title": "Netikras prisijungimas",
                "text": "micros0ft-school-login.example – vietoje raidės „o“ panaudotas skaitmuo „0“. Tai išgalvotas mokomasis adresas."
              },
              {
                "type": "ŽINOMAS KELIAS",
                "title": "Įprastas prisijungimas",
                "text": "Mokyklos paskyrą galima atsidaryti per įprastą, žinomą nuorodą arba paklausti mokytojo."
              }
            ],
            "prompt": "Koks saugiausias pirmas veiksmas?",
            "choices": [
              {
                "text": "Nespaudžiu nuorodos, atsidarau įprastą puslapį ir patikrinu su mokytoju.",
                "correct": true,
                "feedback": "Taip. Skubėjimas ir panašus į tikrą adresas gali slėpti apgaulę."
              },
              {
                "text": "Paspaudžiu nuorodą – paskui pažiūrėsiu, ar saugi.",
                "correct": false,
                "feedback": "Pirmiau tikriname nuorodą, tik tada sprendžiame, ar ją atidaryti."
              },
              {
                "text": "Persiunčiu žinutę draugui, kad jis paspaustų pirmas.",
                "correct": false,
                "feedback": "Taip rizika būtų perduota kitam žmogui."
              }
            ],
            "lesson": "Įtartina nuoroda nėra saugesnė vien todėl, kad atrodo pažįstama."
          },
          {
            "room": 2,
            "kicker": "2 kambarys · 2/2",
            "title": "Netikras mokyklos darbuotojas",
            "brief": "Kažkas prisistato IT darbuotoju ir prašo vienkartinio prisijungimo kodo.",
            "evidence": [
              {
                "type": "PRAŠYMAS",
                "title": "Slaptas kodas",
                "text": "„Atsiųsk man šešių skaitmenų kodą iš savo telefono – reikia patikrinti paskyrą.“"
              },
              {
                "type": "PATIKRA",
                "title": "Vienkartinis kodas",
                "text": "Prisijungimo kodas dažnai naudojamas patvirtinti, kad jungiasi paskyros savininkas."
              },
              {
                "type": "UŽUOMINA",
                "title": "Tikras darbuotojas",
                "text": "Atsakingas darbuotojas gali padėti, bet jam neturi reikėti tavo prisijungimo kodo."
              }
            ],
            "prompt": "Ką darai su kodu?",
            "choices": [
              {
                "text": "Pasakau kodą, nes žmogus prisistatė mokyklos darbuotoju.",
                "correct": false,
                "feedback": "Vien prisistatymas neįrodo, kad asmuo tikrai toks ir yra."
              },
              {
                "text": "Kodo nesiunčiu; susisiekiu su mokytoju ar mokyklos IT įprastu būdu.",
                "correct": true,
                "feedback": "Teisingai. Vienkartinis kodas yra toks pat jautrus kaip slaptažodis."
              },
              {
                "text": "Nusiųsiu tik pusę kodo, tada nieko blogo nenutiks.",
                "correct": false,
                "feedback": "Geriau neatskleisti jokios kodo dalies ir paprašyti suaugusiojo pagalbos."
              }
            ],
            "lesson": "Slaptažodžiai ir vienkartiniai prisijungimo kodai nėra dalijami."
          },
          {
            "room": 3,
            "kicker": "3 kambarys · 1/2",
            "title": "Kas slypi nuotraukoje?",
            "brief": "Ruošiesi įkelti nuotrauką į viešą žaidimų grupę.",
            "evidence": [
              {
                "type": "VAIZDAS",
                "title": "Nuotraukos fonas",
                "text": "Fone matyti mokyklos pavadinimas ir namo numeris."
              },
              {
                "type": "PROFILIS",
                "title": "Vieša grupė",
                "text": "Įrašą gali pamatyti ne tik tavo draugai, bet ir nepažįstami žmonės."
              },
              {
                "type": "PASIRINKIMAS",
                "title": "Saugus redagavimas",
                "text": "Prieš skelbiant galima pašalinti privačią informaciją arba apskritai neviešinti nuotraukos."
              }
            ],
            "prompt": "Koks sprendimas geriausiai saugo privatumą?",
            "choices": [
              {
                "text": "Keliu nuotrauką, nes joje nėra mano slaptažodžio.",
                "correct": false,
                "feedback": "Nuotrauka gali atskleisti vietą, mokyklą ar kitą asmeninę informaciją."
              },
              {
                "text": "Keliu nuotrauką ir parašau, kuriame name gyvenu.",
                "correct": false,
                "feedback": "Tai dar labiau padidintų asmeninės informacijos atskleidimo riziką."
              },
              {
                "text": "Neskelbiu tokios nuotraukos; pirmiausia pašalinu atpažinimo duomenis ir tariuosi su suaugusiuoju.",
                "correct": true,
                "feedback": "Puikus pasirinkimas. Prieš skelbiant patikriname ne tik žmones, bet ir foną."
              }
            ],
            "lesson": "Ne vien vardas yra privati informacija – svarbūs ir vietos požymiai."
          },
          {
            "room": 3,
            "kicker": "3 kambarys · 2/2",
            "title": "Žaidimo dovana",
            "brief": "Žaidime pasirodo pasiūlymas gauti nemokamų monetų, jei prisijungsi per nepažįstamą svetainę.",
            "evidence": [
              {
                "type": "REKLAMA",
                "title": "Per gerai, kad būtų tiesa",
                "text": "„1000 monetų nemokamai – tik šiandien!“"
              },
              {
                "type": "SĄLYGA",
                "title": "Ko prašoma?",
                "text": "Svetainė prašo įvesti žaidimo paskyros slaptažodį."
              },
              {
                "type": "ĮRODYMAS",
                "title": "Neoficialus puslapis",
                "text": "Pasiūlymas nėra pateiktas oficialioje žaidimo paskyroje ar programėlėje."
              }
            ],
            "prompt": "Kaip elgsiesi?",
            "choices": [
              {
                "text": "Pasiūlymą ignoruoju, paskyros duomenų nevedu ir, jei reikia, pranešu suaugusiajam.",
                "correct": true,
                "feedback": "Teisingai. Prizai, kurie prašo slaptažodžio neoficialioje svetainėje, yra įtartini."
              },
              {
                "text": "Įvesiu slaptažodį tik kartą – tada viską ištrinsiu.",
                "correct": false,
                "feedback": "Vienas įvedimas jau gali atskleisti slaptažodį."
              },
              {
                "text": "Paprašysiu draugo pirmiau išbandyti savo paskyrą.",
                "correct": false,
                "feedback": "Rizikos perkelti draugui negalima."
              }
            ],
            "lesson": "Prieš prisijungdamas visada patikrink, ar esi oficialioje svetainėje."
          },
          {
            "room": 4,
            "kicker": "4 kambarys · 1/2",
            "title": "Įspėjimas apie prisijungimą",
            "brief": "Sistema pranešė apie prisijungimą iš nepažįstamo įrenginio.",
            "evidence": [
              {
                "type": "PRANEŠIMAS",
                "title": "Naujas įrenginys",
                "text": "„14:08 pastebėtas prisijungimas iš naujo įrenginio.“"
              },
              {
                "type": "ATMINTIS",
                "title": "Tu tuo metu...",
                "text": "Tuo metu buvai klasėje ir prie naujo įrenginio nesijungei."
              },
              {
                "type": "SAUGUMAS",
                "title": "Pagalbos veiksmai",
                "text": "Pranešti patikimam suaugusiajam, prisijungti per oficialų puslapį, pakeisti slaptažodį ir atsijungti nuo nepažįstamų sesijų, jei tai leidžiama."
              }
            ],
            "prompt": "Koks geriausias veiksmų planas?",
            "choices": [
              {
                "text": "Nieko nedarau – gal pranešimas pats dings.",
                "correct": false,
                "feedback": "Neįprastą prisijungimą reikia patikrinti, ne ignoruoti."
              },
              {
                "text": "Pasakau mokytojui ar kitam patikimam suaugusiajam; oficialiai patikrinu paskyrą ir pakeičiu slaptažodį.",
                "correct": true,
                "feedback": "Taip. Reaguojame ramiai, bet nedelsdami ir tik per žinomus saugius kanalus."
              },
              {
                "text": "Parašau slaptažodį viešame klasės pokalbyje ir klausiu, ar kas nors prisijungė.",
                "correct": false,
                "feedback": "Taip dar labiau atskleistum prieigą."
              }
            ],
            "lesson": "Jeigu įtariame įsilaužimą, prašome pagalbos ir imamės saugių atkūrimo veiksmų."
          },
          {
            "room": 4,
            "kicker": "4 kambarys · 2/2",
            "title": "Paskutinė saugyklos spyna",
            "brief": "Agentūra surinko 3 įrodymus. Dabar turi parinkti saugumo taisyklę, kuri apsaugos visą klasę.",
            "evidence": [
              {
                "type": "ĮRODYMAS A",
                "title": "Stiprus slaptažodis",
                "text": "Ilgas, nenuspėjamas slaptažodis apsunkina svetimą prisijungimą."
              },
              {
                "type": "ĮRODYMAS B",
                "title": "Įtartina nuoroda",
                "text": "Skubinanti žinutė ir keistas domenas rodo galimą apgaulę."
              },
              {
                "type": "ĮRODYMAS C",
                "title": "Prisijungimo kodas",
                "text": "Vienkartinis kodas neturi būti perduodamas jokiam prašančiam žmogui."
              }
            ],
            "prompt": "Kuri taisyklė teisingai apibendrina visą tyrimą?",
            "choices": [
              {
                "text": "Saugu, jei svetainė spalvinga ir joje yra mokyklos ženklas.",
                "correct": false,
                "feedback": "Svetainės išvaizdą galima nukopijuoti. Tikriname adresą ir įrodymus."
              },
              {
                "text": "Slaptažodį galiu pasakyti draugui, jei jis pažada jo neišduoti.",
                "correct": false,
                "feedback": "Slaptažodį ir kodus saugome nepriklausomai nuo pažadų."
              },
              {
                "text": "Saugau slaptažodį ir kodus, tikrinu nuorodas, o kilus abejonių kreipiuosi pagalbos.",
                "correct": true,
                "feedback": "Misija atlikta! Tai trys pagrindiniai saugios paskyros principai."
              }
            ],
            "lesson": "Paskyros saugumą užtikrina keli kartu taikomi įpročiai."
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