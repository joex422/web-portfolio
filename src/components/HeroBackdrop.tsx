"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

/**
 * Animated objects behind the hero: two concentric orbit rings and a dot
 * grid. Kept neutral (no accent colour) so the hero background stays plain
 * per the Vercel-taste direction — accent pink is reserved for pills, tags,
 * and the terminal, not painted across the page.
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

  const ringX = useTransform(sx, (v) => v * -14);
  const ringY = useTransform(sy, (v) => v * -14);
  const gridX = useTransform(sx, (v) => v * 8);
  const gridY = useTransform(sy, (v) => v * 8);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
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

      {/* orbit rings — neutral, no accent color */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="animate-spin-slow h-[560px] w-[560px] rounded-full border border-foreground/10 sm:h-[720px] sm:w-[720px]">
          <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/30" />
        </div>
        <div className="animate-spin-slower absolute top-1/2 left-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/[0.08] sm:h-[500px] sm:w-[500px]">
          <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-foreground/25" />
        </div>
      </motion.div>

      {/* fade the whole field into the page background at the bottom seam */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
