import { useEffect, useRef } from "react";
import { chapters } from "@/content/chapters";
import { characters } from "@/content/characters";
import { ensureGsap } from "@/lib/motion";
import { ChapterHeading } from "@/components/story/ChapterHeading";

/** 06 — pinned horizontal wall; each pillar reveals with its own color + layout. */
export function HashiraWall() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const hashira = characters.filter((c) => c.group === "hashira");

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const tween = gsap.to(t, {
        x: () => -(t.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${t.scrollWidth}`, pin: true, scrub: 1, invalidateOnRefresh: true },
      });
      gsap.utils.toArray<HTMLElement>("[data-pillar]").forEach((p, i) => {
        gsap.from(p.querySelector("[data-kanji]"), { yPercent: i % 2 ? -60 : 60, opacity: 0, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "center center", scrub: true } });
      });
      ScrollTrigger.refresh();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="hashira" className="relative overflow-hidden bg-background md:h-screen">
      <div ref={track} className="flex flex-col md:h-full md:w-max md:flex-row">
        <div className="flex w-full shrink-0 flex-col justify-center px-6 py-24 md:w-[45vw] md:px-16">
          <ChapterHeading c={chapters[5]} />
          <p className="mt-8 max-w-sm text-muted-foreground">The nine pillars of the Corps — its strongest swordsmen. Scroll to walk the line.</p>
        </div>
        {hashira.map((h, i) => (
          <article data-pillar key={h.id} className="group relative flex shrink-0 flex-col justify-end overflow-hidden border-l border-border px-8 py-16 md:h-full md:w-[28vw] md:min-w-[320px]">
            <div className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-60" style={{ background: `radial-gradient(circle at ${i % 2 ? "30% 20%" : "70% 80%"}, ${h.color}, transparent 60%)` }} />
            <span data-kanji className={`absolute font-display text-[9rem] leading-none text-vertical transition-transform duration-700 group-hover:scale-110 ${i % 2 ? "left-6 top-24" : "right-6 top-16"}`} style={{ color: h.color, opacity: 0.85 }}>{h.kanji}</span>
            <div className="relative">
              <span className="eyebrow" style={{ color: h.color }}>{h.role}</span>
              <h3 className="mt-2 font-display text-3xl text-moon">{h.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{h.style}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
