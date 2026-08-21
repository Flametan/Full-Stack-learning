"use client";

export default function LivePreview({
  html,
  height = 260,
  width,
  label = "Live-Vorschau",
}: {
  html: string;
  height?: number;
  /** Feste Breite (z. B. "375px"), um einen schmalen Viewport zu simulieren. Ohne Angabe: volle Breite. */
  width?: string;
  label?: string;
}) {
  return (
    // Äußerer Wrapper: nimmt volle verfügbare Breite an (bzw. passt sich als Flex-Item
    // dem Inhalt an) und erlaubt horizontales Scrollen, falls die feste Breite unten
    // nicht in den verfügbaren Platz passt.
    <div className="max-w-full overflow-x-auto">
      <div
        className="overflow-hidden rounded-lg border border-ink/10 bg-white"
        style={{ width: width ?? "100%" }}
      >
        <div className="flex items-center gap-1.5 border-b border-ink/10 bg-paper px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="ml-2 truncate text-xs text-ink/40">{label}</span>
        </div>
        <iframe
          title={label}
          srcDoc={html}
          sandbox=""
          style={{ width: "100%", height, border: "none", display: "block" }}
        />
      </div>
    </div>
  );
}
