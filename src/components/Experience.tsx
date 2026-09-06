import { experience } from "@/data/resume";

export function Experience() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-10 text-2xl font-semibold tracking-tight">
        Work Experience
      </h2>

      <div className="flex flex-col gap-14">
        {experience.map((job) => (
          <div key={`${job.company}-${job.role}`} className="border-t border-foreground/10 pt-8">
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold tracking-tight">
                {job.role} — {job.company}
              </h3>
              <span className="font-mono text-[13px] tracking-tight text-muted-foreground">
                {job.dates}
              </span>
            </div>

            {job.context && (
              <p className="mb-4 text-sm text-foreground/60 italic">{job.context}</p>
            )}

            <ul className="flex flex-col gap-2.5">
              {job.bullets.map((bullet, i) => (
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
        ))}
      </div>
    </section>
  );
}
