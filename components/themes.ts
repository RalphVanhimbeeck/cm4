export type ThemeItem = {
  id: string;
  title: string;
  spreadIndex: number; // index voor setSpreadIndex() in Flipbook (desktop)
  mobilePageIndex: number; // index voor mobile pagina-navigatie
};

export const themes: ThemeItem[] = [
  { id: "cover",       title: "Cover",                             spreadIndex: 0, mobilePageIndex: 0  },
  { id: "intro",       title: "Introduction",                      spreadIndex: 1, mobilePageIndex: 1  },
  { id: "sound-design",title: "Sound Design",                      spreadIndex: 2, mobilePageIndex: 3  },
  { id: "data-driven", title: "Data driven grafische objecten",    spreadIndex: 3, mobilePageIndex: 5  },
  { id: "grafiek",     title: "Grafiek in tijd en ruimte",         spreadIndex: 4, mobilePageIndex: 7  },
  { id: "interactief", title: "Interactieve informatie structuren",spreadIndex: 5, mobilePageIndex: 9  },
  { id: "sequentieel", title: "Sequentiële grafische systemen",    spreadIndex: 6, mobilePageIndex: 11 },
  { id: "rear",        title: "Rear cover",                        spreadIndex: 7, mobilePageIndex: 13 },
];