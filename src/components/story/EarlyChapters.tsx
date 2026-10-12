import { useEffect, useRef } from "react";
import { backgrounds } from "@/content/assets";
import { chapters } from "@/content/chapters";
import { ParticleCanvas } from "@/components/effects/ParticleCanvas";
import { ensureGsap, splitWords } from "@/lib/motion";
import { ChapterHeading } from "./ChapterHeading";

/** 01 — slow clip reveal of a warm mountain home, restrained word reveal. */
export function Beginning() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-img]", { clipPath: "inset(20% 30% 20% 30%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: root.current, start: "top 80%", end: "center center", scrub: 1 } });
      gsap.fromTo("[data-img] img", { scale: 1.35 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      const words = splitWords(root.current!.querySelector<HTMLElement>("[data-copy]")!);
      gsap.from(words, { yPercent: 110, stagger: 0.03, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: "[data-copy]", start: "top 85%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} id="beginning" className="relative grid min-h-screen items-center gap-12 px-6 py-32 md:grid-cols-12 md:px-16">
      <div className="md:col-span-5">
        <ChapterHeading c={chapters[0]} />
        <p data-copy className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
          High in the mountains of Taisho-era Japan, Tanjiro Kamado carries charcoal down to the village to support his mother and five younger siblings after his father's death. The eldest son, he is gentle, dutiful, and gifted with a remarkable sense of smell.
        </p>
        <p className="mt-6 text-vertical absolute right-6 top-32 hidden font-display text-5xl text-moon/10 md:block">家族</p>
      </div>
      <div className="md:col-span-7">
        <div data-img className="relative aspect-[16/10] overflow-hidden" style={{ filter: "sepia(0.35) saturate(1.2) hue-rotate(-10deg) brightness(1.05)" }}>
          <img src={backgrounds.snowHouse} alt="A small wooden house on a snowy mountain slope at dusk" loading="lazy" width={1920} height={1088} className="h-full w-full object-cover" />
          <div className="absolute bottom-4 left-4 eyebrow text-moon">The Kamado home · Mt. Kumotori</div>
        </div>
      </div>
    </section>
  );
}

/** 02 — pinned scene where the light drains away and snow thickens. */
export function Tragedy() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=200%", pin: true, scrub: 1 } });
      tl.fromTo("[data-bg]", { filter: "brightness(1) saturate(1)" }, { filter: "brightness(0.35) saturate(0.2)", ease: "none", duration: 3 })
        .from("[data-l1]", { opacity: 0, y: 40, duration: 1 }, 0.2)
        .to("[data-l1]", { opacity: 0, y: -40, duration: 1 }, 1.4)
        .from("[data-l2]", { opacity: 0, y: 40, duration: 1 }, 1.6)
        .fromTo("[data-blood]", { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: "power2.in" }, 2.2);
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} id="tragedy" className="relative h-screen overflow-hidden">
      <img data-bg src={backgrounds.snowHouse} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 shade-full" />
      <ParticleCanvas mode="snow" density={1.6} />
      <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16">
        <ChapterHeading c={chapters[1]} />
        <div className="relative mt-10 h-40 max-w-xl">
          <p data-l1 className="absolute inset-0 font-display text-2xl leading-snug text-moon md:text-3xl">He stays the night in town. When he returns through the snow, the house is silent.</p>
          <p data-l2 className="absolute inset-0 font-display text-2xl leading-snug text-moon md:text-3xl">His family has been killed by a demon. Only Nezuko still breathes — and she is no longer human.</p>
        </div>
      </div>
      <div data-blood className="absolute left-1/2 top-0 h-full w-px origin-top bg-blood" aria-hidden />
    </section>
  );
}

/** 03 — layered forest parallax, petals, narrative lines arriving from the side. */
export function Journey() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((l) => {
        const d = Number(l.dataset.depth);
        gsap.fromTo(l, { yPercent: -d * 10 }, { yPercent: d * 10, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.from("[data-line]", { xPercent: -15, opacity: 0, stagger: 0.25, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: "[data-lines]", start: "top 75%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} id="journey" className="relative min-h-[130vh] overflow-hidden">
      <div data-depth="1" className="absolute -inset-y-[15%] inset-x-0">
        <img src={backgrounds.forest} alt="" loading="lazy" width={1920} height={1088} className="h-full w-full object-cover" />
      </div>
      <div data-depth="2" className="absolute inset-0 shade-full opacity-80" />
      <ParticleCanvas mode="petals" density={0.8} />
      <div className="relative z-10 px-6 py-40 md:px-16">
        <ChapterHeading c={chapters[2]} />
        <div data-lines className="mt-14 max-w-2xl space-y-8">
          <p data-line className="text-lg leading-relaxed text-moon md:text-xl">Water Hashira Giyu Tomioka arrives to kill Nezuko — but she shields her brother instead of attacking him.</p>
          <p data-line className="text-lg leading-relaxed text-moon md:text-xl">Giyu spares them and sends Tanjiro to Sakonji Urokodaki, a retired swordsman on Mt. Sagiri.</p>
          <p data-line className="text-lg leading-relaxed text-moon md:text-xl">Two years of training later, Tanjiro survives Final Selection on Mt. Fujikasane, where wisteria blooms all year.</p>
          <p data-line className="font-display text-3xl text-blood md:text-4xl">“I will turn her back into a human.”</p>
        </div>
      </div>
      <div data-depth="3" className="pointer-events-none absolute bottom-0 right-6 font-display text-[22vw] leading-none text-moon/5 md:right-16" aria-hidden>禰豆子</div>
    </section>
  );
}
