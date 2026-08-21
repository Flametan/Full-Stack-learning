# Full-Stack Lernpfad

Interaktive Lernplattform für moderne Full-Stack-Webentwicklung. Anfänger und leicht
Fortgeschrittene lernen Schritt für Schritt – von den Grundlagen des Web bis zur ersten
vollständigen, deploybaren Anwendung.

## Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Curriculum-Stack (Lerninhalt):** HTML, CSS, JavaScript (ES6+), Node.js, Express, SQLite

## Struktur

```
app/
  page.tsx                        Startseite: didaktisches Konzept + Kapitelübersicht
  module/html-css-basis/page.tsx  Ausgearbeitetes erstes Praxis-Modul
components/                       CodeBlock, LivePreview, SolutionReveal, ChapterCard, …
lib/curriculum.ts                 Datenmodell der 15 Kapitel (4 Phasen)
```

## Didaktisches Konzept

Jedes Modul folgt derselben Struktur:

1. **Theorie** – kurze, präzise Erklärung der Kernkonzepte (max. 300 Wörter, ohne Jargon).
2. **Praxisbeispiel** – ein konkreter, schrittweiser Code-Walkthrough mit Live-Vorschau.
3. **Übungsaufgabe** – eine kleine Aufgabe inklusive Musterlösung mit Erklärung (per Klick
   einblendbar).

Das Curriculum ist in vier Phasen gegliedert: Grundlagen des Web → JavaScript → Backend →
Full-Stack-Integration, insgesamt 15 Kapitel bis zum Abschlussprojekt.

## Entwicklung

```bash
npm install
npm run dev
```

Die Seite läuft danach unter `http://localhost:3000`.

```bash
npm run build   # Produktions-Build
npm run lint    # Linting
```
