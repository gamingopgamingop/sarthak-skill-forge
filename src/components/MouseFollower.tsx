import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  color: string;
}

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [followers, setFollowers] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Create multiple followers with different delays
    const initialFollowers: FloatingElement[] = [
      { id: 1, x: 0, y: 0, delay: 0.1, size: 8, color: 'hsl(var(--primary))' },
      { id: 2, x: 0, y: 0, delay: 0.2, size: 6, color: 'hsl(var(--secondary))' },
      { id: 3, x: 0, y: 0, delay: 0.3, size: 4, color: 'hsl(var(--accent))' },
    ];
    setFollowers(initialFollowers);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {followers.map((follower) => (
        <motion.div
          key={follower.id}
          className="absolute rounded-full opacity-30"
          style={{
            width: follower.size,
            height: follower.size,
            backgroundColor: follower.color,
          }}
          animate={{
            x: mousePosition.x - follower.size / 2,
            y: mousePosition.y - follower.size / 2,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: follower.delay,
          }}
        />
      ))}
    </div>
  );
};

export default MouseFollower;