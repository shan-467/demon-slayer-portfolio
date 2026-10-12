import { useEffect, useRef } from "react";
import { arcs, chapters } from "@/content/chapters";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";
import { ParticleCanvas } from "@/components/effects/ParticleCanvas";
import { ChapterHeading } from "./ChapterHeading";

const tone = {
  water: { color: "var(--water)", bg: "radial-gradient(ellipse at 30% 60%, oklch(0.35 0.09 230 / 70%), transparent 65%)" },
  flame: { color: "var(--flame)", bg: "radial-gradient(ellipse at 70% 80%, oklch(0.45 0.17 40 / 70%), transparent 60%)" },
  thunder: { color: "var(--thunder)", bg: "radial-gradient(ellipse at 50% 20%, oklch(0.45 0.1 90 / 55%), transparent 60%)" },
} as const;

function WaterFX() {
  return (
    <svg viewBox="0 0 800 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden fill="none">
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M-50 ${200 + i * 30} C 150 ${120 + i * 25}, 300 ${300 - i * 20}, 450 ${200 + i * 10} S 750 ${100 + i * 30}, 900 ${220 + i * 15}`}
          stroke="var(--water)" strokeWidth={2 - i * 0.4} opacity={0.6 - i * 0.12} strokeDasharray="120 280" style={{ animation: `water-flow ${6 + i * 2}s linear infinite` }} />
      ))}
    </svg>
  );
}
function FlameFX() {
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-2/3 items-end justify-center gap-4" aria-hidden>
      {[0.6, 0.9, 1, 0.8, 0.5].map((s, i) => (
        <div key={i} className="w-24 rounded-t-full blur-xl md:w-40" style={{ height: `${s * 100}%`, background: "linear-gradient(to top, var(--blood), var(--flame), transparent)", animation: `flame-flicker ${1.2 + i * 0.3}s ease-in-out infinite`, transformOrigin: "bottom" }} />
      ))}
      <ParticleCanvas mode="embers" density={1.5} />
    </div>
  );
}
function ThunderFX() {
  return (
    <svg viewBox="0 0 400 400" className="absolute right-[10%] top-0 h-full w-1/2" aria-hidden fill="none">
      <path data-bolt pathLength={1} strokeDasharray="1" d="M220 0 L170 140 L230 150 L150 290 L210 300 L120 400" stroke="var(--thunder)" strokeWidth="4" style={{ filter: "drop-shadow(0 0 12px var(--thunder))" }} />
    </svg>
  );
}

/** 05 — pinned crossfade through three arcs, each with its own FX. */
export function Battles() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-arc]");
      gsap.set(panels.slice(1), { autoAlpha: 0 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: `+=${panels.length * 100}%`, pin: true, scrub: 1 } });
      panels.forEach((p, i) => {
        if (i > 0) {
          tl.to(panels[i - 1]!, { autoAlpha: 0, scale: 1.05, duration: 0.5 })
            .fromTo(p, { autoAlpha: 0, clipPath: i === 1 ? "inset(100% 0 0 0)" : "inset(0 0 0 100%)" }, { autoAlpha: 1, clipPath: "inset(0 0 0 0%)", duration: 0.8 }, "<");
        }
        tl.from(p.querySelector("[data-arc-title]"), { y: 60, opacity: 0, duration: 0.5 }, "<0.2").to({}, { duration: 1 });
      });
      tl.fromTo("[data-bolt]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.3 }, "-=1");
      if (!prefersReducedMotion()) {
        tl.fromTo("[data-flash]", { opacity: 0 }, { opacity: 0.35, duration: 0.05, yoyo: true, repeat: 1 }, "-=0.75");
      }
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} id="battles" className="relative h-screen overflow-hidden bg-background">
      {arcs.map((a, i) => (
        <article data-arc key={a.id} className="absolute inset-0" style={{ background: tone[a.tone].bg }}>
          {a.tone === "water" && <WaterFX />}
          {a.tone === "flame" && <FlameFX />}
          {a.tone === "thunder" && <ThunderFX />}
          <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16">
            {i === 0 && <div className="mb-10"><ChapterHeading c={chapters[4]} /></div>}
            <span className="eyebrow" style={{ color: tone[a.tone].color }}>Arc 0{i + 1} · {a.jp}</span>
            <h3 data-arc-title className="mt-3 font-display text-5xl text-moon md:text-8xl">{a.title}</h3>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{a.text}</p>
          </div>
        </article>
      ))}
      <div data-flash className="pointer-events-none absolute inset-0 bg-thunder opacity-0" aria-hidden />
    </section>
  );
}
