import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import AsyncConsoleBlock from "@/components/AsyncConsoleBlock";
import SolutionReveal from "@/components/SolutionReveal";

const step1Snippet = `// Klassisches Callback-Muster: eine Funktion wird "später" aufgerufen
function ladeDatenCallback(callback) {
  setTimeout(() => {
    callback("Daten geladen (Callback)");
  }, 500);
}

ladeDatenCallback((ergebnis) => {
  console.log(ergebnis);
});

// Dasselbe als Promise: ein Objekt, das später "aufgelöst" wird
function ladeDatenPromise() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Daten geladen (Promise)"), 700);
  });
}

ladeDatenPromise().then((ergebnis) => console.log(ergebnis));

console.log("Diese Zeile erscheint sofort – JavaScript wartet nicht.");`;

const step2Snippet = `function ladeDaten() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Daten geladen"), 500);
  });
}

async function starte() {
  console.log("Ladevorgang gestartet …");
  const ergebnis = await ladeDaten(); // pausiert nur diese Funktion
  console.log(ergebnis);
  console.log("Fertig!");
}

starte();
console.log("Diese Zeile läuft, während starte() noch wartet.");`;

const step3Snippet = `async function ladeNutzer(id) {
  const response = await fetch(\`/api/nutzer/\${id}\`);
  const daten = await response.json();
  console.log(daten);
}

ladeNutzer(7);`;

const step4Snippet = `async function ladeNutzerSicher(id) {
  try {
    const response = await fetch(\`/api/nutzer/\${id}\`);

    // fetch lehnt sein Promise NUR bei Netzwerkfehlern ab – ein 404 oder
    // 500 gilt für fetch selbst als "erfolgreiche" Antwort!
    if (!response.ok) {
      throw new Error(\`Server antwortete mit Status \${response.status}\`);
    }

    const daten = await response.json();
    console.log(daten);
  } catch (fehler) {
    console.log("Fehler beim Laden:", fehler.message);
  }
}

ladeNutzerSicher("kaputt");`;

const finalScript = `async function ladeNutzerSicher(id) {
  try {
    const response = await fetch(\`/api/nutzer/\${id}\`);

    if (!response.ok) {
      throw new Error(\`Server antwortete mit Status \${response.status}\`);
    }

    const daten = await response.json();
    console.log(\`Erfolg: \${daten.name} (\${daten.rolle})\`);
  } catch (fehler) {
    console.log(\`Fehler bei Nutzer "\${id}": \${fehler.message}\`);
  }
}

async function starte() {
  console.log("Lade zwei Nutzer parallel …");

  // Promise.all: beide Anfragen laufen gleichzeitig statt nacheinander
  await Promise.all([
    ladeNutzerSicher(7),
    ladeNutzerSicher("kaputt"),
  ]);

  console.log("Beide Anfragen abgeschlossen.");
}

starte();`;

const exerciseSolutionScript = `async function ladeNutzer(id) {
  try {
    const response = await fetch(\`/api/nutzer/\${id}\`);
    if (!response.ok) {
      throw new Error(\`Status \${response.status}\`);
    }
    const daten = await response.json();
    return daten.name;
  } catch (fehler) {
    console.log(\`Übersprungen (\${id}): \${fehler.message}\`);
    return null;
  }
}

async function ladeAlleNamen(ids) {
  // map (ohne await!) startet alle Anfragen gleichzeitig
  const ergebnisse = await Promise.all(ids.map((id) => ladeNutzer(id)));
  return ergebnisse.filter((name) => name !== null);
}

ladeAlleNamen(["7", "kaputt"]).then((namen) => console.log(namen));`;

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

