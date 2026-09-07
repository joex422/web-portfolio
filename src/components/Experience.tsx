import Image from "next/image";
import { Accordion } from "./Accordion";
import { Reveal } from "./Reveal";
import { Timeline, TimelineMarker } from "./Timeline";
import { ExperienceBody } from "./ExperienceBody";
import { experience } from "@/data/resume";

export function Experience() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h2 className="mb-10 text-2xl font-semibold tracking-tight">
          Work Experience
        </h2>
      </Reveal>

      <Timeline count={experience.length}>
        {experience.map((job, i) => (
          <div key={`${job.company}-${job.role}`} className="relative">
            <TimelineMarker index={i} />
            <Accordion
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
              <ExperienceBody
                context={job.context}
                tags={job.tags}
                bullets={job.bullets}
              />
            </Accordion>
          </div>
        ))}
      </Timeline>
    </section>
  );
}
