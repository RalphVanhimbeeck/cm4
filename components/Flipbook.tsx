"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Flipbook.module.css";

type Page = {
  id: string;
  content: React.ReactNode | null;
};

const pages: Page[] = [
  // 0 — COVER
  {
    id: "cover",
    content: (
      <div className="relative w-full h-full">
        <img
          src="/cover-coding.png"
          alt="Cover"
          className="w-full h-full object-cover rounded"
        />
        <div className="absolute inset-0 flex items-start justify-start pt-8 pl-8">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg tracking-widest text-left">
            CODE<br />MAGAZINE
          </h1>
        </div>
      </div>
    ),
  },
  // 1 — INSIDE COVER
  { id: "inside-cover", content: null },
  // 2 — Page 1
  {
    id: "page-1",
    content: (
      <div>
        <h2 className="text-2xl font-semibold">Page 1</h2>
        <p className="text-sm sm:text-base">Simple text content layout</p>
      </div>
    ),
  },
  // 3 — Page 2
  {
    id: "page-2",
    content: (
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-2">Left column</div>
        <div className="bg-gray-200 p-2">Right column</div>
      </div>
    ),
  },
  // 4 — Page 3
  {
    id: "page-3",
    content: (
      <div className="bg-blue-100 p-4 rounded">Custom styled page</div>
    ),
  },
  // 5 — Page 4
  {
    id: "page-4",
    content: (
      <div>
        <h2 className="text-2xl font-semibold">Page 4</h2>
        <p>Extra content page</p>
      </div>
    ),
  },
  // 6 — Page 5
  {
    id: "page-5",
    content: (
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-2">Column A</div>
        <div className="bg-gray-200 p-2">Column B</div>
      </div>
    ),
  },
  // 7 — Page 6
  {
    id: "page-6",
    content: (
      <div className="bg-green-100 p-4 rounded">
        Another styled page
      </div>
    ),
  },
  // 8 — Page 7
  {
    id: "page-7",
    content: (
      <div>
        <h2 className="text-2xl font-semibold">Page 7</h2>
        <p>More magazine content</p>
      </div>
    ),
  },
  // 9 — BACK COVER
  {
    id: "back-cover",
    content: <h1 className="text-2xl">Back Cover</h1>,
  },
];

/* =========================
   SPREADS
========================= */
const totalSpreads = 5;
const totalPages = pages.length - 1; // index 0..9

type SpreadMeta = {
  left: { pageNumber: number; theme: string } | null;
  right: { pageNumber: number; theme: string } | null;
};

const spreadMeta: SpreadMeta[] = [
  { left: null, right: null },
  { left: null, right: { pageNumber: 1, theme: "Thema" } },
  { left: { pageNumber: 2, theme: "Thema" }, right: { pageNumber: 3, theme: "Thema" } },
  { left: { pageNumber: 4, theme: "Thema" }, right: { pageNumber: 5, theme: "Thema" } },
  { left: { pageNumber: 6, theme: "Thema" }, right: { pageNumber: 7, theme: "Thema" } },
  { left: null, right: null },
];

/* Label per individuele pagina (voor mobile) */
const pageMeta: ({ pageNumber: number; theme: string } | null)[] = [
  null,                                    // 0 cover
  null,                                    // 1 inside cover
  { pageNumber: 1, theme: "Thema" },       // 2
  { pageNumber: 2, theme: "Thema" },       // 3
  { pageNumber: 3, theme: "Thema" },       // 4
  { pageNumber: 4, theme: "Thema" },       // 5
  { pageNumber: 5, theme: "Thema" },       // 6
  { pageNumber: 6, theme: "Thema" },       // 7
  { pageNumber: 7, theme: "Thema" },       // 8
  null,                                    // 9 back cover
];

/* =========================
   LABEL COMPONENT
========================= */
function PageLabel({
  side,
  meta,
}: {
  side: "left" | "right";
  meta: { pageNumber: number; theme: string } | null;
}) {
  if (!meta) return null;
  const isRight = side === "right";
  return (
    <div
      className={`absolute bottom-3 ${
        isRight ? "right-4 text-right" : "left-4 text-left"
      } text-[11px] tracking-widest uppercase text-gray-400 select-none`}
    >
      {isRight
        ? `${meta.theme} | ${meta.pageNumber}`
        : `${meta.pageNumber} | ${meta.theme}`}
    </div>
  );
}

