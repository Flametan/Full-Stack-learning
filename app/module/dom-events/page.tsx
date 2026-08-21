import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import CodeBlock from "@/components/CodeBlock";
import LivePreview from "@/components/LivePreview";
import SolutionReveal from "@/components/SolutionReveal";

const htmlSnippet = `<form id="todo-formular">
  <input type="text" id="todo-eingabe" placeholder="Neue Aufgabe …" required />
  <button type="submit">Hinzufügen</button>
</form>

<ul id="todo-liste"></ul>`;

const step2Snippet = `// script.js

// Elemente auswählen – querySelector nutzt CSS-Selektor-Syntax
const formular = document.querySelector("#todo-formular");
const eingabe = document.querySelector("#todo-eingabe");
const liste = document.querySelector("#todo-liste");

// Neues Todo hinzufügen, wenn das Formular abgeschickt wird
formular.addEventListener("submit", (event) => {
  event.preventDefault(); // verhindert das Neuladen der Seite

  const text = eingabe.value.trim();
  if (text === "") return;

  const eintrag = document.createElement("li");
  eintrag.textContent = text;
  liste.appendChild(eintrag);

  eingabe.value = ""; // Eingabefeld leeren
  eingabe.focus();
});`;

const step3Snippet = `// script.js (Fortsetzung)

// Klick auf einen Eintrag markiert ihn als erledigt.
// Ein Listener auf der ganzen Liste statt auf jedem <li> einzeln:
// "Event Delegation" – funktioniert auch für Einträge, die es beim
// Laden der Seite noch gar nicht gab.
liste.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("erledigt");
  }
});`;

const step4Snippet = `// script.js (Fortsetzung)

// Doppelklick entfernt einen Eintrag wieder
liste.addEventListener("dblclick", (event) => {
  if (event.target.tagName === "LI") {
    event.target.remove();
  }
});`;

function todoDoc(extraJs: string, extraHtmlAfterList = "") {
  return `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8" /><style>
*{box-sizing:border-box;}
body{margin:0;padding:20px;font-family:system-ui,sans-serif;background-color:#f4f4f8;}
form{display:flex;gap:8px;margin-bottom:16px;}
input{flex:1;padding:8px 10px;border:1px solid #ddd;border-radius:6px;font-size:0.9rem;}
button{padding:8px 14px;border:none;border-radius:6px;background-color:#4f6df5;color:#fff;font-size:0.9rem;font-weight:600;cursor:pointer;}
button:hover{background-color:#3a56d4;}
ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px;}
li{padding:10px 12px;background-color:#fff;border-radius:6px;border:1px solid #eee;cursor:pointer;user-select:none;font-size:0.9rem;}
li:hover{border-color:#4f6df5;}
li.erledigt{color:#999;text-decoration:line-through;background-color:#fafafa;}
p#zaehler{margin-top:14px;font-size:0.8rem;color:#666;}
</style></head><body>
<form id="todo-formular">
  <input type="text" id="todo-eingabe" placeholder="Neue Aufgabe …" required />
  <button type="submit">Hinzufügen</button>
</form>
<ul id="todo-liste"></ul>
${extraHtmlAfterList}
<script>
const formular = document.querySelector("#todo-formular");
const eingabe = document.querySelector("#todo-eingabe");
const liste = document.querySelector("#todo-liste");

formular.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = eingabe.value.trim();
  if (text === "") return;
  const eintrag = document.createElement("li");
  eintrag.textContent = text;
  liste.appendChild(eintrag);
  eingabe.value = "";
  eingabe.focus();
  ${extraJs ? "aktualisiereZaehler();" : ""}
});

liste.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("erledigt");
    ${extraJs ? "aktualisiereZaehler();" : ""}
  }
});

liste.addEventListener("dblclick", (event) => {
  if (event.target.tagName === "LI") {
    event.target.remove();
    ${extraJs ? "aktualisiereZaehler();" : ""}
  }
});
${extraJs}
</script>
</body></html>`;
}

const resultDemoHtml = todoDoc("");

const exerciseHtmlSnippet = `<!-- unterhalb von <ul id="todo-liste"></ul> ergänzt -->
<p id="zaehler">0 von 0 offen</p>`;

const exerciseJsSnippet = `// script.js – vollständig, mit den vier neuen/geänderten Stellen

const formular = document.querySelector("#todo-formular");
const eingabe = document.querySelector("#todo-eingabe");
const liste = document.querySelector("#todo-liste");
const zaehler = document.querySelector("#zaehler"); // NEU

formular.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = eingabe.value.trim();
  if (text === "") return;
  const eintrag = document.createElement("li");
  eintrag.textContent = text;
  liste.appendChild(eintrag);
  eingabe.value = "";
  eingabe.focus();
  aktualisiereZaehler(); // NEU
});

liste.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("erledigt");
    aktualisiereZaehler(); // NEU
  }
});

liste.addEventListener("dblclick", (event) => {
  if (event.target.tagName === "LI") {
    event.target.remove();
    aktualisiereZaehler(); // NEU
  }
});

// NEU: zählt offene Einträge und aktualisiert den Text
function aktualisiereZaehler() {
  const gesamt = liste.querySelectorAll("li").length;
  const offen = liste.querySelectorAll("li:not(.erledigt)").length;
  zaehler.textContent = \`\${offen} von \${gesamt} offen\`;
}
aktualisiereZaehler(); // NEU – zeigt den Startwert direkt beim Laden`;

