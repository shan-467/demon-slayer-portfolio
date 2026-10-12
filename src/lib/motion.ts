import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

let registered = false;
export function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Shared smooth-scroll instance
export const scroller: { lenis: Lenis | null } = { lenis: null };

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (scroller.lenis) scroller.lenis.scrollTo(el, { duration: 1.6 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

/** Wrap each character of an element's text in spans for stagger reveals. */
export function splitChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text);
  el.innerHTML = "";
  return [...text].map((c) => {
    const s = document.createElement("span");
    s.textContent = c === " " ? "\u00a0" : c;
    s.style.display = "inline-block";
    s.setAttribute("aria-hidden", "true");
    el.appendChild(s);
    return s;
  });
}

export function splitWords(el: HTMLElement) {
  const words = (el.textContent ?? "").split(/\s+/).filter(Boolean);
  el.setAttribute("aria-label", words.join(" "));
  el.innerHTML = "";
  return words.map((w) => {
    const wrap = document.createElement("span");
    wrap.style.display = "inline-block";
    wrap.style.overflow = "hidden";
    wrap.style.verticalAlign = "top";
    wrap.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.textContent = w;
    inner.style.display = "inline-block";
    wrap.appendChild(inner);
    el.appendChild(wrap);
    el.appendChild(document.createTextNode(" "));
    return inner;
  });
}
