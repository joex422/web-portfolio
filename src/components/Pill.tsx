import Link from "next/link";
import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  href?: string;
  tone?: "outline" | "solid";
};

const base =
  "inline-flex items-center rounded-full px-4 py-1.5 font-mono text-[13px] tracking-tight whitespace-nowrap transition-all duration-150";

const tones = {
  outline:
    "border border-foreground/15 text-foreground/70 hover:-translate-y-0.5 hover:border-foreground/30 hover:text-foreground",
  solid: "bg-foreground text-background hover:-translate-y-0.5 hover:bg-foreground/85",
};

export function Pill({ children, href, tone = "outline" }: PillProps) {
  const className = `${base} ${tones[tone]}`;

  if (href) {
    const external =
      href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (external) {
      return (
        <a href={href} className={className} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return <span className={className}>{children}</span>;
}
