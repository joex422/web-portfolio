import { selfDirected } from "@/data/resume";
import { Reveal } from "./Reveal";

export function SelfDirected() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h2 className="mb-10 text-2xl font-semibold tracking-tight">
          Platform Engineering — Self-Directed
        </h2>

        <div className="border-t border-foreground/10 pt-8">
          <ul className="list-disc space-y-4 pl-5 marker:text-foreground/30">
            {selfDirected.bullets.map((bullet, i) => (
              <li key={i} className="text-[15px] leading-relaxed text-foreground/80">
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
