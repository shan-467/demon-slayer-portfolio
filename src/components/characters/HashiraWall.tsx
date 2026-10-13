import { useEffect, useRef, useState } from "react";
import { chapters } from "@/content/chapters";
import { characters, type Character } from "@/content/characters";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";
import { ChapterHeading } from "@/components/story/ChapterHeading";

function PillarCard({ h, i }: { h: Character; i: number }) {
  const card = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const videoBaseUrl = import.meta.env.BASE_URL;
  const videoSrc =
    h.id === "rengoku"
      ? `${videoBaseUrl}rengoku-motion.mp4`
      : h.id === "giyu"
        ? `${videoBaseUrl}giyu-motion.mp4`
        : h.id === "shinobu"
          ? `${videoBaseUrl}shinobu-motion.mp4`
          : h.id === "tengen"
            ? `${videoBaseUrl}tengen-motion.mp4`
            : h.id === "muichiro"
              ? `${videoBaseUrl}muichiro-motion.mp4`
              : undefined;

  useEffect(() => {
    if (!videoSrc || prefersReducedMotion()) return;
    const element = card.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(Boolean(entry?.isIntersecting)),
      { rootMargin: "100px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [videoSrc]);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (!active) {
      element.pause();
      return;
    }
    void element.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      console.error(`Unable to play the ${h.name} video.`, error);
    });
  }, [active, h.name]);

  return (
    <article
      ref={card}
      data-pillar
      className="group relative flex shrink-0 flex-col justify-end overflow-hidden border-l border-border px-8 py-16 md:h-full md:w-[28vw] md:min-w-[320px]"
    >
      {videoSrc && (
        <>
          <video
            ref={video}
            src={videoSrc}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${h.name} in motion`}
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background/95 via-background/55 to-background/20" />
        </>
      )}
      <div
        className={`absolute inset-0 ${videoSrc ? "z-[2] opacity-10 group-hover:opacity-20" : "opacity-30 group-hover:opacity-60"} transition-opacity duration-700`}
        style={{
          background: `radial-gradient(circle at ${i % 2 ? "30% 20%" : "70% 80%"}, ${h.color}, transparent 60%)`,
        }}
      />
      <span
        data-kanji
        className={`absolute z-[3] font-display text-[9rem] leading-none text-vertical transition-transform duration-700 group-hover:scale-110 ${i % 2 ? "left-6 top-24" : "right-6 top-16"}`}
        style={{ color: h.color, opacity: videoSrc ? 0.2 : 0.85 }}
      >
        {h.kanji}
      </span>
      <div className="relative z-10">
        <span className="eyebrow" style={{ color: h.color }}>
          {h.role}
        </span>
        <h3 className="mt-2 font-display text-3xl text-moon">{h.name}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{h.style}</p>
      </div>
    </article>
  );
}

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
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${t.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray<HTMLElement>("[data-pillar]").forEach((p, i) => {
        gsap.from(p.querySelector("[data-kanji]"), {
          yPercent: i % 2 ? -60 : 60,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: p,
            containerAnimation: tween,
            start: "left right",
            end: "center center",
            scrub: true,
          },
        });
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
          <p className="mt-8 max-w-sm text-muted-foreground">
            The nine pillars of the Corps — its strongest swordsmen. Scroll to walk the line.
          </p>
        </div>
        {hashira.map((h, i) => (
          <PillarCard h={h} i={i} key={h.id} />
        ))}
      </div>
    </section>
  );
}
