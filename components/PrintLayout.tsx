"use client";

// PrintLayout — rendert alle spreads statisch voor Puppeteer PDF export
// Importeert de pages array direct uit Flipbook zodat content gesynchroniseerd blijft

import React from "react";

// Spread configuratie: [linkerIndex, rechterIndex] — null = lege zijde
const SPREADS: [number | null, number | null][] = [
  [null, 0],   // Cover
  [1,    2],   // Introduction
  [3,    4],   // Sound Design
  [5,    6],   // Data driven grafische objecten
  [7,    8],   // Grafiek in tijd en ruimte
  [9,    10],  // Interactieve informatie structuren
  [11,   12],  // Sequentiële grafische systemen
  [13,   null],// Rear cover
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
