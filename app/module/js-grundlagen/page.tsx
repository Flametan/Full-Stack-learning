import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import CodeBlock from "@/components/CodeBlock";
import ConsoleBlock from "@/components/ConsoleBlock";
import SolutionReveal from "@/components/SolutionReveal";

const step1Snippet = `// script.js

// let: veränderbarer Wert
let anzahlBesucher = 3;

// const: wird nach der Zuweisung nicht mehr verändert
const geschaeftsname = "DevMarkt";

// boolean: wahr oder falsch
let istGeoeffnet = true;

// undefined: deklariert, aber noch kein Wert zugewiesen
let rabattcode;

// typeof prüft den Datentyp eines Werts zur Laufzeit
console.log(typeof anzahlBesucher, typeof geschaeftsname, typeof istGeoeffnet, typeof rabattcode);`;

const step2Snippet = `// script.js (Fortsetzung)

const einkaufsliste = [
  { name: "Tastatur", preis: 45, menge: 1 },
  { name: "Maus", preis: 20, menge: 2 },
  { name: "Monitor", preis: 180, menge: 1 },
];

// Zugriff per Index + Punkt-Notation
console.log(einkaufsliste[0].name);

// Eigenschaft eines Arrays: Anzahl der Einträge
console.log(einkaufsliste.length);`;

const step3Snippet = `// script.js (Fortsetzung)

function berechneGesamtsumme(artikel) {
  let summe = 0;

  // for...of durchläuft jeden Eintrag des Arrays einzeln
  for (const eintrag of artikel) {
    summe += eintrag.preis * eintrag.menge;
  }

  return summe;
}

console.log(berechneGesamtsumme(einkaufsliste));`;

const step4Snippet = `// script.js (Fortsetzung)

function berechneVersandkosten(summe) {
  if (summe >= 100) {
    return 0; // ab 100 € versandkostenfrei
  } else {
    return 4.95;
  }
}

const gesamtsumme = berechneGesamtsumme(einkaufsliste);
const versandkosten = berechneVersandkosten(gesamtsumme);

console.log("Gesamtsumme: " + gesamtsumme + "€, Versand: " + versandkosten + "€");`;

const finalScript = `// script.js – der vollständige Ablauf

let anzahlBesucher = 3;
const geschaeftsname = "DevMarkt";
let istGeoeffnet = true;
let rabattcode;

const einkaufsliste = [
  { name: "Tastatur", preis: 45, menge: 1 },
  { name: "Maus", preis: 20, menge: 2 },
  { name: "Monitor", preis: 180, menge: 1 },
];

function berechneGesamtsumme(artikel) {
  let summe = 0;
  for (const eintrag of artikel) {
    summe += eintrag.preis * eintrag.menge;
  }
  return summe;
}

function berechneVersandkosten(summe) {
  if (summe >= 100) {
    return 0;
  } else {
    return 4.95;
  }
}

const gesamtsumme = berechneGesamtsumme(einkaufsliste);
const versandkosten = berechneVersandkosten(gesamtsumme);

console.log(typeof anzahlBesucher, typeof geschaeftsname, typeof istGeoeffnet, typeof rabattcode);
console.log(einkaufsliste[0].name);
console.log("Anzahl Artikel im Sortiment:", einkaufsliste.length);
console.log("Gesamtsumme: " + gesamtsumme + "€, Versand: " + versandkosten + "€");`;

const exerciseSolutionScript = `const einkaufsliste = [
  { name: "Tastatur", preis: 45, menge: 1 },
  { name: "Maus", preis: 20, menge: 2 },
  { name: "Monitor", preis: 180, menge: 1 },
];

function zaehleTeureArtikel(artikel, grenzwert) {
  let anzahl = 0;

  for (const eintrag of artikel) {
    if (eintrag.preis > grenzwert) {
      anzahl += 1;
    }
  }

  return anzahl;
}

console.log(zaehleTeureArtikel(einkaufsliste, 30));`;

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

