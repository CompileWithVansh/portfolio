"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, MotionValue } from "framer-motion";

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
}

const FRAME_COUNT = 90;

export default function ScrollyCanvas({ scrollYProgress }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Core drawing logic - responsive "cover" calculations
  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // alpha: false improves rendering performance massively
    if (!ctx) return;

    if (img.width === 0 || img.height === 0) return;

    const { width, height } = canvas;
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    // Let the canvas map 1:1 natively without aggressive software filters
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const updateCanvasSizeAndDraw = (img: HTMLImageElement | null) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      
      if (rect.width === 0 || rect.height === 0) return;

      // DO NOT multiply by devicePixelRatio for raster PNGs. 
      // The Canvas 2D API's internal software upscale filter is heavily muddy/blurry.
      // By mapping 1:1 with CSS, the browser GPU uses high-fidelity bicubic scaling.
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      if (img && img.complete) {
        drawFrame(img);
      }
    }
  };

  // Preload images progressively
  useEffect(() => {
    let isCancelled = false;

    if (imagesRef.current.length === 0) {
      imagesRef.current = new Array(FRAME_COUNT).fill(null);
    }

    const loadImage = (index: number) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        const frameNum = index.toString().padStart(2, "0");
        img.src = `/sequence/frame_${frameNum}_delay-0.067s.png`;
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
          }
          resolve(img);
        };
        img.onerror = reject;
      });
    };

    const loadProgressively = async () => {
      try {
        const firstFrame = await loadImage(0);
        if (isCancelled) return;
        
        updateCanvasSizeAndDraw(firstFrame);
        setIsLoaded(true);

        for (let i = 1; i < FRAME_COUNT; i++) {
          if (isCancelled) break;
          await loadImage(i).catch(() => {});
        }
      } catch (err) {
        console.error("Failed to load initial frame", err);
      }
    };

    loadProgressively();

    return () => {
      isCancelled = true;
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );
    
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

  // Handle window resizing to keep it constantly responsive
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        const currentProgress = scrollYProgress.get();
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(currentProgress * FRAME_COUNT)
        );
        
        let targetImage: HTMLImageElement | null = null;
        for (let i = frameIndex; i >= 0; i--) {
          if (imagesRef.current[i]) {
            targetImage = imagesRef.current[i] as HTMLImageElement;
            break;
          }
        }
        updateCanvasSizeAndDraw(targetImage);
      }
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
