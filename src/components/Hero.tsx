"use client";

import { motion } from "motion/react";
import { Pill } from "./Pill";
import { Terminal } from "./Terminal";
import { profile } from "@/data/resume";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="flex flex-col items-center gap-8 px-6 pt-28 pb-24 text-center sm:pt-36 sm:pb-32"
    >
      <motion.h1
        variants={item}
        className="max-w-5xl text-[clamp(3rem,11vw,8.5rem)] leading-[0.95] font-bold tracking-tight"
      >
        {profile.name}
      </motion.h1>

      <motion.p
        variants={item}
        className="font-mono text-[13.5px] tracking-tight text-muted-foreground uppercase"
      >
        {profile.role} — {profile.focus.join(" · ")}
      </motion.p>

      <motion.p variants={item} className="font-mono text-[13.5px] tracking-tight text-muted-foreground">
        {profile.location}
      </motion.p>

      <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3">
        <Pill href={`mailto:${profile.email}`}>{profile.email}</Pill>
        <Pill href={`tel:${profile.phone.replace(/\s+/g, "")}`}>{profile.phone}</Pill>
        <Pill href={profile.whatsapp.href}>{profile.whatsapp.label}</Pill>
        <Pill href={profile.linkedin.href}>{profile.linkedin.label}</Pill>
        <Pill href={profile.github.href}>{profile.github.label}</Pill>
        <Pill href={profile.site.href}>{profile.site.label}</Pill>
      </motion.div>

      <motion.div variants={item}>
        <Pill href={profile.resumeHref} tone="solid">
          Download Résumé (PDF)
        </Pill>
      </motion.div>

      <motion.div variants={item} className="mt-6 w-full max-w-2xl">
        <Terminal />
      </motion.div>
    </motion.section>
  );
}
