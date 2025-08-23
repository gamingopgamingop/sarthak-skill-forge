import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import anime from "animejs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Rocket, Code2 } from "lucide-react";

const InteractiveElements = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Framer Motion values for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(springY, [-300, 300], [30, -30]);
  const rotateY = useTransform(springX, [-300, 300], [-30, 30]);

  useEffect(() => {
    // Anime.js particle animation
    const animateParticles = () => {
      anime({
        targets: '.particle',
        translateX: () => anime.random(-100, 100),
        translateY: () => anime.random(-100, 100),
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        duration: 2000,
        delay: anime.stagger(100),
        loop: true,
        easing: 'easeInOutSine'
      });
    };

    animateParticles();
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleButtonClick = () => {
    anime({
      targets: '.ripple-effect',
      scale: [0, 20],
      opacity: [1, 0],
      duration: 600,
      easing: 'easeOutExpo'
    });
  };

  const features = [
    {
      icon: Sparkles,
      title: "WebGL Shaders",
      description: "Custom fragment shaders for stunning visual effects",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Zap,
      title: "Performance Optimized",
      description: "60 FPS animations with hardware acceleration",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: Rocket,
      title: "Interactive 3D",
      description: "Mouse and touch controls for immersive experiences",
      color: "from-green-400 to-cyan-500"
    },
    {
      icon: Code2,
      title: "Modern APIs",
      description: "Latest web technologies and browser capabilities",
      color: "from-pink-400 to-rose-500"
    }
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Floating Particles Background */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="particle absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Interactive Experiences</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hover, click, and drag to experience cutting-edge web animations and 3D interactions
          </p>
        </motion.div>

        {/* 3D Tilt Card */}
        <motion.div 
          ref={constraintsRef}
          className="mb-16 flex justify-center"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="relative w-80 h-48"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="w-full h-full p-6 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-accent/20 cursor-pointer">
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                <motion.div
                  animate={{ rotate: isHovered ? 360 : 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Sparkles className="h-12 w-12 text-primary mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  3D Interactive Card
                </h3>
                <p className="text-muted-foreground">
                  Move your mouse to see the 3D effect
                </p>
              </div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg blur-xl"
                animate={{ opacity: isHovered ? 0.6 : 0.2 }}
                transition={{ duration: 0.3 }}
                style={{ transform: "translateZ(-50px)" }}
              />
            </Card>
          </motion.div>
        </motion.div>

        {/* Interactive Button with Ripple Effect */}
        <div className="flex justify-center mb-16">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="tech"
              size="lg"
              onClick={handleButtonClick}
              className="relative overflow-hidden"
            >
              <span className="relative z-10">Experience Animation Magic</span>
              <div className="ripple-effect absolute inset-0 bg-white/20 rounded-full" />
            </Button>
          </motion.div>
        </div>

        {/* Feature Grid with Staggered Animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              viewport={{ once: true }}
            >
              <Card className="card-hover p-6 relative overflow-hidden h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-15 transition-opacity`} />
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                  >
                    <feature.icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  
                  <h3 className="text-lg font-bold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Draggable Elements */}
        <motion.div 
          ref={constraintsRef}
          className="mt-16 p-8 border border-accent/20 rounded-lg relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-center text-xl font-bold mb-6 text-foreground">
            Drag the shapes around!
          </h3>
          
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-16 h-16 rounded-full absolute cursor-grab active:cursor-grabbing`}
              style={{
                background: `linear-gradient(135deg, hsl(${120 + i * 120}, 70%, 60%), hsl(${140 + i * 120}, 80%, 70%))`,
                left: `${20 + i * 30}%`,
                top: "50%"
              }}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.2}
              whileDrag={{ scale: 1.2, rotate: 90 }}
              whileHover={{ scale: 1.1 }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveElements;