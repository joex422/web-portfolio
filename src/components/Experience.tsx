import Image from "next/image";
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
              <div className="flex items-center gap-4">
                {job.logo && (
                  <div className="flex h-9 w-16 shrink-0 items-center justify-start sm:h-10 sm:w-20">
                    <Image
                      src={job.logo}
                      alt={`${job.company} logo`}
                      width={160}
                      height={80}
                      className="h-full w-full object-contain object-left"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {job.role} — {job.company}
                  </h3>
                  <span className="font-mono text-[13px] tracking-tight text-muted-foreground">
                    {job.dates}
                  </span>
                </div>
              </div>
            }
          >
            {job.context && (
              <p className="mb-4 text-sm text-foreground/60 italic">{job.context}</p>
            )}
            <ul className="list-disc space-y-2.5 pl-5 marker:text-foreground/30">
              {job.bullets.map((bullet, j) => (
                <li key={j} className="text-[15px] leading-relaxed text-foreground/80">
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
