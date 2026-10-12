export type Character = {
  id: string;
  name: string;
  kanji: string;
  role: string;
  style: string;
  color: string; // css var reference
  desc: string;
  group: "protagonists" | "hashira" | "demons";
};

export const characters: Character[] = [
  { id: "tanjiro", name: "Tanjiro Kamado", kanji: "炭治郎", role: "Demon Slayer", style: "Water Breathing · Sun Breathing (Hinokami Kagura)", color: "var(--water)", group: "protagonists", desc: "A kind-hearted charcoal seller whose family is slaughtered by a demon. He joins the Corps to turn his sister Nezuko back into a human, guided by an extraordinary sense of smell." },
  { id: "nezuko", name: "Nezuko Kamado", kanji: "禰豆子", role: "Demon · Sister", style: "Blood Demon Art: Exploding Blood", color: "var(--blood)", group: "protagonists", desc: "Tanjiro's younger sister, turned into a demon by Muzan. She resists the hunger for human blood and fights to protect people, carried in a wooden box by her brother." },
  { id: "zenitsu", name: "Zenitsu Agatsuma", kanji: "善逸", role: "Demon Slayer", style: "Thunder Breathing — First Form only", color: "var(--thunder)", group: "protagonists", desc: "Cowardly and loud while awake, devastating when he faints. He has mastered a single form of Thunder Breathing and refined it into lightning-fast perfection." },
  { id: "inosuke", name: "Inosuke Hashibira", kanji: "伊之助", role: "Demon Slayer", style: "Beast Breathing (self-taught)", color: "oklch(0.7 0.08 220)", group: "protagonists", desc: "Raised by boars in the mountains, wearing a boar's head mask. Wild, competitive, and fearless, he invented his own breathing style wielding two jagged blades." },
  { id: "giyu", name: "Giyu Tomioka", kanji: "義勇", role: "Water Hashira", style: "Water Breathing · Dead Calm", color: "var(--water)", group: "hashira", desc: "The first Slayer Tanjiro meets. Quiet and withdrawn, he spared Nezuko and sent Tanjiro to his own master, Urokodaki." },
  { id: "rengoku", name: "Kyojuro Rengoku", kanji: "杏寿郎", role: "Flame Hashira", style: "Flame Breathing", color: "var(--flame)", group: "hashira", desc: "Radiant, passionate and unshakeable. His stand aboard the Mugen Train leaves a lasting mark on Tanjiro: set your heart ablaze." },
  { id: "shinobu", name: "Shinobu Kocho", kanji: "しのぶ", role: "Insect Hashira", style: "Insect Breathing · Wisteria poison", color: "oklch(0.72 0.13 300)", group: "hashira", desc: "Unable to behead demons, she kills with poison derived from wisteria. A gentle smile masks a deep anger over her sister's death." },
  { id: "tengen", name: "Tengen Uzui", kanji: "天元", role: "Sound Hashira", style: "Sound Breathing", color: "oklch(0.75 0.15 340)", group: "hashira", desc: "A former shinobi who demands everything be flamboyant. He leads the Entertainment District mission against Upper Rank Six." },
  { id: "muichiro", name: "Muichiro Tokito", kanji: "無一郎", role: "Mist Hashira", style: "Mist Breathing", color: "oklch(0.82 0.06 190)", group: "hashira", desc: "A prodigy who became Hashira within two months of picking up a sword. His lost memories return during the Swordsmith Village battle." },
  { id: "mitsuri", name: "Mitsuri Kanroji", kanji: "蜜璃", role: "Love Hashira", style: "Love Breathing", color: "oklch(0.78 0.12 0)", group: "hashira", desc: "Warm, emotional and immensely strong thanks to unusually dense muscles. She wields a whip-thin, flexible blade." },
  { id: "sanemi", name: "Sanemi Shinazugawa", kanji: "実弥", role: "Wind Hashira", style: "Wind Breathing", color: "oklch(0.8 0.1 150)", group: "hashira", desc: "Scarred and hostile, especially toward demons. His rare blood intoxicates demons, and he harbors complicated feelings for his brother Genya." },
  { id: "gyomei", name: "Gyomei Himejima", kanji: "悲鳴嶼", role: "Stone Hashira", style: "Stone Breathing", color: "oklch(0.72 0.03 80)", group: "hashira", desc: "Blind, devout and acknowledged as the strongest of the Hashira. He fights with a flail and axe joined by a chain." },
  { id: "obanai", name: "Obanai Iguro", kanji: "小芭内", role: "Serpent Hashira", style: "Serpent Breathing", color: "oklch(0.65 0.1 160)", group: "hashira", desc: "Sharp-tongued and strict, accompanied by his white snake Kaburamaru. His winding blade strikes in serpentine arcs." },
  { id: "muzan", name: "Muzan Kibutsuji", kanji: "無惨", role: "Demon King", style: "Progenitor of all demons", color: "var(--blood)", group: "demons", desc: "The first demon, who has lived for over a thousand years seeking to conquer sunlight. Every demon carries his blood — and his curse." },
  { id: "kokushibo", name: "Kokushibo", kanji: "黒死牟", role: "Upper Rank One", style: "Moon Breathing", color: "oklch(0.7 0.12 300)", group: "demons", desc: "The strongest of the Twelve Kizuki, a former Demon Slayer who chose eternity over mortality." },
  { id: "akaza", name: "Akaza", kanji: "猗窩座", role: "Upper Rank Three", style: "Blood Demon Art: Destructive Death", color: "oklch(0.6 0.15 350)", group: "demons", desc: "A martial artist obsessed with strength who despises the weak. He faces Rengoku after the Mugen Train." },
];
