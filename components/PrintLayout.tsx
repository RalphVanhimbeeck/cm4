"use client";

// PrintLayout — rendert alle spreads statisch voor Puppeteer PDF export
// Importeert de pages array direct uit Flipbook zodat content gesynchroniseerd blijft

import React from "react";

// Spread configuratie: [linkerIndex, rechterIndex] — null = lege zijde.
// Index = positie in de `pages`-array uit Flipbook.tsx (0 = cover, 1 =
// inside-cover, 2-26 = de 25 content-pagina's, 27 = back-cover).
// De rear cover staat weer los/solo, na pagina 25 (de samenvatting).
// Moet in sync blijven met `spreadMeta` in Flipbook.tsx!
const SPREADS: [number | null, number | null][] = [
  [null, 0],    // Cover
  [1,    2],    // Inside-cover + page-1 (Introduction, solo)
  [3,    4],    // page-2, page-3 (Introduction / Sound Design opener)
  [5,    6],    // page-4, page-5 (Sound Design)
  [7,    8],    // page-6, page-7 (Sound Design)
  [9,    10],   // page-8, page-9 (Data driven grafische objecten opener + tekst)
  [11,   12],   // page-10, page-11 (Data driven grafische objecten — fotospread)
  [13,   14],   // page-12, page-13 (Data driven tekst → Grafiek in tijd en ruimte opener)
  [15,   16],   // page-14, page-15 (Grafiek in tijd en ruimte)
  [17,   18],   // page-16, page-17 (Grafiek tekst → Interactieve informatie structuren opener)
  [19,   20],   // page-18, page-19 (Interactieve informatie structuren)
  [21,   22],   // page-20, page-21 (Interactief tekst → Sequentiële grafische systemen opener)
  [23,   24],   // page-22, page-23 (Sequentiële grafische systemen)
  [25,   26],   // page-24, page-25 (samenvatting)
  [27,   null], // Rear cover, solo
];

// Importeer de pages array — staat bovenaan Flipbook.tsx als module-level const
// We exporteren die hier apart zodat PrintLayout hem kan gebruiken
import { printPages } from "@/components/Flipbook";

export default function PrintLayout() {
  return (
    <div
      style={{
        width: "100%",
        background: "white",
        fontFamily: "Georgia, serif",
      }}
    >
      {SPREADS.map(([leftIdx, rightIdx], si) => (
        <div
          key={si}
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            gap: "8mm",
            padding: "8mm",
            boxSizing: "border-box",
            background: "white",
            pageBreakAfter: si < SPREADS.length - 1 ? "always" : "avoid",
          }}
        >
          {/* Linkerpagina */}
          {leftIdx === null ? (
            <div style={{ flex: 1, background: "#f9fafb", borderRadius: 4 }} />
          ) : (
            <div
              style={{
                flex: 1,
                height: "100%",
                border: "1px solid #e5e7eb",
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
                background: "white",
              }}
            >
              <div style={{ width: "100%", height: "100%", position: "relative" }}>
                {printPages[leftIdx]}
              </div>
            </div>
          )}

          {/* Rechterpagina */}
          {rightIdx === null ? (
            <div style={{ flex: 1, background: "#f9fafb", borderRadius: 4 }} />
          ) : (
            <div
              style={{
                flex: 1,
                height: "100%",
                border: "1px solid #e5e7eb",
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
                background: "white",
              }}
            >
              <div style={{ width: "100%", height: "100%", position: "relative" }}>
                {printPages[rightIdx]}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
