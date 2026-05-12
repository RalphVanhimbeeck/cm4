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

export default function HandTracker({
  onGesture,
}: {
  onGesture?: (gesture: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let camera: any;
    let hands: any;

    const init = async () => {
      const { Hands } = await import("@mediapipe/hands");
      const { Camera } = await import("@mediapipe/camera_utils");

      hands = new Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
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

      

      // 🖐️ HANDS + GESTURES
      if (results.multiHandLandmarks) {
        results.multiHandLandmarks.forEach((landmarks: any) => {
          drawHand(ctx, landmarks, width, height);

          
          const gesture = detectThumbDirection(landmarks);

// 🔥 SEND TO PARENT
if (onGesture) onGesture(gesture);

drawGestureLabel(ctx, gesture);


        });
      }

      ctx.restore();
    };

    // 👉 THUMB LEFT / RIGHT
    const detectThumbDirection = (landmarks: any) => {
      const thumbTip = landmarks[4];
      const thumbBase = landmarks[2];

      if (thumbTip.x < thumbBase.x) return "LEFT";
      if (thumbTip.x > thumbBase.x) return "RIGHT";
      return "CENTER";
    };

const drawGestureLabel = (
  ctx: CanvasRenderingContext2D,
  gesture: string
) => {
  let emoji = "✋";

  if (gesture === "LEFT") emoji = "👈";
  if (gesture === "RIGHT") emoji = "👉";

  ctx.fillStyle = "red";
  ctx.font = "bold 60px sans-serif";

  ctx.fillText(`${emoji} ${gesture}`, 20, 60);
};


    const drawHand = (
      ctx: CanvasRenderingContext2D,
      landmarks: any,
      width: number,
      height: number
    ) => {
      // 🔴 LINES
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

      // 🔴 DOTS
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
      {/* 🎥 hidden camera input (safe for MediaPipe) */}
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


      {/* 🌐 FULLSCREEN CANVAS */}
      <canvas
        ref={canvasRef}
        style={{
          width: "10vw",
          height: "10vh",
          display: "block",
        }}
      />
    </div>
  );
}