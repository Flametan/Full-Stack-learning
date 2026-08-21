"use client";

export default function LivePreview({
  html,
  height = 260,
  width,
  label = "Live-Vorschau",
  interactive = false,
}: {
  html: string;
  height?: number;
  /** Feste Breite (z. B. "375px"), um einen schmalen Viewport zu simulieren. Ohne Angabe: volle Breite. */
  width?: string;
  label?: string;
  /**
   * true = Skripte und Formular-Submits im Preview-Dokument sind erlaubt
   * (sandbox="allow-scripts allow-forms") – für Module, in denen die
   * Vorschau selbst interaktiv sein soll (Klicks, Formulare, DOM-
   * Manipulation). Der Inhalt bleibt trotzdem isoliert: kein Zugriff auf
   * die übergeordnete Seite, kein gemeinsamer Storage/Cookies, keine
   * Top-Level-Navigation. Standard false = rein statische HTML/CSS-
   * Vorschau ohne JS-Ausführung.
   */
  interactive?: boolean;
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
          {interactive && (
            <span className="ml-auto shrink-0 rounded-full bg-mint/10 px-2 py-0.5 text-[10px] font-medium text-mint">
              zum Ausprobieren anklicken
            </span>
          )}
        </div>
        <iframe
          title={label}
          srcDoc={html}
          sandbox={interactive ? "allow-scripts allow-forms" : ""}
          style={{ width: "100%", height, border: "none", display: "block" }}
        />
      </div>
    </div>
  );
}