const exerciseDemoHtml = todoDoc(
  `
function aktualisiereZaehler() {
  const gesamt = liste.querySelectorAll("li").length;
  const offen = liste.querySelectorAll("li:not(.erledigt)").length;
  zaehler.textContent = \`\${offen} von \${gesamt} offen\`;
}
aktualisiereZaehler();
`,
  '<p id="zaehler">0 von 0 offen</p>'
).replace(
  "const liste = document.querySelector(\"#todo-liste\");",
  "const liste = document.querySelector(\"#todo-liste\");\nconst zaehler = document.querySelector(\"#zaehler\");"
);

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

export default function DomEventsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <Link href="/#curriculum" className="text-sm text-ink/50 hover:text-ink">
          ← Zurück zur Kapitelübersicht
        </Link>

        <div className="mt-4 mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
            Kapitel 6 · Phase 2 · JavaScript-Grundlagen
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">DOM-Manipulation &amp; Events</h1>
          <p className="mt-3 text-ink/60">
            Ziel: Seiteninhalte per JavaScript auswählen, verändern und auf Nutzerinteraktionen
            reagieren – am Beispiel einer kleinen Todo-Liste. Dauer: ca. 3 Std.
          </p>
        </div>

        {/* THEORIE */}
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">1. Theorie</h2>
          <div className="prose-de space-y-4 text-[15px] text-ink/80">
            <p>
              Das <strong>DOM</strong> (Document Object Model) ist die Baumstruktur, in die der
              Browser jedes HTML-Dokument übersetzt: Jedes Element wird zu einem Knoten, auf den
              JavaScript zugreifen und den es verändern kann. Über das globale{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">document</code>-Objekt gelangt
              man an diese Struktur.
            </p>
            <p>
              Um Elemente zu finden, nutzt man{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">document.querySelector(selector)</code>{" "}
              (liefert das erste Treffer-Element) oder{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">document.querySelectorAll(selector)</code>{" "}
              (liefert alle Treffer) – der Selektor folgt CSS-Syntax (
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">.klasse</code>,{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">#id</code>,{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">tag</code>).
            </p>
            <p>
              Gefundene Elemente lassen sich verändern:{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">element.textContent</code>{" "}
              setzt reinen Text,{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">element.classList.toggle()</code>{" "}
              steuert CSS-Klassen,{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">document.createElement()</code>{" "}
              erzeugt neue Knoten, die mit{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">appendChild()</code> in den Baum
              eingehängt werden.
            </p>
            <p>
              <strong>Events</strong> sind der Weg, auf Nutzerinteraktion zu reagieren:{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">
                element.addEventListener(&quot;click&quot;, funktion)
              </code>{" "}
              registriert eine Funktion, die bei jedem Klick ausgeführt wird. Sie erhält ein{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">event</code>-Objekt mit Details
              zum Auslöser – etwa{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">event.target</code> (das
              auslösende Element) oder{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">event.preventDefault()</code>,
              um Standardverhalten zu unterbinden – etwa das automatische Neuladen der Seite bei
              einem Formular-Submit.
            </p>
            <p>
              Formulareingaben liest man über die{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">value</code>-Eigenschaft des
              jeweiligen <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;input&gt;</code>
              -Elements aus, meist im <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">submit</code>
              -Handler. Zusammen ermöglichen DOM-Zugriff und Events, eine Seite ohne Neuladen
              interaktiv zu verändern.
            </p>
          </div>
        </section>

        {/* PRAXISBEISPIEL */}
        <section className="mb-14">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">2. Praxisbeispiel</h2>
          <p className="mb-8 text-sm text-ink/60">
            Wir bauen eine kleine Todo-Liste: Einträge hinzufügen, per Klick als erledigt
            markieren, per Doppelklick entfernen.
          </p>

          <div className="space-y-10">
            <Step n={1} title="HTML-Grundgerüst: Formular und leere Liste">
              <p className="text-sm text-ink/70">
                Die Liste startet komplett leer – jeder Eintrag entsteht später per JavaScript.
              </p>
              <CodeBlock code={htmlSnippet} filename="index.html" lang="html" />
            </Step>

            <Step n={2} title="Elemente auswählen und neue Todos hinzufügen">
              <p className="text-sm text-ink/70">
                Drei Elemente per <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">querySelector</code>{" "}
                greifen, dann auf das <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">submit</code>
                -Event des Formulars reagieren.
              </p>
              <CodeBlock code={step2Snippet} filename="script.js" lang="js" />
            </Step>

            <Step n={3} title="Klick markiert einen Eintrag als erledigt">
              <p className="text-sm text-ink/70">
                Statt jedem einzelnen <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">&lt;li&gt;</code>{" "}
                einen eigenen Listener zu geben, hört ein einziger Listener auf der Liste zu.
              </p>
              <CodeBlock code={step3Snippet} filename="script.js (Fortsetzung)" lang="js" />
            </Step>

            <Step n={4} title="Doppelklick entfernt einen Eintrag">
              <p className="text-sm text-ink/70">
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">element.remove()</code> nimmt
                den Knoten direkt aus dem DOM-Baum heraus.
              </p>
              <CodeBlock code={step4Snippet} filename="script.js (Fortsetzung)" lang="js" />
            </Step>

            <Step n={5} title="Ergebnis: wirklich anfassbar">
              <p className="text-sm text-ink/70">
                Das ist keine Animation – tippe etwas ein, drücke „Hinzufügen", klicke einen
                Eintrag an (erledigt) oder doppelklicke ihn (löschen).
              </p>
              <LivePreview html={resultDemoHtml} height={280} interactive label="Todo-Liste" />
            </Step>
          </div>
        </section>

        {/* ÜBUNGSAUFGABE */}
        <section className="mb-10">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">3. Übungsaufgabe</h2>
          <p className="mb-6 text-sm text-ink/60">
            Jetzt bist du dran. Erweitere die Todo-Liste aus dem Praxisbeispiel.
          </p>

          <div className="mb-6 rounded-xl border border-accent2/30 bg-accent2/5 p-5">
            <h3 className="mb-2 font-semibold text-accent2">Aufgabe</h3>
            <p className="text-sm leading-relaxed text-ink/75">
              Füge einen Zähler hinzu, der anzeigt, wie viele Aufgaben noch offen (nicht erledigt)
              sind – z. B. „2 von 3 offen". Der Zähler soll sich automatisch aktualisieren, sobald
              ein Todo hinzugefügt, als erledigt markiert oder gelöscht wird.
            </p>
            <p className="mt-3 text-sm text-ink/60">
              <strong>Tipp:</strong> Der CSS-Selektor{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">li:not(.erledigt)</code>{" "}
              trifft genau die Einträge, die die Klasse{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">erledigt</code> nicht haben –
              zusammen mit <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">querySelectorAll(...).length</code>{" "}
              ergibt das die offene Anzahl.
            </p>
          </div>

          <SolutionReveal>
            <div className="space-y-6">
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">HTML-Ergänzung</h4>
                <CodeBlock code={exerciseHtmlSnippet} filename="index.html (Ausschnitt)" lang="html" />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">JS-Ergänzung</h4>
                <CodeBlock code={exerciseJsSnippet} filename="script.js (Ergänzung)" lang="js" />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">Ergebnis – wirklich anfassbar</h4>
                <LivePreview html={exerciseDemoHtml} height={320} interactive label="Todo-Liste mit Zähler" />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">Erklärung</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/70">
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">liste.querySelectorAll(&quot;li&quot;).length</code>{" "}
                    zählt alle Einträge, egal ob erledigt oder nicht.
                  </li>
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">
                      liste.querySelectorAll(&quot;li:not(.erledigt)&quot;).length
                    </code>{" "}
                    zählt nur die offenen – die CSS-Pseudoklasse{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">:not()</code> funktioniert
                    auch innerhalb von <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">querySelectorAll</code>.
                  </li>
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">aktualisiereZaehler()</code>{" "}
                    wird bewusst als eigene Funktion definiert, damit sie an drei Stellen
                    wiederverwendet werden kann – einmal pro Handler, der die Liste verändert
                    (hinzufügen, erledigt markieren, löschen).
                  </li>
                  <li>
                    Der abschließende Aufruf{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">aktualisiereZaehler();</code>{" "}
                    ganz unten sorgt dafür, dass der Zähler auch direkt beim Laden der Seite einen
                    korrekten Startwert zeigt (<code className="rounded bg-ink/5 px-1 py-0.5 text-xs">0 von 0 offen</code>),
                    statt leer zu bleiben, bis die erste Änderung passiert.
                  </li>
                </ul>
              </div>
            </div>
          </SolutionReveal>
        </section>

        <div className="flex items-center justify-between border-t border-ink/10 pt-8">
          <Link href="/module/js-grundlagen" className="text-sm font-medium text-ink/60 hover:text-ink">
            ← Kapitel 5: JavaScript-Grundlagen
          </Link>
          <span className="text-sm text-ink/35">Nächstes Kapitel: Modernes JavaScript (ES6+)</span>
        </div>
      </main>
    </>
  );
}
