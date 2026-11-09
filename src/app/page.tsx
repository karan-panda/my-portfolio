import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { SelectedWork } from "@/components/projects/SelectedWork";
import { Capabilities } from "@/components/capabilities/Capabilities";
import { Experience } from "@/components/experience/Experience";
import { Impact } from "@/components/metrics/Impact";
import { Recognition } from "@/components/recognition/Recognition";
import { Contact } from "@/components/contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SelectedWork />
      <Capabilities />
      <Experience />
      <Impact />
      <Recognition />
      <Contact />
    </>
  );
}
