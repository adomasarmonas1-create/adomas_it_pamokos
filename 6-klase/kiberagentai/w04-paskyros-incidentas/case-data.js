window.CASE_W04 = {
  code:"BYLA 6-S04 // ŠEŠĖLINIS PRISIJUNGIMAS",
  title:"Paskyros incidentas",
  briefing:"11:42 mokyklos paskyroje užfiksuotas prisijungimas iš naujo įrenginio. 11:51 iš tos paskyros bendraklasiams išsiųstos žinutės su nuoroda. Paskyros savininkas teigia jų nesiuntęs. Tavo užduotis – atskirti faktus nuo prielaidų, susieti įrodymus ir sudaryti saugų veiksmų planą.",
  agents:[
    {id:"echo",name:"AGENTAS AIDAS",role:"SIGNALŲ ANALITIKAS",desc:"Ramus, metodiškas, tikrina kiekvieną pėdsaką.",skin:0},
    {id:"mira",name:"AGENTĖ MIRA",role:"ĮRODYMŲ TYRĖJA",desc:"Sprendžia tik tada, kai turi pakankamai įrodymų.",skin:1},
    {id:"vanta",name:"AGENTAS VANTA",role:"INCIDENTŲ VALDYMAS",desc:"Greitai pastebi rizikos ženklus ir anomalijas.",skin:2},
    {id:"nova",name:"AGENTĖ NOVA",role:"PĖDSAKŲ SPECIALISTĖ",desc:"Mėgsta chronologiją ir ieško ryšio tarp įvykių.",skin:3},
    {id:"rook",name:"AGENTAS BOKŠTAS",role:"SISTEMŲ TYRĖJAS",desc:"Pirmiausia tikrina sistemą, tik tada daro išvadas.",skin:4},
    {id:"iris",name:"AGENTĖ IRIS",role:"INFORMACIJOS ANALITIKĖ",desc:"Lygina kelias versijas ir ieško neatitikimų.",skin:5}
  ],
  rooms:[
    {
      id:"gateway",label:"SEKTORIUS 01",name:"PAŠTO VARTAI",enemy:"LAIŠKŲ ŠMĖKLA",enemyTag:"SOCIALINĖS INŽINERIJOS PĖDSAKAS",theme:"gateway",
      objective:"Patikrink laišką ir nustatyk, kurie požymiai iš tikrųjų svarbūs.",
      cut:"Pirmas pėdsakas patvirtintas. Laiškas turi kelis phishing požymius. Tačiau tai dar neįrodo, kas vėliau prisijungė prie paskyros.",
      challenges:[
        {type:"choice",prompt:"Kuris požymių derinys labiausiai pagrindžia įtarimą, kad laiškas gali būti apgaulingas?",evidence:["Siuntėjas: support@school-help.example","Tekstas: „Patvirtink paskyrą per 5 minutes“","Nuoroda: login-m365-security.example"],options:["Laiške minima mokykla ir Microsoft 365.","Skubinimas, neįprastas siuntėjo domenas ir neįprastas prisijungimo adresas sutampa.","Laiškas parašytas be rašybos klaidų."],correct:1,good:"Teisingai. Vienas požymis gali nieko neįrodyti, bet keli nepriklausomi rizikos ženklai sustiprina įtarimą.",bad:"Ieškok ne vieno paviršinio požymio, o kelių tarpusavyje sutampančių rizikos ženklų."},
        {type:"classify",statement:"11:39 mokinys gavo laišką su nuoroda į prisijungimo puslapį.",prompt:"Šis sakinys byloje yra...",correct:"FAKTAS",good:"Taip. Tai užfiksuotas įvykis, o ne paaiškinimas, kodėl jis įvyko.",bad:"Patikrink: ar sakinys aprašo užfiksuotą įvykį, ar spėja jo priežastį?"},
        {type:"multi",prompt:"Pasirink DU požymius, kuriuos verta tikrinti prieš spaudžiant nuorodą.",evidence:["Ekrane matomas pažįstamas logotipas.","Tikrasis siuntėjo domenas.","Tikslus nuorodos adresas.","Laiško fono spalva."],correct:[1,2],good:"Būtent. Domenas ir tikslus adresas suteikia daugiau patikrinamos informacijos nei dizainas.",bad:"Gražus dizainas ir pažįstamas logotipas gali būti nukopijuoti. Ieškok patikrinamų techninių požymių."},
        {type:"choice",prompt:"Koks saugiausias pirmas veiksmas, jei laiškas prašo skubiai prisijungti?",options:["Spausti nuorodą, bet nieko nevesti.","Atsidaryti žinomą oficialų mokyklos / Microsoft 365 puslapį atskirai ir patikrinti, ar ten yra toks pranešimas.","Persiųsti nuorodą draugui ir paklausti, ar jam veikia."],correct:1,good:"Teisingai. Svarbią paskyrą tikriname per žinomą adresą, o ne per neaiškią nuorodą.",bad:"Saugus veiksmas neturėtų didinti rizikos ar platinti galimai pavojingos nuorodos."},
        {type:"classify",statement:"Mokinys tikrai pats atidavė slaptažodį sukčiui.",prompt:"Pagal šio kambario įrodymus tai yra...",correct:"PRIELAIDA",good:"Teisingai. Laiškas atrodo įtartinas, bet dar neturime įrodymo, kad slaptažodis buvo įvestas.",bad:"Įtartinas laiškas dar neįrodo, ką tiksliai padarė jo gavėjas."}
      ]
    },
    {
      id:"vault",label:"SEKTORIUS 02",name:"PRISIJUNGIMŲ SAUGYKLA",enemy:"SESIJŲ ŠMĖKLA",enemyTag:"NEPATVIRTINTA SESIJA",theme:"vault",
      objective:"Atkurk įvykių chronologiją ir neperženk to, ką įrodymai leidžia teigti.",
      cut:"Prisijungimo pėdsakas rastas. Nauja sesija atsirado po apgaulingo puslapio atidarymo, bet žurnalas nepasako, kas fiziškai sėdėjo prie įrenginio.",
      challenges:[
        {type:"choice",prompt:"Prisijungimų žurnale 11:42 matoma nauja sesija iš iki tol nematyto įrenginio. Ką tai patikimai rodo?",evidence:["11:42 — NEW DEVICE","11:43 — Session active","Location estimate: unknown"],options:["Kad konkretus klasės mokinys pavogė slaptažodį.","Kad paskyroje atsirado nauja sesija iš naujo įrenginio.","Kad paskyros savininkas meluoja."],correct:1,good:"Teisingai. Žurnalas patvirtina prisijungimo įvykį, bet ne žmogaus tapatybę.",bad:"Atskirk sistemos užfiksuotą įvykį nuo spėjimo, kas jį atliko."},
        {type:"order",prompt:"Sudėliok užfiksuotus įvykius chronologine tvarka.",items:["11:51 išsiųsta žinutė su nuoroda","11:39 gautas įtartinas laiškas","11:42 nauja prisijungimo sesija","11:40 atidarytas išorinis prisijungimo puslapis"],correct:[1,3,2,0],good:"Chronologija sutampa. Ji padeda pamatyti ryšį, bet pati savaime dar neįrodo priežasties.",bad:"Naudok laikus, o ne spėjimą apie priežastį."},
        {type:"classify",statement:"Kadangi nauja sesija atsirado po įtartino puslapio atidarymo, slaptažodis galėjo būti nutekintas.",prompt:"Šis sakinys yra...",correct:"PRIELAIDA",good:"Taip. Tai pagrįsta hipotezė, bet vis dar hipotezė, kol neturime daugiau įrodymų.",bad:"Žodis „galėjo“ signalizuoja išvadą, kurią dar reikia pagrįsti."},
        {type:"multi",prompt:"Kokie DU papildomi duomenys labiausiai padėtų tirti paskyros perėmimą?",options:["Paskyros aktyvių sesijų / prisijungimų istorija","Mokinio darbalaukio fono paveikslėlis","Ar slaptažodis buvo pakeistas po incidento","Mėgstamiausia mokinio spalva"],correct:[0,2],good:"Teisingai. Abu duomenys tiesiogiai susiję su paskyros prieiga ir reakcija į incidentą.",bad:"Rinkis tai, kas gali patvirtinti arba paneigti paskyros perėmimo hipotezę."},
        {type:"choice",prompt:"Kuri išvada šiame etape tiksliausia?",options:["Įrodyta, kad paskyrą nulaužė konkretus asmuo.","Turime požymių, suderinamų su paskyros duomenų nutekėjimu, tačiau dar negalime nustatyti konkretaus žmogaus.","Nieko neįvyko, nes paskyra vis dar veikia."],correct:1,good:"Puiku. Tai tiksli išvada, neperžengianti turimų įrodymų.",bad:"Gera tyrimo išvada turi aiškiai parodyti ir tai, ką žinome, ir tai, ko dar nežinome."}
      ]
    },
    {
      id:"archive",label:"SEKTORIUS 03",name:"ĮRODYMŲ ARCHYVAS",enemy:"VEIDRODINIS FAILAS",enemyTag:"IŠKRAIPYTAS KONTEKSTAS",theme:"archive",
      objective:"Palygink įrodymų vertę: žinutės, ekranvaizdžiai, originalūs failai ir versijų istorija.",
      cut:"Bylos kontekstas atkurtas. Svarbiausi buvo ne gražiausiai atrodantys įrodymai, o tie, kurių kilmę ir laiką galima patikrinti.",
      challenges:[
        {type:"choice",prompt:"Reikia nustatyti, kada bendrinamame dokumente atsirado pavojinga nuoroda. Kuris įrodymas vertingiausias?",options:["Ekrano nuotrauka su matomu tekstu.","Originalaus debesijos dokumento versijų istorija.","Žinutė „man atrodo, kad ji atsirado vakar“."],correct:1,good:"Taip. Versijų istorija suteikia patikrinamą informaciją apie pakeitimų laiką ir autorių paskyrą.",bad:"Klausimas yra apie pakeitimo laiką ir kilmę – rinkis įrodymą, kuris tai leidžia patikrinti."},
        {type:"classify",statement:"Versijų istorijoje 11:48 paskyra „mokinys@mokykla.lt“ įterpė nuorodą.",prompt:"Tai yra...",correct:"FAKTAS",good:"Taip. Tai sistemos užfiksuotas veiksmas konkrečioje paskyroje.",bad:"Jei tai tiesiogiai užfiksuota sistemos istorijoje, tai faktas apie paskyros veiklą."},
        {type:"classify",statement:"11:48 nuorodą įterpė pats paskyros savininkas.",prompt:"Tai yra...",correct:"PRIELAIDA",good:"Teisingai. Paskyros vardas nereiškia, kad žinome, kas fiziškai atliko veiksmą.",bad:"Paskyros veikla ir fizinio žmogaus tapatybė nėra tas pats."},
        {type:"multi",prompt:"Pasirink TRIS įrodymus, kuriuos verta įtraukti į incidento ataskaitą.",options:["Originali įtartino laiško antraštė ir siuntėjo adresas","Prisijungimų istorijos išrašas","Originalaus failo versijų istorija","Draugo spėjimas, kas galėjo tai padaryti","Ekrano užsklandos spalva"],correct:[0,1,2],good:"Teisingai. Šiuos tris įrodymus galima patikrinti ir susieti chronologiškai.",bad:"Ataskaitoje prioritetą teik patikrinamiems įrodymams, ne gandams ar nereikšmingoms detalėms."},
        {type:"choice",prompt:"Ką geriausia padaryti su įtartinu laišku po incidento?",options:["Persiųsti visai klasei kaip pavyzdį.","Išsaugoti reikalingą informaciją / ekrano vaizdą tyrimui ir pranešti atsakingam žmogui, neplatinant nuorodos.","Iš karto ištrinti viską ir niekam nesakyti."],correct:1,good:"Taip. Svarbu išsaugoti pakankamai informacijos tyrimui, bet neplatinti galimos grėsmės.",bad:"Reakcija turi ir sumažinti riziką, ir palikti pakankamai duomenų incidentui suprasti."}
      ]
    },
    {
      id:"core",label:"SEKTORIUS 04",name:"IZOLIAVIMO BRANDUOLYS",enemy:"ŠAKNINIS TRIKDIS",enemyTag:"BOSAS // INCIDENTO BRANDUOLYS",theme:"core",
      objective:"Uždaryk incidentą: pasirink pagrįstą hipotezę ir sudėliok saugų veiksmų planą.",
      cut:"",
      challenges:[
        {type:"choice",prompt:"Kuri galutinė hipotezė geriausiai atitinka visus surinktus įrodymus?",options:["Paskyros duomenys greičiausiai nutekėjo per apgaulingą prisijungimo puslapį; po to atsirado nauja sesija ir paskyra buvo panaudota žinutėms bei failo pakeitimui.","Tikrai žinome, kuris klasės mokinys pavogė slaptažodį.","Tai tik programos klaida, nes paskyra nebuvo užblokuota."],correct:0,good:"Tai geriausiai įrodymais pagrįsta hipotezė ir ji neapsimeta žinanti daugiau, nei iš tikrųjų žinome.",bad:"Galutinė hipotezė turi paaiškinti kelis įrodymus kartu ir neperžengti jų ribų."},
        {type:"order",prompt:"Sudėliok pirmuosius veiksmus po galimo paskyros perėmimo.",items:["Pranešti atsakingam suaugusiajam / IT","Pakeisti slaptažodį per tikrą paskyros puslapį","Atsijungti nuo kitų aktyvių sesijų ir patikrinti veiklą","Persiųsti įtartiną nuorodą draugams"],correct:[1,2,0],ignore:[3],good:"Puiku. Pirmiausia apsaugoma paskyra, tada kontroliuojamos sesijos ir incidentas perduodamas atsakingam žmogui.",bad:"Veiksmų planas turi mažinti žalą. Pavojingos nuorodos platinimas nėra incidento valdymo žingsnis."},
        {type:"choice",prompt:"Kodėl negalime ataskaitoje rašyti „žinome, kas tai padarė“?",options:["Nes incidentai apskritai neturi kaltininkų.","Nes turime paskyros ir sistemos veiklos įrodymų, bet nepakankamai įrodymų konkretaus žmogaus fizinei tapatybei nustatyti.","Nes prisijungimų istorija niekada nėra naudinga."],correct:1,good:"Teisingai. Tyrėjas atskiria sistemos įrodymą nuo nepatvirtintos tapatybės išvados.",bad:"Klausimas ne apie tai, ar žurnalai naudingi. Jis apie tai, ką jie leidžia ir ko neleidžia teigti."},
        {type:"multi",prompt:"Kokie DU veiksmai padėtų sumažinti panašaus incidento tikimybę ateityje?",options:["Naudoti dviejų veiksmų patvirtinimą, jei jis prieinamas","Prisijungimo nuorodas tikrinti ir svarbias paskyras atsidaryti per žinomą adresą","Naudoti tą patį slaptažodį visose sistemose","Išjungti visus saugumo pranešimus"],correct:[0,1],good:"Taip. Abu veiksmai sumažina riziką net tada, kai vienas apsaugos sluoksnis suklaidinamas.",bad:"Rinkis veiksmus, kurie prideda apsaugos sluoksnį arba mažina phishing riziką."},
        {type:"choice",prompt:"Paskutinis sprendimas. Koks yra gero kiberagento principas?",options:["Greitai pasirinkti pirmą tikėtiną paaiškinimą.","Rinkti patikrinamus įrodymus, atskirti faktus nuo prielaidų ir išvadą keisti, jei atsiranda naujų duomenų.","Visada pasitikėti tuo, kas atrodo profesionaliai."],correct:1,good:"BYLA UŽDARYTA. Tyrimas baigtas ne spėjimu, o įrodymais.",bad:"Kiberagento stiprybė yra ne greitas spėjimas, o įrodymais pagrįstas sprendimas."}
      ]
    }
  ]
};