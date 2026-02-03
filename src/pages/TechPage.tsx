// @ts-ignore
// @ts-nocheck

import React from "react";
import TechShowcase from "../components/TechShowcase";
import InteractiveElements from "../components/InteractiveElements";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { 
  Code, 
  Database, 
  Cloud, 
  Smartphone, 
  Paintbrush, 
  Zap,
  Star,
  TrendingUp,
  Award,
  Rocket
} from "lucide-react";

const TechPage = () => {
  const techCategories = [
    {
      title: "Frontend Development",
      icon: <Code className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      technologies: [
        { name: "React", level: 95, years: "4+" },
        { name: "TypeScript", level: 90, years: "3+" },
        { name: "Next.js", level: 88, years: "3+" },
        { name: "Vue.js", level: 85, years: "2+" },
        { name: "Tailwind CSS", level: 93, years: "3+" },
        { name: "Framer Motion", level: 87, years: "2+" }
      ]
    },
    {
      title: "Backend Development",
      icon: <Database className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
      technologies: [
        { name: "Python", level: 95, years: "5+" },
        { name: "Django", level: 90, years: "4+" },
        { name: "FastAPI", level: 88, years: "3+" },
        { name: "Node.js", level: 85, years: "3+" },
        { name: "PostgreSQL", level: 92, years: "4+" },
        { name: "Redis", level: 80, years: "2+" }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
      technologies: [
        { name: "Docker", level: 88, years: "3+" },
        { name: "AWS", level: 85, years: "3+" },
        { name: "GitHub Actions", level: 90, years: "3+" },
        { name: "Nginx", level: 82, years: "2+" },
        { name: "Linux", level: 87, years: "4+" },
        { name: "Kubernetes", level: 75, years: "1+" }
      ]
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="h-6 w-6" />,
      color: "from-orange-500 to-red-500",
      technologies: [
        { name: "React Native", level: 83, years: "2+" },
        { name: "Flutter", level: 78, years: "1+" },
        { name: "Expo", level: 85, years: "2+" },
        { name: "iOS Development", level: 75, years: "1+" },
        { name: "Android Development", level: 80, years: "2+" }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: <Zap className="h-6 w-6" />,
      color: "from-yellow-500 to-orange-500",
      technologies: [
        { name: "TensorFlow", level: 82, years: "2+" },
        { name: "PyTorch", level: 78, years: "2+" },
        { name: "OpenAI API", level: 90, years: "2+" },
        { name: "Scikit-learn", level: 85, years: "3+" },
        { name: "Pandas", level: 92, years: "4+" },
        { name: "NumPy", level: 88, years: "4+" }
      ]
    },
    {
      title: "Design & Tools",
      icon: <Paintbrush className="h-6 w-6" />,
      color: "from-indigo-500 to-purple-500",
      technologies: [
        { name: "Figma", level: 88, years: "3+" },
        { name: "Adobe XD", level: 82, years: "2+" },
        { name: "Git", level: 95, years: "5+" },
        { name: "VS Code", level: 98, years: "5+" },
        { name: "Notion", level: 90, years: "3+" },
        { name: "Photoshop", level: 85, years: "4+" }
      ]
    }
  ];

  const achievements = [
    { icon: <Award />, title: "50+ Technologies", subtitle: "Mastered across full-stack" },
    { icon: <Rocket />, title: "100+ Projects", subtitle: "Delivered successfully" },
    { icon: <Star />, title: "5+ Years", subtitle: "Professional experience" },
    { icon: <TrendingUp />, title: "10+ Certifications", subtitle: "Industry recognized" }
  ];

  return (
    <main className="min-h-screen pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Tech Stack Mastery</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Comprehensive expertise across modern technologies, from frontend frameworks to cloud infrastructure and AI integration
          </p>
        </motion.div>

        {/* Achievements */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover p-4 sm:p-6 text-center">
                <div className="text-primary mb-2 sm:mb-3 flex justify-center">
                  {React.cloneElement(achievement.icon, { className: "h-6 w-6 sm:h-8 sm:w-8" })}
                </div>
                <div className="text-lg sm:text-2xl font-bold text-foreground mb-1">{achievement.title}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{achievement.subtitle}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Categories */}
        <motion.div 
          className="space-y-12 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            >
              <Card className="card-hover p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-br ${category.color} text-white`}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">{category.title}</h2>
                    <p className="text-sm sm:text-base text-muted-foreground">Advanced proficiency and hands-on experience</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: techIndex * 0.05 }}
                      className="space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                        <span className="font-medium text-foreground text-sm sm:text-base">{tech.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {tech.years}
                          </Badge>
                          <span className="text-xs sm:text-sm text-muted-foreground">{tech.level}%</span>
                        </div>
                      </div>
                      <Progress value={tech.level} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Tech Showcase */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              <span className="gradient-text">Interactive Tech Showcase</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Experience cutting-edge web technologies with interactive 3D graphics and advanced animations
            </p>
          </div>
        </motion.div>
      </div>

        {/* Tech Showcase */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <TechShowcase />
        </motion.div>
      <InteractiveElements />
    </main>
  );
};

export default TechPage;