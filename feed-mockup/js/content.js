"use strict";

/* Inhalte und feste Vorgaben der Simulation */

// Platzhalter für den Accountnamen; er wird erst beim Anzeigen ersetzt, weil er sich in den Einstellungen ändern lässt
const ACCOUNT_TOKEN = "@account";

const ACCOUNT_DEFAULTS = {
  username: "katastrophenschutz.hessen",
  displayName: "Katastrophenschutz Hessen",
  location: "Hessen",
  bio: "Informationen zum Zivil- und Katastrophenschutz in Hessen.",
  verified: true,
  followers: 12400,
  following: 180,
  avatar: null,
};

const VIEWER = "mein_profil";

// Begleittext, der standardmäßig unter jedem Beitrag steht
const CAPTION = [
  "Feuerwehr am Wochenende, THW-Ortsverband unter der Woche und hauptberuflich in der Klinik oder beim Energieversorger?",
  "Im Alltag passt das zusammen. Bei einer Großschadenslage oder Katastrophe werden aber alle gleichzeitig gebraucht. Dann zählt, wo Sie tatsächlich verfügbar sind.",
  "Wie viele Einsatzkräfte in Hessen bei mehreren Organisationen eingeplant sind oder in ihrem Hauptberuf in der Kritischen Infrastruktur unabkömmlich wären, soll eine landesweite Online-Abfrage klären. Sie läuft in gleicher Form in mehreren Bundesländern und hilft, uns besser auf große Lagen vorzubereiten.",
  "Eingeladen sind Einsatzkräfte aller Einsatzorganisationen in Hessen, auch wenn Sie nur in einer Organisation aktiv sind.",
  "So machen Sie mit: Fragen Sie Ihre Führungskraft nach den Zugangsdaten und nehmen Sie bis 31. Dezember 2026 teil.",
  "#Katastrophenschutz #Zivilschutz #Feuerwehr #THW #Rettungsdienst #Ehrenamt #KRITIS #Hessen",
];

// Vorgaben von Instagram, Stand Oktober 2026 laut gängigen Leitfäden (nicht aus offizieller Dokumentation)
const INSTAGRAM = {
  feedMinRatio: 3 / 4, // höchstes Hochformat im Feed
  feedMaxRatio: 1.91, // breitestes Querformat im Feed
  gridRatio: 3 / 4, // Kacheln im Profilraster
  storyRatio: 9 / 16,
  storySafeZone: 250 / 1920, // oben und unten verdeckt
  carouselMax: 20,
  captionMax: 2200,
  hashtagMax: 5,
  bioMax: 150,
  usernameMax: 30,
};

