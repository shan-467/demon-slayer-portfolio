import { useEffect, useRef } from "react";
import { chapters } from "@/content/chapters";
import { ensureGsap } from "@/lib/motion";
import { ChapterHeading } from "./ChapterHeading";

const styles = [
  { name: "Water", jp: "水", color: "var(--water)" },
  { name: "Flame", jp: "炎", color: "var(--flame)" },
  { name: "Thunder", jp: "雷", color: "var(--thunder)" },
  { name: "Wind", jp: "風", color: "oklch(0.8 0.1 150)" },
  { name: "Stone", jp: "岩", color: "oklch(0.72 0.03 80)" },
  { name: "Mist", jp: "霞", color: "oklch(0.82 0.06 190)" },
  { name: "Sun", jp: "日", color: "var(--blood)" },
];

/** 04 — kinetic type marquees, sword-stroke SVG draw, breathing styles. */
export function Corps() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo("[data-row='a']", { xPercent: 0 }, { xPercent: -30, ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-row='b']", { xPercent: -30 }, { xPercent: 0, ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-slash]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "power2.inOut", scrollTrigger: { trigger: "[data-slash-wrap]", start: "top 75%", end: "center 40%", scrub: 1 } });
      gsap.from("[data-style]", { y: 80, opacity: 0, stagger: 0.08, duration: 1, ease: "expo.out", scrollTrigger: { trigger: "[data-styles]", start: "top 80%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} id="corps" className="relative overflow-hidden py-32">
      <div className="px-6 md:px-16"><ChapterHeading c={chapters[3]} /></div>
      <div className="my-16 space-y-2 whitespace-nowrap font-display text-[12vw] leading-none" aria-hidden>
        <div data-row="a" className="text-moon/90">全集中 · Total Concentration · 全集中 · Total Concentration</div>
        <div data-row="b" className="text-transparent" style={{ WebkitTextStroke: "1px var(--blood)" }}>鬼殺隊 · Demon Slayer Corps · 鬼殺隊 · Demon Slayer Corps</div>
      </div>
      <div className="grid gap-12 px-6 md:grid-cols-2 md:px-16">
        <div data-slash-wrap className="relative aspect-square max-w-md">
          <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden fill="none">
            <path data-slash pathLength={1} strokeDasharray="1" d="M30 360 C 140 260, 220 160, 380 30" stroke="var(--moon)" strokeWidth="3" />
            <path data-slash pathLength={1} strokeDasharray="1" d="M50 380 C 160 270, 240 180, 390 60" stroke="var(--blood)" strokeWidth="1" />
            <path data-slash pathLength={1} strokeDasharray="1" d="M20 120 C 120 180, 260 220, 390 300" stroke="var(--water)" strokeWidth="1.5" opacity="0.7" />
          </svg>
          <span className="absolute bottom-0 left-0 font-display text-8xl text-moon/10">刀</span>
        </div>
        <div className="self-center">
          <p className="text-lg leading-relaxed text-muted-foreground">An unofficial organization of hundreds of swordsmen, led by the Ubuyashiki family. Their Nichirin blades — forged from ore that absorbs sunlight — change color for each wielder, and only a beheading with one, or the sun itself, can kill a demon.</p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Breathing techniques push the body to superhuman limits. Every style traces back to the original: Sun Breathing.</p>
        </div>
      </div>
      <ul data-styles className="mt-20 grid grid-cols-2 gap-px bg-border px-0 sm:grid-cols-4 lg:grid-cols-7">
        {styles.map((s) => (
          <li data-style key={s.name} className="group relative overflow-hidden bg-background px-6 py-10">
            <span className="absolute inset-x-0 bottom-0 h-0 transition-all duration-500 group-hover:h-full" style={{ background: s.color, opacity: 0.15 }} />
            <span className="relative block font-display text-5xl transition-transform duration-500 group-hover:-translate-y-2" style={{ color: s.color }}>{s.jp}</span>
            <span className="relative mt-4 block eyebrow">{s.name} Breathing</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
