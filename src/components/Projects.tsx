import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, BookOpen, Globe, Bot, Code } from "lucide-react";
import pythonEbook from "@/assets/python-ebook.jpg";
import aiAutomation from "@/assets/ai-automation.jpg";
import workspace from "@/assets/workspace.jpg";

const Projects = () => {
  const projects = [
    {
      title: "Python Programming eBooks",
      description: "Comprehensive collection of Python programming eBooks covering 100+ topics from beginner to professional level. Includes OOP, advanced algorithms, security, databases, and modern frameworks.",
      image: pythonEbook,
      tags: ["Python", "Education", "Technical Writing", "Programming"],
      icon: BookOpen,
      stats: "100+ Topics Covered",
      gradient: "from-primary to-secondary"
    },
    {
      title: "Urban Jiva Blog Platform",
      description: "A comprehensive blogging platform featuring content across 50+ programming languages, tech trends, and digital innovation. Sharing knowledge while exploring new technologies.",
      image: workspace,
      tags: ["Web Development", "Content Platform", "Tech Trends", "Innovation"],
      icon: Globe,
      stats: "50+ Programming Languages",
      gradient: "from-secondary to-accent"
    },
    {
      title: "AI & Automation Projects",
      description: "Collection of AI chatbots, EdTech platforms, freelancing solutions, and smart gadgets. Focused on creating intelligent systems that automate businesses and improve user experiences.",
      image: aiAutomation,
      tags: ["AI", "Automation", "Chatbots", "EdTech", "Smart Gadgets"],
      icon: Bot,
      stats: "Multiple AI Solutions",
      gradient: "from-accent to-primary"
    }
  ];

  const additionalProjects = [
    {
      title: "EdTech Platform",
      description: "Educational technology platform designed to make learning programming accessible and interactive.",
      tags: ["Education", "React", "Python", "Database"],
      icon: Code
    },
    {
      title: "Freelancing Platform",
      description: "Modern freelancing platform connecting skilled developers with businesses worldwide.",
      tags: ["Web App", "Full Stack", "Business", "Platform"],
      icon: Globe
    },
    {
      title: "Game Development",
      description: "Creative game development projects showcasing technical skills and creative problem-solving.",
      tags: ["Game Dev", "Creative", "Python", "Innovation"],
      icon: Code
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of innovative projects spanning education, AI, automation, and web development
          </p>
        </div>
        
        {/* Main Projects */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="card-hover group overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="absolute top-4 left-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${project.gradient}`}>
                    <project.icon className="h-5 w-5 text-background" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge variant="secondary" className="bg-background/80 text-foreground">
                    {project.stats}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="secondary" 
                      className="bg-muted/10 text-foreground border border-accent/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button variant="tech" size="sm" className="flex-1">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Project
                  </Button>
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Additional Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {additionalProjects.map((project, index) => (
            <Card 
              key={index} 
              className="card-hover p-6"
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-accent to-primary mr-3">
                  <project.icon className="h-5 w-5 text-background" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {project.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-4 text-sm">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <Badge 
                    key={tagIndex} 
                    variant="secondary" 
                    className="bg-muted/10 text-foreground border border-accent/20 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;