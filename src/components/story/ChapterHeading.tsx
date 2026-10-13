import type { chapters } from "@/content/chapters";

type C = (typeof chapters)[number];

export function ChapterHeading({ c, align = "left" }: { c: C; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div className={`flex flex-wrap items-center gap-3 md:gap-4 ${align === "center" ? "justify-center" : ""}`}>
        <span className="shrink-0 whitespace-nowrap font-display text-sm text-blood">第{c.num}章</span>
        <span className="h-px w-6 shrink-0 bg-blood md:w-12" />
        <span className="eyebrow whitespace-nowrap">Chapter {c.num}</span>
        {c.spoiler && <span className="whitespace-nowrap border border-flame px-2 py-0.5 text-[0.6rem] uppercase tracking-widest text-flame">Spoiler warning</span>}
      </div>
      <h2 data-heading className="mt-5 font-display text-4xl leading-[1.05] text-moon md:text-6xl lg:text-7xl">{c.title}</h2>
    </div>
  );
}
