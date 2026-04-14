"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, MotionValue } from "framer-motion";

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
}

const FRAME_COUNT = 90;

export default function ScrollyCanvas({ scrollYProgress }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === FRAME_COUNT) {
        imagesRef.current = loadedImages;
        setIsLoaded(true);
        // Draw the first frame initially
        if (canvasRef.current && loadedImages[0]) {
          drawFrame(loadedImages[0]);
        }
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(2, "0");
      img.src = `/sequence/frame_${frameNum}_delay-0.067s.png`;
      
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // Fail gracefully
      
      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (img.width === 0 || img.height === 0) return; // Skip broken images

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

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (imagesRef.current.length !== FRAME_COUNT) return;
    
    // Map scroll progress (0 to 1) to frame index (0 to length - 1)
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );
    
    const targetImage = imagesRef.current[frameIndex];
    if (targetImage && targetImage.complete && targetImage.naturalHeight !== 0) {
      requestAnimationFrame(() => drawFrame(targetImage));
    }
  });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && isLoaded) {
        // Set actual canvas size to match visual size for high DPI
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        
        // Redraw current frame
        const currentProgress = scrollYProgress.get();
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(currentProgress * FRAME_COUNT)
        );
        const targetImage = imagesRef.current[frameIndex];
        if (targetImage && targetImage.complete && targetImage.naturalHeight !== 0) {
          drawFrame(targetImage);
        }
      }
    };

    handleResize(); // Initial setup
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
