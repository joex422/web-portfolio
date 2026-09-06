import { Pill } from "./Pill";
import { profile } from "@/data/resume";

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-8 px-6 pt-28 pb-24 text-center sm:pt-36 sm:pb-32">
      <h1 className="max-w-5xl text-[clamp(3rem,11vw,8.5rem)] leading-[0.95] font-bold tracking-tight">
        {profile.name}
      </h1>

      <p className="font-mono text-[13.5px] tracking-tight text-muted-foreground uppercase">
        {profile.role} — {profile.focus.join(" · ")}
      </p>

      <p className="font-mono text-[13.5px] tracking-tight text-muted-foreground">
        {profile.location}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Pill href={`mailto:${profile.email}`}>{profile.email}</Pill>
        <Pill href={`tel:${profile.phone.replace(/\s+/g, "")}`}>{profile.phone}</Pill>
        <Pill href={profile.linkedin.href}>{profile.linkedin.label}</Pill>
        <Pill href={profile.github.href}>{profile.github.label}</Pill>
        <Pill href={profile.site.href}>{profile.site.label}</Pill>
      </div>

      <Pill href={profile.resumeHref} tone="solid">
        Download Résumé (PDF)
      </Pill>
    </section>
  );
}
