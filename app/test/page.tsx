"use client";

import { useState } from "react";
import Flipbook from "@/components/Flipbook";
import HandTracker from "@/components/HandTracker";

export default function BookWithGestures() {
  const [gesture, setGesture] = useState<string | null>(null);

  return (
    <>
      <HandTracker  />
      <Flipbook />
    </>
  );
}