import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import CodeBlock from "@/components/CodeBlock";
import LivePreview from "@/components/LivePreview";
import SolutionReveal from "@/components/SolutionReveal";

const htmlSnippet = `<body>
  <header class="nav">
    <span class="nav__logo">DevStudio</span>
    <nav class="nav__links">
      <a href="#">Start</a>
      <a href="#">Projekte</a>
      <a href="#">Kontakt</a>
    </nav>
  </header>

  <main>
    <section class="karten-grid">
      <article class="karte">
        <h2>Schnell</h2>
        <p>Optimierte Ladezeiten dank moderner Build-Tools.</p>
      </article>
      <article class="karte">
        <h2>Responsiv</h2>
        <p>Funktioniert auf Handy, Tablet und Desktop gleichermaßen.</p>
      </article>
      <article class="karte">
        <h2>Zugänglich</h2>
        <p>Semantisches HTML und ausreichend Kontrast für alle.</p>
      </article>
    </section>
  </main>
</body>`;

const navCssSnippet = `/* Mobile-first: Das ist der Basis-Stil für kleine Bildschirme */
.nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 20px;
  background-color: #1a1a2e;
  color: white;
}

.nav__links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav__links a {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
}

/* Ab 640px Fensterbreite: Navigation wird zur Zeile */
@media (min-width: 640px) {
  .nav {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .nav__links {
    flex-direction: row;
    gap: 20px;
  }
}`;

const gridCssSnippet = `.karten-grid {
  display: grid;
  /* So viele Spalten wie passen, jede mind. 220px breit */
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 24px 20px;
}

.karte {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.karte h2 {
  margin: 0 0 8px;
  font-size: 1.1rem;
}

.karte p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #555;
}`;

const finetuneCssSnippet = `/* Feinschliff: ab 768px etwas mehr Luft zwischen den Karten */
@media (min-width: 768px) {
  .karten-grid {
    gap: 28px;
    padding: 40px;
  }
}`;

function baseDoc(bodyExtraCss: string) {
  return `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8" /><style>
*{box-sizing:border-box;}
body{margin:0;font-family:system-ui,sans-serif;background-color:#f4f4f8;}
.nav{display:flex;flex-direction:column;gap:12px;padding:16px 20px;background-color:#1a1a2e;color:white;}
.nav__logo{font-weight:700;}
.nav__links{display:flex;flex-direction:column;gap:8px;}
.nav__links a{color:white;text-decoration:none;font-size:.9rem;}
@media (min-width:640px){.nav{flex-direction:row;align-items:center;justify-content:space-between;}.nav__links{flex-direction:row;gap:20px;}}
.karten-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;padding:24px 20px;}
.karte{padding:20px;background-color:#fff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,.06);}
.karte h2{margin:0 0 8px;font-size:1.1rem;}
.karte p{margin:0;font-size:.9rem;line-height:1.5;color:#555;}
@media (min-width:768px){.karten-grid{gap:28px;padding:40px;}}
${bodyExtraCss}
</style></head><body>
<header class="nav"><span class="nav__logo">DevStudio</span><nav class="nav__links"><a href="#">Start</a><a href="#">Projekte</a><a href="#">Kontakt</a></nav></header>
<main><section class="karten-grid">
<article class="karte"><h2>Schnell</h2><p>Optimierte Ladezeiten dank moderner Build-Tools.</p></article>
<article class="karte"><h2>Responsiv</h2><p>Funktioniert auf Handy, Tablet und Desktop gleichermaßen.</p></article>
<article class="karte"><h2>Zugänglich</h2><p>Semantisches HTML und ausreichend Kontrast für alle.</p></article>
</section></main>
</body></html>`;
}

const previewMobile = baseDoc("");
const previewDesktop = baseDoc("");

const solutionCssSnippet = `/* Teil 1: Hover-Effekt für die Navigationslinks */
.nav__links a {
  transition: opacity 0.15s ease;
}

.nav__links a:hover {
  opacity: 0.7;
  text-decoration: underline;
}

/* Teil 2: Ab 1024px feste 3-Spalten-Begrenzung
   (überschreibt nur grid-template-columns, der Rest bleibt gleich) */
@media (min-width: 1024px) {
  .karten-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`;

const solutionExtraCss = `.nav__links a{transition:opacity .15s ease;}
.nav__links a:hover{opacity:.7;text-decoration:underline;}
@media (min-width:1024px){.karten-grid{grid-template-columns:repeat(3,1fr);}}`;

