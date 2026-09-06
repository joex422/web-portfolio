"use client";

import { useEffect, useRef, useState } from "react";

type ScrollScrubberProps = {
  framesDir: string;
  frameCount: number;
  aspectRatio: string;
  className?: string;
};

export function ScrollScrubber({
  framesDir,
  frameCount,
  aspectRatio,
  className = "",
}: ScrollScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(frameCount);
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = `${framesDir}/frame-${String(i + 1).padStart(3, "0")}.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount && !cancelled) setImagesLoaded(true);
      };
      images[i] = img;
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, [framesDir, frameCount]);

  useEffect(() => {
    if (!imagesLoaded) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };

    let rafId = 0;
    const update = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = vh + rect.height;
      const traveled = vh - rect.top;
      const progress = Math.min(1, Math.max(0, traveled / total));
      const frameIndex = Math.min(frameCount - 1, Math.floor(progress * frameCount));
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        draw(frameIndex);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [imagesLoaded, frameCount]);

  return (
    <div
      ref={containerRef}
      className={`w-full bg-background ${className}`}
      style={{ aspectRatio }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
