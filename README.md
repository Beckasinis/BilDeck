# BilDeck – Trimma Teorin 🃏

En flashcard-app för körkortsteori byggd med **active recall**-metodik. Användaren tränar genom att aktivt försöka minnas svaret innan kortet vänds, istället för att passivt läsa. Korten sorteras i en aktiv hög och en klar hög och spelas om. Varje omgång sorterar man bort fler kort som man lärt sig och leken koncentreras allt mer på kort man har svårt för vilket övar minnet, tills alla kort klarats utan misstag.

## Collaborators

- **Annelie Johansson Rova** - Spellogik och kortfunktion, mappstruktur, designsystem, ikoner, HomeView-sektioner, SQL-input, databasstruktur.
- **Rebecca Martis** - Kortinnehåll och kunskapsbas (NotebookLM), Supabase-databas och API, Hero, Dropdown, Testimonials, Login/Sign-up, deployment.

---

## 🎬 Live demo

[bildeck.netlify.app](https://bildeck.netlify.app)

---

## 📸 Screenshots

| Hero (mobil) | Kortvy (desktop) |
|---|---|
| ![Hero mobile](screenshot-hero-mobile.png) | ![Deck desktop](screenshot-deck-desktop.png) |

| Kortvy (mobil) | Merchandise |
|---|---|
| ![Deck mobile](screenshot-deck-mobile.png) | ![Merchandise](screenshot-merchandise.png) |

---

## Projektbeskrivning

BilDeck är en webbaserad flashcard-app som hjälper körkortsaspiranter att lära sig teorin på rätt sätt. Appen bygger på **active recall** - en vetenskapligt bevisad inlärningsmetod där du aktivt försöker hämta svaret ur minnet innan du ser facit. Det är den mentala ansträngningen som stärker minnesspåret, till skillnad från att passivt läsa om svaret.

Varje kort kan ha tre typer av innehåll: vanlig text, kategoriikon eller SVG-vägmärke. Användaren styr med swipe, piltangenter eller klick och sorterar korten i en aktiv hög (osäker) eller klar hög (klar). Sessionen är klar när den aktiva högen är tom,  men minnet kräver repetition, så appen uppmuntrar till att spela om.

Projektet är byggt av ett tvåpersonersteam som skoluppgift i kursen JavaScript 2 med React.

---

## ✨ Funktioner

- **Flashcards med flip-animation** - fråga på framsidan, svar på baksidan
- **Informations module** - som öppnas när man trycker på info symbolen på svarssidan av kortet.
- **Tre styrlägen** - swipe (touch), piltangenter och klick
- **Aktiv hög / Klar hög** - Zustand håller koll på framsteg per kategori
- **Framsteg sparas** - progress persisteras i `localStorage` mellan sessioner
- **SVG-stöd för vägmärken** - saniterad SVG renderas direkt i kortet via DOMPurify
- **Auto-skalning av text** - egen `useFitText`-hook krymper text så att den alltid får plats
- **Responsiv layout** - anpassad för portrait, landscape och desktop
- **Light- och darkmode** - följer användarens systeminställningar automatiskt
- **Inloggning / Registrering** - Supabase Auth med e-postverifiering och välkomstmeddelande
- **Testimonials** - hämtas från Supabase och slumpas vid varje sidladdning
- **Loading- och error state** - genomgående hantering med tydliga meddelanden
- **404-sida** - fångar ogiltiga routes

---

## 🛠 Tech stack

| Verktyg | Användning |
|---|---|
| [React 19](https://react.dev/) | UI-ramverk |
| [Vite](https://vitejs.dev/) | Byggverktyg och dev-server |
| [React Router](https://reactrouter.com/) | Klientsidig routing med URL-parametrar |
| [Zustand](https://zustand-demo.pmnd.rs/) | Global state — session, kategorier och kortprogress |
| [Supabase](https://supabase.com/) | Databas (cards, categories, testimonials) och Auth |
| [DOMPurify](https://github.com/cure53/DOMPurify) | Sanitering av SVG-innehåll från databasen |
| CSS (vanilla) | Design system med CSS custom properties, light/dark mode |

---

## ⚙️ Kom igång

### Förkrav

- Node.js 18+
- Ett [Supabase](https://supabase.com/)-konto med tabellerna `cards`, `categories` och `testimonials`

### Installation

1. Klona repot:
   ```bash
   git clone https://github.com/ANVÄNDARNAMN/bildeck.git
   cd bildeck
   ```

2. Installera beroenden:
   ```bash
   npm install
   ```

3. Skapa en `.env`-fil i rooten (se `.env.exemple` som mall):
   ```env
   VITE_SUPABASE_URL=https://ditt-projekt.supabase.co
   VITE_SUPABASE_ANON_KEY=din-anon-nyckel
   ```

4. Starta utvecklingsservern:
   ```bash
   npm run dev
   ```

5. Öppna [http://localhost:5173](http://localhost:5173) i webbläsaren.

---

## 🗄 Supabase-struktur

Appen förutsätter tre tabeller i Supabase:

**`categories`** — en rad per kortlek/kategori  
`id`, `name`, `icon` (SVG-sträng), `color_light`, `color_dark`, `display_type`  
(Vägmärken tar emot `svg` som display_type och renderar dessa under frågan om vad skylten betyder, övriga har `text` som display_type)

**`cards`** — ett kort per rad  
`id`, `category_id`, `question`, `answer`, `info`

**`testimonials`** — användarrecensioner  
`id`, `name`, `age`, `review`, `rating`, `testimonial`, `img`

---

## 📁 Mappstruktur

```
bildeck/
├── public/
│   ├── fonts/
│   └── img/
├── src/
│   ├── components/
│   │   ├── button/
│   │   ├── dropdown/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── icons/
│   │   │   ├── CategoryIcon.jsx
│   │   │   └── InfoIcon.jsx
│   │   ├── loginModal/
│   │   └── wordmark/
│   ├── services/
│   │   └── deckService.js       # API-anrop mot Supabase (cards, categories)
│   ├── stores/
│   │   ├── useCategoryStore.js  # Kategorier med lazy-fetch
│   │   ├── useDeckStore.js      # Kortprogress och kölogik (persisteras i localStorage)
│   │   ├── useModalStore.js     # Login/signup-modal
│   │   └── useSessionStore.js   # Inloggad användare och session
│   ├── utils/
│   │   └── supabase.js          # Supabase-klient
│   ├── views/
│   │   ├── deck/
│   │   │   ├── card/            # Kortkomponent med flip och auto-skalning
│   │   │   ├── completion/      # "Bra jobbat!"-skärm
│   │   │   ├── infoModal/       # Förklaringsmodal per kort
│   │   │   ├── Deck.jsx
│   │   │   └── deck.css
│   │   ├── home/
│   │   │   ├── hero/
│   │   │   ├── sections/
│   │   │   │   ├── howto/       # "Så här lär du dig"-sektion
│   │   │   │   ├── product/     # Fysiska kort / merchandise
│   │   │   │   ├── science/     # Vetenskapssektion med glömskkurva
│   │   │   │   └── testimonials/
│   │   │   ├── home.jsx
│   │   │   └── home.css
│   │   ├── notfound/
│   │   └── signup/
│   ├── App.jsx
│   ├── app.css
│   └── main.jsx
├── .env.exemple
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

## 🧠 Tekniska val och utmaningar

**Kortinnehåll via NotebookLM** - Kortdatan bygger på aktuell information från flera officiella källor, sammanställd i NotebookLM till en ren kunskapsbas. Därifrån genererades frågor och svar som sedan importerades till Supabase. Upplägget säkerställer att innehållet är korrekt och konsekvent, och att testdata enkelt kunde bytas ut mot produktionsklart material när spellogiken var på plats.

**Zustand med `persist`-middleware** - Kortprogress sparas i `localStorage` automatiskt via Zustand. Kön (ordningen på korten) persisteras däremot inte, den byggs om och slumpas om vid varje sidladdning för att ge variation och hindra memorisering av kortordning.

**Stale closure-problemet** - Tangentbords- och swipe-lyssnare registreras med `addEventListener` och riskerar att läsa gamla värden från closure. Lösningen är refs (`cardsRef`, `categoryIdRef`) som alltid håller senaste värdet utan att trigga omregistrering av lyssnare.

**`useFitText`-hook** - Korten har fast storlek men textinnehållet varierar kraftigt. En egen hook minskar font-size stegvis från 48px tills texten inte längre flödar över. En `ResizeObserver` säkerställer att anpassningen även sker vid layoutförändringar.

**SVG-vägmärken** - Vägmärkeskort renderar SVG-markup direkt från databasen med `dangerouslySetInnerHTML`. All SVG-data saniteras via DOMPurify innan rendering för att förhindra XSS.

**PWA valdes bort** - Under installationen visade sig PWA-stöd inkompatibelt med Vite 8. Nedgradering av Vite krockade i sin tur med senaste React-versionen. PWA ligger i backloggen.

**Hamburgermeny valdes bort** - Med så få vyer bedömdes en hamburgermeny som onödig komplexitet för det aktuella scopet.

**Darkmode som systeminställning** - Istället för en manuell toggle följer appen användarens systeminställning via `prefers-color-scheme`. En toggle kan tillkomma i en framtida version.

---

## 🗺 Utrymme för fortsatt utveckling

Projektet planerades iterativt med en tydlig MVP som prioritet. Vi ville säkra att grundfunktionaliteten var solid och kurskraven uppfyllda innan vi gick vidare. Utöver det som levererades fanns fler steg inplanerade i mån av tid, och en önskelista för framtida versioner.

### Nästa steg (planerat men hann inte med)
- **Alt-texter** - Bilder saknar ännu korrekta alt-texter för tillgänglighet
- **Loading-indikator** - En animerad laddningsindikator (bar eller bollar) istället för text

### Önskelista
- **Blandade Lekar** - Val att blanda flera kattegorier och möjlig extra kategori för inloggade användare á "Mina svåraste kort"
- **Kategori färger** - Darkmode och lightmode färger för varje kategori, Supabase är förberedd för dessa. 
- **Grafiklager** - Ett Grafik lager med z-index mellan kort och innehåll som blendas mot "kortet under" och ger vattenstämpel effekt som passar valda färger.
- **Spara framsteg i Supabase** - Kortstatus (active/done) med tidstämpel sparas både i `localStorage` och i Supabase, så att framsteg synkas mellan enheter och sessioner
- **Offline-stöd** — Verifiera att kort, SVG och spellogik fungerar utan nätverksanslutning; synka när anslutningen återkommer
- **Inloggningspåminnelse** - Modal med "Logga in om du vill spara dina framsteg" och kryssrutan "Visa inte igen"
- **Återuppta spel** - Inloggad användare erbjuds att fortsätta senaste påbörjade kortlek
- **Dark mode-toggle** - Manuell växling som komplement till systeminställningen
- **PWA** - Installationsbart som app på mobil; avvaktar tills ekosystemet är kompatibelt med Vite 8 och React 19
- **FramerMotion** - Annimerade kort som flyttar sig över skärmen
