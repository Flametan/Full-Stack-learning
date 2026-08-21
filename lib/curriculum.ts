export type Chapter = {
  id: string;
  number: number;
  title: string;
  goal: string;
  topics: string[];
  duration: string;
  href?: string; // gesetzt, wenn das Modul bereits ausgearbeitet ist
};

export type Phase = {
  id: string;
  title: string;
  subtitle: string;
  color: string; // Tailwind-Farbklasse für Akzente
  chapters: Chapter[];
};

export const phases: Phase[] = [
  {
    id: "grundlagen",
    title: "Phase 1 · Grundlagen des Web",
    subtitle: "Wie das Web funktioniert und wie man Seiten strukturiert & gestaltet.",
    color: "accent",
    chapters: [
      {
        id: "wie-funktioniert-das-web",
        number: 1,
        title: "Wie funktioniert das Web?",
        goal: "Client-Server-Modell, HTTP-Requests und die Rolle des Browsers verstehen.",
        topics: ["Client vs. Server", "URL, DNS & HTTP", "Request/Response-Zyklus", "Was macht ein Browser?"],
        duration: "1–2 Std.",
      },
      {
        id: "html-css-basis",
        number: 2,
        title: "HTML/CSS-Basis",
        goal: "Eine erste Webseite semantisch strukturieren und mit CSS gestalten.",
        topics: ["HTML-Grundgerüst & semantische Tags", "CSS-Selektoren & Box-Modell", "Farben, Typografie, Spacing"],
        duration: "3–4 Std.",
        href: "/module/html-css-basis",
      },
      {
        id: "css-layout",
        number: 3,
        title: "CSS-Layout & Responsive Design",
        goal: "Layouts mit Flexbox und Grid bauen, die auf jedem Bildschirm funktionieren.",
        topics: ["Flexbox", "CSS Grid", "Media Queries", "Mobile-First-Prinzip"],
        duration: "3–4 Std.",
        href: "/module/css-layout",
      },
      {
        id: "git-github",
        number: 4,
        title: "Versionskontrolle mit Git & GitHub",
        goal: "Code-Änderungen nachvollziehbar speichern und mit anderen teilen.",
        topics: ["init, add, commit, push", "Branches & Merges", "Pull Requests", ".gitignore"],
        duration: "2 Std.",
        href: "/module/git-github",
      },
    ],
  },
  {
    id: "javascript",
    title: "Phase 2 · JavaScript-Grundlagen",
    subtitle: "Statische Seiten werden interaktiv.",
    color: "accent2",
    chapters: [
      {
        id: "js-grundlagen",
        number: 5,
        title: "JavaScript-Grundlagen",
        goal: "Variablen, Datentypen, Funktionen und Kontrollstrukturen sicher anwenden.",
        topics: ["let/const, Datentypen", "Funktionen & Scope", "if/else, Schleifen", "Arrays & Objekte (Basis)"],
        duration: "4 Std.",
      },
      {
        id: "dom-events",
        number: 6,
        title: "DOM-Manipulation & Events",
        goal: "Seiteninhalte per JavaScript verändern und auf Nutzerinteraktionen reagieren.",
        topics: ["DOM-Baum", "querySelector & Co.", "Event-Listener", "Formulare auslesen"],
        duration: "3 Std.",
      },
      {
        id: "modernes-js",
        number: 7,
        title: "Modernes JavaScript (ES6+)",
        goal: "Zeitgemäßen, lesbaren JS-Code mit modernen Sprachfeatures schreiben.",
        topics: ["Arrow Functions", "Destructuring & Spread", "Array-Methoden (map/filter/reduce)", "Module (import/export)"],
        duration: "3 Std.",
      },
      {
        id: "async-js",
        number: 8,
        title: "Asynchrones JavaScript",
        goal: "Daten von externen Quellen laden, ohne die Seite zu blockieren.",
        topics: ["Callbacks → Promises", "async/await", "Fetch API", "Fehlerbehandlung mit try/catch"],
        duration: "3 Std.",
      },
    ],
  },
  {
    id: "backend",
    title: "Phase 3 · Backend-Entwicklung",
    subtitle: "Server, Datenbanken und die erste eigene API.",
    color: "mint",
    chapters: [
      {
        id: "node-grundlagen",
        number: 9,
        title: "Node.js-Grundlagen",
        goal: "JavaScript außerhalb des Browsers ausführen und mit npm arbeiten.",
        topics: ["Node.js-Runtime", "npm & package.json", "Eigene Module", "Das fs-Modul"],
        duration: "2–3 Std.",
      },
      {
        id: "express-api",
        number: 10,
        title: "Erste API mit Express.js",
        goal: "Eine REST-API mit Routen, Middleware und JSON-Antworten aufbauen.",
        topics: ["Express-Grundgerüst", "Routing (GET/POST/PUT/DELETE)", "Middleware", "REST-Prinzipien"],
        duration: "4 Std.",
      },
      {
        id: "sqlite-sql",
        number: 11,
        title: "Datenbanken: SQLite & SQL-Grundlagen",
        goal: "Daten dauerhaft speichern und mit SQL abfragen.",
        topics: ["Tabellen & Schemas", "SELECT, INSERT, UPDATE, DELETE", "SQLite in Node.js einbinden", "Primärschlüssel & Beziehungen"],
        duration: "3–4 Std.",
      },
      {
        id: "crud-api",
        number: 12,
        title: "CRUD-API mit Express + SQLite",
        goal: "Eine vollständige CRUD-API bauen, die Daten persistent verwaltet.",
        topics: ["Datenbank-Anbindung in Express", "CRUD-Endpunkte", "Validierung von Eingaben", "Fehler- & Statuscodes"],
        duration: "4 Std.",
      },
    ],
  },
  {
    id: "fullstack",
    title: "Phase 4 · Full-Stack-Integration",
    subtitle: "Frontend und Backend verbinden – bis zur fertigen Anwendung.",
    color: "ink",
    chapters: [
      {
        id: "frontend-backend",
        number: 13,
        title: "Frontend-Backend-Verbindung",
        goal: "Das Frontend per fetch() an die eigene API anbinden.",
        topics: ["fetch() gegen eigene API", "CORS verstehen", "JSON senden & empfangen", "Ladezustände & Fehler im UI"],
        duration: "3 Std.",
      },
      {
        id: "auth-security",
        number: 14,
        title: "Authentifizierung & Sicherheit",
        goal: "Nutzer sicher registrieren, einloggen und Daten schützen.",
        topics: ["Passwort-Hashing (bcrypt)", "Sessions vs. JWT", "Geschützte Routen", "Grundlegende Sicherheitsregeln (XSS, SQL-Injection)"],
        duration: "4 Std.",
      },
      {
        id: "abschlussprojekt",
        number: 15,
        title: "Deployment & Abschlussprojekt",
        goal: "Die erste vollständige Full-Stack-Anwendung bauen und veröffentlichen.",
        topics: ["Projektplanung", "Zusammenspiel aller Bausteine", "Deployment (z. B. Render/Fly.io)", "Nächste Lernschritte"],
        duration: "6–8 Std.",
      },
    ],
  },
];

export const allChapters: Chapter[] = phases.flatMap((p) => p.chapters);
export const totalChapters = allChapters.length;
