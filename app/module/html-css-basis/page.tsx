import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import CodeBlock from "@/components/CodeBlock";
import LivePreview from "@/components/LivePreview";
import SolutionReveal from "@/components/SolutionReveal";

const htmlSnippet = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Profil-Karte</title>
    <!-- Verknüpft die externe Stylesheet-Datei -->
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <!-- ... Inhalt folgt in Schritt 2 ... -->
  </body>
</html>`;

const htmlStructureSnippet = `<main class="karte">
  <img class="karte__bild" src="avatar.jpg" alt="Portraitfoto von Jana Beispiel" />
  <h1 class="karte__name">Jana Beispiel</h1>
  <p class="karte__rolle">Frontend-Entwicklerin</p>
  <p class="karte__bio">
    Baut zugängliche, schnelle Weboberflächen
    und lernt gerade Full-Stack-Entwicklung.
  </p>
</main>`;

const cssBaseSnippet = `/* Grundformatierung der gesamten Seite */
body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f8;
  font-family: system-ui, sans-serif;
}`;

const cssCardSnippet = `/* Die Karte selbst: das Box-Modell in Aktion */
.karte {
  width: 280px;
  padding: 24px;              /* Innenabstand zum Inhalt */
  background-color: #ffffff;
  border-radius: 16px;        /* abgerundete Ecken */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.karte__bild {
  width: 96px;
  height: 96px;
  border-radius: 50%;         /* macht aus dem Bild einen Kreis */
  object-fit: cover;
  margin-bottom: 16px;
}

.karte__name {
  margin: 0 0 4px;
  font-size: 1.25rem;
}

.karte__rolle {
  margin: 0 0 12px;
  color: #6b6b7b;
  font-size: 0.9rem;
}

.karte__bio {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #444;
}`;

const previewHtml = `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8" /><style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background-color:#f4f4f8;font-family:system-ui,sans-serif;}
.karte{width:280px;padding:24px;background-color:#fff;border-radius:16px;box-shadow:0 10px 25px rgba(0,0,0,.08);text-align:center;}
.karte__bild{width:96px;height:96px;border-radius:50%;margin:0 auto 16px;background:linear-gradient(135deg,#4f6df5,#2fb88a);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-family:system-ui,sans-serif;}
.karte__name{margin:0 0 4px;font-size:1.25rem;}
.karte__rolle{margin:0 0 12px;color:#6b6b7b;font-size:.9rem;}
.karte__bio{margin:0;font-size:.9rem;line-height:1.5;color:#444;}
</style></head><body>
<main class="karte">
<div class="karte__bild">JB</div>
<h1 class="karte__name">Jana Beispiel</h1>
<p class="karte__rolle">Frontend-Entwicklerin</p>
<p class="karte__bio">Baut zugängliche, schnelle Weboberflächen und lernt gerade Full-Stack-Entwicklung.</p>
</main>
</body></html>`;

const solutionHtmlSnippet = `<main class="karte">
  <img class="karte__bild" src="avatar.jpg" alt="Portraitfoto von Jana Beispiel" />
  <h1 class="karte__name">Jana Beispiel</h1>
  <p class="karte__rolle">Frontend-Entwicklerin</p>
  <p class="karte__bio">
    Baut zugängliche, schnelle Weboberflächen
    und lernt gerade Full-Stack-Entwicklung.
  </p>

  <!-- NEU: Liste der Fähigkeiten -->
  <ul class="karte__skills">
    <li>HTML &amp; CSS</li>
    <li>JavaScript (ES6+)</li>
    <li>Responsive Design</li>
  </ul>

  <!-- NEU: Kontakt-Link, gestylt wie ein Button -->
  <a class="karte__button" href="mailto:jana@beispiel.de">
    Kontakt aufnehmen
  </a>
</main>`;

const solutionCssSnippet = `/* Liste ohne Aufzählungszeichen, mit Abstand zwischen Einträgen */
.karte__skills {
  margin: 0 0 20px;
  padding: 0;
  list-style: none;           /* entfernt die Bullet-Points */
}

.karte__skills li {
  padding: 6px 0;
  font-size: 0.85rem;
  color: #444;
}

/* Trennlinie nur ZWISCHEN Einträgen, nicht vor dem ersten */
.karte__skills li + li {
  border-top: 1px solid #eee;
}

/* Button-artiger Kontakt-Link */
.karte__button {
  display: inline-block;      /* macht den Link box-artig */
  padding: 10px 20px;
  background-color: #4f6df5;
  color: #ffffff;
  text-decoration: none;
  border-radius: 999px;       /* Pillenform */
  font-size: 0.9rem;
  font-weight: 600;
  transition: background-color 0.15s ease;
}

.karte__button:hover {
  background-color: #3a56d4;  /* dunklerer Ton beim Hover */
}`;

const solutionPreviewHtml = `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8" /><style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background-color:#f4f4f8;font-family:system-ui,sans-serif;}
.karte{width:280px;padding:24px;background-color:#fff;border-radius:16px;box-shadow:0 10px 25px rgba(0,0,0,.08);text-align:center;}
.karte__bild{width:96px;height:96px;border-radius:50%;margin:0 auto 16px;background:linear-gradient(135deg,#4f6df5,#2fb88a);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-family:system-ui,sans-serif;}
.karte__name{margin:0 0 4px;font-size:1.25rem;}
.karte__rolle{margin:0 0 12px;color:#6b6b7b;font-size:.9rem;}
.karte__bio{margin:0;font-size:.9rem;line-height:1.5;color:#444;}
.karte__skills{margin:0 0 20px;padding:0;list-style:none;}
.karte__skills li{padding:6px 0;font-size:.85rem;color:#444;}
.karte__skills li + li{border-top:1px solid #eee;}
.karte__button{display:inline-block;padding:10px 20px;background-color:#4f6df5;color:#fff;text-decoration:none;border-radius:999px;font-size:.9rem;font-weight:600;transition:background-color .15s ease;}
.karte__button:hover{background-color:#3a56d4;}
</style></head><body>
<main class="karte">
<div class="karte__bild">JB</div>
<h1 class="karte__name">Jana Beispiel</h1>
<p class="karte__rolle">Frontend-Entwicklerin</p>
<p class="karte__bio">Baut zugängliche, schnelle Weboberflächen und lernt gerade Full-Stack-Entwicklung.</p>
<ul class="karte__skills"><li>HTML &amp; CSS</li><li>JavaScript (ES6+)</li><li>Responsive Design</li></ul>
<a class="karte__button" href="#">Kontakt aufnehmen</a>
</main>
</body></html>`;

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

export default function HtmlCssBasisPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <Link href="/#curriculum" className="text-sm text-ink/50 hover:text-ink">
          ← Zurück zur Kapitelübersicht
        </Link>

        <div className="mt-4 mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
            Kapitel 2 · Phase 1 · Grundlagen des Web
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">HTML/CSS-Basis</h1>
          <p className="mt-3 text-ink/60">
            Ziel: Eine erste Webseite semantisch strukturieren und mit CSS gestalten – am Beispiel
            einer kleinen Profil-Karte. Dauer: ca. 3–4 Std.
          </p>
        </div>

        {/* THEORIE */}
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">1. Theorie</h2>
          <div className="prose-de space-y-4 text-[15px] text-ink/80">
            <p>
              <strong>HTML</strong> (HyperText Markup Language) beschreibt die Struktur einer
              Webseite: Überschriften, Absätze, Bilder, Links. <strong>CSS</strong> (Cascading Style
              Sheets) beschreibt, wie diese Struktur aussieht: Farben, Abstände, Schriftarten,
              Layout. Beide Sprachen ergänzen sich – HTML liefert das Skelett, CSS das
              Erscheinungsbild.
            </p>
            <p>
              Jedes HTML-Dokument folgt einem festen Grundgerüst:{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;!DOCTYPE html&gt;</code>{" "}
              legt den Dokumenttyp fest, <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;html&gt;</code>{" "}
              umschließt die gesamte Seite, <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;head&gt;</code>{" "}
              enthält Metainformationen (z. B. Titel, verknüpfte CSS-Datei),{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;body&gt;</code> enthält den
              sichtbaren Inhalt.
            </p>
            <p>
              Statt alles in generische <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;div&gt;</code>
              -Elemente zu packen, nutzt man <strong>semantische Tags</strong> wie{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;header&gt;</code>,{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;main&gt;</code>,{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;section&gt;</code> oder{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;footer&gt;</code>. Sie
              beschreiben die Bedeutung eines Bereichs – das hilft Suchmaschinen, Screenreadern und
              anderen Entwickler:innen, die Seite zu verstehen.
            </p>
            <p>
              CSS greift über <strong>Selektoren</strong> auf HTML-Elemente zu: Element-Selektoren
              (<code className="rounded bg-ink/5 px-1 py-0.5 text-sm">p</code>), Klassen (
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">.karte</code>) und IDs (
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">#logo</code>). Jedes Element
              wird von CSS als Box behandelt – das <strong>Box-Modell</strong>: Inhalt, umgeben von
              Innenabstand (<code className="rounded bg-ink/5 px-1 py-0.5 text-sm">padding</code>),
              Rahmen (<code className="rounded bg-ink/5 px-1 py-0.5 text-sm">border</code>) und
              Außenabstand (<code className="rounded bg-ink/5 px-1 py-0.5 text-sm">margin</code>).
              Wer das Box-Modell versteht, versteht die Grundlage jedes Layouts.
            </p>
            <p>
              Eine CSS-Regel besteht aus Selektor und Deklarationsblock:{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">selektor {"{"} eigenschaft: wert; {"}"}</code>.
              CSS wird meist in einer eigenen <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">.css</code>
              -Datei geschrieben und per <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;link&gt;</code>{" "}
              im <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;head&gt;</code> eingebunden – das
              trennt Inhalt (HTML) sauber von Darstellung (CSS).
            </p>
          </div>
        </section>

        {/* PRAXISBEISPIEL */}
        <section className="mb-14">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">2. Praxisbeispiel</h2>
          <p className="mb-8 text-sm text-ink/60">
            Wir bauen gemeinsam eine kleine Profil-Karte – Schritt für Schritt.
          </p>

          <div className="space-y-10">
            <Step n={1} title="HTML-Grundgerüst anlegen (index.html)">
              <p className="text-sm text-ink/70">
                Jede Seite beginnt mit demselben Skelett. Die Stylesheet-Datei wird bereits im{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">&lt;head&gt;</code> verlinkt.
              </p>
              <CodeBlock code={htmlSnippet} filename="index.html" lang="html" />
            </Step>

            <Step n={2} title="Semantische Struktur der Karte">
              <p className="text-sm text-ink/70">
                Innerhalb von <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">&lt;body&gt;</code>{" "}
                kommt der eigentliche Inhalt: ein <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">&lt;main&gt;</code>{" "}
                mit Bild, Name, Rolle und Kurzbeschreibung. Die Klasse{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">karte</code> dient später als
                CSS-Anknüpfungspunkt.
              </p>
              <CodeBlock code={htmlStructureSnippet} filename="index.html (Ausschnitt)" lang="html" />
            </Step>

            <Step n={3} title="style.css anlegen und Seite grundformatieren">
              <p className="text-sm text-ink/70">
                Bevor wir die Karte selbst gestalten, zentrieren wir sie auf der Seite und legen
                eine ruhige Hintergrundfarbe fest.
              </p>
              <CodeBlock code={cssBaseSnippet} filename="style.css" lang="css" />
            </Step>

            <Step n={4} title="Die Karte gestalten (Box-Modell anwenden)">
              <p className="text-sm text-ink/70">
                Jetzt kommt das Box-Modell zum Einsatz: Innenabstand, abgerundete Ecken und ein
                weicher Schatten machen aus dem Textblock eine „Karte“.
              </p>
              <CodeBlock code={cssCardSnippet} filename="style.css (Fortsetzung)" lang="css" />
            </Step>

            <Step n={5} title="Ergebnis ansehen">
              <p className="text-sm text-ink/70">
                So sieht die fertige Karte im Browser aus (das Foto ist hier durch einen
                Platzhalter mit Initialen ersetzt, da die Vorschau keine externen Bilddateien
                laden kann):
              </p>
              <LivePreview html={previewHtml} />
            </Step>
          </div>
        </section>

        {/* ÜBUNGSAUFGABE */}
        <section className="mb-10">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">3. Übungsaufgabe</h2>
          <p className="mb-6 text-sm text-ink/60">
            Jetzt bist du dran. Erweitere die Profil-Karte aus dem Praxisbeispiel.
          </p>

          <div className="mb-6 rounded-xl border border-accent2/30 bg-accent2/5 p-5">
            <h3 className="mb-2 font-semibold text-accent2">Aufgabe</h3>
            <p className="text-sm leading-relaxed text-ink/75">
              Erweitere die Karte um zwei neue Bestandteile:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink/75">
              <li>
                Eine Liste (<code className="rounded bg-ink/5 px-1 py-0.5 text-xs">&lt;ul&gt;</code>)
                mit mindestens drei Fähigkeiten – ohne sichtbare Aufzählungszeichen, mit etwas
                Abstand zwischen den Einträgen.
              </li>
              <li>
                Einen Link oder Button mit dem Text „Kontakt aufnehmen“, gestylt mit
                Hintergrundfarbe, abgerundeten Ecken und einem Hover-Effekt (Farbwechsel beim
                Überfahren mit der Maus).
              </li>
            </ul>
            <p className="mt-3 text-sm text-ink/60">
              <strong>Tipp:</strong> Für die Aufzählungszeichen gibt es eine CSS-Eigenschaft, die
              sie vollständig entfernt. Für den Button-Look hilft{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">display: inline-block</code>{" "}
              in Kombination mit <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">padding</code>{" "}
              und <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">border-radius</code>.
            </p>
          </div>

          <SolutionReveal>
            <div className="space-y-6">
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">HTML-Ergänzung</h4>
                <CodeBlock code={solutionHtmlSnippet} filename="index.html (Ausschnitt)" lang="html" />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">CSS-Ergänzung</h4>
                <CodeBlock code={solutionCssSnippet} filename="style.css (Ergänzung)" lang="css" />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">Ergebnis</h4>
                <LivePreview html={solutionPreviewHtml} height={320} />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">Erklärung</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/70">
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">list-style: none</code>{" "}
                    entfernt die Bullet-Points der Liste vollständig.
                  </li>
                  <li>
                    Der Selektor{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">.karte__skills li + li</code>{" "}
                    fügt eine Trennlinie nur <em>zwischen</em> zwei Listeneinträgen ein – der erste
                    Eintrag bleibt ohne Linie. Das Pluszeichen ist der „direkter Nachbar“-Selektor.
                  </li>
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">display: inline-block</code>{" "}
                    erlaubt es einem <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">&lt;a&gt;</code>
                    -Element (das normalerweise nur inline ist), Breite, Höhe und Innenabstand wie
                    eine Box anzunehmen – so entsteht der Button-Look.
                  </li>
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">border-radius: 999px</code>{" "}
                    ist ein gängiger Trick für vollständig abgerundete „Pillen“-Buttons: Der Wert ist
                    absichtlich größer als nötig.
                  </li>
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">transition</code> sorgt
                    dafür, dass der Farbwechsel im{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">:hover</code>-Zustand
                    weich statt abrupt erfolgt.
                  </li>
                </ul>
              </div>
            </div>
          </SolutionReveal>
        </section>

        <div className="flex items-center justify-between border-t border-ink/10 pt-8">
          <Link href="/module/wie-funktioniert-das-web" className="text-sm font-medium text-ink/60 hover:text-ink">
            ← Kapitel 1: Wie funktioniert das Web?
          </Link>
          <Link href="/module/css-layout" className="text-sm font-medium text-ink/60 hover:text-ink">
            Nächstes Kapitel: CSS-Layout &amp; Responsive Design →
          </Link>
        </div>
      </main>
    </>
  );
}
