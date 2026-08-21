import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import CodeBlock from "@/components/CodeBlock";
import TerminalBlock, { type TerminalLine } from "@/components/TerminalBlock";
import BranchDiagram from "@/components/BranchDiagram";
import SolutionReveal from "@/components/SolutionReveal";

const step1Lines: TerminalLine[] = [
  { cmd: "mkdir mein-projekt && cd mein-projekt" },
  { cmd: "git init" },
  { out: "Initialized empty Git repository in .../mein-projekt/.git/" },
];

const step2Lines: TerminalLine[] = [
  { cmd: 'echo "# Mein Projekt" > README.md' },
  { cmd: "git status" },
  { out: "Untracked files:" },
  { out: "  README.md" },
  { cmd: "git add README.md" },
  { note: "verschiebt README.md in die Staging Area" },
  { cmd: 'git commit -m "Erster Commit: README hinzufügen"' },
  { out: "[main (root-commit) a1b2c3d] Erster Commit: README hinzufügen" },
  { out: " 1 file changed, 1 insertion(+)" },
  { out: " create mode 100644 README.md" },
];

const gitignoreSnippet = `# Abhängigkeiten – werden per npm install neu erzeugt
node_modules/

# Umgebungsvariablen mit Zugangsdaten – gehören nie ins Repository
.env

# Log- und Build-Dateien
*.log
dist/`;

const step4Lines: TerminalLine[] = [
  { cmd: "git add .gitignore" },
  { cmd: 'git commit -m ".gitignore hinzufügen"' },
  { cmd: "git remote add origin https://github.com/dein-name/mein-projekt.git" },
  { note: "verknüpft das lokale Repository mit GitHub unter dem Namen \"origin\"" },
  { cmd: "git branch -M main" },
  { cmd: "git push -u origin main" },
  { out: "... " },
  { out: "branch 'main' set up to track 'origin/main'." },
];

const step5Lines: TerminalLine[] = [
  { cmd: "git checkout -b feature/kontaktformular" },
  { out: "Switched to a new branch 'feature/kontaktformular'" },
  { note: "Datei bearbeiten, z. B. contact.html anlegen ..." },
  { cmd: "git add ." },
  { cmd: 'git commit -m "Kontaktformular hinzufügen"' },
  { cmd: "git push -u origin feature/kontaktformular" },
];

const exerciseSolutionLines: TerminalLine[] = [
  { cmd: "git checkout -b fix/typo" },
  { out: "Switched to a new branch 'fix/typo'" },
  { note: "README.md bearbeiten und Tippfehler korrigieren ..." },
  { cmd: "git add README.md" },
  { cmd: 'git commit -m "Tippfehler in README behoben"' },
  { out: "[fix/typo 9f3a1c2] Tippfehler in README behoben" },
  { out: " 1 file changed, 1 insertion(+), 1 deletion(-)" },
  { cmd: "git checkout main" },
  { out: "Switched to branch 'main'" },
  { cmd: "git merge fix/typo" },
  { out: "Updating a1b2c3d..9f3a1c2" },
  { out: "Fast-forward" },
  { out: " README.md | 2 +-" },
  { out: " 1 file changed, 1 insertion(+), 1 deletion(-)" },
  { cmd: "git log --oneline --graph" },
  { out: "* 9f3a1c2 (HEAD -> main, fix/typo) Tippfehler in README behoben" },
  { out: "* a1b2c3d Erster Commit: README hinzufügen" },
];

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

