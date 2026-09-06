import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { SelfDirected } from "@/components/SelfDirected";
import { Certifications } from "@/components/Certifications";
import { Footer } from "@/components/Footer";
import { ScrollScrubber } from "@/components/ScrollScrubber";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <section className="mx-auto max-w-2xl px-6 py-8">
        <ScrollScrubber framesDir="/frames/hero" frameCount={60} aspectRatio="16/9" />
      </section>
      <TechStack />
      <Skills />
      <Experience />
      <SelfDirected />
      <Certifications />
      <Footer />
    </main>
  );
}
