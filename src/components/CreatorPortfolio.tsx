"use client";

/* eslint-disable @next/next/no-img-element -- Native image elements retain the supplied animated GIFs and support the external reference artwork. */

import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Download,
  Code2,
  Link2,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  certifications,
  education,
  experience,
  profile,
  selfDirected,
  skillCategories,
  techStack,
} from "@/data/resume";
import {
  creatorAssets,
  marqueeImages,
  projects,
  services,
} from "@/data/creator-data";
import { AnimatedText, FadeIn, useMotionPreference } from "./creator-motion";

import { InteractiveAvatar } from "./InteractiveAvatar";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";

export function ContactButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={`mailto:${profile.email}`}
      className={`contact-button neo-button inline-flex items-center justify-center gap-3 rounded-full px-8 py-3 text-xs font-medium tracking-widest uppercase transition-transform duration-200 hover:-translate-y-1 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
    >
      Contact Me
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}

export function LiveProjectButton({
  href,
  label = "Live Project",
}: {
  href: string;
  label?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="neo-button inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-hairline px-5 py-3 text-xs font-medium tracking-widest text-foreground uppercase transition-colors hover:bg-surface sm:px-8 sm:text-sm lg:px-10 lg:py-3.5 lg:text-base"
    >
      {label}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}

function PortfolioHeader() {
  return (
    <header className="portfolio-header">
      <div className="portfolio-nav neo-raised">
        <BrandLogo />
        <nav aria-label="Main navigation" className="nav-links neo-inset">
          {[
            ["About", "about"],
            ["Expertise", "services"],
            ["Projects", "projects"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="top" className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-panel neo-raised">
        <div className="hero-copy">
          <FadeIn delay={0} y={20}>
            <div className="hero-eyebrow">
              <span className="status-dot" /> Platform & site reliability
              engineer
            </div>
          </FadeIn>
          <FadeIn delay={0.1} y={25}>
            <h1 id="hero-heading" className="hero-title">
              Hi, i&apos;m
              <br />
              <span className="hero-heading">Zaw Wana.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} y={20}>
            <p className="hero-description">
              I build the platforms
              <br className="hidden sm:block" /> that keep things running.
            </p>
            <p className="hero-note">
              Resilient systems. Thoughtful automation.
              <br />
              An engineer who cares about the details.
            </p>
          </FadeIn>
          <FadeIn delay={0.3} y={20}>
            <div className="hero-actions">
              <ContactButton />
              <a
                className="neo-button resume-button"
                href={profile.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={16} /> Résumé
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.4} y={15}>
            <div className="hero-location">
              <MapPin size={14} aria-hidden="true" />
              {profile.location}
              <span className="location-divider" /> CKA certified
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.35} y={30} className="hero-visual">
          <div className="avatar-orbit neo-inset">
            <div className="hero-portrait">
              <InteractiveAvatar
                src={creatorAssets.portrait}
                closedSrc={creatorAssets.portraitBlink}
              />
            </div>
          </div>
          <div className="avatar-caption neo-raised">
            <span className="status-dot" /> Human behind the infrastructure
          </div>
          <span className="hero-orbit-label">BUILD. OPERATE. IMPROVE.</span>
        </FadeIn>
        <a
          href="#about"
          className="hero-scroll neo-button"
          aria-label="Scroll to about"
        >
          <ArrowDown size={18} />
        </a>
      </div>
      <div className="hero-footnote">
        <span>Built with care. Operated with intent.</span>
        <span>Singapore / {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const section = useRef<HTMLElement>(null);
  const first = useRef<HTMLDivElement>(null);
  const second = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();
  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    let sectionTop = 0;
    const update = () => {
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      [first.current, second.current].forEach((row, index) => {
        if (!row) return;
        // Five copies keep the shorter media collection filled on wide screens.
        const cycle = (row.scrollWidth + 12) / 5;
        const shift = (((offset - 200) % cycle) + cycle) % cycle;
        row.style.transform = `translate3d(${index === 0 ? -cycle + shift : -cycle - shift}px, 0, 0)`;
      });
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const measure = () => {
      sectionTop =
        (section.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
      schedule();
    };
    const observer = new ResizeObserver(measure);
    if (section.current) observer.observe(section.current);
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    };
  }, [reduced]);
  return (
    <section
      ref={section}
      aria-label="Homelab demos"
      className="overflow-hidden bg-background pt-24 pb-10 sm:pt-32 md:pt-40"
    >
      <div className="mb-7 flex items-center justify-between px-6 text-[10px] font-light tracking-[0.22em] text-muted-foreground uppercase md:px-10">
        <span>Platform engineering in action</span>
        <span>Homelab demos / 2026</span>
      </div>
      <div className="flex flex-col gap-3" aria-hidden="true">
        {[
          marqueeImages,
          [...marqueeImages.slice(2), ...marqueeImages.slice(0, 2)],
        ].map((row, index) => (
          <div
            key={index}
            ref={index === 0 ? first : second}
            className="flex w-max gap-3"
            style={{ willChange: reduced ? undefined : "transform" }}
          >
            {Array.from({ length: 5 }, () => row)
              .flat()
              .map((src, i) => (
                <div
                  key={`${i}-${src}`}
                  className="marquee-tile relative h-[270px] w-[420px] shrink-0 overflow-hidden rounded-2xl bg-[#18181b]"
                >
                  <img
                    src={
                      reduced
                        ? `/frames/hero/frame-${String(12 + (i % 35)).padStart(3, "0")}.webp`
                        : src
                    }
                    onError={(event) => {
                      const image = event.currentTarget;
                      if (!image.dataset.fallback) {
                        image.dataset.fallback = "true";
                        image.src = "/frames/hero/frame-031.webp";
                      }
                    }}
                    alt=""
                    width={420}
                    height={270}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  const about =
    "I'm Zaw Wana, a Certified Kubernetes Administrator and platform engineer based in Singapore. I build and operate Kubernetes platforms, automate infrastructure, and turn production incidents into more reliable systems. From enterprise AI infrastructure to my own homelab, I care about the details that keep things running. Let's build something resilient together.";
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="about-section section-space px-5 sm:px-8 md:px-10"
    >
      <div className="about-panel neo-inset relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <p className="section-kicker mb-5">01 / Behind the platform</p>
            <h2 id="about-heading" className="hero-heading section-heading">
              About me
            </h2>
          </FadeIn>
          <AnimatedText
            text={about}
            className="max-w-[680px] text-[clamp(1rem,2vw,1.35rem)] leading-relaxed font-medium text-foreground"
          />
        </div>
        <div className="mt-16 flex flex-col items-center gap-6 sm:mt-20 md:mt-24">
          <FadeIn>
            <ContactButton />
          </FadeIn>
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            <Download size={14} />
            Download résumé
          </a>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="services-section section-space px-5 text-foreground sm:px-8 md:px-10"
    >
      <FadeIn>
        <p className="section-kicker mb-4 text-center">02 / What I bring</p>
        <h2
          id="services-heading"
          className="section-heading mb-16 text-center sm:mb-20 md:mb-28"
        >
          Expertise
        </h2>
      </FadeIn>
      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <FadeIn key={service.name} delay={index * 0.1}>
            <div className="service-item neo-raised neo-lift grid grid-cols-[70px_1fr] items-center gap-5 border-t border-hairline py-8 sm:grid-cols-[140px_1fr] sm:gap-10 sm:py-10 md:grid-cols-[200px_1fr] md:gap-14 md:py-12">
              <span className="service-number text-[clamp(3rem,10vw,140px)] leading-none font-black tracking-tight">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-3 text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase">
                  {service.name}
                </h3>
                <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] leading-relaxed font-light text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

type Project = (typeof projects)[number];
function ProjectCard({
  project,
  index,
  progress,
  total,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const reduced = useMotionPreference();
  const scale = useTransform(
    progress,
    [index / total, 1],
    [1, 1 - (total - 1 - index) * 0.03],
  );
  return (
    <div className="project-stage sticky top-0 h-[85vh] min-h-[640px]">
      <motion.article
        style={{
          scale: reduced ? 1 : scale,
          top: `calc(var(--project-sticky-top) + ${index * 28}px)`,
        }}
        className="project-card neo-raised relative origin-top rounded-[40px] border border-hairline bg-background p-4 text-foreground sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="project-top mb-6 flex flex-wrap items-center gap-x-6 gap-y-4 md:mb-8 md:gap-x-10">
          <span className="text-[clamp(3rem,8vw,110px)] leading-none font-black tracking-tight">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[10px] font-light tracking-widest text-muted-foreground uppercase sm:text-xs">
              {project.category}
            </p>
            <h3 className="text-[clamp(1.3rem,3.4vw,3.4rem)] leading-tight font-medium tracking-tight uppercase">
              {project.name}
            </h3>
          </div>
          <LiveProjectButton href={project.href} label={project.linkLabel} />
        </div>
        <div className="project-image-grid grid grid-cols-[2fr_3fr] gap-3 sm:gap-4 md:gap-6">
          <div className="flex min-w-0 flex-col gap-3 sm:gap-4 md:gap-6">
            <img
              src={project.images[0]}
              alt={`${project.name} concept artwork, detail one`}
              loading="lazy"
              decoding="async"
              className="project-image h-[clamp(130px,16vw,230px)] w-full rounded-[40px] bg-[#191919] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
            <img
              src={project.images[1]}
              alt={`${project.name} concept artwork, detail two`}
              loading="lazy"
              decoding="async"
              className="project-image h-[clamp(160px,22vw,340px)] w-full rounded-[40px] bg-[#191919] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
          <img
            src={project.images[2]}
            alt={`${project.name} concept artwork, full view`}
            loading="lazy"
            decoding="async"
            className="project-image h-full min-h-0 w-full rounded-[40px] bg-[#191919] object-cover sm:rounded-[50px] md:rounded-[60px]"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[10px] tracking-wider text-muted-foreground uppercase sm:text-xs">
          <span>{project.tags.join(" / ")}</span>
          <span>Concept artwork</span>
        </div>
      </motion.article>
    </div>
  );
}

function ProjectsSection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="projects-section section-space relative z-10 bg-background px-5 sm:px-8 md:px-10"
    >
      <FadeIn>
        <p className="section-kicker mb-4 text-center">03 / Selected work</p>
        <h2
          id="projects-heading"
          className="hero-heading section-heading mb-6 text-center"
        >
          Projects
        </h2>
      </FadeIn>
      <p className="mb-16 text-center text-xs font-light tracking-[0.2em] text-muted-foreground uppercase sm:mb-20">
        Systems built. Lessons learned. Always evolving.
      </p>
      <div ref={container} className="relative mx-auto max-w-[1500px]">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            progress={scrollYProgress}
            total={projects.length}
          />
        ))}
      </div>
      <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
        {projects.map((project, index) => (
          <details
            key={project.name}
            className="project-details neo-raised neo-lift group rounded-2xl border border-hairline p-5 open:border-hairline"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm uppercase">
              <span>
                <span className="mr-3 text-muted-foreground">0{index + 1}</span>
                {project.name}
              </span>
              <ChevronDown
                size={16}
                className="shrink-0 transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-5 text-sm font-light text-muted-foreground">
              {project.description}
            </p>
            <ul className="mt-4 space-y-3">
              {project.details.map((detail) => (
                <li
                  key={detail}
                  className="border-t border-hairline pt-3 text-sm leading-relaxed font-light text-muted-foreground"
                >
                  {detail}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="px-5 py-20 sm:px-8 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2
              id="experience-heading"
              className="hero-heading text-[clamp(2.8rem,8vw,100px)] leading-none font-black tracking-tight uppercase"
            >
              Experience
            </h2>
            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              From software to systems
            </span>
          </div>
        </FadeIn>
        {experience.map((job, index) => (
          <FadeIn key={job.company} delay={index * 0.1}>
            <details
              className="experience-item neo-raised group border border-hairline p-6 sm:p-8"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 sm:gap-8">
                <span className="hidden text-sm text-muted-foreground sm:block">
                  0{index + 1}
                </span>
                {job.logo && (
                  <img
                    src={job.logo}
                    alt={job.company}
                    width={56}
                    height={56}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 rounded-xl bg-white p-2 object-contain"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg leading-tight font-medium uppercase sm:text-2xl">
                    {job.role}
                  </h3>
                  <p className="mt-2 text-xs font-light tracking-wide text-muted-foreground sm:text-sm">
                    {job.company} · {job.dates}
                  </p>
                </div>
                <ChevronDown
                  className="shrink-0 transition-transform group-open:rotate-180"
                  size={20}
                />
              </summary>
              <div className="pt-6 sm:pl-12">
                <p className="mb-5 text-sm leading-relaxed font-light text-muted-foreground">
                  {job.context}
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {job.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-hairline px-3 py-1 text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ul className="grid gap-4 md:grid-cols-2">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed font-light text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function CredentialsSection() {
  return (
    <section
      className="toolkit-section section-space px-5 sm:px-8 md:px-10"
      aria-labelledby="toolkit-heading"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <h2
            id="toolkit-heading"
            className="hero-heading mb-12 text-[clamp(2.8rem,8vw,100px)] leading-none font-black tracking-tight uppercase"
          >
            The toolkit
          </h2>
        </FadeIn>
        <div className="mb-12 flex flex-wrap gap-3 sm:gap-4">
          {techStack.map((tech) => (
            <span
              key={tech.logo}
              className="toolkit-chip neo-button flex items-center gap-3 rounded-full border border-hairline bg-background px-5 py-3 text-sm font-normal text-foreground sm:px-6 sm:py-3.5 sm:text-base"
            >
              <img
                src={`/logos/${tech.logo}.svg`}
                alt=""
                width={28}
                height={28}
                loading="lazy"
                className="toolkit-logo h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
              />
              {tech.label}
            </span>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {skillCategories.map((category) => (
            <details
              key={category.name}
              className="skill-category neo-inset group rounded-2xl p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium uppercase">
                {category.name}
                <ChevronDown
                  size={16}
                  className="transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="pt-4 text-sm leading-relaxed font-light text-muted-foreground">
                {category.items.join(" · ")}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-16 grid gap-8 border-t border-hairline pt-10 md:grid-cols-2">
          <div>
            <h3 className="mb-6 text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Certified & verified
            </h3>
            {certifications.map((certificate) => (
              <a
                key={certificate.id}
                href={certificate.certificateHref}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-card neo-raised neo-lift flex items-center gap-4 rounded-2xl border border-hairline p-5 transition-colors hover:border-accent sm:gap-5 sm:p-6"
              >
                {certificate.logoHref ? (
                  <img
                    src={certificate.logoHref}
                    alt="Certified Kubernetes Administrator logo"
                    width={1605}
                    height={1568}
                    loading="lazy"
                    className="certificate-mark h-18 w-18 shrink-0 object-contain sm:h-24 sm:w-24"
                  />
                ) : (
                  <ShieldCheck size={28} className="shrink-0 text-accent" />
                )}
                <div className="min-w-0">
                  <p className="text-lg leading-tight font-medium">
                    {certificate.name}
                  </p>
                  <p className="mt-2 text-xs font-light text-muted-foreground">
                    {certificate.issuer} · {certificate.date}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1 text-xs uppercase">
                    View certificate
                    <ArrowUpRight size={14} />
                  </p>
                </div>
              </a>
            ))}
          </div>
          <div>
            <h3 className="mb-6 text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Education
            </h3>
            {education.map((item) => (
              <div
                key={item.school}
                className="education-card neo-inset mb-6 rounded-2xl p-5"
              >
                <p className="text-lg leading-tight font-medium">{item.name}</p>
                <p className="mt-2 text-sm font-light text-muted-foreground">
                  {item.school}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.dates}
                </p>
              </div>
            ))}
          </div>
        </div>
        <details className="neo-inset group mt-12 rounded-2xl p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm uppercase">
            More from the homelab
            <ChevronDown
              size={16}
              className="transition-transform group-open:rotate-180"
            />
          </summary>
          <ul className="mt-5 space-y-4">
            {selfDirected.bullets.map((bullet) => (
              <li
                key={bullet}
                className="text-sm leading-relaxed font-light text-muted-foreground"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}

function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <footer
      id="contact"
      className="contact-section relative px-5 pt-16 pb-8 sm:px-8 md:px-10"
    >
      <div className="contact-panel neo-raised mx-auto max-w-[1300px]">
        <FadeIn>
          <p className="mb-6 text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Open to Platform / SRE roles in Singapore and remote
          </p>
          <h2 className="hero-heading text-[clamp(3.2rem,12vw,180px)] leading-[0.95] font-black tracking-tight uppercase">
            Let&apos;s build
            <br />
            something solid.
          </h2>
        </FadeIn>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <ContactButton />
          <a
            href={profile.resumeHref}
            className="neo-button inline-flex items-center gap-2 rounded-full border border-hairline px-7 py-3 text-xs tracking-widest uppercase transition-colors hover:border-hairline"
          >
            <Download size={16} />
            Résumé
          </a>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-hairline pt-7">
          <div className="email-controls flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="text-sm font-light text-muted-foreground transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
            <button
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email address"}
              className="neo-button rounded-full border border-hairline p-3 transition-colors hover:bg-surface"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
            <span role="status" className="text-xs text-muted-foreground">
              {copied
                ? "Copied!"
                : copyError
                  ? "Select the address to copy it."
                  : ""}
            </span>
          </div>
          <div className="flex flex-wrap gap-6 text-xs uppercase">
            {[
              { label: "GitHub", href: profile.github.href, icon: Code2 },
              { label: "LinkedIn", href: profile.linkedin.href, icon: Link2 },
              { label: "WhatsApp", href: profile.whatsapp.href, icon: Mail },
            ].map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
              >
                <Icon size={14} />
                {label}
                <ArrowUpRight size={12} />
              </a>
            ))}
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="text-muted-foreground hover:text-accent"
            >
              {profile.phone}
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-[10px] tracking-widest text-muted-foreground uppercase">
          <BrandLogo compact />
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a
            href="#hero-heading"
            className="transition-colors hover:text-foreground"
          >
            Back to top ↑
          </a>
          <a href="https://zawwana.com">zawwana.com</a>
        </div>
      </div>
    </footer>
  );
}

export function CreatorPortfolio() {
  return (
    <MotionConfig reducedMotion="user">
      <main
        id="root"
        className="min-h-screen bg-background text-foreground"
        style={{ overflowX: "clip" }}
      >
        <a href="#about" className="skip-link">
          Skip to content
        </a>
        <PortfolioHeader />
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ExperienceSection />
        <CredentialsSection />
        <ContactSection />
      </main>
    </MotionConfig>
  );
}
