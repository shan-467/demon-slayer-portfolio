import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, Volume2, VolumeX, X } from "lucide-react";
import { Emblem } from "@/components/effects/Emblem";
import { chapters } from "@/content/chapters";
import { scrollToId, scroller } from "@/lib/motion";
import { setSound } from "@/lib/sound";

const links = [
  { id: "beginning", label: "Story" },
  { id: "characters", label: "Characters" },
  { id: "hashira", label: "Hashira" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [sound, setSoundState] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = overlay.current!;
    if (open) {
      scroller.lenis?.stop();
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.inOut" });
      gsap.fromTo(el.querySelectorAll("[data-item]"), { yPercent: 110 }, { yPercent: 0, stagger: 0.04, delay: 0.3, ease: "expo.out", duration: 0.9 });
      const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", esc);
      return () => window.removeEventListener("keydown", esc);
    } else {
      scroller.lenis?.start();
      gsap.to(el, { clipPath: "inset(100% 0 0 0)", duration: 0.6, ease: "expo.inOut", onComplete: () => gsap.set(el, { display: "none" }) });
    }
  }, [open]);

  const go = (id: string) => { setOpen(false); setTimeout(() => scrollToId(id), open ? 500 : 0); };
  const toggleSound = () => { setSound(!sound); setSoundState(!sound); };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-px bg-border"><div ref={bar} className="h-full origin-left scale-x-0 bg-blood" /></div>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 md:px-10">
        <button onClick={() => go("top")} className="flex items-center gap-3 text-moon" aria-label="Back to top">
          <Emblem size={34} />
          <span className="hidden font-display text-sm tracking-[0.3em] sm:inline">ETERNAL FLAME</span>
        </button>
        <nav className="flex items-center gap-1 md:gap-6">
          {links.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} className="hidden px-2 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-moon md:block">{l.label}</button>
          ))}
          <button onClick={toggleSound} aria-pressed={sound} aria-label={sound ? "Mute ambient sound" : "Enable ambient sound"} className="flex items-center gap-2 p-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-moon">
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}<span className="hidden lg:inline">{sound ? "Sound on" : "Sound off"}</span>
          </button>
          <button onClick={() => setOpen(true)} aria-label="Open chapters menu" aria-expanded={open} className="flex items-center gap-2 p-2 text-xs uppercase tracking-[0.3em] text-moon">
            <Menu size={18} /><span className="hidden sm:inline">Chapters</span>
          </button>
        </nav>
      </header>

      <div ref={overlay} role="dialog" aria-modal="true" aria-label="Chapter navigation" className="fixed inset-0 z-[55] hidden flex-col bg-background px-6 py-6 md:px-16" style={{ clipPath: "inset(100% 0 0 0)" }}>
        <div className="flex justify-end">
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="flex items-center gap-2 p-2 text-xs uppercase tracking-[0.3em]"><X size={18} />Close</button>
        </div>
        <ol className="mt-6 grid flex-1 content-center gap-x-16 gap-y-1 md:grid-cols-2">
          {chapters.map((c) => (
            <li key={c.id} className="overflow-hidden border-b border-border">
              <button data-item onClick={() => go(c.id)} className="group flex w-full items-baseline gap-5 py-3 text-left">
                <span className="text-xs text-blood">{c.num}</span>
                <span className="font-display text-2xl transition-transform duration-500 group-hover:translate-x-3 md:text-4xl">{c.title}</span>
                <span className="ml-auto text-sm text-muted-foreground">{c.jp}</span>
                {c.spoiler && <span className="text-[0.6rem] uppercase tracking-widest text-flame">Spoilers</span>}
              </button>
            </li>
          ))}
          <li className="overflow-hidden border-b border-border md:col-span-2">
            <button data-item onClick={() => go("characters")} className="group flex w-full items-baseline gap-5 py-3 text-left">
              <span className="text-xs text-blood">—</span>
              <span className="font-display text-2xl group-hover:translate-x-3 transition-transform duration-500 md:text-4xl">Character Archive</span>
            </button>
          </li>
        </ol>
      </div>
    </>
  );
}
