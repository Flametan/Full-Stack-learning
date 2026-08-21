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
npm run build   # Statischer Produktions-Export nach ./out
npm run start   # Export lokal unter http://localhost:3000 ausliefern
npm run lint    # Linting
```

## Deployment (GitHub Pages)

Die Seite wird als statischer Export (`next build` mit `output: "export"`) gebaut und über
`.github/workflows/deploy.yml` automatisch auf GitHub Pages veröffentlicht, sobald auf `main`
oder `claude/fullstack-learning-curriculum-kx0aer` gepusht wird (oder manuell über den
„Run workflow“-Button im Actions-Tab).

**Einmalig nötig, damit das Deployment tatsächlich live geht** (siehe Repository-Einstellungen):

1. **Sichtbarkeit:** GitHub Pages benötigt auf dem kostenlosen Plan ein öffentliches Repository
   (Settings → General → Danger Zone → Change repository visibility).
2. **Pages-Quelle:** Settings → Pages → Build and deployment → Source auf **„GitHub Actions“**
   stellen.

Nach dem nächsten Push läuft der Workflow automatisch durch; die URL erscheint danach im
Actions-Tab des jeweiligen Workflow-Runs (z. B. `https://<username>.github.io/<repo>/`).

In der GitHub-Actions-Umgebung wird automatisch ein Pfadpräfix (`basePath`) auf Basis des
Repository-Namens gesetzt (siehe `next.config.js`), damit alle internen Links unter dem
GitHub-Pages-Unterpfad funktionieren. Lokale Builds (`npm run build` ohne CI-Umgebung) bleiben
unter `/` erreichbar.
