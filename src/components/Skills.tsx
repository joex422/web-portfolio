import { Pill } from "./Pill";
import { Accordion } from "./Accordion";
import { Reveal } from "./Reveal";
import { skillCategories } from "@/data/resume";

export function Skills() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">
          Core Technical Skills
        </h2>
        <p className="mb-10 text-sm text-foreground/50">
          Grouped by domain — expand a category for the full list.
        </p>
      </Reveal>

      <div className="flex flex-col">
        {skillCategories.map((category, i) => (
          <Accordion
            key={category.name}
            defaultOpen={i === 0}
            header={
              <h3 className="font-mono text-[13.5px] tracking-tight text-foreground uppercase">
                {category.name}
              </h3>
            }
          >
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
          </Accordion>
        ))}
      </div>
    </section>
  );
}
