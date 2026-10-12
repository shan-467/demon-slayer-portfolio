import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Trailing ring cursor for fine pointers; native cursor stays visible. */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ring.current!;
    el.style.display = "block";
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    const move = (e: PointerEvent) => {
      xTo(e.clientX); yTo(e.clientY);
      const interactive = (e.target as HTMLElement).closest("a,button");
      gsap.to(el, { scale: interactive ? 2.2 : 1, duration: 0.3 });
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] -ml-4 -mt-4 hidden h-8 w-8 rounded-full border border-blood mix-blend-screen"
    />
  );
}
