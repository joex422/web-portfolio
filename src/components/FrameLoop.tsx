"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Continuously looping (not scroll-tied) playback of a pre-extracted frame
 * sequence — reuses the same WebP frames as ScrollScrubber, but ping-pongs
 * 0 -> last -> 0 on a timer instead of mapping to scroll position. Built for
 * decorative background placement where there's no scroll range to bind to
 * (e.g. sitting behind the hero's fixed-height content).
 */
export function FrameLoop({
  framesDir,
  frameCount,
  fps = 18,
  className = "",
}: {
  framesDir: string;
  frameCount: number;
  fps?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const images: HTMLImageElement[] = new Array(frameCount);
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = `${framesDir}/frame-${String(i + 1).padStart(3, "0")}.webp`;
      images[i] = img;
    }
    imagesRef.current = images;

    let cancelled = false;
    const done = () => {
      if (!cancelled) setReady(true);
    };
    images[0].decode().then(done, done);
    return () => {
      cancelled = true;
    };
  }, [framesDir, frameCount]);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const decoded = (i: number) => {
      const img = imagesRef.current[i];
      return img && img.complete && img.naturalWidth > 0 ? img : null;
    };

    const draw = (index: number) => {
      const img = decoded(index);
      if (!img) return;
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };

    // ping-pong across [0, frameCount-1] so the loop has no jump-cut seam
    const span = frameCount * 2 - 2;
    let rafId = 0;
    let start = 0;
    let paused = false;

    const tick = (now: number) => {
      if (!start) start = now;
      if (!paused) {
        const elapsedFrames = Math.floor(((now - start) / 1000) * fps);
        const pos = elapsedFrames % span;
        const index = pos < frameCount ? pos : span - pos;
        draw(index);
      }
      rafId = requestAnimationFrame(tick);
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      draw(0);
    } else {
      rafId = requestAnimationFrame(tick);
    }

    const onVisibility = () => {
      paused = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ready, frameCount, fps]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
