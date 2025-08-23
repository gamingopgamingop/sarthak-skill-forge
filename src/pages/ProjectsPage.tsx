import Projects from "@/components/Projects";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Calendar, Users } from "lucide-react";

const ProjectsPage = () => {
  const projectStats = [
    { label: "Total Projects", value: "15+", icon: Github },
    { label: "Programming Languages", value: "50+", icon: Calendar },
    { label: "People Reached", value: "1000+", icon: Users },
    { label: "eBook Topics", value: "100+", icon: ExternalLink }
  ];

  const projectCategories = [
    {
      title: "Educational Content",
      description: "eBooks and tutorials for learning programming",
      count: "8 projects",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Web Development",
      description: "Full-stack applications and platforms",
      count: "4 projects",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "AI & Automation",
      description: "Intelligent systems and chatbots",
      count: "3 projects",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">My Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my work spanning education, web development, AI, and automation
          </p>
        </motion.div>

        {/* Project Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {projectStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Categories */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {projectCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="card-hover p-6 h-full relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <Badge variant="secondary" className="bg-muted/10 text-foreground border border-accent/20">
                    {category.count}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border border-accent/20">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Want to Collaborate?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I'm always open to working on exciting projects. Whether you need development, 
              automation, or educational content, let's build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="tech" size="lg">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
              <Button variant="outline" size="lg">
                <ExternalLink className="mr-2 h-5 w-5" />
                Live Demos
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Projects Component */}
        <Projects />
      </div>
    </main>
  );
};

export default ProjectsPage;