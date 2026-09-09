"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { FrameLoop } from "./FrameLoop";

/**
 * Hero background: the same two Flow-generated wireframe illustrations used
 * elsewhere on the page (network-forming, cluster-assembling), reused here
 * as faded, continuously-looping layers rather than scroll-scrubbed —
 * there's no scroll range behind the hero's fixed-height content to bind to,
 * so FrameLoop ping-pongs them on a timer instead.
 *
 * Kept faint (low opacity, no accent colour) so the page background stays
 * plain per the Vercel-taste direction and the two illustrations read as
 * texture, not competing content, behind the name.
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

  const leftX = useTransform(sx, (v) => v * -18);
  const leftY = useTransform(sy, (v) => v * -10);
  const rightX = useTransform(sx, (v) => v * 18);
  const rightY = useTransform(sy, (v) => v * 10);
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

      {/* network-forming illustration — upper left, bleeding off-canvas */}
      <motion.div
        style={{ x: leftX, y: leftY }}
        className="absolute top-[-8%] left-[-14%] w-[46%] min-w-[420px] opacity-[0.16] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_40%,transparent_92%)]"
      >
        <FrameLoop
          framesDir="/frames/hero"
          frameCount={60}
          fps={16}
          className="h-auto w-full"
        />
      </motion.div>

      {/* cluster-assembling illustration — lower right, bleeding off-canvas */}
      <motion.div
        style={{ x: rightX, y: rightY }}
        className="absolute right-[-14%] bottom-[-14%] w-[46%] min-w-[420px] opacity-[0.16] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_40%,transparent_92%)]"
      >
        <FrameLoop
          framesDir="/frames/skills"
          frameCount={60}
          fps={16}
          className="h-auto w-full"
        />
      </motion.div>

      {/* fade the whole field into the page background at the bottom seam */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
