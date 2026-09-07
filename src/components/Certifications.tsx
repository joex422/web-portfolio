import { certifications, education } from "@/data/resume";
import { Reveal } from "./Reveal";

export function Certifications() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h2 className="mb-10 text-2xl font-medium tracking-[-0.04em]">
          Certifications &amp; Education
        </h2>

        <div className="flex flex-col gap-6 border-t border-hairline pt-8">
          {certifications.map((cert) => {
            const content = (
              <>
                <div>
                  <p className="font-medium underline-offset-4 group-hover:underline">
                    {cert.name}
                  </p>
                  <p className="text-sm text-foreground/60">
                    {cert.issuer}
                    {cert.id ? ` · ID ${cert.id}` : ""}
                  </p>
                </div>
                <span className="flex items-center gap-2 font-mono text-[13px] tracking-tight text-muted-foreground">
                  {cert.certificateHref && (
                    <span className="text-foreground/40 transition-colors group-hover:text-foreground">
                      ↓ PDF
                    </span>
                  )}
                  {cert.date}
                </span>
              </>
            );

            return cert.certificateHref ? (
              <a
                key={cert.name}
                href={cert.certificateHref}
                download
                className="group flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
              >
                {content}
              </a>
            ) : (
              <div
                key={cert.name}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
              >
                {content}
              </div>
            );
          })}

          {education.map((edu) => (
            <div
              key={edu.name}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
            >
              <div>
                <p className="font-medium">{edu.name}</p>
                <p className="text-sm text-foreground/60">{edu.school}</p>
              </div>
              <span className="font-mono text-[13px] tracking-tight text-muted-foreground">
                {edu.dates}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
