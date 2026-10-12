// Central asset manifest — replace any entry to swap artwork site-wide.
import heroMoon from "@/assets/bg/hero-moon.jpg";
import snowHouse from "@/assets/bg/snow-house.jpg";
import forest from "@/assets/bg/forest.jpg";
import infinityCastle from "@/assets/bg/infinity-castle.jpg";

export const backgrounds = {
  heroMoon,
  snowHouse,
  forest,
  infinityCastle,
} as const;

// Character artwork slots. Official artwork is copyrighted — drop licensed
// images here (e.g. import tanjiro from "@/assets/characters/tanjiro.jpg")
// and the CharacterViewer will render them instead of the emblem composition.
export const characterArt: Record<string, string | undefined> = {};
