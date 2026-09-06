import Image from "next/image";
import { techStack } from "@/data/resume";

export function TechStack() {
  const loop = [...techStack, ...techStack];

  return (
    <section className="py-16">
      <p className="mb-8 text-center font-mono text-[13px] tracking-tight text-muted-foreground">
        Tools &amp; platforms run in production
      </p>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />

        <div className="animate-marquee flex w-max gap-10">
          {loop.map((tech, i) => (
            <div
              key={`${tech.logo}-${i}`}
              className="flex flex-col items-center gap-2 transition-transform duration-200 hover:scale-110"
              title={tech.label}
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <Image
                  src={`/logos/${tech.logo}.svg`}
                  alt={tech.label}
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="whitespace-nowrap text-center font-mono text-[10.5px] leading-tight text-muted-foreground">
                {tech.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
