"use client";

import { useState } from "react";

export default function CodeBlock({
  code,
  filename,
  lang = "text",
}: {
  code: string;
  filename?: string;
  lang?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard-API nicht verfügbar – kein hartes Fehlverhalten nötig
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-ink/10 bg-ink text-paper">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2 text-xs">
        <span className="font-mono text-paper/60">{filename ?? lang}</span>
        <button
          onClick={handleCopy}
          className="rounded bg-white/10 px-2 py-1 font-medium text-paper/80 transition hover:bg-white/20"
        >
          {copied ? "Kopiert ✓" : "Kopieren"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
