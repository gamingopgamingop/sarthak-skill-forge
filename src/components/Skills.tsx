// @ts-nocheck
// @ts-ignore

import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Code, BookOpen, Bot, Briefcase, Palette, Database, Globe, Wrench, GitBranch, Cpu } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      description: "Expert in Python with experience in modern programming languages",
      skills: ["Python", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3", "Bash/Shell"],
      color: "from-primary to-primary-glow"
    },
    {
      icon: Wrench,
      title: "Frameworks & Libraries",
      description: "Building robust applications with modern frameworks",
      skills: ["Django", "Flask", "FastAPI", "React", "Node.js", "Express", "NumPy", "Pandas", "TensorFlow"],
      color: "from-accent to-secondary"
    },
    {
      icon: Database,
      title: "Databases & Backend",
      description: "Comprehensive experience with SQL and NoSQL databases",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Database Design", "REST APIs", "GraphQL"],
      color: "from-secondary to-accent"
    },
    {
      icon: Bot,
      title: "AI & Machine Learning",
      description: "Building intelligent systems and automation solutions",
      skills: ["AI Chatbots", "Machine Learning", "Natural Language Processing", "Computer Vision", "Deep Learning", "PyTorch"],
      color: "from-accent to-secondary"
    },
    {
      icon: GitBranch,
      title: "DevOps & Tools",
      description: "Modern development tools and version control",
      skills: ["Git", "GitHub", "Docker", "CI/CD", "Linux", "AWS", "Vercel", "Postman", "VS Code"],
      color: "from-primary to-accent"
    },
    {
      icon: Cpu,
      title: "Web Technologies",
      description: "Full-stack web development expertise",
      skills: ["Responsive Design", "Tailwind CSS", "Bootstrap", "Web APIs", "WebSockets", "Progressive Web Apps"],
      color: "from-secondary to-primary"
    },
    {
      icon: BookOpen,
      title: "Technical Writing",
      description: "Author of comprehensive Python programming eBooks",
      skills: ["Technical Documentation", "eBook Writing", "Content Creation", "Educational Materials", "Blogging", "SEO"],
      color: "from-primary to-accent"
    },
    {
      icon: Palette,
      title: "Project Development",
      description: "Full-stack development across various domains",
      skills: ["EdTech Platforms", "Freelancing Platforms", "Game Development", "Web Applications", "Mobile Apps"],
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

  const languages = [
    { name: "English", level: 95, description: "Fluent - Professional proficiency" },
    { name: "Hindi", level: 100, description: "Native speaker" },
    { name: "Punjabi", level: 85, description: "Conversational fluency" }
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            A comprehensive skill set spanning programming, AI, writing, and entrepreneurship
          </p>
        </div>
        
        {/* Technical Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="card-hover group p-4 sm:p-6 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-3 sm:gap-4">
                  <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${category.color} w-fit`}>
                    <category.icon className="h-5 w-5 sm:h-6 sm:w-6 text-background" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {category.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary" 
                      className="bg-muted/10 text-foreground border border-accent/20 hover:bg-accent/10 transition-colors text-xs sm:text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Languages Section */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center mb-10 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              <span className="gradient-text">Languages</span>
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Multilingual communication abilities for global collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {languages.map((language, index) => (
              <Card 
                key={index} 
                className="card-hover p-6 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-5" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Globe className="h-6 w-6 text-primary" />
                      <h4 className="text-xl font-bold text-foreground">{language.name}</h4>
                    </div>
                    <span className="text-2xl font-bold text-primary">{language.level}%</span>
                  </div>
                  
                  <Progress value={language.level} className="h-3 mb-4" />
                  
                  <p className="text-sm text-muted-foreground">
                    {language.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;