import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-sm text-paper">
            FS
          </span>
          <span>Full-Stack Lernpfad</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-ink/70">
          <Link href="/#curriculum" className="hover:text-ink">
            Curriculum
          </Link>
          <Link
            href="/module/wie-funktioniert-das-web"
            className="rounded-full bg-accent px-4 py-1.5 font-medium text-white transition hover:bg-accent/90"
          >
            Jetzt starten
          </Link>
        </nav>
      </div>
    </header>
  );
}
