"use client";

import { useState, useRef, useCallback } from "react";
import HandTracker from "./HandTracker";

// ─── Demo pages – replace with your real magazine images/content ──────────────
const PAGES = [
  {
    title: "Spring Collection",
    subtitle: "2025 Editorial",
    bg: "#1a1a2e",
    accent: "#e94560",
    body: "Colour, form, and movement — reimagined for a new season.",
    image: null,
  },
  {
    title: "The Art of Light",
    subtitle: "Photography",
    bg: "#0f3460",
    accent: "#ffd460",
    body: "Golden hour captured across five continents. A visual journey.",
    image: null,
  },
  {
    title: "Architecture",
    subtitle: "Modern Structures",
    bg: "#16213e",
    accent: "#0f9b8e",
    body: "Where brutalism meets poetry. Buildings that breathe.",
    image: null,
  },
  {
    title: "Fashion Week",
    subtitle: "Highlights 2025",
    bg: "#2d132c",
    accent: "#ee4540",
    body: "Runway moments that redefined contemporary style.",
    image: null,
  },
  {
    title: "Culture",
    subtitle: "Music & Identity",
    bg: "#1b262c",
    accent: "#bbe1fa",
    body: "The artists shaping sound — and conversation — this year.",
    image: null,
  },
];

// ─── Flip state machine ────────────────────────────────────────────────────────
type FlipDir  = "LEFT" | "RIGHT";
type Phase    = "idle" | "flipping";

const FLIP_DURATION = 650; // ms

export default function MagazineViewer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipDir,     setFlipDir]     = useState<FlipDir | null>(null);
  const [phase,       setPhase]       = useState<Phase>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalPages = PAGES.length;

  // ── Handle flip gesture ─────────────────────────────────────────────────────
  const handleFlip = useCallback((dir: FlipDir) => {
    if (phase !== "idle") return;

    // Bounds check
    if (dir === "RIGHT" && currentPage >= totalPages - 1) return;
    if (dir === "LEFT"  && currentPage <= 0)              return;

    setFlipDir(dir);
    setPhase("flipping");

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrentPage(p => dir === "RIGHT" ? p + 1 : p - 1);
      setPhase("idle");
      setFlipDir(null);
    }, FLIP_DURATION);
  }, [phase, currentPage, totalPages]);

  const page    = PAGES[currentPage];
  const nextIdx = flipDir === "RIGHT"
    ? Math.min(currentPage + 1, totalPages - 1)
    : Math.max(currentPage - 1, 0);
  const nextPage = PAGES[nextIdx];

  // ── Derive CSS transform for 3D flip ────────────────────────────────────────
  // Book opens from the RIGHT edge (right-to-left flip) or LEFT edge (left-to-right flip).
  const isFlipping = phase === "flipping";

  const flipStyles: React.CSSProperties = isFlipping
    ? {
        transform: flipDir === "RIGHT"
          ? "perspective(1400px) rotateY(-180deg)"
          : "perspective(1400px) rotateY(180deg)",
        transformOrigin: flipDir === "RIGHT" ? "left center" : "right center",
        transition: `transform ${FLIP_DURATION}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
        backfaceVisibility: "hidden",
      }
    : {
        transform: "perspective(1400px) rotateY(0deg)",
        backfaceVisibility: "hidden",
      };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111",
        fontFamily: "'Georgia', serif",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ── Book container ───────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "min(90vw, 700px)",
          aspectRatio: "3/4",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
          borderRadius: "4px 12px 12px 4px",
        }}
      >
        {/* ── Back page (revealed during flip) ────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            overflow: "hidden",
          }}
        >
          <PageFace page={nextPage} />
        </div>

        {/* ── Front page (flips away) ──────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            overflow: "hidden",
            ...flipStyles,
          }}
        >
          <PageFace page={page} />

          {/* Page spine shadow during flip */}
          {isFlipping && (
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                ...(flipDir === "RIGHT"
                  ? { left: 0, width: "30px",
                      background: "linear-gradient(to right, rgba(0,0,0,0.5), transparent)" }
                  : { right: 0, width: "30px",
                      background: "linear-gradient(to left, rgba(0,0,0,0.5), transparent)" }),
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* ── Book spine ──────────────────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "14px",
            background: "rgba(0,0,0,0.45)",
            zIndex: 10,
            borderRadius: "4px 0 0 4px",
          }}
        />

        {/* ── Page number ─────────────────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            bottom: "18px",
            right: "22px",
            color: "rgba(255,255,255,0.5)",
            fontSize: "12px",
            letterSpacing: "0.1em",
            zIndex: 20,
          }}
        >
          {currentPage + 1} / {totalPages}
        </div>
      </div>

      {/* ── Gesture hint HUD ────────────────────────────────────────────────────── */}
      <GestureHint currentPage={currentPage} totalPages={totalPages} />

      {/* ── Hand tracker (invisible) ─────────────────────────────────────────── */}
      <HandTracker onFlip={handleFlip} showOverlay={true} />
    </div>
  );
}

// ─── Single magazine page face ────────────────────────────────────────────────
function PageFace({ page }: { page: (typeof PAGES)[0] }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: page.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "40px 36px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Top graphic area */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 70% 30%, ${page.accent}22 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "8%",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          border: `2px solid ${page.accent}55`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "5%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          border: `1px solid ${page.accent}22`,
        }}
      />

      {/* Accent bar */}
      <div
        style={{
          width: "48px",
          height: "3px",
          background: page.accent,
          marginBottom: "18px",
          borderRadius: "2px",
        }}
      />

      {/* Subtitle */}
      <p
        style={{
          color: page.accent,
          fontSize: "11px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          margin: "0 0 10px",
          fontFamily: "'Helvetica Neue', sans-serif",
        }}
      >
        {page.subtitle}
      </p>

      {/* Title */}
      <h1
        style={{
          color: "#fff",
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 700,
          margin: "0 0 16px",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
        }}
      >
        {page.title}
      </h1>

      {/* Body */}
      <p
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "14px",
          lineHeight: 1.6,
          margin: 0,
          maxWidth: "80%",
          fontFamily: "'Helvetica Neue', sans-serif",
        }}
      >
        {page.body}
      </p>
    </div>
  );
}

// ─── Gesture hint overlay ─────────────────────────────────────────────────────
function GestureHint({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "28px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "20px",
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      {currentPage > 0 && (
        <Hint icon="👈" label="Swipe right / Point left" />
      )}
      {currentPage < totalPages - 1 && (
        <Hint icon="👉" label="Swipe left / Point right" />
      )}
    </div>
  );
}

function Hint({ icon, label }: { icon: string; label: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "24px",
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "rgba(255,255,255,0.7)",
        fontSize: "13px",
        fontFamily: "'Helvetica Neue', sans-serif",
      }}
    >
      <span style={{ fontSize: "18px" }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}
