// @ts-ignore
// @ts-nocheck

import Hero from "../components/Hero";
import Skills from "../components/Skills";
import TechShowcase from "../components/TechShowcase";
import InteractiveElements from "../components/InteractiveElements";
import Projects from "../components/Projects";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Skills />
      <TechShowcase />
      <InteractiveElements />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
