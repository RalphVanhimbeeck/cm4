"use client";

import { useEffect, useRef } from "react";

const HAND_CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4],
  [0,5],[5,6],[6,7],[7,8],
  [5,9],[9,10],[10,11],[11,12],
  [9,13],[13,14],[14,15],[15,16],
  [13,17],[17,18],[18,19],[19,20],
  [0,17]
];

export default function HandTracker() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 🧠 scroll tracking
  const prevYRef = useRef<number | null>(null);
  const velocityRef = useRef<number>(0);

  useEffect(() => {
    let camera: any;
    let hands: any;
    let animationFrame: any;

    const init = async () => {
      const { Hands } = await import("@mediapipe/hands");
      const { Camera } = await import("@mediapipe/camera_utils");

      hands = new Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });

      hands.onResults(onResults);

      camera = new Camera(videoRef.current!, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current! });
        },
      });

      camera.start();

      startSmoothScroll();
    };

    const onResults = (results: any) => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;

      ctx.save();
      ctx.clearRect(0, 0, width, height);

      if (results.multiHandLandmarks) {
        results.multiHandLandmarks.forEach((landmarks: any) => {
          drawHand(ctx, landmarks, width, height);
          updateScroll(landmarks);
        });
      } else {
        // no hand → slow stop
        velocityRef.current *= 0.9;
      }

      ctx.restore();
    };

    // 🎯 SCROLL CONTROL
    const updateScroll = (landmarks: any) => {
      const palm = landmarks[0];
      const currentY = palm.y;

      if (prevYRef.current === null) {
        prevYRef.current = currentY;
        return;
      }

      const deltaY = currentY - prevYRef.current;

      // ignore tiny jitter
      if (Math.abs(deltaY) < 0.003) return;

      // invert so natural: hand down = scroll down
      const scrollForce = deltaY * 2000;

      // smooth acceleration
      velocityRef.current += scrollForce;

      prevYRef.current = currentY;
    };

    // 🌊 SMOOTH SCROLL LOOP (like inertia)
    const startSmoothScroll = () => {
      const loop = () => {
        // apply friction
        velocityRef.current *= 0.92;

        // clamp max speed
        velocityRef.current = Math.max(
          -50,
          Math.min(50, velocityRef.current)
        );

        // apply scroll
        if (Math.abs(velocityRef.current) > 0.1) {
          window.scrollBy(0, velocityRef.current);
        }

        animationFrame = requestAnimationFrame(loop);
      };

      loop();
    };

    const drawHand = (
      ctx: CanvasRenderingContext2D,
      landmarks: any,
      width: number,
      height: number
    ) => {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;

      HAND_CONNECTIONS.forEach(([start, end]) => {
        const p1 = landmarks[start];
        const p2 = landmarks[end];

        ctx.beginPath();
        ctx.moveTo(p1.x * width, p1.y * height);
        ctx.lineTo(p2.x * width, p2.y * height);
        ctx.stroke();
      });

      ctx.fillStyle = "red";

      landmarks.forEach((point: any) => {
        ctx.beginPath();
        ctx.arc(point.x * width, point.y * height, 6, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    init();

    return () => {
      if (camera) camera.stop();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
      }}
    >
      {/* hidden camera */}
      <video
        ref={videoRef}
        playsInline
        muted
        autoPlay
        style={{
          position: "fixed",
          top: "-10000px",
          left: "-10000px",
          width: 1,
          height: 1,
          opacity: 0,
        }}
      />

      {/* overlay */}
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}