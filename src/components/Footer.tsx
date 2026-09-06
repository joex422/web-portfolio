import { Pill } from "./Pill";
import { profile } from "@/data/resume";

export function Footer() {
  return (
    <footer className="surface-inverted mt-16 flex flex-col items-center gap-6 bg-background px-6 py-20 text-center text-foreground">
      <p className="max-w-md text-lg leading-relaxed text-foreground/80">
        Open to Platform / SRE roles in Singapore and remote.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Pill href={`mailto:${profile.email}`}>{profile.email}</Pill>
        <Pill href={profile.linkedin.href}>{profile.linkedin.label}</Pill>
        <Pill href={profile.github.href}>{profile.github.label}</Pill>
      </div>

      <p className="font-mono text-[12px] tracking-tight text-foreground/40">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
