import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import dawn from "@/assets/bg/final-dawn.jpg";
import { chapters } from "@/content/chapters";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";
import { ChapterHeading } from "./ChapterHeading";

const moments = [
  {
    num: "I",
    title: "Hold the line",
    text: "Tamayo’s medicine weakens Muzan, but his attacks tear through the remaining Slayers. Hashira, swordsmen and the unarmed Kakushi spend everything they have to keep him from escaping.",
  },
  {
    num: "II",
    title: "The first light",
    text: "Tanjiro links the forms of Sun Breathing while his comrades buy precious seconds. At sunrise, the Corps pins Muzan in the open. The sunlight finally destroys the Demon King.",
  },
  {
    num: "III",
    title: "Come back to us",
    text: "Muzan’s last act turns Tanjiro into a demon. Nezuko, human again, refuses to let him go. With Kanao’s medicine and the voices of those he loves, Tanjiro returns to humanity.",
  },
];

export function FinalBattle() {
  const root = useRef<HTMLElement>(null);
  const videoFrame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [videoActive, setVideoActive] = useState(false);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-final-moment]", {
        opacity: 0,
        y: 30,
        stagger: 0.18,
        duration: 0.8,
        scrollTrigger: { trigger: "[data-final-moments]", start: "top 85%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const frame = videoFrame.current;
    if (!frame) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVideoActive(Boolean(entry?.isIntersecting)),
      { rootMargin: "100px" },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (!videoActive || !playing) {
      element.pause();
      return;
    }
    void element.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      console.error("Unable to play the Final Battle video.", error);
      setPlaying(false);
    });
  }, [playing, videoActive]);

  return (
    <section ref={root} id="final" className="relative overflow-hidden bg-background">
      <div ref={videoFrame} className="relative aspect-video w-full overflow-hidden bg-background">
        <video
          ref={video}
          src="/final-battle-motion.mp4"
          poster={dawn}
          muted
          loop
          playsInline
          preload="none"
          aria-label="Final Battle motion video"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 dawn-shade" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background via-background/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-background/90 via-background/35 to-transparent" />
        <div className="absolute inset-0 z-10 flex items-end px-6 pb-10 pt-24 md:px-16 md:pb-16">
          <div className="max-w-3xl">
            <ChapterHeading c={chapters[7]} />
            <p className="mt-6 font-display text-xl leading-relaxed text-moon md:mt-7 md:text-4xl">
              They do not have to defeat the night.
              <br />
              They only have to outlast it.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((current) => !current)}
          aria-label={playing ? "Pause Final Battle video" : "Resume Final Battle video"}
          title={playing ? "Pause Final Battle video" : "Resume Final Battle video"}
          className="absolute bottom-4 right-4 z-10 flex size-11 items-center justify-center border border-moon/40 bg-background/70 text-moon backdrop-blur-sm transition-colors hover:bg-background"
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>
      <div
        data-final-moments
        className="grid gap-10 px-6 pb-24 pt-14 md:grid-cols-3 md:gap-12 md:px-16"
      >
        {moments.map((moment) => (
          <article data-final-moment key={moment.num} className="border-t border-border pt-6">
            <span className="font-display text-lg text-flame">{moment.num}</span>
            <h3 className="mt-4 font-display text-2xl text-moon">{moment.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{moment.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
