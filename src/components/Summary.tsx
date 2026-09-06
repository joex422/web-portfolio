import { profile } from "@/data/resume";

export function Summary() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="max-w-[65ch] text-lg leading-relaxed text-foreground/80">
        {profile.summary}
      </p>
    </section>
  );
}
