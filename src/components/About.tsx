import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Target, Lightbulb, Rocket, Download, ExternalLink } from "lucide-react";
import workspace from "@/assets/workspace.jpg";

const About = () => {
  const achievements = [
    {
      icon: GraduationCap,
      title: "BCA Student",
      description: "First-year Bachelor of Computer Applications student with exceptional programming skills",
      highlight: "Academic Excellence"
    },
    {
      icon: Lightbulb,
      title: "eBook Author",
      description: "Published comprehensive Python programming guides covering 100+ essential topics",
      highlight: "100+ Topics Covered"
    },
    {
      icon: Target,
      title: "Tech Blogger",
      description: "Running Urban Jiva platform with content spanning 50+ programming languages",
      highlight: "50+ Languages"
    },
    {
      icon: Rocket,
      title: "Innovation Focus",
      description: "Building AI chatbots, EdTech platforms, and automation solutions for global impact",
      highlight: "Future Tech Leader"
    }
  ];

  const values = [
    "Creative Problem Solving",
    "Continuous Learning",
    "Knowledge Sharing",
    "Innovation & Automation",
    "Global Impact",
    "Educational Excellence"
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">About Sarthak</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate programmer and future tech entrepreneur dedicated to creating innovative solutions
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image and Stats */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={workspace} 
                alt="Sarthak's Workspace"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 grid grid-cols-2 gap-4">
              <Card className="card-hover p-4 text-center">
                <div className="text-2xl font-bold gradient-text">100+</div>
                <div className="text-sm text-muted-foreground">Topics Covered</div>
              </Card>
              <Card className="card-hover p-4 text-center">
                <div className="text-2xl font-bold gradient-text">50+</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </Card>
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Turning Ideas Into Reality
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                As a first-year BCA student with an exceptional passion for programming, I specialize in 
                Python development, AI automation, and creating educational content that bridges the gap 
                between complex concepts and practical applications.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My journey includes authoring comprehensive Python eBooks, running the Urban Jiva blogging 
                platform, and developing innovative projects in AI, EdTech, and automation. Every project 
                reflects my commitment to blending design, performance, and innovation.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Core Values</h4>
              <div className="flex flex-wrap gap-2">
                {values.map((value, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-muted/10 text-foreground border border-accent/20"
                  >
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button variant="hero" className="group">
                <Download className="mr-2 group-hover:scale-110 transition-transform" />
                Download CV
              </Button>
              <Button variant="glow" className="group">
                <ExternalLink className="mr-2 group-hover:rotate-12 transition-transform" />
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
        
        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <Card 
              key={index} 
              className="card-hover p-6 text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-secondary group-hover:scale-110 transition-transform">
                  <achievement.icon className="h-6 w-6 text-background" />
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-foreground mb-2">
                {achievement.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                {achievement.description}
              </p>
              
              <Badge 
                variant="secondary" 
                className="bg-accent/10 text-accent border border-accent/20"
              >
                {achievement.highlight}
              </Badge>
            </Card>
          ))}
        </div>
        
        {/* Vision Statement */}
        <Card className="card-hover p-8 mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">My Vision</span>
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              "To become a creative tech leader who automates businesses, inspires others through education, 
              and creates software solutions that make a global impact. Through continuous learning and 
              innovation, I aim to bridge the gap between cutting-edge technology and practical solutions 
              that empower individuals and organizations worldwide."
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default About;