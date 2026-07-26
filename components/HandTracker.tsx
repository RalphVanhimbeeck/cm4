"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Singleton: de Hands WASM-module wordt maar één keer per sessie
// aangemaakt, ongeacht hoe vaak HandTracker mount/unmount (bv. bij
// React Strict Mode of bij het in/uit fullscreen gaan). Dat voorkomt
// de "Module.arguments has been replaced..." fout door dubbele init.
let sharedHandsPromise: Promise<any> | null = null;
function getSharedHands() {
  if (!sharedHandsPromise) {
    sharedHandsPromise = (async () => {
      const { Hands } = await import("@mediapipe/hands");
      const hands = new Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });
      hands.setOptions({
        maxNumHands:            1,
        modelComplexity:        1,
        minDetectionConfidence: 0.72,
        minTrackingConfidence:  0.55,
      });
      return hands;
    })();
  }
  return sharedHandsPromise;
}

const HAND_CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4],
  [0,5],[5,6],[6,7],[7,8],
  [5,9],[9,10],[10,11],[11,12],
  [9,13],[13,14],[14,15],[15,16],
  [13,17],[17,18],[18,19],[19,20],
  [0,17],
];

const dist2D = (a: any, b: any) => Math.hypot(a.x - b.x, a.y - b.y);

type FlipDirection = "LEFT" | "RIGHT" | null;

interface Props {
  onFlip?: (direction: "LEFT" | "RIGHT") => void;
  showOverlay?: boolean;
}

// ─── Thresholds ───────────────────────────────────────────────────────────────
const SWIPE_THRESHOLD  = 0.12;  // 12% van schermbreedtte
const SWIPE_VELOCITY   = 0.006; // minimale snelheid om tracking te starten
const GESTURE_COOLDOWN = 800;   // ms tussen flips
const TRAIL_LENGTH     = 24;    // aantal trail-punten

// Vingertip landmarks
const FINGER_TIPS = [8, 12, 16, 20];   // wijs, middel, ring, pink
const FINGER_MCPS = [5,  9, 13, 17];   // bijhorende knokkels

