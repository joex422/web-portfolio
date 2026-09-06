import { Accordion } from "./Accordion";
import { Reveal } from "./Reveal";
import { experience } from "@/data/resume";

export function Experience() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h2 className="mb-10 text-2xl font-semibold tracking-tight">
          Work Experience
        </h2>
      </Reveal>

      <div className="flex flex-col">
        {experience.map((job, i) => (
          <Accordion
            key={`${job.company}-${job.role}`}
            defaultOpen={i === 0}
            header={
              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {job.role} — {job.company}
                </h3>
                <span className="font-mono text-[13px] tracking-tight text-muted-foreground">
                  {job.dates}
                </span>
              </div>
            }
          >
            {job.context && (
              <p className="mb-4 text-sm text-foreground/60 italic">{job.context}</p>
            )}
            <ul className="flex flex-col gap-2.5">
              {job.bullets.map((bullet, j) => (
                <li
                  key={j}
                  className="pl-4 text-[15px] leading-relaxed text-foreground/80 [text-indent:-1rem]"
                >
                  <span className="text-foreground/40">— </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </Accordion>
        ))}
      </div>
    </section>
  );
}
