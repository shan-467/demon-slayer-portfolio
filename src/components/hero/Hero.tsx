import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { backgrounds } from "@/content/assets";
import { ParticleCanvas } from "@/components/effects/ParticleCanvas";
import { Emblem } from "@/components/effects/Emblem";
import { ensureGsap, prefersReducedMotion, scrollToId, splitChars } from "@/lib/motion";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    const { gsap } = ensureGsap();
    const el = root.current!;
    const ctx = gsap.context(() => {
      const chars = splitChars(el.querySelector<HTMLElement>("[data-title]")!);
      const t = gsap.timeline({ defaults: { ease: "expo.out" } });
      t.from("[data-particles]", { opacity: 0, duration: 1.2 })
        .fromTo(".emblem-ring", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 0.3)
        .fromTo(".emblem-blade", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power4.in" }, 1.1)
        .fromTo("[data-bg]", { clipPath: "inset(48% 0 48% 0)", scale: 1.3 }, { clipPath: "inset(0% 0 0% 0)", scale: 1.08, duration: 1.8, ease: "expo.inOut" }, 1.5)
        .from(chars, { yPercent: 120, opacity: 0, rotate: 8, stagger: 0.035, duration: 1.1 }, 2.4)
        .from("[data-sub]", { opacity: 0, y: 20, stagger: 0.12, duration: 1 }, 3)
        .from("[data-cta]", { opacity: 0, y: 20, duration: 1 }, 3.4)
        .add(() => setSkipped(true));
      tl.current = t;
      if (prefersReducedMotion()) t.progress(1);

      // Scroll-out drift & parallax
      gsap.to("[data-bg-inner]", { yPercent: 18, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to("[data-content]", { yPercent: -30, opacity: 0, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "70% top", scrub: true } });
    }, el);

    // Pointer-driven camera drift
    const move = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5;
      gsap.to(el.querySelector("[data-bg-inner]"), { x: x * -30, y: y * -20, duration: 1.4, ease: "power3" });
      gsap.to(el.querySelector("[data-content]"), { x: x * 14, duration: 1.4, ease: "power3" });
    };
    window.addEventListener("pointermove", move);
    return () => { ctx.revert(); window.removeEventListener("pointermove", move); };
  }, []);

  const skip = () => { tl.current?.progress(1); setSkipped(true); };

  return (
    <section ref={root} id="top" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-background">
      <div data-bg className="absolute inset-0">
        <div data-bg-inner className="absolute -inset-10">
          <img src={backgrounds.heroMoon} alt="" width={1920} height={1088} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 shade-bottom" />
      </div>
      <div data-particles className="absolute inset-0"><ParticleCanvas mode="embers" density={1.2} /></div>

      <div data-content className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <Emblem size={88} className="mb-8 text-moon" />
        <p data-sub className="eyebrow mb-5">鬼滅の刃 · An immersive tribute</p>
        <h1 data-title className="font-display text-5xl leading-none tracking-tight text-moon sm:text-7xl md:text-8xl lg:text-9xl">Eternal Flame</h1>
        <p data-sub className="mt-4 font-display text-lg tracking-[0.5em] text-blood md:text-2xl">DEMON SLAYER</p>
        <p data-sub className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          One night of snow took everything. One boy, one blade, and a sister he refuses to lose.
        </p>
        <button data-cta onClick={() => scrollToId("beginning")} className="btn-blade mt-12">
          Enter the story <ArrowRight size={16} />
        </button>
      </div>

      {!skipped && (
        <button onClick={skip} className="absolute bottom-8 right-6 z-20 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-moon md:right-10">Skip intro</button>
      )}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3" aria-hidden>
        <span className="eyebrow">Scroll</span>
        <span className="block h-12 w-px bg-moon" style={{ animation: "scroll-line 2.2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}
