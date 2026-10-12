export const chapters = [
  { id: "beginning", num: "01", title: "The Beginning", jp: "始まり", spoiler: false },
  { id: "tragedy", num: "02", title: "The Tragedy", jp: "悲劇", spoiler: false },
  { id: "journey", num: "03", title: "The Journey Begins", jp: "旅立ち", spoiler: false },
  { id: "corps", num: "04", title: "The Demon Slayer Corps", jp: "鬼殺隊", spoiler: false },
  { id: "battles", num: "05", title: "The Battles", jp: "死闘", spoiler: true },
  { id: "hashira", num: "06", title: "The Hashira", jp: "柱", spoiler: false },
  { id: "castle", num: "07", title: "Infinity Castle", jp: "無限城", spoiler: true },
  { id: "final", num: "08", title: "The Final Battle", jp: "決戦", spoiler: true },
  { id: "legacy", num: "09", title: "Legacy", jp: "継承", spoiler: true },
] as const;

export const arcs = [
  { id: "natagumo", title: "Mount Natagumo", jp: "那田蜘蛛山", tone: "water", text: "A spider family of demons traps Tanjiro's squad. Out of options, he channels the memory of his father's dance — Hinokami Kagura — for the first time." },
  { id: "mugen", title: "Mugen Train", jp: "無限列車", tone: "flame", text: "Aboard a train where passengers vanish, Tanjiro fights alongside Flame Hashira Rengoku against Lower Rank One — and then Upper Rank Three, Akaza, arrives at dawn." },
  { id: "district", title: "Entertainment District", jp: "遊郭", tone: "thunder", text: "Tengen Uzui leads Tanjiro, Zenitsu and Inosuke into the pleasure quarters, where Upper Rank Six — the siblings Daki and Gyutaro — hide in plain sight." },
] as const;
