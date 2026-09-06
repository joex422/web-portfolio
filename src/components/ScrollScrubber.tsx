"use client";

import { useEffect, useRef, useState } from "react";

type ScrollScrubberProps = {
  framesDir: string;
  frameCount: number;
  aspectRatio: string;
  className?: string;
};

const framePath = (dir: string, i: number) =>
  `${dir}/frame-${String(i + 1).padStart(3, "0")}.webp`;

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
  // Set once the first frame is decodable, so we can paint something immediately
  // instead of waiting on the whole sequence.
  const [ready, setReady] = useState(false);
  // Only start fetching when the element is near the viewport — the Skills
  // scrubber sits far below the fold and shouldn't compete with initial load.
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setShouldLoad(true));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const images: HTMLImageElement[] = new Array(frameCount);
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = framePath(framesDir, i);
      images[i] = img;
    }
    imagesRef.current = images;

    // Gate only on the first frame. Later frames pop in as they arrive; the
    // draw loop falls back to the nearest already-decoded frame meanwhile, so
    // a single failed request can never leave the canvas permanently blank.
    // decode() always resolves asynchronously, including for an already-cached
    // image, so this never sets state synchronously during the effect.
    let cancelled = false;
    const done = () => {
      if (!cancelled) setReady(true);
    };
    images[0].decode().then(done, done);
    return () => {
      cancelled = true;
    };
  }, [shouldLoad, framesDir, frameCount]);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const decoded = (i: number) => {
      const img = imagesRef.current[i];
      return img && img.complete && img.naturalWidth > 0 ? img : null;
    };

    // Walk backwards to the most recent frame that has actually decoded, so
    // scrubbing ahead of the download stays on the last good frame rather
    // than blanking out.
    const nearestDecoded = (i: number) => {
      for (let j = i; j >= 0; j--) {
        const img = decoded(j);
        if (img) return img;
      }
      return decoded(0);
    };

    const draw = (index: number) => {
      const img = nearestDecoded(index);
      if (!img) return;
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
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / total));
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

    // Force an initial paint even if the scroll position hasn't changed.
    currentFrameRef.current = -1;
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [ready, frameCount]);

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
