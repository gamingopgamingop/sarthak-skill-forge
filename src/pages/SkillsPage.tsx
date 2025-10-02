import Skills from "@/components/Skills";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SkillsPage = () => {
  const skillLevels = [
    // Programming Languages
    { name: "Python", level: 95, category: "programming", years: 3 },
    { name: "JavaScript", level: 88, category: "programming", years: 2 },
    { name: "TypeScript", level: 85, category: "programming", years: 2 },
    { name: "HTML5", level: 92, category: "programming", years: 3 },
    { name: "CSS3", level: 90, category: "programming", years: 3 },
    { name: "SQL", level: 85, category: "programming", years: 2 },
    { name: "Bash/Shell Scripting", level: 78, category: "programming", years: 2 },
    
    // Frameworks & Libraries
    { name: "Django", level: 92, category: "programming", years: 2 },
    { name: "Flask", level: 88, category: "programming", years: 2 },
    { name: "FastAPI", level: 85, category: "programming", years: 1.5 },
    { name: "React", level: 87, category: "programming", years: 2 },
    { name: "Node.js", level: 82, category: "programming", years: 1.5 },
    { name: "Express.js", level: 80, category: "programming", years: 1.5 },
    { name: "Tailwind CSS", level: 90, category: "programming", years: 2 },
    { name: "Bootstrap", level: 85, category: "programming", years: 2 },
    { name: "Next.js", level: 75, category: "programming", years: 1 },
    { name: "Vue.js", level: 70, category: "programming", years: 1 },
    
    // Databases
    { name: "PostgreSQL", level: 88, category: "database", years: 2 },
    { name: "MySQL", level: 85, category: "database", years: 2 },
    { name: "MongoDB", level: 82, category: "database", years: 1.5 },
    { name: "Redis", level: 78, category: "database", years: 1.5 },
    { name: "SQLite", level: 90, category: "database", years: 3 },
    { name: "Supabase", level: 85, category: "database", years: 1 },
    { name: "Firebase", level: 80, category: "database", years: 1 },
    { name: "Database Design", level: 87, category: "database", years: 2 },
    { name: "Query Optimization", level: 82, category: "database", years: 2 },
    { name: "Data Modeling", level: 85, category: "database", years: 2 },
    
    // AI & Machine Learning
    { name: "Machine Learning", level: 83, category: "ai", years: 2 },
    { name: "Deep Learning", level: 78, category: "ai", years: 1.5 },
    { name: "Natural Language Processing", level: 80, category: "ai", years: 1.5 },
    { name: "Computer Vision", level: 75, category: "ai", years: 1 },
    { name: "AI Chatbots", level: 88, category: "ai", years: 2 },
    { name: "TensorFlow", level: 75, category: "ai", years: 1.5 },
    { name: "PyTorch", level: 73, category: "ai", years: 1 },
    { name: "Scikit-learn", level: 85, category: "ai", years: 2 },
    { name: "OpenAI API", level: 87, category: "ai", years: 1.5 },
    { name: "LangChain", level: 80, category: "ai", years: 1 },
    { name: "Automation", level: 90, category: "ai", years: 2 },
    { name: "Prompt Engineering", level: 88, category: "ai", years: 1.5 },
    
    // Other Skills
    { name: "Technical Writing", level: 92, category: "other", years: 3 },
    { name: "Git & GitHub", level: 90, category: "other", years: 3 },
    { name: "Docker", level: 80, category: "other", years: 1.5 },
    { name: "REST APIs", level: 88, category: "other", years: 2 },
    { name: "GraphQL", level: 75, category: "other", years: 1 },
    { name: "WebSockets", level: 78, category: "other", years: 1 },
    { name: "CI/CD", level: 77, category: "other", years: 1.5 },
    { name: "Linux/Unix", level: 85, category: "other", years: 2 },
    { name: "AWS Services", level: 75, category: "other", years: 1 },
    { name: "Vercel Deployment", level: 88, category: "other", years: 1.5 },
    { name: "Responsive Design", level: 90, category: "other", years: 2.5 },
    { name: "SEO Optimization", level: 82, category: "other", years: 1.5 },
    { name: "UI/UX Design", level: 80, category: "other", years: 2 },
    { name: "Agile Methodologies", level: 85, category: "other", years: 2 },
    { name: "Problem Solving", level: 95, category: "other", years: 3 },
    { name: "Project Management", level: 87, category: "other", years: 2 },
    { name: "Code Review", level: 88, category: "other", years: 2 },
    { name: "Testing & Debugging", level: 90, category: "other", years: 2.5 },
  ];

  const certifications = [
    "Python Programming Specialist",
    "Django Web Framework Expert",
    "Full Stack Web Development",
    "Database Design and Management",
    "AI and Machine Learning Fundamentals",
    "Deep Learning Specialization",
    "Natural Language Processing",
    "Cloud Computing Essentials",
    "DevOps and CI/CD",
    "Technical Writing Excellence",
    "Agile Project Management",
    "Software Architecture Patterns"
  ];

  const achievements = [
    "Authored 100+ Python programming topics and tutorials",
    "Built 20+ AI automation systems for real-world applications",
    "Created educational content covering 50+ programming languages",
    "Developed multiple EdTech platforms serving 1000+ students",
    "Published comprehensive eBook series on Python programming",
    "Contributed to 15+ open-source projects on GitHub",
    "Successfully deployed 30+ full-stack web applications",
    "Mentored 50+ aspiring developers in programming",
    "Designed and implemented scalable database architectures",
    "Built AI chatbots with 95%+ accuracy in understanding user intent",
    "Achieved 100K+ lines of production-ready code written",
    "Won 3 hackathons for innovative tech solutions"
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
            <span className="gradient-text">Skills & Expertise</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, certifications, and achievements
          </p>
        </motion.div>

        {/* Skill Progress Bars */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="programming">Code</TabsTrigger>
              <TabsTrigger value="database">DB</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-foreground">All Skills</h2>
                <div className="space-y-6">
                  {skillLevels.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <span className="font-medium text-foreground">{skill.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">({skill.years} {skill.years === 1 ? 'year' : 'years'})</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </motion.div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {["programming", "database", "ai", "other"].map((category) => (
              <TabsContent key={category} value={category}>
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-foreground capitalize">
                    {category} Skills
                  </h2>
                  <div className="space-y-6">
                    {skillLevels
                      .filter(skill => skill.category === category)
                      .map((skill, index) => (
                     <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">({skill.years} {skill.years === 1 ? 'year' : 'years'})</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </motion.div>
                      ))}
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Certifications and Achievements */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Certifications</h2>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Badge variant="secondary" className="w-full justify-start p-3 text-sm">
                    {cert}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Key Achievements</h2>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Skills Component */}
        <Skills />
      </div>
    </main>
  );
};

export default SkillsPage;