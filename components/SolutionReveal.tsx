"use client";

import { useState } from "react";

export default function SolutionReveal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-mint/30 bg-mint/5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-mint"
      >
        <span>{open ? "Lösung verbergen" : "Lösung & Erklärung anzeigen"}</span>
        <span aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {open && <div className="border-t border-mint/20 px-4 pb-5 pt-4">{children}</div>}
    </div>
  );
}