const solutionPreviewWide = baseDoc(solutionExtraCss);

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative pl-11">
      <span className="absolute left-0 top-0.5 grid h-7 w-7 place-items-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
        {n}
      </span>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export default function CssLayoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <Link href="/#curriculum" className="text-sm text-ink/50 hover:text-ink">
          ← Zurück zur Kapitelübersicht
        </Link>

        <div className="mt-4 mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
            Kapitel 3 · Phase 1 · Grundlagen des Web
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            CSS-Layout &amp; Responsive Design
          </h1>
          <p className="mt-3 text-ink/60">
            Ziel: Layouts mit Flexbox und CSS Grid bauen, die auf jedem Bildschirm funktionieren –
            am Beispiel einer Navigation und eines Kartenrasters. Dauer: ca. 3–4 Std.
          </p>
        </div>

        {/* THEORIE */}
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">1. Theorie</h2>
          <div className="prose-de space-y-4 text-[15px] text-ink/80">
            <p>
              <strong>Flexbox</strong> ordnet Elemente entlang <em>einer</em> Achse an – entweder in
              einer Zeile oder einer Spalte. Mit{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">display: flex</code> wird ein
              Element zum Flex-Container; seine Kinder lassen sich mit{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">justify-content</code> (Hauptachse)
              und <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">align-items</code>{" "}
              (Querachse) ausrichten. Ideal für Navigationsleisten, Button-Gruppen oder alles, was
              in einer Reihe stehen soll.
            </p>
            <p>
              <strong>CSS Grid</strong> denkt dagegen in <em>zwei</em> Dimensionen gleichzeitig –
              Zeilen und Spalten. Mit{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">display: grid</code> und{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">grid-template-columns</code>{" "}
              legt man ein Raster fest. Der Ausdruck{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">
                repeat(auto-fit, minmax(220px, 1fr))
              </code>{" "}
              lässt den Browser selbst berechnen, wie viele Spalten von mindestens 220px Breite in
              die verfügbare Fläche passen – ganz ohne Media Query. Grid eignet sich für
              Kartenraster, Seitenlayouts und alles Rasterartige.
            </p>
            <p>
              <strong>Media Queries</strong> passen Stile abhängig von der Fensterbreite an:{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">
                @media (min-width: 768px) {"{"} ... {"}"}
              </code>{" "}
              gilt nur ab 768px Breite. Gutes CSS folgt dabei dem{" "}
              <strong>Mobile-First-Prinzip</strong>: Die Basis-Stile (außerhalb jeder Media Query)
              gelten für kleine Bildschirme; mit{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">min-width</code>-Abfragen
              schaltet man Anpassungen für größere Bildschirme <em>hinzu</em>. Das erzwingt, zuerst
              an die engste Situation zu denken, statt sie nachträglich zu reparieren.
            </p>
            <p>
              Flexbox und Grid schließen sich nicht aus – in der Praxis kombiniert man beides: Grid
              für die grobe Seitenstruktur, Flexbox für die Feinausrichtung innerhalb einzelner
              Bereiche.
            </p>
          </div>
        </section>

        {/* PRAXISBEISPIEL */}
        <section className="mb-14">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">2. Praxisbeispiel</h2>
          <p className="mb-8 text-sm text-ink/60">
            Wir bauen eine Navigation mit Flexbox und ein responsives Kartenraster mit Grid – beide
            passen sich automatisch an die Bildschirmbreite an.
          </p>

          <div className="space-y-10">
            <Step n={1} title="HTML-Struktur: Navigation + Kartenraster">
              <p className="text-sm text-ink/70">
                Eine Kopfzeile mit Logo und Links, darunter drei Feature-Karten. Die Klassen{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">nav</code> und{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">karten-grid</code> sind unsere
                CSS-Anknüpfungspunkte.
              </p>
              <CodeBlock code={htmlSnippet} filename="index.html" lang="html" />
            </Step>

            <Step n={2} title="Flexbox-Navigation, mobile-first">
              <p className="text-sm text-ink/70">
                Auf kleinen Bildschirmen stehen Logo und Links untereinander (
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">flex-direction: column</code>).
                Ab 640px Breite ordnet die Media Query alles in eine Zeile um.
              </p>
              <CodeBlock code={navCssSnippet} filename="style.css" lang="css" />
            </Step>

            <Step n={3} title="Grid-Kartenraster ohne Media Query">
              <p className="text-sm text-ink/70">
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">auto-fit</code> und{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">minmax()</code> sorgen dafür,
                dass das Raster von einer Spalte (schmales Handy) bis zu mehreren Spalten (Desktop)
                automatisch mitwächst.
              </p>
              <CodeBlock code={gridCssSnippet} filename="style.css (Fortsetzung)" lang="css" />
            </Step>

            <Step n={4} title="Feinschliff per Media Query">
              <p className="text-sm text-ink/70">
                Auto-fit übernimmt die Spaltenzahl, aber Abstände dürfen auf großen Bildschirmen
                trotzdem großzügiger sein. Mobile-first heißt: Wir überschreiben nur, was sich
                ändern soll.
              </p>
              <CodeBlock code={finetuneCssSnippet} filename="style.css (Fortsetzung)" lang="css" />
            </Step>

            <Step n={5} title="Ergebnis: derselbe Code, zwei Bildschirmbreiten">
              <p className="text-sm text-ink/70">
                Links eine simulierte Handy-Breite (375px), rechts ein breiter Bildschirm – beide
                Vorschauen laden exakt dasselbe HTML/CSS.
              </p>
              <div className="flex flex-wrap gap-4">
                <LivePreview html={previewMobile} width="375px" height={420} label="375px · Mobil" />
                <LivePreview html={previewDesktop} width="680px" height={300} label="680px · Desktop" />
              </div>
            </Step>
          </div>
        </section>

        {/* ÜBUNGSAUFGABE */}
        <section className="mb-10">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">3. Übungsaufgabe</h2>
          <p className="mb-6 text-sm text-ink/60">
            Jetzt bist du dran. Erweitere Navigation und Kartenraster aus dem Praxisbeispiel.
          </p>

          <div className="mb-6 rounded-xl border border-accent2/30 bg-accent2/5 p-5">
            <h3 className="mb-2 font-semibold text-accent2">Aufgabe</h3>
            <ol className="mt-1 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-ink/75">
              <li>
                Die Navigationslinks haben noch keinen Hover-Effekt. Füge einen hinzu (z. B.
                Farbwechsel oder Unterstreichung), der beim Überfahren mit der Maus weich einblendet.
              </li>
              <li>
                Das Kartenraster wächst mit <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">auto-fit</code>{" "}
                aktuell unbegrenzt mit der Fensterbreite mit. Sorge dafür, dass es ab 1024px Breite
                fest auf <strong>3 Spalten</strong> begrenzt bleibt, egal wie breit der Bildschirm
                noch wird.
              </li>
            </ol>
            <p className="mt-3 text-sm text-ink/60">
              <strong>Tipp:</strong> Für Aufgabe 2 reicht eine weitere{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">@media (min-width: …)</code>
              -Regel, die nur{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">grid-template-columns</code>{" "}
              überschreibt – der Rest der Karten-Styles bleibt unverändert.
            </p>
          </div>

          <SolutionReveal>
            <div className="space-y-6">
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">CSS-Ergänzung</h4>
                <CodeBlock code={solutionCssSnippet} filename="style.css (Ergänzung)" lang="css" />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">
                  Ergebnis bei 1080px Breite – jetzt fest auf 3 Spalten begrenzt
                </h4>
                <p className="mb-2 text-xs text-ink/45">
                  Die Vorschau ist breiter als diese Textspalte → nach rechts scrollen, um alle drei
                  Spalten zu sehen.
                </p>
                <LivePreview
                  html={solutionPreviewWide}
                  width="1080px"
                  height={320}
                  label="1080px · begrenzt auf 3 Spalten"
                />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">Erklärung</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/70">
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">transition: opacity 0.15s ease</code>{" "}
                    sorgt dafür, dass der Hover-Effekt weich statt abrupt erscheint –{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">:hover</code> allein würde
                    sofort umschalten.
                  </li>
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">auto-fit</code> kennt keine
                    Obergrenze für die Spaltenanzahl – auf einem sehr breiten Bildschirm würden
                    beliebig viele Spalten entstehen. Die Media Query ab 1024px überschreibt{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">grid-template-columns</code>{" "}
                    deshalb gezielt mit einem festen{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">repeat(3, 1fr)</code>.
                  </li>
                  <li>
                    Wichtig: Nur die eine Eigenschaft wird überschrieben, nicht die ganze Regel. Gap,
                    Padding, Kartenfarben etc. bleiben unverändert erhalten – das ist der Vorteil des
                    Mobile-First-Ansatzes: kleine, gezielte Ergänzungen statt doppelter Regeln.
                  </li>
                  <li>
                    Unterhalb von 1024px bleibt das automatische Verhalten aus Schritt 3 bestehen –
                    die Begrenzung greift ausschließlich für breite Bildschirme.
                  </li>
                </ul>
              </div>
            </div>
          </SolutionReveal>
        </section>

        <div className="flex items-center justify-between border-t border-ink/10 pt-8">
          <Link href="/module/html-css-basis" className="text-sm font-medium text-ink/60 hover:text-ink">
            ← Kapitel 2: HTML/CSS-Basis
          </Link>
          <Link href="/module/git-github" className="text-sm font-medium text-ink/60 hover:text-ink">
            Nächstes Kapitel: Versionskontrolle mit Git &amp; GitHub →
          </Link>
        </div>
      </main>
    </>
  );
}
