import TechShowcase from "@/components/TechShowcase";
import InteractiveElements from "@/components/InteractiveElements";
import { motion } from "framer-motion";

const TechPage = () => {
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
            <span className="gradient-text">Tech Playground</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience cutting-edge web technologies with interactive 3D graphics, advanced animations, and WebGL
          </p>
        </motion.div>
      </div>

      <TechShowcase />
      <InteractiveElements />
    </main>
  );
};

export default TechPage;