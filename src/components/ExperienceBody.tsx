"use client";

import { motion } from "motion/react";

/**
 * Body of a single Work Experience entry. Split out as a client component so
 * the bullets can stagger in each time the accordion opens — the parent
 * Experience section stays a server component.
 */
export function ExperienceBody({
  context,
  tags,
  bullets,
}: {
  context?: string;
  tags?: string[];
  bullets: string[];
}) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
      }}
    >
      {context && (
        <motion.p
          variants={fade}
          className="mb-4 text-sm text-foreground/60 italic"
        >
          {context}
        </motion.p>
      )}

      {tags && tags.length > 0 && (
        <motion.div variants={fade} className="mb-5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-accent/30 bg-accent/5 px-2.5 py-1 font-mono text-[11px] tracking-tight text-foreground/70 transition-colors duration-150 hover:border-accent hover:bg-accent/15 hover:text-foreground"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      )}

      <ul className="flex flex-col gap-0.5">
        {bullets.map((bullet, i) => (
          <motion.li
            key={i}
            variants={fade}
            className="group relative flex gap-3 rounded-lg px-2 py-1.5 text-[15px] leading-relaxed text-foreground/80 transition-colors duration-150 hover:bg-accent/[0.06] hover:text-foreground"
          >
            {/* marker doubles as the hover affordance */}
            <span
              aria-hidden
              className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/25 transition-all duration-150 group-hover:scale-125 group-hover:bg-accent"
            />
            <span>{bullet}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" as const } },
};
