"use client";

import { useEffect, useState } from "react";
import CodeBlock from "./CodeBlock";

function formatValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (value === null) return "null";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

type MockResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
};

const MOCK_RESPONSES: Record<string, unknown> = {
  "/api/nutzer/7": { id: 7, name: "Jana Beispiel", rolle: "Frontend-Entwicklerin" },
  default: { id: 0, name: "Unbekannt", rolle: "Unbekannt" },
};

/** Simuliertes fetch: fester Delay, keine echte Netzwerkanfrage – aber ein
 *  echtes, zeitversetzt auflösendes Promise. Jede URL, die "kaputt" enthält,
 *  liefert eine 500er-Antwort (ok: false), um Fehlerbehandlung zu üben. */
function simuliertesFetch(url: string): Promise<MockResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (String(url).includes("kaputt")) {
        resolve({
          ok: false,
          status: 500,
          json: async () => ({ fehler: "Serverfehler" }),
        });
      } else {
        resolve({
          ok: true,
          status: 200,
          json: async () => MOCK_RESPONSES[url] ?? MOCK_RESPONSES.default,
        });
      }
    }, 500);
  });
}

/**
 * Wie ConsoleBlock, aber für asynchronen Code: führt das Skript im Browser
 * aus und aktualisiert die Konsolen-Ausgabe live, sobald echte
 * setTimeout-/Promise-Zeitpunkte eintreten – die Reihenfolge und das Timing
 * der Zeilen unten sind also real, nicht nachgestellt. `fetch` ist dabei
 * durch eine simulierte, verzögerte Version ersetzt (siehe Hinweistext im
 * Modul) – keine echten Netzwerkanfragen.
 */
export default function AsyncConsoleBlock({
  code,
  filename = "script.js",
}: {
  code: string;
  filename?: string;
}) {
  const [lines, setLines] = useState<string[]>([]);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let active = true;
    setLines([]);
    setRunning(true);

    const fakeConsole = {
      log: (...args: unknown[]) => {
        if (!active) return;
        const line = args.map(formatValue).join(" ");
        setLines((prev) => [...prev, line]);
      },
    };

    let pending = 0;
    const markStart = () => {
      pending += 1;
    };
    const markDone = () => {
      pending -= 1;
      if (pending <= 0 && active) setRunning(false);
    };

    const trackedFetch = (url: string) => {
      markStart();
      const p = simuliertesFetch(url);
      p.then(markDone, markDone);
      return p;
    };

    try {
      // eslint-disable-next-line no-new-func
      const run = new Function("console", "fetch", code);
      const result = run(fakeConsole, trackedFetch);
      if (result && typeof (result as Promise<unknown>).then === "function") {
        markStart();
        (result as Promise<unknown>).then(markDone, (err: unknown) => {
          if (active) {
            setLines((prev) => [...prev, `Unbehandelter Fehler: ${(err as Error).message}`]);
          }
          markDone();
        });
      } else {
        setRunning(pending > 0);
      }
    } catch (err) {
      setLines((prev) => [...prev, `Fehler: ${(err as Error).message}`]);
      setRunning(false);
    }

    // Falls nach dem synchronen Teil kein fetch/Promise offen ist, ist der
    // Lauf schon fertig – kurze Verzögerung, damit markStart() vorher greift.
    const check = setTimeout(() => {
      if (active && pending <= 0) setRunning(false);
    }, 0);

    return () => {
      active = false;
      clearTimeout(check);
    };
  }, [code]);

  return (
    <div className="space-y-2">
      <CodeBlock code={code} filename={filename} lang="js" />
      <div className="overflow-hidden rounded-lg border border-mint/25 bg-mint/5">
        <div className="flex items-center justify-between border-b border-mint/20 px-4 py-2 text-xs font-medium text-mint">
          <span>Konsolen-Ausgabe (echt ausgeführt, zeitversetzt)</span>
          {running && <span className="text-mint/60">läuft …</span>}
        </div>
        <pre className="min-h-[2.5rem] overflow-x-auto p-4 text-[13px] leading-relaxed text-ink/75">
          <code className="font-mono">
            {lines.map((line, i) => (
              <div key={i}>
                <span className="text-mint/70">›</span> {line}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
