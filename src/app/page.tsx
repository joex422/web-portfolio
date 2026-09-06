import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Summary } from "@/components/Summary";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { SelfDirected } from "@/components/SelfDirected";
import { Certifications } from "@/components/Certifications";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <TechStack />
      <Summary />
      <Skills />
      <Experience />
      <SelfDirected />
      <Certifications />
      <Footer />
    </main>
  );
}
