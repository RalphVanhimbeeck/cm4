export type ThemeItem = {
  id: string;
  title: string;
  spreadIndex: number; // index voor setSpreadIndex() in Flipbook
};

export const themes: ThemeItem[] = [
  {
    id: "cover",
    title: "Cover",
    spreadIndex: 0,
  },
  {
    id: "intro",
    title: "Introduction",
    spreadIndex: 1,
  },
  {
    id: "sound-design",
    title: "Sound Design",
    spreadIndex: 2,
  },
  {
    id: "data-driven",
    title: "Data driven grafische objecten",
    spreadIndex: 3,
  },
  {
    id: "grafiek",
    title: "Grafiek in tijd en ruimte",
    spreadIndex: 4,
  },
  {
    id: "interactief",
    title: "Interactieve informatie structuren",
    spreadIndex: 5,
  },
  {
    id: "sequentieel",
    title: "Sequentiële grafische systemen",
    spreadIndex: 6,
  },
  {
    id: "rear",
    title: "Rear cover",
    spreadIndex: 7,
  },
];
