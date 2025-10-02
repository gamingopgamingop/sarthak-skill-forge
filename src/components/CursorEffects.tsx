import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  velocity: { x: number; y: number };
  life: number;
}

const CursorEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create particles on movement
      if (Math.random() < 0.3) {
        createParticle(e.clientX, e.clientY);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target; 
      // as HTMLElement;
    if (target instanceof Element && target.matches('button, a, [role="button"], .interactive')) {
        setIsHovering(true);
    }
};
    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  // Create particle
  const createParticle = (x: number, y: number) => {
    const colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'];
    const newParticle: Particle = {
      id: particleIdRef.current++,
      x,
      y,
      size: Math.random() * 4 + 2,
      opacity: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      },
      life: 1,
    };

    setParticles(prev => [...prev.slice(-20), newParticle]);
  };

  // Animate particles
  useEffect(() => {
    const animate = () => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.velocity.x,
            y: particle.y + particle.velocity.y,
            life: particle.life - 0.02,
            opacity: particle.life - 0.02,
            size: particle.size * 0.98,
          }))
          .filter(particle => particle.life > 0)
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{
              scale: isHovering ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </motion.div>

      {/* Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className="w-10 h-10 border border-primary/30 rounded-full" />
      </motion.div>

      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-30">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          />
        ))}
      </div>

      {/* Magnetic Effect for Interactive Elements */}
      <style dangerouslySetInnerHTML={{
        __html: `
          * {
            cursor: none !important;
          }
          
          button, a, [role="button"], .interactive {
            position: relative;
            transition: transform 0.2s ease;
          }
          
          button:hover, a:hover, [role="button"]:hover, .interactive:hover {
            transform: scale(1.05);
          }
          
          .tech-glow:hover {
            box-shadow: 0 0 30px hsl(var(--primary) / 0.5);
          }
          
          .card-hover:hover {
            transform: translateY(-8px) scale(1.02);
          }
          
          @media (max-width: 768px) {
            * {
              cursor: auto !important;
            }
          }
        `
      }} />
    </>
  );
};

export default CursorEffects;