const CAMPAIGN_POSTS = [
  {
    id: "mehrfach-verplant",
    media: [
      {
        src: "images/mehrfach-verplant.png",
        width: 565,
        height: 680,
        alt: "Kampagnenmotiv (KI-generiert): Ein Mann und eine Frau in Einsatzkleidung stehen vor einem Feuerwehrfahrzeug, einem Rettungswagen und einem THW-Fahrzeug mit Blaulicht. Darunter auf dunkelblauem Grund der Text: Mehrfach verplant? Landesweite Abfrage für alle Einsatzkräfte im Zivil- und Katastrophenschutz in Hessen. Zugangsdaten bei Ihrer Führungskraft. Teilnahme bis zum 31. Dezember 2026. Unten rechts das Hessen-Logo.",
      },
    ],
    hoursAgo: 2,
    likes: 1284,
    commentCount: 38,
    comments: [
      { author: "markus.k_112", text: "Bei uns in der Wehr sind mindestens fünf Leute auch beim THW. Wenn es richtig knallt, fehlen die an einer Stelle. Gut, dass das mal jemand erfasst." },
      { author: "sanitaeterin.jule", text: "Hauptberuflich Rettungsdienst, nebenbei freiwillige Feuerwehr. Ich bin dann wohl gemeint." },
      { author: "anna.wehrt", text: "Wir haben die Zugangsdaten beim letzten Dienstabend bekommen." },
      { author: "jan.brandschutz", text: "Und was ist mit Leuten, die nur in einer Organisation sind? Sollen die auch mitmachen?" },
      { author: ACCOUNT_TOKEN, text: "@jan.brandschutz Ja, eingeladen sind Einsatzkräfte aller Einsatzorganisationen in Hessen, auch wenn sie nur in einer Organisation aktiv sind." },
    ],
  },
  {
    id: "einmal-sie-dreimal-verplant-mann",
    media: [
      {
        src: "images/einmal-sie-dreimal-verplant-mann.png",
        width: 567,
        height: 709,
        alt: "Kampagnenmotiv (KI-generiert): Ein Mann in Einsatzkleidung mit THW-Aufschrift steht mit dem Helm in der Hand zwischen Einsatzfahrzeugen. Rechts auf dunkelblauem Grund das Hessen-Logo und der Text: Abfrage im Zivil- und Katastrophenschutz. Einmal Sie. Dreimal verplant? Zugangsdaten gibt es bei Ihrer Führungskraft.",
      },
    ],
    hoursAgo: 26,
    likes: 963,
    commentCount: 21,
    comments: [
      { author: "t.becker_fw", text: "Einmal ich, dreimal verplant. Trifft es ziemlich genau." },
      { author: "kristina.drk", text: "Wäre interessant, die Ergebnisse später auch zu sehen." },
      { author: "ole.112", text: "Ich arbeite bei den Stadtwerken und bin Zugführer in der Feuerwehr. Im Ernstfall müsste ich mich entscheiden." },
      { author: "maja.rettet", text: "Schon an unsere Gruppe weitergeleitet." },
    ],
  },
  {
    id: "einmal-sie-dreimal-verplant-frau",
    media: [
      {
        src: "images/einmal-sie-dreimal-verplant-frau.png",
        width: 567,
        height: 711,
        alt: "Kampagnenmotiv (KI-generiert): Eine Frau in Einsatzkleidung mit THW-Aufschrift steht mit dem Helm unter dem Arm vor einem Rettungswagen und einem Einsatzfahrzeug. Rechts auf dunkelblauem Grund das Hessen-Logo und der Text: Abfrage im Zivil- und Katastrophenschutz. Einmal Sie. Dreimal verplant? Zugangsdaten gibt es bei Ihrer Führungskraft.",
      },
    ],
    hoursAgo: 72,
    likes: 1047,
    commentCount: 27,
    comments: [
      { author: "lisa.ehrenamt", text: "Gut, dass auch eine Frau im Einsatz gezeigt wird." },
      { author: "pascal.thw", text: "Habe die Zugangsdaten heute von meinem Zugführer bekommen." },
      { author: "r.hofmann", text: "Die Einsatzkleidung ist eine ziemlich wilde Mischung aus allen Organisationen." },
      { author: "nina.sanitaet", text: "Gilt das auch für Helferinnen und Helfer im Sanitätsdienst?" },
      { author: ACCOUNT_TOKEN, text: "@nina.sanitaet Eingeladen sind Einsatzkräfte aller Einsatzorganisationen in Hessen." },
    ],
  },
  {
    id: "wer-kommt-wenn-alle-rufen",
    media: [
      {
        src: "images/wer-kommt-wenn-alle-rufen.png",
        width: 566,
        height: 709,
        alt: "Kampagnenmotiv: Auf dunkelblauem Grund das Hessen-Logo und der Text: Feuerwehr, THW, Rettungsdienst und dazu der Hauptberuf. Wer kommt, wenn alle gleichzeitig rufen? Landesweite Abfrage zur Mehrfachverplanung im Zivil- und Katastrophenschutz. Mitmachen bis zum 31. Dezember 2026. Zugangsdaten bei Ihrer Führungskraft.",
      },
    ],
    hoursAgo: 120,
    likes: 702,
    commentCount: 16,
    comments: [
      { author: "f.schneider_kbi", text: "Die Frage stellt sich bei jeder Großlage. Gut, dass sie jetzt einmal systematisch gestellt wird." },
      { author: "carla.leitstelle", text: "Bis Ende Dezember ist noch Zeit, trotzdem lieber gleich erledigen." },
      { author: "dennis_fw", text: "In unserer WhatsApp-Gruppe geteilt." },
    ],
  },
];

const SHARE_CONTACTS = [
  "markus.k_112",
  "sanitaeterin.jule",
  "lukas.thw",
  "anna.wehrt",
  "ole.112",
  "maja.rettet",
  "dennis_fw",
  "kristina.drk",
];

const NOTIFICATIONS = [
  { user: ACCOUNT_TOKEN, text: "hat einen neuen Beitrag geteilt.", hoursAgo: 2, postId: "mehrfach-verplant" },
  { user: "sanitaeterin.jule", text: "hat angefangen, dir zu folgen.", hoursAgo: 5 },
  { user: "lukas.thw", text: `hat einen Beitrag von ${ACCOUNT_TOKEN} mit dir geteilt.`, hoursAgo: 25, postId: "einmal-sie-dreimal-verplant-mann" },
];

const REPORT_REASONS = [
  "Mir gefällt das nicht",
  "Spam",
  "Falschinformationen",
  "Betrug oder Täuschung",
  "Verletzung von Urheberrechten",
  "Etwas anderes",
];

// Gängige Displaygrößen in CSS-Pixeln; "auto" passt die Höhe ans Fenster an
const DEVICES = [
  { id: "auto", label: "Automatisch (400 px breit)", width: 400, height: null },
  { id: "small", label: "Kleines Smartphone (375 × 667)", width: 375, height: 667 },
  { id: "standard", label: "Standard-Smartphone (390 × 844)", width: 390, height: 844 },
  { id: "android", label: "Android (412 × 915)", width: 412, height: 915 },
  { id: "large", label: "Großes Smartphone (430 × 932)", width: 430, height: 932 },
];

const CTA_SUGGESTIONS = ["Mehr dazu", "Jetzt teilnehmen", "Registrieren", "Kontakt aufnehmen"];

const VISIBLE_COMMENTS = 2;
