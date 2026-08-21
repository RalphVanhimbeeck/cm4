export type ThemeItem = {
  id: string;
  title: string;
  spreadIndex: number; // index voor setSpreadIndex() in Flipbook (desktop)
  mobilePageIndex: number; // index in de `pages`-array (mobiele navigatie) — index = pageNumber + 1
};

// Elk thema wijst naar zijn thema-openingspagina (foto-achtergrond + nummer)
// in de 25-pagina-structuur. Pagina 25 (samenvatting) heeft geen eigen thema
// meer nodig in dit menu, en de rear cover staat weer los na pagina 25.
// mobilePageIndex = positie in `pages[]` (0=cover,1=inside-cover,2-26=page-1..25,27=back-cover)
// spreadIndex = bijhorende desktop-spread (zie spreadMeta / pageIndexToSpread in Flipbook.tsx)
export const themes: ThemeItem[] = [
  { id: "cover",        title: "Cover",                              spreadIndex: 0,  mobilePageIndex: 0  },
  { id: "intro",        title: "Introduction",                       spreadIndex: 1,  mobilePageIndex: 2  }, // page-1
  { id: "sound-design", title: "Sound Design",                       spreadIndex: 2,  mobilePageIndex: 4  }, // page-3 (opener)
  { id: "data-driven",  title: "Data driven grafische objecten",     spreadIndex: 5,  mobilePageIndex: 9  }, // page-8 (opener)
  { id: "grafiek",      title: "Grafiek in tijd en ruimte",          spreadIndex: 7,  mobilePageIndex: 14 }, // page-13 (opener)
  { id: "interactief",  title: "Interactieve informatie structuren", spreadIndex: 9,  mobilePageIndex: 18 }, // page-17 (opener)
  { id: "sequentieel",  title: "Sequentiële grafische systemen",     spreadIndex: 11, mobilePageIndex: 22 }, // page-21 (opener)
  { id: "rear",         title: "Rear cover",                         spreadIndex: 14, mobilePageIndex: 27 },
];