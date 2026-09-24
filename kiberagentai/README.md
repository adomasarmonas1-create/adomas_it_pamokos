# KIBERAGENTAI

Duomenimis valdomas 2–6 klasių kibernetinio raštingumo prototipas.

## Struktūra

- `index.html` – vienas žaidimo / bylų variklio puslapis.
- `styles.css` – bendras dizainas.
- `app.js` – bendras žaidimo variklis.
- `levels.js` – klasių ir lygių turinys.
- `legacy-v3/` – ankstesnė Cyber Agentų versija, išsaugota istorijai.

## Kaip pridėti naują lygį

Naujo HTML kurti nereikia.

1. Atidaryk `levels.js`.
2. Rask klasę, pvz. `"5"`.
3. Į jos `levels` masyvą pridėk naują lygio objektą.
4. Lygį sudaro `id`, `title`, `subtitle`, `difficulty`, `minutes`, `briefing` ir `stages`.
5. Kiekviename etape pateikiami `evidence`, `prompt` ir `choices`.

Tiesioginė klasės nuoroda:
`/kiberagentai/?grade=5`

Tiesioginė lygio nuoroda:
`/kiberagentai/?grade=5&level=5-01`

## Pedagoginė taisyklė

Kiekvieno naujo lygio turinys kuriamas pagal atitinkamos klasės ilgalaikį IT planą:
- 2 kl. – vieša / privatu, saugus pasirinkimas;
- 3 kl. – saugi paskyra, prisijungimo duomenys, įtartinos nuorodos;
- 4 kl. – šaltinių patikimumas;
- 5 kl. – phishing, socialinė inžinerija, incidento analizė;
- 6 kl. – skaitmeniniai įrodymai, metaduomenų idėja, argumentuota išvada.

Vyresnėms klasėms vengiama vaikiškų akivaizdžių klausimų – naudojami keli įrodymai, tikėtini pasirinkimai ir sprendimo pagrindimas.
