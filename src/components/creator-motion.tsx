"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";

// Keep the server and first hydrated render identical, then read the user's preference.
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotionPreference(onChange: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
export function useMotionPreference() {
  return useSyncExternalStore(
    subscribeMotionPreference,
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );
}

const fadeElements = {
  div: motion.create("div"),
  section: motion.create("section"),
  h1: motion.create("h1"),
  h2: motion.create("h2"),
  p: motion.create("p"),
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: "div" | "section" | "h1" | "h2" | "p";
}) {
  const reduced = useMotionPreference();
  const Element = fadeElements[as];
  return (
    <Element
      className={className}
      initial={{
        opacity: reduced ? 1 : 0,
        x: reduced ? 0 : x,
        y: reduced ? 0 : y,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        delay: reduced ? 0 : delay,
        duration: reduced ? 0 : duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </Element>
  );
}

export function Magnet({
  children,
  className,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
}: {
  children: ReactNode;
  className?: string;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const element = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();
  useEffect(() => {
    if (
      reduced ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    let frame = 0;
    const reset = () => {
      if (!element.current) return;
      element.current.style.transition = inactiveTransition;
      element.current.style.transform = "translate3d(0, 0, 0)";
    };
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!wrapper.current || !element.current) return;
        const rect = wrapper.current.getBoundingClientRect();
        const active =
          event.clientX >= rect.left - padding &&
          event.clientX <= rect.right + padding &&
          event.clientY >= rect.top - padding &&
          event.clientY <= rect.bottom + padding;
        if (!active) return reset();
        element.current.style.transition = activeTransition;
        element.current.style.transform = `translate3d(${(event.clientX - rect.left - rect.width / 2) / Math.max(strength, 1)}px, ${(event.clientY - rect.top - rect.height / 2) / Math.max(strength, 1)}px, 0)`;
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [padding, strength, activeTransition, inactiveTransition, reduced]);
  return (
    <div ref={wrapper} className={className}>
      <div ref={element} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}

function Character({
  character,
  progress,
  index,
  total,
}: {
  character: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0.2, 1],
  );
  return (
    <span className="relative inline-block">
      <span className="invisible">{character}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {character}
      </motion.span>
    </span>
  );
}

export function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const paragraph = useRef<HTMLParagraphElement>(null);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: paragraph,
    offset: ["start 0.8", "end 0.2"],
  });
  let position = 0;
  return (
    <p
      ref={paragraph}
      className={`relative ${className ?? ""}`}
      aria-label={reduced ? undefined : text}
    >
      {reduced
        ? text
        : text.split(" ").map((word, wordIndex) => {
            const start = position;
            position += word.length + 1;
            return (
              <span key={wordIndex} aria-hidden="true">
                <span className="inline-block whitespace-nowrap">
                  {[...word].map((character, index) => (
                    <Character
                      key={index}
                      character={character}
                      progress={scrollYProgress}
                      index={start + index}
                      total={text.length}
                    />
                  ))}
                </span>{" "}
              </span>
            );
          })}
    </p>
  );
}