export default function AsyncJsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <Link href="/#curriculum" className="text-sm text-ink/50 hover:text-ink">
          ← Zurück zur Kapitelübersicht
        </Link>

        <div className="mt-4 mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
            Kapitel 8 · Phase 2 · JavaScript-Grundlagen
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Asynchrones JavaScript</h1>
          <p className="mt-3 text-ink/60">
            Ziel: Mit Promises, async/await und der Fetch API Daten laden, ohne die Seite zu
            blockieren – und Fehler dabei sauber abfangen. Dauer: ca. 3 Std.
          </p>
        </div>

        {/* THEORIE */}
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">1. Theorie</h2>
          <div className="prose-de space-y-4 text-[15px] text-ink/80">
            <p>
              JavaScript ist single-threaded: Es kann zu jedem Zeitpunkt nur eine Sache
              gleichzeitig tun. Würde eine Netzwerkanfrage den Code blockieren, bis die Antwort da
              ist, würde währenddessen die gesamte Seite einfrieren. Asynchrone APIs lösen das:
              JavaScript startet eine Operation, macht mit dem restlichen Code weiter und wird
              erst benachrichtigt, wenn das Ergebnis vorliegt.
            </p>
            <p>
              Der älteste Ansatz sind <strong>Callbacks</strong>: eine Funktion, die als Argument
              übergeben und später aufgerufen wird. Bei mehreren aufeinanderfolgenden asynchronen
              Schritten führt das schnell zu tief verschachteltem, schwer lesbarem Code.
            </p>
            <p>
              <strong>Promises</strong> lösen das eleganter: Ein Promise repräsentiert ein
              Ergebnis, das erst später vorliegt – <em>pending</em> (ausstehend),{" "}
              <em>fulfilled</em> (erfüllt) oder <em>rejected</em> (abgelehnt). Mit{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">.then()</code> reagiert man
              auf Erfolg, mit <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">.catch()</code>{" "}
              auf Fehler.
            </p>
            <p>
              <strong>async/await</strong> ist syntaktischer Zucker über Promises: Eine mit{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">async</code> markierte
              Funktion darf <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">await</code>{" "}
              verwenden, um auf ein Promise zu warten – der Code liest sich dadurch wie
              synchroner Code, obwohl er es nicht ist.{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">await</code> pausiert dabei
              nur die aktuelle Funktion, nicht das gesamte Programm.
            </p>
            <p>
              Die <strong>Fetch API</strong> (
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">fetch(url)</code>) lädt Daten
              aus dem Netz und gibt ein Promise zurück, das zu einem{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">Response</code>-Objekt
              auflöst. Wichtig: <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">fetch</code>{" "}
              lehnt sein Promise nur bei echten Netzwerkfehlern ab – ein 404 oder 500 gilt dafür
              als „erfolgreiche" Antwort! Man muss deshalb{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">response.ok</code> selbst
              prüfen. <strong>try/catch</strong> fängt Fehler in{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">async</code>-Funktionen ab –
              ein <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">await</code> auf ein
              abgelehntes Promise wirft einen Fehler, den ein umschließendes{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">try/catch</code> genauso
              behandelt wie einen synchron geworfenen.
            </p>
          </div>
        </section>

        {/* PRAXISBEISPIEL */}
        <section className="mb-14">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">2. Praxisbeispiel</h2>
          <p className="mb-8 text-sm text-ink/60">
            Alle Ausgaben unten laufen wirklich zeitversetzt ab – echte{" "}
            <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">setTimeout</code>
            /Promise-Timings, keine nachgestellten Beispieltexte.{" "}
            <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">fetch</code> ist dabei durch
            eine simulierte Version ersetzt (fester Delay, keine echte Netzwerkanfrage) – der
            Promise-Ablauf drumherum ist trotzdem real.
          </p>

          <div className="space-y-10">
            <Step n={1} title="Callback vs. Promise">
              <p className="text-sm text-ink/70">
                Beobachte die Reihenfolge: Die letzte Zeile im Code erscheint als Erste in der
                Ausgabe.
              </p>
              <AsyncConsoleBlock code={step1Snippet} />
            </Step>

            <Step n={2} title="async/await">
              <p className="text-sm text-ink/70">
                Dasselbe Verhalten, lesbarer geschrieben – die Reihenfolge der Ausgaben bleibt
                identisch.
              </p>
              <AsyncConsoleBlock code={step2Snippet} />
            </Step>

            <Step n={3} title="Fetch API (simuliert)">
              <p className="text-sm text-ink/70">
                Zwei <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">await</code>s
                hintereinander: erst auf die Antwort, dann auf ihren geparsten Inhalt.
              </p>
              <AsyncConsoleBlock code={step3Snippet} />
            </Step>

            <Step n={4} title="Fehlerbehandlung mit try/catch">
              <p className="text-sm text-ink/70">
                Die ID <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">&quot;kaputt&quot;</code>{" "}
                liefert absichtlich Status 500 – ohne die{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">response.ok</code>-Prüfung
                würde <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">response.json()</code>{" "}
                stillschweigend eine Fehlerseite „erfolgreich" verarbeiten.
              </p>
              <AsyncConsoleBlock code={step4Snippet} />
            </Step>

            <Step n={5} title="Ergebnis: beides kombiniert, wirklich ausgeführt">
              <p className="text-sm text-ink/70">
                Zwei Anfragen parallel per{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">Promise.all</code> – eine
                erfolgreich, eine mit abgefangenem Fehler.
              </p>
              <AsyncConsoleBlock code={finalScript} />
            </Step>
          </div>
        </section>

        {/* ÜBUNGSAUFGABE */}
        <section className="mb-10">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">3. Übungsaufgabe</h2>
          <p className="mb-6 text-sm text-ink/60">
            Jetzt bist du dran. Baue auf{" "}
            <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">ladeNutzerSicher</code> aus
            Schritt 4 auf.
          </p>

          <div className="mb-6 rounded-xl border border-accent2/30 bg-accent2/5 p-5">
            <h3 className="mb-2 font-semibold text-accent2">Aufgabe</h3>
            <p className="text-sm leading-relaxed text-ink/75">
              Schreibe eine Funktion{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">ladeAlleNamen(ids)</code>,
              die für ein Array von IDs jeweils{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">/api/nutzer/&lt;id&gt;</code>{" "}
              abruft und am Ende ein Array mit den Namen <em>aller erfolgreich geladenen</em>{" "}
              Nutzer zurückgibt – fehlerhafte IDs werden übersprungen, ohne das Programm
              abzubrechen. Rufe die Funktion mit den IDs{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">[&quot;7&quot;, &quot;kaputt&quot;]</code>{" "}
              auf und gib das Ergebnis aus.
            </p>
            <p className="mt-3 text-sm text-ink/60">
              <strong>Tipp:</strong> Starte alle Anfragen mit{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">ids.map(...)</code> (ohne{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">await</code> in der{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">map</code>-Funktion selbst!)
              und warte dann mit{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">Promise.all</code> auf alle
              gemeinsam.
            </p>
          </div>

          <SolutionReveal>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">Lösung – wirklich ausgeführt</h4>
                <AsyncConsoleBlock code={exerciseSolutionScript} />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">Erklärung</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/70">
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">
                      ids.map((id) =&gt; ladeNutzer(id))
                    </code>{" "}
                    ruft <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">ladeNutzer</code>{" "}
                    für jede ID auf, <em>ohne</em> auf das Ergebnis zu warten – dadurch starten
                    alle Anfragen sofort und gleichzeitig statt nacheinander.
                  </li>
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">Promise.all(...)</code>{" "}
                    wartet, bis <em>alle</em> Promises abgeschlossen sind, und liefert ein Array
                    aller Ergebnisse – in derselben Reihenfolge wie die Eingabe, unabhängig davon,
                    welche Anfrage zuerst fertig war.
                  </li>
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">ladeNutzer</code> fängt
                    seinen eigenen Fehler per try/catch ab und gibt bei einem Fehler{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">null</code> zurück,
                    statt den Fehler weiterzureichen – deshalb bricht{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">Promise.all</code> nicht
                    ab, selbst wenn eine ID fehlschlägt.
                  </li>
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">
                      .filter((name) =&gt; name !== null)
                    </code>{" "}
                    entfernt am Ende genau die fehlgeschlagenen Einträge – übrig bleiben nur echte
                    Namen.
                  </li>
                </ul>
              </div>
            </div>
          </SolutionReveal>
        </section>

        <div className="flex items-center justify-between border-t border-ink/10 pt-8">
          <Link href="/module/modernes-js" className="text-sm font-medium text-ink/60 hover:text-ink">
            ← Kapitel 7: Modernes JavaScript (ES6+)
          </Link>
          <span className="text-sm text-ink/35">Nächstes Kapitel: Node.js-Grundlagen</span>
        </div>
      </main>
    </>
  );
}
