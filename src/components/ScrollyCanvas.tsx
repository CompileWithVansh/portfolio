"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, MotionValue } from "framer-motion";

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
}

const FRAME_COUNT = 120;

// Phase 1: keyframes spread evenly across the full animation (~every 12 frames)
const KEYFRAMES = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 119];

export default function ScrollyCanvas({ scrollYProgress }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // Track current scroll frame so phase 2 can prioritize nearby frames
  const currentFrameRef = useRef(0);

  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    if (img.width === 0 || img.height === 0) return;

    const { width, height } = canvas;
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawWidth = width, drawHeight = height, offsetX = 0, offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const updateCanvasSizeAndDraw = (img: HTMLImageElement | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    canvas.width = rect.width;
    canvas.height = rect.height;
    if (img && img.complete) drawFrame(img);
  };

  const loadImage = (index: number, isCancelled: () => boolean) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      // Already loaded — skip
      if (imagesRef.current[index]) {
        resolve(imagesRef.current[index] as HTMLImageElement);
        return;
      }
      const img = new Image();
      const frameNum = index.toString().padStart(3, "0");
      img.src = `/sequence/frame_${frameNum}_delay-0.041s.png`;
      img.onload = () => {
        if (!isCancelled()) imagesRef.current[index] = img;
        resolve(img);
      };
      img.onerror = reject;
    });
  };

  useEffect(() => {
    let cancelled = false;
    const isCancelled = () => cancelled;

    if (imagesRef.current.length === 0) {
      imagesRef.current = new Array(FRAME_COUNT).fill(null);
    }

    const run = async () => {
      try {
        // --- Phase 1: load frame 0 immediately, show it ---
        const firstFrame = await loadImage(0, isCancelled);
        if (cancelled) return;
        updateCanvasSizeAndDraw(firstFrame);
        setIsLoaded(true);

        // --- Phase 1 continued: load remaining keyframes in parallel ---
        await Promise.all(
          KEYFRAMES.slice(1).map((i) => loadImage(i, isCancelled).catch(() => {}))
        );
        if (cancelled) return;

        // --- Phase 2: fill gaps outward from current scroll position ---
        // Build list of all unloaded frames sorted by distance from current frame
        const remaining = Array.from({ length: FRAME_COUNT }, (_, i) => i)
          .filter((i) => !imagesRef.current[i]);

        remaining.sort(
          (a, b) =>
            Math.abs(a - currentFrameRef.current) -
            Math.abs(b - currentFrameRef.current)
        );

        for (const i of remaining) {
          if (cancelled) break;
          await loadImage(i, isCancelled).catch(() => {});
        }
      } catch (err) {
        console.error("Failed to load initial frame", err);
      }
    };

    run();
    return () => { cancelled = true; };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(latest * FRAME_COUNT));
    currentFrameRef.current = frameIndex;

    // Walk backwards to find nearest loaded frame
    let targetImage: HTMLImageElement | null = null;
    for (let i = frameIndex; i >= 0; i--) {
      if (imagesRef.current[i]) {
        targetImage = imagesRef.current[i] as HTMLImageElement;
        break;
      }
    }

    if (targetImage && targetImage.complete && targetImage.naturalHeight !== 0) {
      requestAnimationFrame(() => drawFrame(targetImage as HTMLImageElement));
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (!isLoaded) return;
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(scrollYProgress.get() * FRAME_COUNT));
      let targetImage: HTMLImageElement | null = null;
      for (let i = frameIndex; i >= 0; i--) {
        if (imagesRef.current[i]) { targetImage = imagesRef.current[i] as HTMLImageElement; break; }
      }
      updateCanvasSizeAndDraw(targetImage);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, scrollYProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full object-cover"
    />
  );
}
