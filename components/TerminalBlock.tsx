"use client";

import { useState } from "react";

export type TerminalLine = {
  /** Ein eingegebener Befehl (wird mit "$ " dargestellt). */
  cmd?: string;
  /** Eine Ausgabezeile des Terminals (gedimmt dargestellt). */
  out?: string;
  /** Ein Kommentar im Terminal, z. B. "# Datei bearbeiten" (kursiv, gedimmt). */
  note?: string;
};

export default function TerminalBlock({
  lines,
  filename = "Terminal",
}: {
  lines: TerminalLine[];
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);
  const commandsOnly = lines
    .filter((l) => l.cmd)
    .map((l) => l.cmd)
    .join("\n");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(commandsOnly);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard-API nicht verfügbar – kein hartes Fehlverhalten nötig
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-ink/10 bg-ink text-paper">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2 text-xs">
        <span className="font-mono text-paper/60">{filename}</span>
        <button
          onClick={handleCopy}
          className="rounded bg-white/10 px-2 py-1 font-medium text-paper/80 transition hover:bg-white/20"
        >
          {copied ? "Befehle kopiert ✓" : "Nur Befehle kopieren"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono">
          {lines.map((l, i) => (
            <div key={i} className={l.cmd ? "mt-2 first:mt-0" : ""}>
              {l.cmd && (
                <>
                  <span className="text-mint">$</span> <span>{l.cmd}</span>
                </>
              )}
              {l.out && <div className="text-paper/45">{l.out}</div>}
              {l.note && <div className="italic text-paper/35"># {l.note}</div>}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