export default function HandTracker({ onFlip, showOverlay = true }: Props) {
  const videoRef  = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const trailRef        = useRef<{ x: number; y: number }[]>([]);
  const swipeStartXRef  = useRef<number | null>(null);
  const lastFlipTimeRef = useRef<number>(0);
  const prevTrackXRef   = useRef<number | null>(null);

  // ── Hoeveel vingers zijn uitgestrekt? ─────────────────────────────────────
  const extendedFingers = (lm: any): number[] => {
    return FINGER_TIPS.reduce<number[]>((acc, tip, i) => {
      const mcp = FINGER_MCPS[i];
      if (dist2D(lm[tip], lm[0]) > dist2D(lm[mcp], lm[0])) acc.push(tip);
      return acc;
    }, []);
  };

  /**
   * Tracking punt:
   * - 1 vinger uitgestrekt → tip van die vinger (meest nauwkeurig)
   * - meerdere vingers → gemiddelde van alle uitgestrekte tips
   * - geen vinger uitgestrekt (vuist) → palm (landmark 0)
   */
  const getTrackingPoint = (lm: any): { x: number; y: number } => {
    const tips = extendedFingers(lm);
    if (tips.length === 0) return { x: lm[0].x, y: lm[0].y };
    const avgX = tips.reduce((s, t) => s + lm[t].x, 0) / tips.length;
    const avgY = tips.reduce((s, t) => s + lm[t].y, 0) / tips.length;
    return { x: avgX, y: avgY };
  };

  // ── Flip triggeren ────────────────────────────────────────────────────────
  const tryFlip = useCallback((dir: FlipDirection) => {
    if (!dir) return;
    const now = Date.now();
    if (now - lastFlipTimeRef.current < GESTURE_COOLDOWN) return;
    lastFlipTimeRef.current = now;
    onFlip?.(dir);
  }, [onFlip]);

  // ── MediaPipe results ────────────────────────────────────────────────────
  const handleResults = useCallback((results: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    ctx.save();
    ctx.clearRect(0, 0, W, H);

    if (!results.multiHandLandmarks?.length) {
      swipeStartXRef.current = null;
      prevTrackXRef.current  = null;
      trailRef.current       = [];
      ctx.restore();
      return;
    }

    results.multiHandLandmarks.forEach((lm: any) => {
      const tips    = extendedFingers(lm);
      const track   = getTrackingPoint(lm);
      const trackX  = track.x;
      const trackY  = track.y;
      const isSingle = tips.length === 1; // één vinger → pijl-modus

      // ── Skeleton tekenen ───────────────────────────────────────────────
      if (showOverlay) {
        drawSkeleton(ctx, lm, W, H, tips);
      }

      // ── Trail bijhouden ────────────────────────────────────────────────
      const trail = trailRef.current;
      trail.push({ x: trackX, y: trackY });
      if (trail.length > TRAIL_LENGTH) trail.shift();

      // ── Swipe detectie op basis van tracking punt ──────────────────────
      const prevX = prevTrackXRef.current;

      if (prevX !== null) {
        const velocity = trackX - prevX; // positief = rechts, negatief = links

        // Start swipe tracking zodra er genoeg beweging is
        if (swipeStartXRef.current === null && Math.abs(velocity) > SWIPE_VELOCITY) {
          swipeStartXRef.current = trackX;
        }

        // Voltooi swipe zodra drempel gehaald is
        if (swipeStartXRef.current !== null) {
          const delta = trackX - swipeStartXRef.current;
          if (Math.abs(delta) >= SWIPE_THRESHOLD) {
            // RECHTS = vooruit, LINKS = terug
            const dir: FlipDirection = delta > 0 ? "RIGHT" : "LEFT";
            tryFlip(dir);
            swipeStartXRef.current = null;
          }
        }
      }

      prevTrackXRef.current = trackX;

      // ── Overlay tekenen ────────────────────────────────────────────────
      if (showOverlay) {
        if (isSingle) {
          // Eén vinger → teken pijl op de vingertip
          drawFingerArrow(ctx, lm, tips[0], trail, W, H);
        } else {
          // Meerdere vingers / open hand → trail
          if (trail.length > 2) drawTrail(ctx, trail, W, H);
        }

        // Richting label tijdens actieve swipe
        if (swipeStartXRef.current !== null && prevX !== null) {
          const delta = trackX - swipeStartXRef.current;
          const progress = Math.min(Math.abs(delta) / SWIPE_THRESHOLD, 1);
          drawDirectionHint(ctx, delta > 0 ? "RIGHT" : "LEFT", progress, W, H);
        }
      }
    });

    ctx.restore();
  }, [onFlip, showOverlay, tryFlip]);

  // ── Draw: hand skeleton ──────────────────────────────────────────────────
  const drawSkeleton = (
    ctx: CanvasRenderingContext2D,
    lm: any,
    W: number,
    H: number,
    tips: number[]
  ) => {
    const isOpen = tips.length >= 3;
    const color  = isOpen ? "rgba(80,210,130,0.85)" : "rgba(255,90,90,0.85)";

    ctx.strokeStyle = color;
    ctx.lineWidth   = 2;
    HAND_CONNECTIONS.forEach(([s, e]) => {
      ctx.beginPath();
      ctx.moveTo(lm[s].x * W, lm[s].y * H);
      ctx.lineTo(lm[e].x * W, lm[e].y * H);
      ctx.stroke();
    });
    ctx.fillStyle = color;
    lm.forEach((p: any) => {
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Uitgestrekte tips groter accentueren
    ctx.fillStyle = "white";
    tips.forEach(t => {
      ctx.beginPath();
      ctx.arc(lm[t].x * W, lm[t].y * H, 7, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // ── Draw: pijl op één vinger ─────────────────────────────────────────────
  const drawFingerArrow = (
    ctx: CanvasRenderingContext2D,
    lm: any,
    tipIdx: number,
    trail: { x: number; y: number }[],
    W: number,
    H: number
  ) => {
    const tip = lm[tipIdx];
    const tx  = tip.x * W;
    const ty  = tip.y * H;

    // Bepaal bewegingsrichting uit trail
    let angle = 0;
    if (trail.length >= 4) {
      const recent = trail.slice(-4);
      const dx = recent[recent.length - 1].x - recent[0].x;
      const dy = recent[recent.length - 1].y - recent[0].y;
      if (Math.abs(dx) > 0.005 || Math.abs(dy) > 0.005) {
        angle = Math.atan2(dy * H, dx * W);
      }
    }

    const arrowLen  = 36;
    const headSize  = 14;

    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(angle);

    // Schacht
    ctx.strokeStyle = "rgba(255, 220, 50, 0.95)";
    ctx.lineWidth   = 3;
    ctx.lineCap     = "round";
    ctx.beginPath();
    ctx.moveTo(-arrowLen, 0);
    ctx.lineTo(arrowLen, 0);
    ctx.stroke();

    // Pijlpunt
    ctx.fillStyle = "rgba(255, 220, 50, 0.95)";
    ctx.beginPath();
    ctx.moveTo(arrowLen + headSize, 0);
    ctx.lineTo(arrowLen - headSize * 0.6, -headSize * 0.7);
    ctx.lineTo(arrowLen - headSize * 0.6,  headSize * 0.7);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // Trek ook de trail
    if (trail.length > 2) drawTrail(ctx, trail, W, H);
  };

  // ── Draw: bewegingstrail ─────────────────────────────────────────────────
  const drawTrail = (
    ctx: CanvasRenderingContext2D,
    trail: { x: number; y: number }[],
    W: number,
    H: number
  ) => {
    ctx.lineWidth   = 4;
    ctx.strokeStyle = "rgba(255, 220, 50, 0.6)";
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
    ctx.beginPath();
    trail.forEach((p, i) => {
      i === 0 ? ctx.moveTo(p.x * W, p.y * H) : ctx.lineTo(p.x * W, p.y * H);
    });
    ctx.stroke();
  };

  // ── Draw: voortgangsindicator tijdens swipe ───────────────────────────────
  const drawDirectionHint = (
    ctx: CanvasRenderingContext2D,
    dir: "LEFT" | "RIGHT",
    progress: number, // 0 → 1
    W: number,
    H: number
  ) => {
    const emoji  = dir === "RIGHT" ? "→" : "←";
    const alpha  = 0.3 + progress * 0.7;
    const size   = 40 + progress * 30;

    ctx.globalAlpha = alpha;
    ctx.fillStyle   = "white";
    ctx.font        = `bold ${size}px sans-serif`;
    ctx.textAlign   = "center";
    ctx.fillText(emoji, W / 2, H / 2);
    ctx.globalAlpha = 1;
    ctx.textAlign   = "left";
  };

  // ── MediaPipe init ────────────────────────────────────────────────────────
  useEffect(() => {
    let camera: any;
    let cancelled = false;

    const init = async () => {
      const hands = await getSharedHands();
      if (cancelled) return;

      hands.onResults(handleResults);

      const { Camera } = await import("@mediapipe/camera_utils");
      if (cancelled) return;

      camera = new Camera(videoRef.current!, {
        onFrame: async () => {
          if (cancelled) return;
          const video = videoRef.current;
          if (!video || video.readyState < 2) return; // nog geen frame beschikbaar
          await hands.send({ image: video });
        },
      });

      await camera.start();
    };

    init();
    return () => {
      cancelled = true;
      camera?.stop?.();
      // Stop expliciet de MediaStream-tracks, anders blijft het
      // webcam-lampje soms aan staan ondanks camera.stop().
      const stream = videoRef.current?.srcObject as MediaStream | undefined;
      stream?.getTracks().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [handleResults]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <video
        ref={videoRef}
        playsInline muted autoPlay
        style={{ position: "fixed", top: "-9999px", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      {showOverlay && (
        <canvas
          ref={canvasRef}
          style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", pointerEvents: "none" }}
        />
      )}
    </div>
  );
}
