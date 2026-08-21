import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import CodeBlock from "@/components/CodeBlock";
import RequestCycleDiagram from "@/components/RequestCycleDiagram";
import SolutionReveal from "@/components/SolutionReveal";

const requestSnippet = `GET / HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml
Accept-Language: de-DE,de;q=0.9
Connection: keep-alive`;

const responseSnippet = `HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1256
Server: nginx/1.25.3
Cache-Control: max-age=3600

<!DOCTYPE html>
<html>
  <head>
    <title>Example Domain</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <h1>Example Domain</h1>
    <p>Diese Domain dient als Beispiel …</p>
  </body>
</html>`;

const exerciseResponseSnippet = `HTTP/1.1 404 Not Found
Content-Type: text/html; charset=UTF-8
Content-Length: 98
Server: nginx/1.25.3

<html><body><h1>404 - Seite nicht gefunden</h1></body></html>`;

const statusCodes = [
  { code: "200", label: "OK", desc: "Erfolgreich – die Antwort enthält die angeforderten Daten.", color: "mint" },
  { code: "301", label: "Moved Permanently", desc: "Dauerhafte Weiterleitung auf eine andere URL.", color: "accent" },
  { code: "404", label: "Not Found", desc: "Die angeforderte Ressource existiert unter dieser URL nicht.", color: "accent2" },
  { code: "500", label: "Internal Server Error", desc: "Auf dem Server ist ein unerwarteter Fehler aufgetreten.", color: "ink" },
];

const badgeByColor: Record<string, string> = {
  accent: "bg-accent/10 text-accent",
  accent2: "bg-accent2/15 text-accent2",
  mint: "bg-mint/10 text-mint",
  ink: "bg-ink/10 text-ink",
};

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

export default function WieFunktioniertDasWebPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <Link href="/#curriculum" className="text-sm text-ink/50 hover:text-ink">
          ← Zurück zur Kapitelübersicht
        </Link>

        <div className="mt-4 mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
            Kapitel 1 · Phase 1 · Grundlagen des Web
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Wie funktioniert das Web?</h1>
          <p className="mt-3 text-ink/60">
            Ziel: Das Client-Server-Modell, den HTTP-Request/Response-Zyklus und die Rolle des
            Browsers verstehen – bevor es im nächsten Kapitel an die erste eigene Seite geht. Dauer:
            ca. 1–2 Std.
          </p>
        </div>

        {/* THEORIE */}
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">1. Theorie</h2>
          <div className="prose-de space-y-4 text-[15px] text-ink/80">
            <p>
              Das Web basiert auf dem <strong>Client-Server-Modell</strong>: Dein Browser (der{" "}
              <strong>Client</strong>) fordert Inhalte an, ein <strong>Server</strong> irgendwo im
              Internet liefert sie. Damit der Browser überhaupt weiß, welchen Server er ansprechen
              soll, muss er zuerst die menschenlesbare Adresse (<code className="rounded bg-ink/5 px-1 py-0.5 text-sm">example.com</code>)
              in eine IP-Adresse übersetzen. Das übernimmt das <strong>DNS</strong> (Domain Name
              System) – im Kern eine Art Telefonbuch des Internets.
            </p>
            <p>
              Sobald die IP-Adresse bekannt ist, baut der Browser eine Verbindung auf und schickt
              einen <strong>HTTP-Request</strong>: eine Anfrage, die u. a. eine{" "}
              <strong>Methode</strong> (meist <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">GET</code>{" "}
              zum Abrufen, <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">POST</code> zum
              Senden von Daten), den Pfad und eine Reihe von <strong>Headern</strong> enthält – etwa
              welche Sprache bevorzugt wird. Der Server verarbeitet die Anfrage und schickt eine{" "}
              <strong>HTTP-Response</strong> zurück: einen <strong>Status-Code</strong> (Erfolg,
              Weiterleitung oder Fehler), eigene Header und meist einen Inhalt – etwa HTML.
            </p>
            <p>
              Dieser Austausch heißt <strong>Request/Response-Zyklus</strong> und ist zustandslos:
              Jede Anfrage steht für sich, der Server „erinnert" sich standardmäßig nicht an
              vorherige Anfragen (spätere Kapitel zeigen, wie man mit Sessions trotzdem
              Zustand herstellt).
            </p>
            <p>
              Der <strong>Browser</strong> ist mehr als nur ein Anzeigefenster: Er parst das
              empfangene HTML, entdeckt darin Verweise auf weitere Ressourcen –{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;link&gt;</code> für CSS,{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;script&gt;</code> für
              JavaScript, <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">&lt;img&gt;</code>{" "}
              für Bilder – und stößt dafür jeweils eigene HTTP-Requests an. Erst wenn alles geladen
              ist, entsteht daraus die fertig gerenderte Seite, die du siehst.
            </p>
          </div>
        </section>

        {/* PRAXISBEISPIEL */}
        <section className="mb-14">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">2. Praxisbeispiel</h2>
          <p className="mb-8 text-sm text-ink/60">
            Was passiert wirklich, wenn du <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">example.com</code>{" "}
            in die Adresszeile eingibst und Enter drückst?
          </p>

          <div className="space-y-10">
            <Step n={1} title="Der komplette Ablauf auf einen Blick">
              <p className="text-sm text-ink/70">
                Drei Beteiligte, sechs Schritte – vom Tippen der Adresse bis zur fertig gerenderten
                Seite.
              </p>
              <RequestCycleDiagram />
            </Step>

            <Step n={2} title="Der Request: was der Browser tatsächlich sendet">
              <p className="text-sm text-ink/70">
                Reiner Text nach einem festen Format: Methode + Pfad in der ersten Zeile, danach
                Header als Schlüssel-Wert-Paare.
              </p>
              <CodeBlock code={requestSnippet} filename="HTTP-Request" lang="http" />
            </Step>

            <Step n={3} title="Die Response: was der Server zurückschickt">
              <p className="text-sm text-ink/70">
                Genauso aufgebaut: Status-Zeile, Header, eine Leerzeile, dann der eigentliche
                Inhalt – hier HTML mit einem Verweis auf eine Stylesheet-Datei.
              </p>
              <CodeBlock code={responseSnippet} filename="HTTP-Response" lang="http" />
            </Step>

            <Step n={4} title="Status-Codes verstehen">
              <p className="text-sm text-ink/70">
                Die erste Ziffer verrät die Kategorie: 2xx = Erfolg, 3xx = Weiterleitung, 4xx =
                Fehler beim Client, 5xx = Fehler beim Server.
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {statusCodes.map((s) => (
                  <div key={s.code} className="flex items-start gap-3 rounded-lg border border-ink/10 bg-white p-3">
                    <span
                      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 font-mono text-xs font-semibold ${badgeByColor[s.color]}`}
                    >
                      {s.code}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-ink/80">{s.label}</div>
                      <div className="text-xs text-ink/55">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Step>

            <Step n={5} title="Was der Browser mit der Antwort macht">
              <p className="text-sm text-ink/70">
                Der Browser liest das HTML von oben nach unten. Sobald er auf{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">&lt;link rel=&quot;stylesheet&quot; href=&quot;/style.css&quot;&gt;</code>{" "}
                stößt, schickt er dafür einen eigenen Request los (Schritt 5 im Diagramm oben) –
                genauso für jedes Bild und jedes Skript. Erst wenn HTML, CSS und JavaScript
                zusammen ausgewertet sind, rendert der Browser die fertige Seite.
              </p>
            </Step>
          </div>
        </section>

        {/* ÜBUNGSAUFGABE */}
        <section className="mb-10">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">3. Übungsaufgabe</h2>
          <p className="mb-6 text-sm text-ink/60">
            Jetzt bist du dran. Lies die folgende HTTP-Response und beantworte drei Fragen dazu.
          </p>

          <div className="mb-6 rounded-xl border border-accent2/30 bg-accent2/5 p-5">
            <h3 className="mb-3 font-semibold text-accent2">Aufgabe</h3>
            <CodeBlock code={exerciseResponseSnippet} filename="HTTP-Response" lang="http" />
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink/75">
              <li>War die Anfrage erfolgreich? Woran erkennst du das?</li>
              <li>Welchen Datentyp (MIME-Type) enthält die Antwort laut Header?</li>
              <li>Wie viele Byte ist der Antwort-Body laut Header groß?</li>
            </ol>
            <p className="mt-3 text-sm text-ink/60">
              <strong>Tipp:</strong> Alle drei Antworten stehen wörtlich in der Status-Zeile oder den
              Headern oben – du musst nichts schätzen.
            </p>
          </div>

          <SolutionReveal>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-ink/80">Lösung</h4>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/70">
                <li>
                  <strong>Nein.</strong> Der Status-Code{" "}
                  <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">404</code> steht für „Not
                  Found" – die Kategorie <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">4xx</code>{" "}
                  bedeutet: Der Client hat nach etwas gefragt, das es unter dieser URL nicht gibt.
                </li>
                <li>
                  <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">text/html; charset=UTF-8</code>{" "}
                  – zu finden im{" "}
                  <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">Content-Type</code>-Header.
                  Es ist reines HTML, UTF-8-kodiert.
                </li>
                <li>
                  <strong>98 Byte</strong>, laut{" "}
                  <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">Content-Length</code>
                  -Header – das entspricht der Länge des HTML-Fragments in der letzten Zeile.
                </li>
              </ul>
              <p className="pt-1 text-sm leading-relaxed text-ink/70">
                Wichtig zu erkennen: Auch eine 404-Antwort ist eine{" "}
                <em>technisch vollständige und gültige</em> HTTP-Response – der Server hat
                geantwortet, nur eben mit der Information „das gibt es hier nicht". Das
                unterscheidet einen 404 von einem Verbindungsfehler, bei dem gar keine Antwort
                ankommt.
              </p>
            </div>
          </SolutionReveal>
        </section>

        <div className="flex items-center justify-between border-t border-ink/10 pt-8">
          <Link href="/#curriculum" className="text-sm font-medium text-ink/60 hover:text-ink">
            ← Alle Kapitel
          </Link>
          <Link href="/module/html-css-basis" className="text-sm font-medium text-ink/60 hover:text-ink">
            Nächstes Kapitel: HTML/CSS-Basis →
          </Link>
        </div>
      </main>
    </>
  );
}
