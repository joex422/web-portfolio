import { selfDirected } from "@/data/resume";

export function SelfDirected() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-10 text-2xl font-semibold tracking-tight">
        Platform Engineering — Self-Directed
      </h2>

      <div className="border-t border-foreground/10 pt-8">
        <ul className="flex flex-col gap-4">
          {selfDirected.bullets.map((bullet, i) => (
            <li
              key={i}
              className="pl-4 text-[15px] leading-relaxed text-foreground/80 [text-indent:-1rem]"
            >
              <span className="text-foreground/40">— </span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
