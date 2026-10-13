import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { ArrowDown, Pause, Play } from "lucide-react";
import { backgrounds } from "@/content/assets";
import { chapters } from "@/content/chapters";
import { Button } from "@/components/ui/button";
import { prefersReducedMotion, scrollToId } from "@/lib/motion";
import { ChapterHeading } from "./ChapterHeading";

const Scene = lazy(() => import("./InfinityCastleScene"));
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export function InfinityCastle() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    setPlaying(!prefersReducedMotion());
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    setSupported(Boolean(gl));
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    const section = root.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setActive(Boolean(entry?.isIntersecting)), { rootMargin: "200px" });
    observer.observe(section);
    const update = () => {
      const bounds = section.getBoundingClientRect();
      progress.current = Math.max(0, Math.min(1, -bounds.top / bounds.height));
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); window.removeEventListener("scroll", update); };
  }, []);
  return <section ref={root} id="castle" aria-label="Infinity Castle" className="relative min-h-[100svh] overflow-hidden bg-background">
    <img src={backgrounds.infinityCastle} alt="An impossible labyrinth of illuminated Japanese rooms" loading="lazy" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0">
      <ClientOnly fallback={null}>{supported && active && <SceneBoundary><Suspense fallback={null}><Scene playing={playing} progress={progress} active={active} /></Suspense></SceneBoundary>}</ClientOnly>
    </div>
    <div className="pointer-events-none absolute inset-0 castle-shade" />
    <div className="pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-14 pt-32 md:px-16 md:pb-20">
      <div className="max-w-2xl"><ChapterHeading c={chapters[6]} />
        <p className="mt-7 max-w-lg text-base leading-relaxed text-moon md:text-lg">One note of Nakime’s biwa. The ground disappears. The Corps falls into a fortress where rooms turn, stairways lead nowhere, and dawn cannot reach.</p>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">Separated in the shifting labyrinth, the Slayers face Akaza, Doma and Kokushibo. Every victory comes at a terrible cost. When Nakime’s control is broken, the castle collapses — and the fight with Muzan moves into the night above.</p>
        <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4">
          <Button variant="outline" onClick={() => scrollToId("final")} className="h-auto gap-3 rounded-none px-5 py-3">Until the dawn <ArrowDown /></Button>
          {supported && <Button variant="ghost" size="icon" onClick={() => setPlaying(p => !p)} aria-label={playing ? "Pause castle motion" : "Resume castle motion"} title={playing ? "Pause castle motion" : "Resume castle motion"}>{playing ? <Pause /> : <Play />}</Button>}
        </div>
      </div>
    </div>
  </section>;
}