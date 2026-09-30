window.CASE_W04 = {
  code:"BYLA 5-F01 // FAILŲ CHAOSAS",
  title:"Failai 2.0",
  briefing:"Agentūros mokyklinio projekto saugykloje aptiktas failų chaosas: neaiškūs pavadinimai, skirtingi plėtiniai, netvarkingi aplankai ir supainiotos saugojimo vietos. Tavo užduotis – nustatyti failų tipus, atkurti logišką struktūrą, palyginti dydžius ir teisingai panaudoti ZIP archyvą.",
  agents:[
    {id:"echo",name:"AGENTAS AIDAS",role:"SIGNALŲ ANALITIKAS",desc:"Ramus, metodiškas, tikrina kiekvieną pėdsaką.",skin:0},
    {id:"mira",name:"AGENTĖ MIRA",role:"ĮRODYMŲ TYRĖJA",desc:"Sprendžia tik tada, kai turi pakankamai įrodymų.",skin:1},
    {id:"vanta",name:"AGENTAS VANTA",role:"SISTEMŲ TVARKYTOJAS",desc:"Greitai pastebi netvarką ir anomalijas.",skin:2},
    {id:"nova",name:"AGENTĖ NOVA",role:"DUOMENŲ SPECIALISTĖ",desc:"Mėgsta aiškią struktūrą ir tikslius dydžius.",skin:3},
    {id:"rook",name:"AGENTAS BOKŠTAS",role:"FAILŲ TYRĖJAS",desc:"Pirmiausia tikrina failo savybes, tik tada daro išvadą.",skin:4},
    {id:"iris",name:"AGENTĖ IRIS",role:"SAUGYKLOS ANALITIKĖ",desc:"Lygina vietinį ir debesijos saugojimą.",skin:5}
  ],
  rooms:[
    {
      id:"gateway",label:"SEKTORIUS 01",name:"FAILŲ VARTAI",enemy:"PLĖTINIŲ MASKUOTOJAS",enemyTag:"SUMAIŠYTI FAILŲ TIPAI",theme:"gateway",
      objective:"Atpažink failų tipus, plėtinius ir prasmingus pavadinimus.",
      cut:"Failų tipai atkurti. Dabar reikia sutvarkyti saugojimo struktūrą ir nuspręsti, kur failai turi gyventi.",
      challenges:[
        {type:"choice",prompt:"Kuris failas yra PowerPoint pateiktis?",evidence:["projektas.pptx","duomenys.xlsx","nuotrauka.png"],options:["projektas.pptx","duomenys.xlsx","nuotrauka.png"],correct:0,good:"Teisingai. .pptx yra PowerPoint pateikties formatas.",bad:"Žiūrėk į plėtinį po taško: PowerPoint pateiktys naudoja .pptx."},
        {type:"choice",prompt:"Kuris failas greičiausiai yra Excel skaičiuoklė?",options:["duomenys.pdf","duomenys.xlsx","duomenys.jpg"],correct:1,good:"Taip. .xlsx yra Excel skaičiuoklės formatas.",bad:"Excel darbalapių failai paprastai turi .xlsx plėtinį."},
        {type:"classify",statement:"Jei failą „foto.jpg“ tiesiog pervadinsiu į „foto.pdf“, jis taps tikru PDF dokumentu.",prompt:"Šis teiginys yra...",correct:"PRIELAIDA",good:"Teisingai. Vien pakeitus pavadinimo galūnę tikrasis failo formatas nepasikeičia.",bad:"Plėtinys padeda atpažinti formatą, bet vien jo pervadinimas failo turinio nekonvertuoja."},
        {type:"multi",prompt:"Pasirink DU pavadinimus, kurie padėtų suprasti failo turinį net jo neatidarius.",options:["5A_IT_failu_tyrimas.docx","asdf.docx","Eksperimento_duomenys.xlsx","Naujas dokumentas (7).docx"],correct:[0,2],good:"Būtent. Abu pavadinimai aiškiai pasako, kas yra failo viduje.",bad:"Prasmingas pavadinimas turi padėti failą atpažinti ir po kelių savaičių ar mėnesių."}
      ]
    },
    {
      id:"vault",label:"SEKTORIUS 02",name:"SAUGYKLOS MAZGAS",enemy:"CHAOSO RŪŠIUOTOJAS",enemyTag:"NETVARKINGA STRUKTŪRA",theme:"vault",
      objective:"Atkurk aplankų struktūrą ir pasirink tinkamą saugojimo vietą.",
      cut:"Saugyklos struktūra atkurta. Likęs paskutinis mazgas – failų dydžiai ir ZIP archyvavimo protokolas.",
      challenges:[
        {type:"multi",prompt:"Pasirink TRIS logiškas failo ir aplanko poras.",options:["klases_nuotrauka.jpg → Nuotraukos","projekto_aprasymas.docx → Dokumentai","eksperimento_duomenys.xlsx → Lentelės","pristatymas.pptx → Archyvai"],correct:[0,1,2],good:"Teisingai. Failo vieta atitinka jo paskirtį ir tipą.",bad:"Aplankas turi padėti greitai suprasti, kur tokio failo ieškotum."},
        {type:"choice",prompt:"Tą patį projektą nori tęsti mokykloje ir namuose. Kur patogiau laikyti pagrindinę darbo versiją?",options:["Tik viename mokyklos kompiuteryje","OneDrive debesijoje","Šiukšlinėje"],correct:1,good:"Taip. Debesijoje failą gali pasiekti iš skirtingų įrenginių prisijungęs prie savo paskyros.",bad:"Jei failo reikia keliuose įrenginiuose, debesijos saugykla paprastai yra patogesnė."},
        {type:"choice",prompt:"Interneto nėra, bet failą reikia atidaryti dabar. Kuris variantas patikimiausias?",options:["Failas saugomas tik debesijoje ir neatsisiųstas","Failo kopija yra šiame kompiuteryje","Turiu tik failo nuorodos pavadinimą"],correct:1,good:"Teisingai. Vietinė kopija kompiuteryje gali būti prieinama ir be interneto.",bad:"Failas, kuris yra tik debesijoje ir neatsisiųstas, gali būti neprieinamas be ryšio."},
        {type:"order",prompt:"Sudėliok failus nuo MAŽIAUSIO iki DIDŽIAUSIO pagal jų dydį.",items:["1,2 GB vaizdo įrašas","450 KB tekstas","6 MB nuotrauka"],correct:[1,2,0],good:"Puiku. Šiame pavyzdyje tvarka yra KB → MB → GB.",bad:"Palygink matavimo vienetus: KB yra mažiau už MB, o MB – mažiau už GB."}
      ]
    },
    {
      id:"core",label:"SEKTORIUS 03",name:"ARCHYVŲ BRANDUOLYS",enemy:"ZIP SUSPAUDĖJAS",enemyTag:"GALUTINIS PRIEŠAS // ARCHYVŲ CHAOSAS",theme:"core",
      objective:"Pritaikyk ZIP ir failų dydžių logiką, tada uždaryk bylą.",
      cut:"",
      challenges:[
        {type:"choice",prompt:"Turi 18 projekto failų ir nori juos perduoti kaip vieną paketą. Koks sprendimas prasmingiausias?",options:["Sukurti ZIP archyvą","Pervadinti visus failus į „1“","Pakeisti visų plėtinius į .jpg"],correct:0,good:"Teisingai. ZIP leidžia kelis failus ar aplankus supakuoti į vieną archyvą.",bad:"Tikslas yra patogiai supakuoti kelis failus, o ne keisti jų pavadinimus ar formatus."},
        {type:"choice",prompt:"Aplankas prieš glaudinimą buvo 48 MB, o ZIP archyvas – 31 MB. Ką tiksliai parodė šis bandymas?",options:["Šiuo atveju glaudinimas sumažino dydį","ZIP visada padidina failus","31 MB yra daugiau už 48 MB"],correct:0,good:"Taip. Šiuo konkrečiu atveju dydis sumažėjo nuo 48 MB iki 31 MB.",bad:"Lygink skaičius: 31 MB yra mažiau už 48 MB. Tačiau ne visi failų tipai susispaudžia vienodai."},
        {type:"classify",statement:"ZIP visada labai sumažina bet kokio failo dydį.",prompt:"Šis teiginys yra...",correct:"PRIELAIDA",good:"Teisingai. Glaudinimo rezultatas priklauso nuo failų tipo ir jų turinio.",bad:"Vienas sėkmingas glaudinimo bandymas neįrodo, kad visi failai visada susispaus taip pat."},
        {type:"multi",prompt:"Pasirink TRIS teisingas bylos išvadas.",options:["Failo plėtinys padeda suprasti jo tipą","Debesijoje saugomą failą galima pasiekti iš skirtingų įrenginių prisijungus prie paskyros","KB < MB < GB","ZIP visada padaro failus labai mažus"],correct:[0,1,2],good:"BYLA UŽDARYTA. Sujungei failų tipų, saugojimo, dydžių ir ZIP žinias.",bad:"Galutinėje išvadoje turi likti tik tai, ką tikrai gali pagrįsti – venk žodžio „visada“, kai rezultatas priklauso nuo situacijos."}
      ]
    }
  ]
};