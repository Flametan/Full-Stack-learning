import Link from "next/link";
import type { Chapter } from "@/lib/curriculum";

const ringByColor: Record<string, string> = {
  accent: "group-hover:border-accent/50",
  accent2: "group-hover:border-accent2/60",
  mint: "group-hover:border-mint/50",
  ink: "group-hover:border-ink/40",
};

const badgeByColor: Record<string, string> = {
  accent: "bg-accent/10 text-accent",
  accent2: "bg-accent2/15 text-accent2",
  mint: "bg-mint/10 text-mint",
  ink: "bg-ink/10 text-ink",
};

export default function ChapterCard({ chapter, color }: { chapter: Chapter; color: string }) {
  const content = (
    <div
      className={`group h-full rounded-xl border border-ink/10 bg-white/70 p-5 transition ${ringByColor[color]} ${
        chapter.href ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md" : "opacity-90"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${badgeByColor[color]}`}
        >
          {chapter.number}
        </span>
        <span className="text-xs text-ink/40">{chapter.duration}</span>
      </div>
      <h3 className="mb-1.5 font-semibold leading-snug">{chapter.title}</h3>
      <p className="mb-3 text-sm text-ink/60">{chapter.goal}</p>
      <ul className="space-y-1 text-xs text-ink/50">
        {chapter.topics.map((t) => (
          <li key={t} className="flex gap-1.5">
            <span aria-hidden>·</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
      {chapter.href ? (
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent">
          Modul ansehen →
        </span>
      ) : (
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-ink/35">
          In Vorbereitung
        </span>
      )}
    </div>
  );

  if (chapter.href) {
    return (
      <Link href={chapter.href} className="block h-full">
        {content}
      </Link>
    );
  }
  return content;
}
