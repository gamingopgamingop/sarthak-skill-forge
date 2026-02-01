// @ts-nocheck
// @ts-ignore

import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Parallax } from 'react-scroll-parallax';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Code2, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const highlights = [
    {
      icon: Code2,
      title: "100+ Python Topics",
      description: "Comprehensive eBooks covering everything from basics to advanced concepts",
      link: "/projects"
    },
    {
      icon: BookOpen,
      title: "Urban Jiva Blog",
      description: "Writing about 50+ programming languages and tech innovations",
      link: "/blog"
    },
    {
      icon: Rocket,
      title: "AI & Automation",
      description: "Building intelligent systems and automation solutions",
      link: "/tech"
    }
  ];

  return (
    <main className="min-h-screen">
      <SEO />
      <Hero />
      
      {/* Quick Highlights Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div 
            className="text-center mb-16"
            data-aos="fade-up"
          >
            <Parallax speed={-5}>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">What I Do</span>
              </h2>
            </Parallax>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              From Python programming to AI automation, I create solutions that make a difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {highlights.map((highlight, index) => (
              <div
                key={highlight.title}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <Card className="card-hover p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent mr-4">
                      <highlight.icon className="h-6 w-6 text-background" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {highlight.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    {highlight.description}
                  </p>
                  
                  <Link to={highlight.link}>
                    <Button variant="outline" size="sm" className="group">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </Card>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div 
            className="text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border border-accent/20">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Ready to Start a Project?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Whether you need Python development, AI automation, or technical writing, 
                I'm here to help bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="tech" size="lg">
                    Get In Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button variant="outline" size="lg">
                    View My Work
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;