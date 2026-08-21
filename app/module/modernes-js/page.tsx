import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import CodeBlock from "@/components/CodeBlock";
import ConsoleBlock from "@/components/ConsoleBlock";
import SolutionReveal from "@/components/SolutionReveal";

const step1Snippet = `// Klassische Funktion
function verdopple(zahl) {
  return zahl * 2;
}

// Arrow Function: gleiches Verhalten, kompakter geschrieben
const verdopple2 = (zahl) => zahl * 2;

console.log(verdopple(5), verdopple2(5));`;

const step2Snippet = `const produkt = { name: "Tastatur", preis: 45, menge: 1 };

// Destrukturierung: Eigenschaften direkt in Variablen entpacken
const { name, preis } = produkt;
console.log(name, preis);

// Spread (...): neues Objekt, das produkt kopiert und preis überschreibt –
// produkt selbst bleibt dabei unverändert
const reduziert = { ...produkt, preis: 35 };
console.log(produkt.preis, reduziert.preis);`;

const step3Snippet = `const einkaufsliste = [
  { name: "Tastatur", preis: 45, menge: 1 },
  { name: "Maus", preis: 20, menge: 2 },
  { name: "Monitor", preis: 180, menge: 1 },
];

// map: jeden Eintrag in einen neuen Wert umwandeln
const namen = einkaufsliste.map((eintrag) => eintrag.name);
console.log(namen);

// filter: nur Einträge behalten, die eine Bedingung erfüllen
const teureArtikel = einkaufsliste.filter((eintrag) => eintrag.preis > 30);
console.log(teureArtikel.map((a) => a.name));

// reduce: alle Werte zu einem einzigen Ergebnis zusammenfassen
const gesamtsumme = einkaufsliste.reduce(
  (summe, eintrag) => summe + eintrag.preis * eintrag.menge,
  0
);
console.log(gesamtsumme);`;

const modulWarenkorbSnippet = `// warenkorb.js

export function berechneGesamtsumme(artikel) {
  return artikel.reduce(
    (summe, eintrag) => summe + eintrag.preis * eintrag.menge,
    0
  );
}

export const MEHRWERTSTEUERSATZ = 0.19;`;

const modulMainSnippet = `// main.js
import { berechneGesamtsumme, MEHRWERTSTEUERSATZ } from "./warenkorb.js";

const gesamtsumme = berechneGesamtsumme(einkaufsliste);
const mitSteuer = gesamtsumme * (1 + MEHRWERTSTEUERSATZ);

console.log(mitSteuer);`;

const finalScript = `// script.js – der vollständige Ablauf

const einkaufsliste = [
  { name: "Tastatur", preis: 45, menge: 1 },
  { name: "Maus", preis: 20, menge: 2 },
  { name: "Monitor", preis: 180, menge: 1 },
];

// Arrow Function für eine kleine Formatierungs-Hilfe
const formatiereEuro = (betrag) => \`\${betrag.toFixed(2)} €\`;

// map + Destrukturierung im Parameter: Anzeige-Strings erzeugen
const anzeige = einkaufsliste.map(
  ({ name, preis, menge }) => \`\${name}: \${menge}x \${formatiereEuro(preis)}\`
);
console.log(anzeige.join(" | "));

// filter + reduce verkettet: Gesamtsumme nur der teuren Artikel (> 30 €)
const summeTeurerArtikel = einkaufsliste
  .filter((eintrag) => eintrag.preis > 30)
  .reduce((summe, eintrag) => summe + eintrag.preis * eintrag.menge, 0);
console.log(formatiereEuro(summeTeurerArtikel));

// Spread: Warenkorb um einen Artikel erweitern, ohne das Original zu verändern
const erweiterterKorb = [...einkaufsliste, { name: "Webcam", preis: 60, menge: 1 }];
console.log(einkaufsliste.length, erweiterterKorb.length);`;

const exerciseSolutionScript = `const einkaufsliste = [
  { name: "Tastatur", preis: 45, menge: 1 },
  { name: "Maus", preis: 20, menge: 2 },
  { name: "Monitor", preis: 180, menge: 1 },
];

function guenstigeAlternativen(artikel, maxPreis) {
  return artikel
    .filter(({ preis }) => preis <= maxPreis)
    .map(({ name, preis }) => ({ name, preis }));
}

console.log(guenstigeAlternativen(einkaufsliste, 50));`;

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

