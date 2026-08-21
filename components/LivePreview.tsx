"use client";

export default function LivePreview({ html, height = 260 }: { html: string; height?: number }) {
  return (
    <div className="overflow-hidden rounded-lg border border-ink/10 bg-white">
      <div className="flex items-center gap-1.5 border-b border-ink/10 bg-paper px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="ml-2 text-xs text-ink/40">Live-Vorschau</span>
      </div>
      <iframe
        title="Live-Vorschau"
        srcDoc={html}
        sandbox=""
        style={{ width: "100%", height, border: "none", display: "block" }}
      />
    </div>
  );
}
