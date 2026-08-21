"use client";

import { useMemo } from "react";
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

/**
 * Zeigt einen JavaScript-Codeblock UND führt ihn tatsächlich im Browser aus –
 * die "Konsolen-Ausgabe" darunter stammt von echten console.log-Aufrufen im
 * übergebenen Code, nicht von Hand geschriebenem Beispieltext.
 */
export default function ConsoleBlock({
  code,
  filename = "script.js",
}: {
  code: string;
  filename?: string;
}) {
  const output = useMemo(() => {
    const lines: string[] = [];
    const fakeConsole = {
      log: (...args: unknown[]) => lines.push(args.map(formatValue).join(" ")),
    };
    try {
      // eslint-disable-next-line no-new-func
      const run = new Function("console", code);
      run(fakeConsole);
    } catch (err) {
      lines.push(`Fehler: ${(err as Error).message}`);
    }
    return lines;
  }, [code]);

  return (
    <div className="space-y-2">
      <CodeBlock code={code} filename={filename} lang="js" />
      <div className="overflow-hidden rounded-lg border border-mint/25 bg-mint/5">
        <div className="border-b border-mint/20 px-4 py-2 text-xs font-medium text-mint">
          Konsolen-Ausgabe (echt ausgeführt)
        </div>
        <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-ink/75">
          <code className="font-mono">
            {output.map((line, i) => (
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
