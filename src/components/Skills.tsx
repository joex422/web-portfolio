import { Pill } from "./Pill";
import { skillCategories } from "@/data/resume";

export function Skills() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-10 text-2xl font-semibold tracking-tight">
        Core Technical Skills
      </h2>

      <div className="flex flex-col gap-8">
        {skillCategories.map((category) => (
          <div
            key={category.name}
            className="border-t border-foreground/10 pt-6"
          >
            <h3 className="mb-4 font-mono text-[13.5px] tracking-tight text-muted-foreground uppercase">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
