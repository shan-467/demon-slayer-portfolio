import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/hero/Hero";
import { Beginning, Tragedy, Journey } from "@/components/story/EarlyChapters";
import { Corps } from "@/components/story/Corps";
import { Battles } from "@/components/story/Battles";
import { HashiraWall } from "@/components/characters/HashiraWall";
import { CharacterViewer } from "@/components/characters/CharacterViewer";
import { InfinityCastle } from "@/components/story/InfinityCastle";
import { FinalBattle } from "@/components/story/FinalBattle";
import { Legacy } from "@/components/story/Legacy";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Eternal Flame — The Demon Slayer Story" },
    { name: "description", content: "Journey through Demon Slayer, from the Kamado family tragedy to the Infinity Castle, the final dawn and an enduring legacy." },
    { property: "og:title", content: "Eternal Flame — The Demon Slayer Story" },
    { property: "og:description", content: "Nine chapters of courage and sacrifice, with an immersive three-dimensional Infinity Castle." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  return <><Nav /><main><Hero /><Beginning /><Tragedy /><Journey /><Corps /><Battles /><HashiraWall /><InfinityCastle /><FinalBattle /><Legacy /><CharacterViewer /></main></>;
}
