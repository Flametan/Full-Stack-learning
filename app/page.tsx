import SiteHeader from "@/components/SiteHeader";
import ChapterCard from "@/components/ChapterCard";
import { phases, totalChapters } from "@/lib/curriculum";

const principles = [
  {
    title: "Theorie in kleinen Dosen",
    text: "Jedes Modul beginnt mit einer kurzen, präzisen Erklärung der Kernkonzepte – ohne unnötigen Jargon, in maximal 300 Wörtern.",
  },
  {
    title: "Sofort anwendbare Praxis",
    text: "Auf jede Theorie folgt ein schrittweiser Code-Walkthrough, der genau das gerade Gelernte umsetzt – zum Mitschreiben, nicht nur zum Lesen.",
  },
  {
    title: "Aktives Üben mit Lösung",
    text: "Eine kleine Übungsaufgabe pro Modul festigt den Stoff. Musterlösung inklusive Erklärung liefert direktes Feedback.",
  },
  {
    title: "Vom Baustein zur Anwendung",
    text: "Jedes Modul baut auf dem vorherigen auf. Am Ende von Phase 4 steht keine Übung mehr, sondern eine vollständige eigene Full-Stack-App.",
  },
];

const stack = ["HTML", "CSS", "JavaScript (ES6+)", "Node.js", "Express", "SQLite"];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pb-14 pt-16">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Full-Stack-Webentwicklung · von Null zur ersten App
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
            Full-Stack-Entwicklung lernen – Schritt für Schritt, Theorie und Praxis im Gleichgewicht.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink/70">
            {totalChapters} Kapitel führen dich von den Grundlagen des Web bis zu einer vollständigen,
            selbst gebauten und veröffentlichten Anwendung. Für Einsteiger und leicht Fortgeschrittene.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-medium text-ink/70"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Didaktisches Konzept */}
        <section className="border-y border-ink/10 bg-white/50 py-14">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-2 text-2xl font-semibold tracking-tight">Didaktisches Konzept</h2>
            <p className="mb-8 max-w-2xl text-ink/60">
              Jedes einzelne Modul folgt derselben, wiederkehrenden Struktur – so weißt du als Lernende:r
              jederzeit, wo du stehst und was als Nächstes kommt.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {principles.map((p, i) => (
                <div key={p.title} className="rounded-xl border border-ink/10 bg-paper p-5">
                  <div className="mb-2 text-xs font-semibold text-accent">Prinzip {i + 1}</div>
                  <h3 className="mb-1.5 font-semibold">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-ink/60">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section id="curriculum" className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">Kapitelübersicht</h2>
          <p className="mb-10 max-w-2xl text-ink/60">
            Vier Phasen, {totalChapters} Kapitel: von den Grundlagen des Web bis zur ersten vollständigen,
            deploybaren Full-Stack-Anwendung.
          </p>
          <div className="space-y-14">
            {phases.map((phase) => (
              <div key={phase.id}>
                <div className="mb-5">
                  <h3 className="text-lg font-semibold tracking-tight">{phase.title}</h3>
                  <p className="text-sm text-ink/50">{phase.subtitle}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {phase.chapters.map((chapter) => (
                    <ChapterCard key={chapter.id} chapter={chapter} color={phase.color} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-ink/10 py-8 text-center text-xs text-ink/40">
        Full-Stack Lernpfad · Erster Entwurf des Curriculums
      </footer>
    </>
  );
}
