import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, BookOpen, Bot, Briefcase, Palette, Database } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Programming & Development",
      description: "Expert in Python with deep knowledge of modern frameworks and tools",
      skills: ["Python", "Django", "Flask", "FastAPI", "Web Development", "OOP", "Advanced Algorithms"],
      color: "from-primary to-primary-glow"
    },
    {
      icon: Database,
      title: "Databases & Backend",
      description: "Comprehensive experience with SQL and NoSQL databases",
      skills: ["PostgreSQL", "SQL", "NoSQL", "Database Design", "Backend Architecture", "API Development"],
      color: "from-secondary to-accent"
    },
    {
      icon: Bot,
      title: "AI & Automation",
      description: "Building intelligent systems and automation solutions",
      skills: ["AI Chatbots", "Machine Learning", "Automation", "Smart Gadgets", "Tech Innovation"],
      color: "from-accent to-secondary"
    },
    {
      icon: BookOpen,
      title: "Technical Writing",
      description: "Author of comprehensive Python programming eBooks",
      skills: ["Technical Documentation", "eBook Writing", "Content Creation", "Educational Materials"],
      color: "from-primary to-accent"
    },
    {
      icon: Palette,
      title: "Project Development",
      description: "Full-stack development across various domains",
      skills: ["EdTech Platforms", "Freelancing Platforms", "Game Development", "Web Applications"],
      color: "from-secondary to-primary"
    },
    {
      icon: Briefcase,
      title: "Entrepreneurship",
      description: "Building tech products and leading innovation",
      skills: ["Business Strategy", "Product Development", "Leadership", "Innovation", "Global Impact"],
      color: "from-accent to-primary-glow"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive skill set spanning programming, AI, writing, and entrepreneurship
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="card-hover group p-6 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} mr-4`}>
                    <category.icon className="h-6 w-6 text-background" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary" 
                      className="bg-muted/10 text-foreground border border-accent/20 hover:bg-accent/10 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;