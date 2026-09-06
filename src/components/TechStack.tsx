"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { techStack } from "@/data/resume";

export function TechStack() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="mb-8 text-center font-mono text-[13px] tracking-tight text-muted-foreground">
        Tools &amp; platforms run in production
      </p>

      <motion.div
        className="grid grid-cols-4 gap-x-6 gap-y-8 sm:grid-cols-6 md:grid-cols-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.03 } },
        }}
      >
        {techStack.map((tech) => (
          <motion.div
            key={tech.logo}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 },
            }}
            className="group flex flex-col items-center gap-2"
            title={tech.label}
          >
            <div className="flex h-10 w-10 items-center justify-center grayscale opacity-50 transition-all duration-200 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0">
              <Image
                src={`/logos/${tech.logo}.svg`}
                alt={tech.label}
                width={40}
                height={40}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-center font-mono text-[10.5px] leading-tight text-muted-foreground">
              {tech.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