export default function ModernesJsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <Link href="/#curriculum" className="text-sm text-ink/50 hover:text-ink">
          ← Zurück zur Kapitelübersicht
        </Link>

        <div className="mt-4 mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
            Kapitel 7 · Phase 2 · JavaScript-Grundlagen
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Modernes JavaScript (ES6+)</h1>
          <p className="mt-3 text-ink/60">
            Ziel: Arrow Functions, Destructuring, Spread, die Array-Methoden{" "}
            <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">map</code>/
            <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">filter</code>/
            <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">reduce</code> und Module sicher
            einsetzen – an der Einkaufsliste aus Kapitel 5, diesmal ohne Schleifen. Dauer: ca. 3
            Std.
          </p>
        </div>

        {/* THEORIE */}
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">1. Theorie</h2>
          <div className="prose-de space-y-4 text-[15px] text-ink/80">
            <p>
              <strong>Arrow Functions</strong> (<code className="rounded bg-ink/5 px-1 py-0.5 text-sm">(a, b) =&gt; a + b</code>)
              sind eine kompaktere Schreibweise für Funktionen. Bei nur einem Ausdruck im
              Funktionskörper entfällt sogar{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">return</code> und die
              geschweiften Klammern – der Ausdruck wird automatisch zurückgegeben.
            </p>
            <p>
              <strong>Destructuring</strong> entpackt Werte aus Arrays oder Objekten direkt in
              Variablen:{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">const {"{ name, preis }"} = produkt;</code>{" "}
              statt zweimal <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">produkt.name</code>{" "}
              zu schreiben. Der <strong>Spread-Operator</strong> (
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">...</code>) kopiert Inhalte in
              ein neues Array oder Objekt – nützlich, um Daten zu verändern, ohne das Original zu
              mutieren.
            </p>
            <p>
              Die <strong>Array-Methoden</strong>{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">map</code>,{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">filter</code> und{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">reduce</code> ersetzen viele
              manuelle <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">for</code>-Schleifen:{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">map</code> wandelt jedes
              Element in ein neues um,{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">filter</code> behält nur
              Elemente, die eine Bedingung erfüllen, und{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">reduce</code> fasst alle
              Elemente zu einem einzigen Ergebnis zusammen. Alle drei geben ein <em>neues</em>{" "}
              Array bzw. einen neuen Wert zurück, statt das Original zu verändern – und lassen
              sich verketten.
            </p>
            <p>
              <strong>Module</strong> teilen Code auf mehrere Dateien auf:{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">export</code> macht eine
              Funktion oder einen Wert aus einer Datei nach außen verfügbar,{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">import</code> holt sie sich in
              einer anderen Datei. Das hält einzelne Dateien überschaubar und Verantwortlichkeiten
              getrennt – die Grundlage jedes größeren Projekts.
            </p>
          </div>
        </section>

        {/* PRAXISBEISPIEL */}
        <section className="mb-14">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">2. Praxisbeispiel</h2>
          <p className="mb-8 text-sm text-ink/60">
            Dieselbe Einkaufsliste wie in Kapitel 5 – diesmal mit modernen Sprachfeatures statt
            klassischer Schleifen verarbeitet.
          </p>

          <div className="space-y-10">
            <Step n={1} title="Arrow Functions">
              <p className="text-sm text-ink/70">
                Zwei Schreibweisen, identisches Verhalten.
              </p>
              <ConsoleBlock code={step1Snippet} filename="script.js" />
            </Step>

            <Step n={2} title="Destructuring &amp; Spread">
              <p className="text-sm text-ink/70">
                Eigenschaften direkt entpacken, und ein Objekt verändern, ohne das Original
                anzufassen.
              </p>
              <ConsoleBlock code={step2Snippet} filename="script.js" />
            </Step>

            <Step n={3} title="map, filter, reduce statt Schleife">
              <p className="text-sm text-ink/70">
                Dieselbe Gesamtsumme wie in Kapitel 5 (265) – hier ganz ohne{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">for...of</code>.
              </p>
              <ConsoleBlock code={step3Snippet} filename="script.js" />
            </Step>

            <Step n={4} title="Module: Code auf mehrere Dateien aufteilen">
              <p className="text-sm text-ink/70">
                Dieses Beispiel lässt sich nicht in einer einzelnen Konsole ausführen –{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">import</code>/
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">export</code> funktionieren
                nur zwischen echten Dateien (im Browser mit{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">&lt;script type=&quot;module&quot;&gt;</code>,
                in Node.js mit der Endung <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">.mjs</code>{" "}
                oder <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">&quot;type&quot;: &quot;module&quot;</code>{" "}
                in der <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">package.json</code>).
              </p>
              <CodeBlock code={modulWarenkorbSnippet} filename="warenkorb.js" lang="js" />
              <CodeBlock code={modulMainSnippet} filename="main.js" lang="js" />
            </Step>

            <Step n={5} title="Ergebnis: alles zusammen, wirklich ausgeführt">
              <p className="text-sm text-ink/70">
                Arrow Function, Destructuring im Funktionsparameter, verkettetes{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">filter().reduce()</code> und
                Spread – in einem Skript, echt ausgeführt.
              </p>
              <ConsoleBlock code={finalScript} />
            </Step>
          </div>
        </section>

        {/* ÜBUNGSAUFGABE */}
        <section className="mb-10">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">3. Übungsaufgabe</h2>
          <p className="mb-6 text-sm text-ink/60">
            Jetzt bist du dran. Nur mit modernen Array-Methoden – keine{" "}
            <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">for</code>-Schleife.
          </p>

          <div className="mb-6 rounded-xl border border-accent2/30 bg-accent2/5 p-5">
            <h3 className="mb-2 font-semibold text-accent2">Aufgabe</h3>
            <p className="text-sm leading-relaxed text-ink/75">
              Schreibe eine Funktion{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">
                guenstigeAlternativen(artikel, maxPreis)
              </code>
              , die aus der Einkaufsliste ein neues Array zurückgibt – nur mit den Eigenschaften{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">name</code> und{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">preis</code> (nicht{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">menge</code>) – aller Artikel,
              deren Preis höchstens <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">maxPreis</code>{" "}
              beträgt. Rufe die Funktion mit einem Grenzwert von <strong>50 €</strong> auf und gib
              das Ergebnis aus.
            </p>
            <p className="mt-3 text-sm text-ink/60">
              <strong>Tipp:</strong> Verkette{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">filter</code> und{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">map</code> – erst eingrenzen,
              dann transformieren. In beiden Callbacks lässt sich das Parameter-Objekt direkt
              destrukturieren.
            </p>
          </div>

          <SolutionReveal>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">Lösung – wirklich ausgeführt</h4>
                <ConsoleBlock code={exerciseSolutionScript} />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">Erklärung</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/70">
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">
                      filter(({"{ preis }"}) =&gt; preis &lt;= maxPreis)
                    </code>{" "}
                    destrukturiert das Parameter-Objekt direkt in der Parameterliste – keine
                    Zwischenvariable nötig.
                  </li>
                  <li>
                    Die Verkettung <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">filter(...).map(...)</code>{" "}
                    liest sich wie ein Datenfluss von oben nach unten: erst eingrenzen, dann
                    transformieren.
                  </li>
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">
                      map(({"{ name, preis }"}) =&gt; ({"{ name, preis }"}))
                    </code>{" "}
                    nutzt Objekt-Shorthand: Da Variablen- und Property-Name übereinstimmen, reicht{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">{"{ name, preis }"}</code>{" "}
                    statt <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">{"{ name: name, preis: preis }"}</code>.
                  </li>
                  <li>
                    <strong>Wichtige Falle:</strong> Die Klammern um das zurückgegebene Objekt (
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">(&#123; ... &#125;)</code>)
                    sind bei einer Arrow Function mit implizitem Return notwendig – ohne sie
                    interpretiert JavaScript die geschweiften Klammern als Funktionskörper statt
                    als Objekt-Literal.
                  </li>
                </ul>
              </div>
            </div>
          </SolutionReveal>
        </section>

        <div className="flex items-center justify-between border-t border-ink/10 pt-8">
          <Link href="/module/dom-events" className="text-sm font-medium text-ink/60 hover:text-ink">
            ← Kapitel 6: DOM-Manipulation &amp; Events
          </Link>
          <span className="text-sm text-ink/35">Nächstes Kapitel: Asynchrones JavaScript</span>
        </div>
      </main>
    </>
  );
}
