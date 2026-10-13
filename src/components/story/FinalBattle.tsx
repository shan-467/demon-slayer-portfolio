import { useEffect, useRef } from "react";
import dawn from "@/assets/bg/final-dawn.jpg";
import { chapters } from "@/content/chapters";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion";
import { ChapterHeading } from "./ChapterHeading";

const moments = [
  { num: "I", title: "Hold the line", text: "Tamayo’s medicine weakens Muzan, but his attacks tear through the remaining Slayers. Hashira, swordsmen and the unarmed Kakushi spend everything they have to keep him from escaping." },
  { num: "II", title: "The first light", text: "Tanjiro links the forms of Sun Breathing while his comrades buy precious seconds. At sunrise, the Corps pins Muzan in the open. The sunlight finally destroys the Demon King." },
  { num: "III", title: "Come back to us", text: "Muzan’s last act turns Tanjiro into a demon. Nezuko, human again, refuses to let him go. With Kanao’s medicine and the voices of those he loves, Tanjiro returns to humanity." },
];

export function FinalBattle() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-final-moment]", { opacity: 0, y: 30, stagger: 0.18, duration: 0.8, scrollTrigger: { trigger: "[data-final-moments]", start: "top 85%", once: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return <section ref={root} id="final" className="relative overflow-hidden bg-background">
    <div className="relative flex min-h-[85svh] items-end px-6 pb-14 pt-32 md:px-16 md:pb-20">
      <img src={dawn} alt="Sunrise over a battle-scarred Japanese street" loading="lazy" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 dawn-shade" />
      <div className="relative max-w-3xl"><ChapterHeading c={chapters[7]} />
        <p className="mt-7 font-display text-2xl leading-relaxed text-moon md:text-4xl">They do not have to defeat the night.<br />They only have to outlast it.</p>
      </div>
    </div>
    <div data-final-moments className="grid gap-10 px-6 pb-24 pt-10 md:grid-cols-3 md:gap-12 md:px-16">
      {moments.map(moment => <article data-final-moment key={moment.num} className="border-t border-border pt-6">
        <span className="font-display text-lg text-flame">{moment.num}</span>
        <h3 className="mt-4 font-display text-2xl text-moon">{moment.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{moment.text}</p>
      </article>)}
    </div>
  </section>;
}