export default function JsGrundlagenPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <Link href="/#curriculum" className="text-sm text-ink/50 hover:text-ink">
          ← Zurück zur Kapitelübersicht
        </Link>

        <div className="mt-4 mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
            Kapitel 5 · Phase 2 · JavaScript-Grundlagen
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">JavaScript-Grundlagen</h1>
          <p className="mt-3 text-ink/60">
            Ziel: Variablen, Datentypen, Funktionen und Kontrollstrukturen sicher anwenden – am
            Beispiel einer kleinen Einkaufslisten-Berechnung. Dauer: ca. 4 Std.
          </p>
        </div>

        {/* THEORIE */}
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">1. Theorie</h2>
          <div className="prose-de space-y-4 text-[15px] text-ink/80">
            <p>
              JavaScript kennt zum Deklarieren von Variablen{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">let</code> (veränderbar) und{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">const</code> (Konstante, nicht
              neu zuweisbar) – <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">var</code>{" "}
              gilt als veraltet und sollte vermieden werden. Werte haben einen Datentyp:{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">string</code>,{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">number</code>,{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">boolean</code>,{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">undefined</code> (kein Wert
              zugewiesen), <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">null</code>{" "}
              (bewusst „kein Wert“) und <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">object</code>{" "}
              (zusammengesetzte Daten, dazu zählen auch Arrays). Mit{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">typeof wert</code> lässt sich
              der Typ zur Laufzeit prüfen.
            </p>
            <p>
              Eine <strong>Funktion</strong> bündelt wiederverwendbaren Code. Neben der klassischen{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">function name() {"{}"}</code>
              -Schreibweise sind <strong>Arrow Functions</strong> (
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">const name = () =&gt; {"{}"}</code>
              ) heute üblich – dazu mehr im ES6+-Kapitel. Variablen, die mit{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">let</code>/
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">const</code> innerhalb eines
              Blocks (<code className="rounded bg-ink/5 px-1 py-0.5 text-sm">{"{}"}</code>)
              deklariert werden, existieren nur dort: <strong>Block-Scope</strong>. Das verhindert,
              dass sich Variablen aus verschiedenen Codeteilen versehentlich überschreiben.
            </p>
            <p>
              Mit <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">if</code>/
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">else</code> verzweigt der
              Programmablauf abhängig von Bedingungen;{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">===</code> vergleicht Wert{" "}
              <strong>und</strong> Typ und ist{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">==</code> vorzuziehen, das beim
              Vergleich Typen umwandelt und dadurch überraschende Ergebnisse liefern kann.{" "}
              <strong>Schleifen</strong> wiederholen Code:{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">for</code> für eine feste Anzahl
              Durchläufe, <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">while</code>{" "}
              solange eine Bedingung gilt,{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">for...of</code> zum Durchlaufen
              von Arrays.
            </p>
            <p>
              <strong>Arrays</strong> speichern geordnete Listen (
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">[&quot;a&quot;, &quot;b&quot;]</code>
              ), Zugriff über Index ab <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">0</code>.{" "}
              <strong>Objekte</strong> speichern benannte Eigenschaften (
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">{"{ name: \"Jana\" }"}</code>),
              Zugriff über Punkt- oder Klammer-Notation. Beide lassen sich beliebig verschachteln und
              bilden die Grundlage fast jeder JavaScript-Datenstruktur.
            </p>
          </div>
        </section>

        {/* PRAXISBEISPIEL */}
        <section className="mb-14">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">2. Praxisbeispiel</h2>
          <p className="mb-8 text-sm text-ink/60">
            Wir bauen Schritt für Schritt ein kleines Skript, das eine Einkaufsliste durchrechnet –
            inklusive Gesamtsumme und Versandkosten-Regel.
          </p>

          <div className="space-y-10">
            <Step n={1} title="Variablen und Datentypen">
              <p className="text-sm text-ink/70">
                Vier Grunddatentypen auf einen Blick –{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">typeof</code> macht sie
                sichtbar.
              </p>
              <CodeBlock code={step1Snippet} filename="script.js" lang="js" />
            </Step>

            <Step n={2} title="Ein Array von Objekten: die Einkaufsliste">
              <p className="text-sm text-ink/70">
                Jeder Eintrag ist ein Objekt mit drei Eigenschaften. Das Array selbst hat eine{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">length</code>-Eigenschaft.
              </p>
              <CodeBlock code={step2Snippet} filename="script.js (Fortsetzung)" lang="js" />
            </Step>

            <Step n={3} title="Funktion: Gesamtsumme berechnen">
              <p className="text-sm text-ink/70">
                Die Funktion nimmt die Liste als Parameter entgegen, läuft mit{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">for...of</code> über jeden
                Eintrag und summiert Preis mal Menge auf.
              </p>
              <CodeBlock code={step3Snippet} filename="script.js (Fortsetzung)" lang="js" />
            </Step>

            <Step n={4} title="Bedingte Logik: Versandkosten">
              <p className="text-sm text-ink/70">
                Ab 100 € Bestellwert ist der Versand kostenlos – eine klassische{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">if</code>/
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">else</code>-Entscheidung.
              </p>
              <CodeBlock code={step4Snippet} filename="script.js (Fortsetzung)" lang="js" />
            </Step>

            <Step n={5} title="Ergebnis: das vollständige Skript, wirklich ausgeführt">
              <p className="text-sm text-ink/70">
                Die Konsolen-Ausgabe unten stammt nicht aus einem Kommentar, sondern aus einer
                echten Ausführung dieses Codes im Browser.
              </p>
              <ConsoleBlock code={finalScript} />
            </Step>
          </div>
        </section>

        {/* ÜBUNGSAUFGABE */}
        <section className="mb-10">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">3. Übungsaufgabe</h2>
          <p className="mb-6 text-sm text-ink/60">
            Jetzt bist du dran. Erweitere die Einkaufslisten-Logik aus dem Praxisbeispiel.
          </p>

          <div className="mb-6 rounded-xl border border-accent2/30 bg-accent2/5 p-5">
            <h3 className="mb-2 font-semibold text-accent2">Aufgabe</h3>
            <p className="text-sm leading-relaxed text-ink/75">
              Schreibe eine Funktion{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">
                zaehleTeureArtikel(artikel, grenzwert)
              </code>
              , die zählt, wie viele Einträge der Liste einen Preis <em>über</em> dem übergebenen
              Grenzwert haben. Nutze dafür eine Schleife und eine{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">if</code>-Bedingung. Rufe die
              Funktion anschließend für die Einkaufsliste mit einem Grenzwert von{" "}
              <strong>30 €</strong> auf und gib das Ergebnis in der Konsole aus.
            </p>
            <p className="mt-3 text-sm text-ink/60">
              <strong>Tipp:</strong> Der Aufbau ähnelt{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">berechneGesamtsumme</code> aus
              Schritt 3 – nur dass statt einer Summe ein Zähler hochgezählt wird, und das auch nur
              unter einer Bedingung.
            </p>
          </div>

          <SolutionReveal>
            <div className="space-y-6">
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">Lösung – wirklich ausgeführt</h4>
                <ConsoleBlock code={exerciseSolutionScript} />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">Erklärung</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/70">
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">for...of</code> durchläuft
                    jeden Eintrag des Arrays einzeln –{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">eintrag</code> ist dabei
                    jeweils ein ganzes Objekt mit Zugriff auf{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">eintrag.preis</code>.
                  </li>
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">
                      if (eintrag.preis &gt; grenzwert)
                    </code>{" "}
                    prüft die Bedingung für jeden Eintrag neu; nur wenn sie zutrifft, wird{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">anzahl</code> erhöht.
                  </li>
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">anzahl += 1</code> ist die
                    Kurzschreibweise für{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">anzahl = anzahl + 1</code>.
                  </li>
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">grenzwert</code> ist ein
                    Parameter statt eines fest einprogrammierten Werts – die Funktion lässt sich
                    dadurch mit jedem beliebigen Schwellenwert wiederverwenden, ohne den Code selbst
                    zu ändern.
                  </li>
                  <li>
                    Ergebnis: Tastatur (45 €) und Monitor (180 €) liegen über 30 €, die Maus (20 €)
                    nicht – die Funktion gibt also <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">2</code>{" "}
                    zurück.
                  </li>
                </ul>
              </div>
            </div>
          </SolutionReveal>
        </section>

        <div className="flex items-center justify-between border-t border-ink/10 pt-8">
          <Link href="/module/git-github" className="text-sm font-medium text-ink/60 hover:text-ink">
            ← Kapitel 4: Versionskontrolle mit Git &amp; GitHub
          </Link>
          <Link href="/module/dom-events" className="text-sm font-medium text-ink/60 hover:text-ink">
            Nächstes Kapitel: DOM-Manipulation &amp; Events →
          </Link>
        </div>
      </main>
    </>
  );
}
