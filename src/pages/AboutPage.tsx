import About from "@/components/About";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, GraduationCap, Target } from "lucide-react";

const AboutPage = () => {
  const timeline = [
    {
      year: "2024",
      title: "BCA Student & Tech Entrepreneur",
      description: "Started my journey in Bachelor of Computer Applications while building tech products and writing Python eBooks."
    },
    {
      year: "2023",
      title: "Urban Jiva Blog Launch",
      description: "Launched my blogging platform covering 50+ programming languages and tech trends."
    },
    {
      year: "2022",
      title: "Python Programming Focus",
      description: "Specialized in Python development, covering 100+ topics from beginner to professional level."
    }
  ];

  const goals = [
    "Become a creative tech leader in the industry",
    "Automate businesses through innovative solutions",
    "Inspire others through education and software",
    "Create global impact through entrepreneurship"
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
            <span className="gradient-text">About Me</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate programmer, entrepreneur, and educator building the future of technology
          </p>
        </motion.div>

        {/* Personal Info Section */}
        <motion.div 
          className="grid md:grid-cols-2 gap-12 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Personal Info</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5 text-primary mr-3" />
                <span className="text-muted-foreground">BCA Student (Second Year)</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-primary mr-3" />
                <span className="text-muted-foreground">India</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-3" />
                <span className="text-muted-foreground">Started coding in 2022</span>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">My Vision</h2>
            <div className="space-y-3">
              {goals.map((goal, index) => (
                <div key={index} className="flex items-start">
                  <Target className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{goal}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Timeline Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">My Journey</span>
          </h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className="flex flex-col md:flex-row items-start md:items-center gap-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
              >
                <div className="flex-shrink-0">
                  <Badge variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-br from-primary/10 to-accent/10">
                    {item.year}
                  </Badge>
                </div>
                <Card className="flex-1 p-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* About Component */}
        <About />
      </div>
    </main>
  );
};

export default AboutPage;