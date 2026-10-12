import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { characterArt } from "@/content/assets";
import { characters, type Character } from "@/content/characters";
import { ensureGsap } from "@/lib/motion";

const groups = [
  { id: "protagonists", label: "Protagonists" },
  { id: "hashira", label: "Hashira" },
  { id: "demons", label: "Demons" },
] as const;

function Artwork({ c }: { c: Character }) {
  const art = characterArt[c.id];
  if (art) return <img src={art} alt={c.name} className="h-full w-full object-cover" loading="lazy" />;
  // Typographic emblem composition (replace via characterArt manifest).
  return (
    <div className="relative h-full w-full" style={{ background: `radial-gradient(circle at 50% 40%, ${c.color}, transparent 70%)` }}>
      <div className="absolute inset-0 opacity-25" style={{ background: `repeating-linear-gradient(135deg, transparent 0 18px, ${c.color} 18px 19px)` }} />
      <span className="absolute inset-0 flex items-center justify-center font-display text-[8rem] leading-none text-moon md:text-[11rem]" style={{ textShadow: `0 0 40px ${c.color}` }}>{c.kanji}</span>
    </div>
  );
}

export function CharacterViewer() {
  const [idx, setIdx] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const c = characters[idx];

  useEffect(() => {
    const { gsap } = ensureGsap();
    const el = stage.current!;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo("[data-art]", { clipPath: idx % 2 ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "expo.inOut" })
        .fromTo("[data-art] > *", { scale: 1.3 }, { scale: 1, duration: 1.4, ease: "expo.out" }, 0)
        .fromTo("[data-info] > *", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: "expo.out" }, 0.3);
    }, el);
    return () => ctx.revert();
  }, [idx]);

  const step = (d: number) => setIdx((i) => (i + d + characters.length) % characters.length);

  return (
    <section id="characters" className="relative px-6 py-32 md:px-16" onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="eyebrow">Character archive · 人物</span>
          <h2 className="mt-4 font-display text-4xl text-moon md:text-6xl">Those who stand in the dark</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => step(-1)} aria-label="Previous character" className="border border-border p-3 hover:border-blood"><ChevronLeft size={18} /></button>
          <button onClick={() => step(1)} aria-label="Next character" className="border border-border p-3 hover:border-blood"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div ref={stage} className="mt-14 grid gap-10 md:grid-cols-12" aria-live="polite">
        <div data-art className={`relative aspect-[4/5] overflow-hidden md:col-span-6 ${idx % 2 ? "md:order-2" : ""}`}><Artwork c={c} /></div>
        <div data-info className="flex flex-col justify-center md:col-span-6">
          <span className="eyebrow" style={{ color: c.color }}>{c.role}</span>
          <h3 className="mt-3 font-display text-5xl text-moon md:text-7xl">{c.name}</h3>
          <p className="mt-2 font-display text-2xl text-muted-foreground">{c.kanji}</p>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">{c.desc}</p>
          <div className="mt-8 border-l-2 pl-4" style={{ borderColor: c.color }}>
            <span className="eyebrow">Technique</span>
            <p className="mt-1 text-moon">{c.style}</p>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">{String(idx + 1).padStart(2, "0")} / {characters.length}</p>
        </div>
      </div>

      <div className="mt-16 space-y-6">
        {groups.map((g) => (
          <div key={g.id} className="flex flex-wrap items-center gap-2">
            <span className="eyebrow w-32">{g.label}</span>
            {characters.map((ch, i) => ch.group === g.id && (
              <button key={ch.id} onClick={() => setIdx(i)} aria-pressed={i === idx}
                className={`border px-3 py-1.5 text-xs tracking-wider transition-colors ${i === idx ? "border-blood bg-blood text-moon" : "border-border text-muted-foreground hover:text-moon"}`}>
                {ch.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
