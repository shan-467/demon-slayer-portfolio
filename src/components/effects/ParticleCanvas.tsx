import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Mode = "embers" | "snow" | "petals" | "dust";

const PALETTE: Record<Mode, string[]> = {
  embers: ["255,118,40", "215,38,56", "255,216,77"],
  snow: ["221,227,238", "200,215,235"],
  petals: ["190,150,255", "230,190,255"],
  dust: ["221,227,238"],
};

/** Lightweight 2D canvas particle field. Pauses offscreen. */
export function ParticleCanvas({ mode = "embers", density = 1, className = "" }: { mode?: Mode; density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = prefersReducedMotion();
    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; c: string; t: number };
    let ps: P[] = [];

    const make = (): P => {
      const c = PALETTE[mode][Math.floor(Math.random() * PALETTE[mode].length)]!;
      const base = { x: Math.random() * w, y: Math.random() * h, a: Math.random() * 0.7 + 0.2, c, t: Math.random() * 100 };
      if (mode === "embers") return { ...base, r: Math.random() * 1.8 + 0.5, vx: (Math.random() - 0.5) * 0.3, vy: -(Math.random() * 0.6 + 0.2) };
      if (mode === "snow") return { ...base, r: Math.random() * 2 + 0.6, vx: (Math.random() - 0.3) * 0.4, vy: Math.random() * 0.7 + 0.3 };
      if (mode === "petals") return { ...base, r: Math.random() * 2.5 + 1, vx: Math.random() * 0.5 + 0.1, vy: Math.random() * 0.4 + 0.15 };
      return { ...base, r: Math.random() * 1.2 + 0.3, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15 };
    };

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(140, (w * h) / 14000) * density * (w < 768 ? 0.5 : 1));
      ps = Array.from({ length: count }, make);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        if (!reduced) {
          p.t += 0.01;
          p.x += p.vx + Math.sin(p.t) * (mode === "embers" ? 0.3 : 0.2);
          p.y += p.vy;
          if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
          if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w; }
          if (p.x > w + 10) p.x = -10;
          if (p.x < -10) p.x = w + 10;
        }
        const flicker = mode === "embers" ? 0.6 + Math.sin(p.t * 6) * 0.4 : 1;
        ctx.beginPath();
        if (mode === "petals") ctx.ellipse(p.x, p.y, p.r * 1.6, p.r * 0.8, p.t, 0, Math.PI * 2);
        else ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a * flicker})`;
        if (mode === "embers") { ctx.shadowBlur = 8; ctx.shadowColor = `rgba(${p.c},0.8)`; } else ctx.shadowBlur = 0;
        ctx.fill();
      }
    };

    const loop = () => { if (visible) draw(); raf = requestAnimationFrame(loop); };
    resize();
    if (reduced) draw(); else loop();
    const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting));
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); };
  }, [mode, density]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
