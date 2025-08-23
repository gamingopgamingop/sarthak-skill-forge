import Skills from "@/components/Skills";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SkillsPage = () => {
  const skillLevels = [
    { name: "Python", level: 95, category: "programming" },
    { name: "Django", level: 90, category: "programming" },
    { name: "FastAPI", level: 85, category: "programming" },
    { name: "PostgreSQL", level: 80, category: "database" },
    { name: "Machine Learning", level: 75, category: "ai" },
    { name: "React", level: 85, category: "programming" },
    { name: "TypeScript", level: 80, category: "programming" },
    { name: "Technical Writing", level: 90, category: "other" },
    { name: "AI Chatbots", level: 85, category: "ai" },
    { name: "Automation", level: 88, category: "ai" }
  ];

  const certifications = [
    "Python Programming Specialist",
    "Django Web Framework",
    "Database Design and Management",
    "AI and Machine Learning Fundamentals",
    "Technical Writing Excellence"
  ];

  const achievements = [
    "Authored 100+ Python programming topics",
    "Built multiple AI automation systems",
    "Created educational content for 50+ programming languages",
    "Developed EdTech and freelancing platforms",
    "Published comprehensive eBook series"
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
                        <span className="font-medium text-foreground">{skill.name}</span>
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
                            <span className="font-medium text-foreground">{skill.name}</span>
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