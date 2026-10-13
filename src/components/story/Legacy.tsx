import { ArrowUp, RotateCcw } from "lucide-react";
import { backgrounds } from "@/content/assets";
import { chapters } from "@/content/chapters";
import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/motion";
import { ChapterHeading } from "./ChapterHeading";

export function Legacy() {
  return <>
    <section id="legacy" className="relative overflow-hidden bg-background px-6 py-28 md:px-16 md:py-36">
      <img src={backgrounds.forest} alt="Wisteria blossoms hanging in a quiet forest" loading="lazy" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 shade-full" />
      <div className="relative mx-auto max-w-3xl text-center">
        <ChapterHeading c={chapters[8]} align="center" />
        <p className="mt-10 font-display text-2xl leading-relaxed text-moon md:text-4xl">A world without demons.<br />A future worth every sacrifice.</p>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">The Demon Slayer Corps disbands. Tanjiro, Nezuko, Zenitsu and Inosuke return to the Kamado home — not untouched by loss, but free to live the ordinary days so many fought to protect.</p>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">Generations later, their descendants and the reincarnations of those who fell walk through a peaceful modern Japan. The names may change. The kindness, courage and love endure.</p>
        <div className="mx-auto my-12 h-16 w-px bg-blood" />
        <p className="text-sm text-blood">心を燃やせ</p>
        <p className="mt-4 font-display text-3xl text-moon md:text-5xl">Set your heart ablaze.</p>
        <Button variant="outline" onClick={() => scrollToId("beginning")} className="mt-12 h-auto gap-3 rounded-none px-6 py-4"><RotateCcw /> Relive the story</Button>
      </div>
    </section>
    <footer className="flex flex-wrap items-center justify-between gap-6 border-t border-border px-6 py-8 md:px-16">
      <div><p className="font-display text-lg text-moon">Eternal Flame</p><p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground">An unofficial fan tribute. Demon Slayer: Kimetsu no Yaiba belongs to Koyoharu Gotouge, Shueisha, Aniplex and ufotable.</p></div>
      <Button variant="ghost" size="icon" onClick={() => scrollToId("top")} aria-label="Back to top" title="Back to top"><ArrowUp /></Button>
    </footer>
  </>;
}