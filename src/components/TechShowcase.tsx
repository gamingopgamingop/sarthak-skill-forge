import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text3D, MeshTransmissionMaterial, Environment, Float, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import anime from "animejs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mesh } from "three";
import { Play, Pause, RotateCcw } from "lucide-react";

// Animated 3D Cube Component
const AnimatedCube = ({ position, color }: { position: [number, number, number], color: string }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color={color}
        />
      </mesh>
    </Float>
  );
};

// Floating Spheres
const FloatingSpheres = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={2}>
          <Sphere
            position={[
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 6
            ]}
            scale={0.2 + Math.random() * 0.3}
          >
            <meshStandardMaterial 
              color={`hsl(${200 + i * 30}, 70%, 60%)`}
              transparent
              opacity={0.6}
              roughness={0}
              metalness={0.8}
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
};

// 3D Text Component
const Logo3D = () => {
  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        position={[-2, 0, 0]}
        size={0.8}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        SARTHAK
        <meshStandardMaterial color="hsl(var(--primary))" metalness={0.8} roughness={0.2} />
      </Text3D>
    </Float>
  );
};

const TechShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const animationRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Anime.js animations for UI elements
    const animateCards = () => {
      anime({
        targets: '.tech-card',
        scale: [0.8, 1],
        opacity: [0, 1],
        translateY: [50, 0],
        delay: anime.stagger(200),
        duration: 1000,
        easing: 'spring(1, 80, 10, 0)'
      });
    };

    const animateSpheres = () => {
      anime({
        targets: '.floating-sphere',
        translateY: [
          { value: -20, duration: 2000 },
          { value: 0, duration: 2000 }
        ],
        scale: [
          { value: 1.2, duration: 1000 },
          { value: 1, duration: 1000 }
        ],
        rotate: '1turn',
        duration: 4000,
        loop: true,
        easing: 'easeInOutSine',
        delay: anime.stagger(300)
      });
    };

    animateCards();
    animateSpheres();
  }, []);

  const resetAnimation = () => {
    anime({
      targets: '.tech-card',
      scale: [1, 0.8, 1],
      rotate: [0, 360],
      duration: 800,
      easing: 'easeInOutBack'
    });
  };

  const technologies = [
    {
      name: "Three.js",
      description: "3D graphics and WebGL rendering",
      features: ["WebGL", "3D Scenes", "Interactive Objects"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Framer Motion",
      description: "Advanced React animations",
      features: ["Gesture Recognition", "Layout Animations", "SVG Animations"],
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Anime.js",
      description: "Lightweight animation library",
      features: ["Timeline Control", "SVG Morphing", "Easing Functions"],
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Interactive Tech Showcase</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore cutting-edge web technologies with interactive 3D graphics, advanced animations, and WebGL
          </p>
        </motion.div>

        {/* 3D Canvas Section */}
        <motion.div 
          className="mb-16 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 bg-background/50 backdrop-blur-sm border border-accent/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-foreground">Three.js + WebGL Scene</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={resetAnimation}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="h-96 rounded-lg overflow-hidden bg-gradient-to-br from-background to-accent/5">
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <Environment preset="city" />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} />
                
                <AnimatedCube position={[-2, 0, 0]} color="hsl(var(--primary))" />
                <AnimatedCube position={[2, 0, 0]} color="hsl(var(--accent))" />
                <AnimatedCube position={[0, 2, 0]} color="hsl(var(--secondary))" />
                
                <FloatingSpheres />
                
                <OrbitControls 
                  enablePan={true} 
                  enableZoom={true} 
                  enableRotate={true}
                  autoRotate={isPlaying}
                  autoRotateSpeed={0.5}
                />
              </Canvas>
            </div>
          </Card>
        </motion.div>

        {/* Technology Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="tech-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              viewport={{ once: true }}
            >
              <Card className="card-hover p-6 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {tech.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {tech.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {tech.features.map((feature, featureIndex) => (
                      <Badge 
                        key={featureIndex}
                        variant="secondary"
                        className="bg-muted/10 text-foreground border border-accent/20"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Animated Spheres with Anime.js */}
        <motion.div 
          ref={sphereRef}
          className="grid grid-cols-5 gap-4 justify-center items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="floating-sphere w-16 h-16 rounded-full mx-auto"
              style={{
                background: `linear-gradient(135deg, hsl(${200 + i * 40}, 70%, 60%), hsl(${220 + i * 40}, 80%, 70%))`
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechShowcase;