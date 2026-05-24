"use client";

import { useState, useCallback } from "react";
import Flipbook from "@/components/Flipbook";
import HandTracker from "@/components/HandTracker";

const TOTAL_SPREADS = 7; // 0 t/m 7 (cover → back cover)

export default function TestPage() {
  const [spreadIndex, setSpreadIndex] = useState(0);

  const handleFlip = useCallback((dir: "LEFT" | "RIGHT") => {
    setSpreadIndex((current) => {
      if (dir === "RIGHT") return Math.min(current + 1, TOTAL_SPREADS);
      return Math.max(current - 1, 0);
    });
  }, []);

  return (
    <>
      {/* 🖐️ HandTracker — overlay alleen zichtbaar op /test */}
      <HandTracker
        onFlip={handleFlip}
        showOverlay={true}
      />

      {/* 📖 Flipbook — gestuurd via externalSpreadIndex */}
      <Flipbook
        externalSpreadIndex={spreadIndex}
        onSpreadChange={setSpreadIndex}
      />
    </>
  );
}
