"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

type TimelineCtx = { progress: MotionValue<number>; count: number };

const TimelineContext = createContext<TimelineCtx | null>(null);

/**
 * Vertical rail whose filled portion tracks scroll progress through its own
 * children. Markers sit on the rail and light up as the fill passes them.
 */
export function Timeline({ count, children }: { count: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Start filling once the section's top reaches ~80% down the viewport and
  // finish as its bottom clears ~35%, so the rail completes while the last
  // entry is still on screen rather than after it has scrolled past.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.35"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <TimelineContext.Provider value={{ progress, count }}>
      <div ref={ref} className="relative">
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-[5px] w-px bg-hairline"
        />
        <motion.div
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-foreground/70"
        />
        <div className="flex flex-col pl-9">{children}</div>
      </div>
    </TimelineContext.Provider>
  );
}

/** A single dot on the rail; fills in as the rail's progress reaches it. */
export function TimelineMarker({ index }: { index: number }) {
  const ctx = useContext(TimelineContext);
  const fallback = useSpring(0);
  const progress = ctx?.progress ?? fallback;
  // Space markers evenly along the rail, offset so the first activates shortly
  // after the fill starts rather than immediately.
  const threshold = ctx ? (index + 0.35) / ctx.count : 0;

  const scale = useTransform(progress, [threshold - 0.08, threshold], [1, 1.5]);
  const opacity = useTransform(progress, [threshold - 0.08, threshold], [0.25, 1]);

  return (
    <motion.span
      aria-hidden
      style={{ scale, opacity }}
      className="absolute top-8 -left-9 block h-[11px] w-[11px] rounded-full border-2 border-background bg-foreground"
    />
  );
}