/* =========================
   COMPONENT
========================= */
export default function Flipbook() {
  // Desktop: spread index (0–5)
  const [spreadIndex, setSpreadIndex] = useState<number>(0);
  // Mobile: individuele pagina index (0–9)
  const [mobilePageIndex, setMobilePageIndex] = useState<number>(0);

  const touchStartX = useRef<number | null>(null);

  /* Desktop navigatie */
  const nextSpread = () => setSpreadIndex((s) => Math.min(s + 1, totalSpreads));
  const prevSpread = () => setSpreadIndex((s) => Math.max(s - 1, 0));

  /* Mobile navigatie */
  const nextPage = () => setMobilePageIndex((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setMobilePageIndex((p) => Math.max(p - 1, 0));

  // Keyboard — desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSpread();
      if (e.key === "ArrowLeft") prevSpread();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [spreadIndex]);

  // Touch swipe — mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) prevPage();
    if (deltaX < -50) nextPage();
    touchStartX.current = null;
  };

  /* Desktop spread */
  const isCover = spreadIndex === 0;
  const isBackCover = spreadIndex === totalSpreads;

  const getSpread = () => {
    switch (spreadIndex) {
      case 0: return { left: null, right: pages[0].content };
      case 1: return { left: pages[1].content, right: pages[2].content };
      case 2: return { left: pages[3].content, right: pages[4].content };
      case 3: return { left: pages[5].content, right: pages[6].content };
      case 4: return { left: pages[7].content, right: pages[8].content };
      case 5: return { left: pages[9].content, right: null };
      default: return { left: null, right: null };
    }
  };

  const { left, right } = getSpread();
  const currentMeta = spreadMeta[spreadIndex];

  /* Mobile huidige pagina */
  const mobilePage = pages[mobilePageIndex];
  const mobileIsCover = mobilePageIndex === 0;
  const mobileIsBackCover = mobilePageIndex === totalPages;

  const spreadLabels = [
    "Cover",
    "Inside / 1",
    "2 / 3",
    "4 / 5",
    "6 / 7",
    "Rear",
  ];

  return (
    <div className={styles.wrapper}>
      {/* BOOK */}
      <div
        className="w-full max-w-5xl mx-auto px-2 sm:px-4"
        style={{ height: "62vh" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* DESKTOP — spread view */}
        <div className="hidden md:flex gap-4 w-full h-full justify-center">
          {!isCover && (
            <div className="relative aspect-[3/4] h-full border rounded shadow bg-white flex items-center justify-center p-6">
              {left}
              <PageLabel side="left" meta={currentMeta.left} />
            </div>
          )}
          {!isBackCover && (
            <div
              className={`relative aspect-[3/4] h-full border rounded shadow bg-white flex items-center justify-center overflow-hidden ${
                isCover ? "p-0" : "p-6"
              }`}
            >
              {right}
              {!isCover && (
                <PageLabel side="right" meta={currentMeta.right} />
              )}
            </div>
          )}
        </div>

        {/* MOBILE — één pagina tegelijk */}
        <div className="md:hidden w-full h-full flex items-center justify-center">
          <div
            className={`relative aspect-[3/4] h-full border rounded shadow bg-white flex items-center justify-center overflow-hidden ${
              mobileIsCover ? "p-0" : "p-4"
            }`}
          >
            {mobilePage.content}

            {!mobileIsCover && !mobileIsBackCover && (
              <PageLabel side="right" meta={pageMeta[mobilePageIndex]} />
            )}
          </div>
        </div>
      </div>

      {/* CONTROLS — alleen desktop */}
      <div className="hidden md:flex justify-center gap-4 mt-4">
        <button
          className="px-4 py-2 border rounded disabled:opacity-40"
          onClick={prevSpread}
          disabled={spreadIndex === 0}
        >
          ← Vorige
        </button>
        <button
          className="px-4 py-2 border rounded disabled:opacity-40"
          onClick={nextSpread}
          disabled={spreadIndex === totalSpreads}
        >
          Volgende →
        </button>
      </div>

      {/* NAV */}
      <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
        {/* Pijltje vorige — alleen mobile */}
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-full border bg-white shadow text-lg disabled:opacity-30"
          onClick={prevPage}
          disabled={mobilePageIndex === 0}
          aria-label="Vorige pagina"
        >
          ‹
        </button>

        {/* Spread labels — alleen desktop */}
        {spreadLabels.map((label, i) => (
          <button
            key={i}
            onClick={() => setSpreadIndex(i)}
            className={`hidden md:block px-3 py-2 border rounded text-xs ${
              spreadIndex === i ? "bg-black text-white" : ""
            }`}
          >
            {label}
          </button>
        ))}

        {/* Paginateller — alleen mobile */}
        <span className="md:hidden text-xs text-gray-500">
          {mobilePageIndex + 1} / {totalPages + 1}
        </span>

        {/* Pijltje volgende — alleen mobile */}
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-full border bg-white shadow text-lg disabled:opacity-30"
          onClick={nextPage}
          disabled={mobilePageIndex === totalPages}
          aria-label="Volgende pagina"
        >
          ›
        </button>
      </div>
    </div>
  );
}