export default function GitGithubPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <Link href="/#curriculum" className="text-sm text-ink/50 hover:text-ink">
          ← Zurück zur Kapitelübersicht
        </Link>

        <div className="mt-4 mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
            Kapitel 4 · Phase 1 · Grundlagen des Web
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Versionskontrolle mit Git &amp; GitHub
          </h1>
          <p className="mt-3 text-ink/60">
            Ziel: Code-Änderungen nachvollziehbar speichern, in Branches isoliert
            weiterentwickeln und über einen Pull Request mit anderen teilen. Dauer: ca. 2 Std.
          </p>
        </div>

        {/* THEORIE */}
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">1. Theorie</h2>
          <div className="prose-de space-y-4 text-[15px] text-ink/80">
            <p>
              <strong>Git</strong> ist ein Versionskontrollsystem: Es speichert den Zustand eines
              Projekts zu bestimmten Zeitpunkten und macht jede Änderung nachvollziehbar – lokal,
              auf deinem Rechner. <strong>GitHub</strong> ist davon zu unterscheiden: ein
              Cloud-Dienst, der Git-Repositories hostet und Zusammenarbeit ermöglicht (Backups,
              Teilen, Pull Requests). Git funktioniert auch komplett ohne GitHub.
            </p>
            <p>
              Git denkt in drei Bereichen: dem <strong>Working Directory</strong> (deine Dateien, so
              wie du sie gerade bearbeitest), der <strong>Staging Area</strong> (eine Vorstufe, die
              festlegt, was in den nächsten Commit soll) und dem <strong>Repository</strong>{" "}
              (die gespeicherte Historie aller Commits). Der Weg einer Änderung führt immer über{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">git add</code> (in die Staging
              Area verschieben) und <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">git commit</code>{" "}
              (als Snapshot mit Beschreibung dauerhaft speichern).
            </p>
            <p>
              Ein <strong>Branch</strong> ist im Kern nur ein beweglicher Zeiger auf einen Commit.
              Der Standard-Branch heißt meist{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">main</code>. Mit einem neuen
              Branch entwickelst du ein Feature isoliert weiter, ohne{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">main</code> zu verändern. Ein{" "}
              <strong>Merge</strong> führt die Änderungen später wieder zusammen.
            </p>
            <p>
              Ein <strong>Pull Request</strong> (PR) ist ein GitHub-Konzept: die Bitte, einen Branch
              in einen anderen zu mergen – inklusive Möglichkeit zum Code-Review, bevor irgendetwas
              in <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">main</code> landet.
            </p>
            <p>
              Die Datei <code className="rounded bg-ink/5 px-1 py-0.5 text-sm">.gitignore</code>{" "}
              listet Dateien und Ordner, die Git niemals verfolgen soll – etwa generierte
              Abhängigkeiten oder Dateien mit Zugangsdaten. So bleibt das Repository klein und
              frei von Geheimnissen.
            </p>
          </div>
        </section>

        {/* PRAXISBEISPIEL */}
        <section className="mb-14">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">2. Praxisbeispiel</h2>
          <p className="mb-8 text-sm text-ink/60">
            Wir legen ein kleines Projekt an, verbinden es mit GitHub und entwickeln ein Feature in
            einem eigenen Branch.
          </p>

          <div className="space-y-10">
            <Step n={1} title="Repository initialisieren">
              <p className="text-sm text-ink/70">
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">git init</code> legt im
                aktuellen Ordner einen versteckten{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">.git</code>-Ordner an – ab
                jetzt beobachtet Git diesen Ordner.
              </p>
              <TerminalBlock lines={step1Lines} />
            </Step>

            <Step n={2} title="Erste Datei stagen und committen">
              <p className="text-sm text-ink/70">
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">git status</code> zeigt
                jederzeit, was sich geändert hat.{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">git add</code> markiert
                Dateien für den nächsten Commit, <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">git commit</code>{" "}
                speichert sie dauerhaft mit einer Beschreibung.
              </p>
              <TerminalBlock lines={step2Lines} />
            </Step>

            <Step n={3} title=".gitignore anlegen">
              <p className="text-sm text-ink/70">
                Am besten schon vor dem ersten{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">npm install</code> – sonst
                landet <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">node_modules/</code>{" "}
                versehentlich im Repository.
              </p>
              <CodeBlock code={gitignoreSnippet} filename=".gitignore" lang="text" />
            </Step>

            <Step n={4} title="Mit GitHub verbinden und pushen">
              <p className="text-sm text-ink/70">
                Ein leeres Repository auf github.com anlegen, dann lokal als{" "}
                <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">origin</code> eintragen und
                den ersten Push absetzen.
              </p>
              <TerminalBlock lines={step4Lines} />
            </Step>

            <Step n={5} title="Feature-Branch erstellen und per Pull Request mergen">
              <p className="text-sm text-ink/70">
                Statt direkt auf <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">main</code>{" "}
                zu arbeiten, entsteht ein eigener Branch. Nach dem Push erscheint auf GitHub der
                Button „Compare &amp; pull request“ – darüber lässt sich der Branch mit einer
                Beschreibung zum Merge vorschlagen und nach Review per Klick zusammenführen.
              </p>
              <TerminalBlock lines={step5Lines} />
              <BranchDiagram />
            </Step>
          </div>
        </section>

        {/* ÜBUNGSAUFGABE */}
        <section className="mb-10">
          <h2 className="mb-1 text-xl font-semibold tracking-tight">3. Übungsaufgabe</h2>
          <p className="mb-6 text-sm text-ink/60">
            Jetzt bist du dran. Übe den Branch-und-Merge-Workflow lokal, ganz ohne GitHub.
          </p>

          <div className="mb-6 rounded-xl border border-accent2/30 bg-accent2/5 p-5">
            <h3 className="mb-2 font-semibold text-accent2">Aufgabe</h3>
            <p className="text-sm leading-relaxed text-ink/75">
              Erstelle in deinem Projekt einen neuen Branch namens{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">fix/typo</code>. Korrigiere
              darin einen (fiktiven) Tippfehler in <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">README.md</code>{" "}
              und committe die Änderung mit einer aussagekräftigen Message. Wechsle danach zurück
              zu <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">main</code> und führe den
              Branch lokal per <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">git merge</code>{" "}
              zusammen. Prüfe abschließend mit{" "}
              <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">git log --oneline --graph</code>,
              dass der Merge sichtbar ist.
            </p>
            <p className="mt-3 text-sm text-ink/60">
              <strong>Tipp:</strong> Der Befehl zum Erstellen{" "}
              <em>und</em> Wechseln in einen neuen Branch ist derselbe wie in Schritt 5 des
              Praxisbeispiels.
            </p>
          </div>

          <SolutionReveal>
            <div className="space-y-6">
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">Lösung</h4>
                <TerminalBlock lines={exerciseSolutionLines} filename="Terminal" />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-ink/80">Erklärung</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/70">
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">git checkout -b fix/typo</code>{" "}
                    erstellt den Branch und wechselt in einem Schritt dorthin (moderner, äquivalenter
                    Befehl: <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">git switch -c fix/typo</code>).
                  </li>
                  <li>
                    Der Commit landet zunächst nur im Branch{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">fix/typo</code> –{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">main</code> bleibt bis
                    zum Merge unverändert.
                  </li>
                  <li>
                    Da <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">main</code> seit der
                    Branch-Erstellung keine neuen Commits bekommen hat, führt Git ein{" "}
                    <strong>Fast-Forward-Merge</strong> aus: Der{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">main</code>-Zeiger wird
                    einfach auf den neuesten Commit vorgeschoben – es entsteht kein zusätzlicher
                    Merge-Commit.
                  </li>
                  <li>
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">git log --oneline --graph</code>{" "}
                    zeigt deshalb eine einzige, gerade Linie: Beide Branch-Zeiger (
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">HEAD -&gt; main, fix/typo</code>)
                    stehen jetzt auf demselben Commit. Ein sichtbarer Ast im Graph entsteht erst,
                    wenn parallel auch in{" "}
                    <code className="rounded bg-ink/5 px-1 py-0.5 text-xs">main</code>{" "}
                    weitergearbeitet wurde – wie im PR-Beispiel aus dem Praxisteil.
                  </li>
                </ul>
              </div>
            </div>
          </SolutionReveal>
        </section>

        <div className="flex items-center justify-between border-t border-ink/10 pt-8">
          <Link href="/module/css-layout" className="text-sm font-medium text-ink/60 hover:text-ink">
            ← Kapitel 3: CSS-Layout &amp; Responsive Design
          </Link>
          <Link href="/module/js-grundlagen" className="text-sm font-medium text-ink/60 hover:text-ink">
            Nächstes Kapitel: JavaScript-Grundlagen →
          </Link>
        </div>
      </main>
    </>
  );
}
