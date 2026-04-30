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
  // 2 — Page 1  (spread 1: Inside / 1)
  {
    id: "page-1",
    content: (
      <div>
        <h2 className="text-2xl font-semibold">Page 1</h2>
        <p className="text-sm sm:text-base">Simple text content layout</p>
      </div>
    ),
  },
  // 3 — Page 2  (LINKERPAGINA spread 2: "2/3")
  {
    id: "page-2",
    content: (
      <div className="flex flex-row w-full h-full gap-3">
        <div className="flex-1 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
          <span className="text-gray-400 text-sm">Foto</span>
        </div>
        <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
          <p className="text-xs text-gray-500 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    ),
  },
  // 4 — Page 3  (RECHTERPAGINA spread 2: "2/3")
  {
    id: "page-3",
    content: (
      <div className="flex flex-col w-full h-full gap-3">
        <div className="flex flex-1 gap-3">
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
            <p className="text-xs text-gray-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
          <div className="flex-1 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
            <span className="text-gray-400 text-sm">Foto</span>
          </div>
        </div>
        <div className="flex flex-1 gap-3">
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
            <p className="text-xs text-gray-500 leading-relaxed">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum consectetur.
            </p>
          </div>
          <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
            <p className="text-xs text-gray-500 leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  // 5 — Page 4  (LINKERPAGINA spread 3: "4/5")
  {
    id: "page-4",
    content: (
      <div className="flex flex-col w-full h-full gap-3">
        <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
          <p className="text-xs text-gray-500 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam quis nostrud exercitation ullamco.
          </p>
        </div>
        <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
          <p className="text-xs text-gray-500 leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident deserunt mollit.
          </p>
        </div>
      </div>
    ),
  },
  // 6 — Page 5  (RECHTERPAGINA spread 3: "4/5")
  {
    id: "page-5",
    content: (
      <div className="flex flex-col w-full h-full gap-3">
        <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
          <p className="text-xs text-gray-500 leading-relaxed">
            Sunt in culpa qui officia deserunt mollit anim id est laborum
            consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste
            natus error sit voluptatem accusantium doloremque.
          </p>
        </div>
        <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-3 overflow-hidden">
          <p className="text-xs text-gray-500 leading-relaxed">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
            aut fugit, sed quia consequuntur magni dolores eos qui ratione
            sequi nesciunt neque porro quisquam.
          </p>
        </div>
      </div>
    ),
  },
  // 7 — Page 6
  {
    id: "page-6",
    content: (
      <div className="flex flex-col w-full h-full gap-3">

        {/* Boven */}
        <div className="flex flex-1 gap-3">
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
          <div className="flex-1 bg-gray-100 rounded p-3">
            <p className="text-xs text-gray-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Onder */}
        <div className="flex flex-1 gap-3">
          <div className="flex-1 bg-gray-100 rounded p-3">
            <p className="text-xs text-gray-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
        </div>

      </div>
    ),
  },
  // 8 — Page 7
  {
    id: "page-7",
    content: (
      <div className="flex flex-col w-full h-full gap-3">

        {/* Boven */}
        <div className="flex gap-3 flex-[1]">
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
          <div className="flex-1 bg-gray-100 rounded p-3">
            <p className="text-xs text-gray-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Midden (gesplitst: tekst + foto) */}
        <div className="flex gap-3 flex-[1.5]">
          <div className="flex-1 bg-gray-100 rounded p-3">
            <p className="text-xs text-gray-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
        </div>

        {/* Onder */}
        <div className="flex gap-3 flex-[1.5]">
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
          <div className="flex-1 bg-gray-100 rounded p-3">
            <p className="text-xs text-gray-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

      </div>
    ),
  },

  // 9 — Page 8 (LINKS - spread 8/9) — volledig foto's
  {
    id: "page-8",
    content: (
      <div className="flex flex-col w-full h-full gap-3">

        {/* Rij 1: grote foto links, 2 kleine rechts gestapeld */}
        <div className="flex gap-3 flex-[1.5]">
          <div className="flex-[2] bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
              Foto
            </div>
            <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
              Foto
            </div>
          </div>
        </div>

        {/* Rij 2: 2 foto's naast elkaar */}
        <div className="flex gap-3 flex-1">
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
        </div>

        {/* Rij 3: 2 foto's naast elkaar */}
        <div className="flex gap-3 flex-1">
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
        </div>

      </div>
    ),
  },

  // 10 — Page 9 (RECHTS - spread 8/9) — twee tekstblokken
  {
    id: "page-9",
    content: (
      <div className="flex flex-col w-full h-full gap-3">

        <div className="flex-1 bg-gray-100 rounded p-3 flex items-center justify-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            Tekst
          </p>
        </div>

        <div className="flex-1 bg-gray-100 rounded p-3 flex items-center justify-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            Tekst
          </p>
        </div>

      </div>
    ),
  },

  // 11 — Page 10 (LINKS - volgende spread)
  {
    id: "page-10",
    content: (
      <div className="flex flex-col w-full h-full gap-3">

        <div className="flex gap-3 flex-1">
          <div className="flex-1 bg-gray-100 rounded p-3">
            <p className="text-xs text-gray-500">Lorem ipsum</p>
          </div>
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
        </div>

        <div className="flex gap-3 flex-1">
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
          <div className="flex-1 bg-gray-100 rounded p-3">
            <p className="text-xs text-gray-500">Lorem ipsum</p>
          </div>
        </div>

      </div>
    ),
  },

  // 12 — Page 11 (RECHTS)
  {
    id: "page-11",
    content: (
      <div className="flex flex-col w-full h-full gap-3">

        <div className="flex-1 bg-gray-100 rounded p-3">
          <p className="text-xs text-gray-500 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="flex gap-3 flex-1">
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
          <div className="flex-1 bg-gray-200 rounded flex items-center justify-center">
            Foto
          </div>
        </div>

      </div>
    ),
  },

  // 13 — BACK COVER
  {
    id: "back-cover",
    content: <h1 className="text-2xl">Back Cover</h1>,
  },
];

/* =========================
   SPREADS
========================= */
const totalSpreads = 7;
const totalPages = pages.length - 1;

type SpreadMeta = {
  left: { pageNumber: number; theme: string } | null;
  right: { pageNumber: number; theme: string } | null;
};

const spreadMeta: SpreadMeta[] = [
  { left: null, right: null },
  { left: null, right: { pageNumber: 1, theme: "Thema" } },
  { left: { pageNumber: 2, theme: "Sound Design" }, right: { pageNumber: 3, theme: "Sound Design" } },
  { left: { pageNumber: 4, theme: "Data driven grafische objecten" }, right: { pageNumber: 5, theme: "Data driven grafische objecten" } },
  { left: { pageNumber: 6, theme: "Grafiek in tijd en ruimte" }, right: { pageNumber: 7, theme: "Grafiek in tijd en ruimte" } },
  { left: { pageNumber: 8, theme: "Interactieve informatie structuren" }, right: { pageNumber: 9, theme: "Interactieve informatie structuren" } },
  { left: { pageNumber: 10, theme: "Sequentiële grafische systemen" }, right: { pageNumber: 11, theme: "Sequentiële grafische systemen" } },
  { left: null, right: null },
];

const pageMeta: ({ pageNumber: number; theme: string } | null)[] = [
  null,
  null,
  { pageNumber: 1, theme: "Thema" },
  { pageNumber: 2, theme: "Thema" },
  { pageNumber: 3, theme: "Thema" },
  { pageNumber: 4, theme: "Thema" },
  { pageNumber: 5, theme: "Thema" },
  { pageNumber: 6, theme: "Thema" },
  { pageNumber: 7, theme: "Thema" },
  { pageNumber: 8, theme: "Thema" },
  { pageNumber: 9, theme: "Thema" },
  { pageNumber: 10, theme: "Thema" },
  { pageNumber: 11, theme: "Thema" },
  null,
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
   SPREAD 4/5 — aparte component
   Foto als horizontale balk over de volledige spread,
   4 tekstblokken naast elkaar eronder.
========================= */
function CrossSpread({
  leftContent,
  rightContent,
  metaLeft,
  metaRight,
}: {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  metaLeft: { pageNumber: number; theme: string } | null;
  metaRight: { pageNumber: number; theme: string } | null;
}) {
  return (
    <div className="hidden md:flex gap-4 w-full h-full justify-center">
      {/* Linkerpagina */}
      <div
        className="relative h-full border rounded shadow bg-white overflow-hidden flex flex-col"
        style={{ aspectRatio: "3/4" }}
      >
        {/* Foto — bovenste helft, loopt door via rechterpagina */}
        <div className="flex-[3] bg-gray-200 flex items-center justify-center">
          {/* lege placeholder, visueel doorlopend via rechterpagina */}
        </div>
        {/* Tekst — onderste helft, linker 2 blokken */}
        <div className="flex-[2] flex flex-row gap-3 p-4 pt-3">
          {leftContent}
        </div>
        <PageLabel side="left" meta={metaLeft} />
      </div>

      {/* Rechterpagina */}
      <div
        className="relative h-full border rounded shadow bg-white overflow-hidden flex flex-col"
        style={{ aspectRatio: "3/4" }}
      >
        {/* Foto — bovenste helft, doorlopend van linkerpagina */}
        <div className="flex-[3] bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Foto</span>
        </div>
        {/* Tekst — onderste helft, rechter 2 blokken */}
        <div className="flex-[2] flex flex-row gap-3 p-4 pt-3">
          {rightContent}
        </div>
        <PageLabel side="right" meta={metaRight} />
      </div>
    </div>
  );
}

/* =========================
   COMPONENT
========================= */
export default function Flipbook() {
  const [spreadIndex, setSpreadIndex] = useState<number>(0);
  const [mobilePageIndex, setMobilePageIndex] = useState<number>(0);

  const touchStartX = useRef<number | null>(null);

  const nextSpread = () => setSpreadIndex((s) => Math.min(s + 1, totalSpreads));
  const prevSpread = () => setSpreadIndex((s) => Math.max(s - 1, 0));

  const nextPage = () => setMobilePageIndex((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setMobilePageIndex((p) => Math.max(p - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSpread();
      if (e.key === "ArrowLeft") prevSpread();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [spreadIndex]);

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

  const isCover = spreadIndex === 0;
  const isBackCover = spreadIndex === totalSpreads;

  const getSpread = () => {
    switch (spreadIndex) {
      case 0: return { left: null, right: pages[0].content };
      case 1: return { left: pages[1].content, right: pages[2].content };
      case 2: return { left: pages[3].content, right: pages[4].content };
      case 3: return { left: pages[5].content, right: pages[6].content };
      case 4: return { left: pages[7].content, right: pages[8].content };
      case 5: return { left: pages[9].content, right: pages[10].content };
      case 6: return { left: pages[11].content, right: pages[12].content };
      case 7: return { left: pages[13].content, right: null };
      default: return { left: null, right: null };
    }
  };

  const { left, right } = getSpread();
  const currentMeta = spreadMeta[spreadIndex];

  const mobilePage = pages[mobilePageIndex];
  const mobileIsCover = mobilePageIndex === 0;
  const mobileIsBackCover = mobilePageIndex === totalPages;

  const spreadLabels = [
    "Cover",
    "Inside / 1",
    "2 / 3",
    "4 / 5",
    "6 / 7",
    "8 / 9",
    "10 / 11",
    "Rear"
  ];

  /* Tekstblokken voor spread 4/5 — links en rechts apart doorgeven */
  const spread45LeftContent = (
    <>
      <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden">
        <p className="text-xs text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden">
        <p className="text-xs text-gray-500 leading-relaxed">
          Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur excepteur sint.
        </p>
      </div>
    </>
  );

  const spread45RightContent = (
    <>
      <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden">
        <p className="text-xs text-gray-500 leading-relaxed">
          Sunt in culpa qui officia deserunt mollit anim id est laborum
          consectetur adipiscing elit ut perspiciatis unde omnis.
        </p>
      </div>
      <div className="flex-1 bg-gray-100 rounded flex items-start justify-start p-2 overflow-hidden">
        <p className="text-xs text-gray-500 leading-relaxed">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
          aut fugit sed quia consequuntur magni dolores eos.
        </p>
      </div>
    </>
  );

  return (
    <div className={styles.wrapper}>
      <div
        className="w-full max-w-5xl mx-auto px-2 sm:px-4"
        style={{ height: "62vh" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* DESKTOP — spread view */}
        {spreadIndex === 3 ? (
          /* Spread 4/5 — foto bovenaan over volledige breedte, tekst eronder */
          <CrossSpread
            leftContent={spread45LeftContent}
            rightContent={spread45RightContent}
            metaLeft={currentMeta.left}
            metaRight={currentMeta.right}
          />
        ) : (
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
        )}

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
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-full border bg-white shadow text-lg disabled:opacity-30"
          onClick={prevPage}
          disabled={mobilePageIndex === 0}
          aria-label="Vorige pagina"
        >
          ‹
        </button>

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

        <span className="md:hidden text-xs text-gray-500">
          {mobilePageIndex + 1} / {totalPages + 1}
        </span>

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
