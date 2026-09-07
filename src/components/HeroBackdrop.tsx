"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

/**
 * Animated objects behind the hero: drifting colour orbs, two concentric
 * orbit rings, and a dot grid. Everything is decorative (aria-hidden) and
 * pointer-events-none so it never intercepts clicks on the pills beneath.
 *
 * Interactive bit: the whole field parallaxes against the cursor. Motion
 * values are used rather than React state so the movement never re-renders
 * the hero on mousemove.
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  // Layers move by different amounts, which is what reads as depth.
  const orbX = useTransform(sx, (v) => v * 26);
  const orbY = useTransform(sy, (v) => v * 26);
  const ringX = useTransform(sx, (v) => v * -14);
  const ringY = useTransform(sy, (v) => v * -14);
  const gridX = useTransform(sx, (v) => v * 8);
  const gridY = useTransform(sy, (v) => v * 8);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // -0.5..0.5 relative to the backdrop's own box
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* dot grid — faintest layer, masked to fade out at the edges */}
      <motion.div
        style={{ x: gridX, y: gridY }}
        className="absolute inset-[-10%] opacity-[0.35] [mask-image:radial-gradient(ellipse_55%_50%_at_50%_40%,#000_20%,transparent_75%)]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(17,17,17,0.14) 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
      </motion.div>

      {/* orbit rings */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="animate-spin-slow h-[560px] w-[560px] rounded-full border border-accent/25 sm:h-[720px] sm:w-[720px]">
          <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-deep/70" />
        </div>
        <div className="animate-spin-slower absolute top-1/2 left-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20 sm:h-[500px] sm:w-[500px]">
          <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/80" />
        </div>
      </motion.div>

      {/* colour orbs — heavy blur keeps them as atmosphere, not shapes */}
      <motion.div style={{ x: orbX, y: orbY }} className="absolute inset-0">
        <div className="animate-drift-a absolute top-[6%] left-[12%] h-[380px] w-[380px] rounded-full bg-accent/40 blur-[110px]" />
        <div className="animate-drift-b absolute top-[24%] right-[8%] h-[440px] w-[440px] rounded-full bg-accent-soft/70 blur-[120px]" />
        <div className="animate-drift-c absolute bottom-[2%] left-[38%] h-[320px] w-[320px] rounded-full bg-accent-deep/25 blur-[100px]" />
      </motion.div>

      {/* fade the whole field into the page background at the bottom seam */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
