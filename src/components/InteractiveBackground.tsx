import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize points
    const initPoints = () => {
      pointsRef.current = [];
      const numPoints = Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < numPoints; i++) {
        pointsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    initPoints();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const points = pointsRef.current;
      const mouse = mouseRef.current;

      // Update and draw points
      points.forEach((point, i) => {
        // Mouse interaction
        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          point.vx += dx * force * 0.001;
          point.vy += dy * force * 0.001;
        }

        // Update position
        point.x += point.vx;
        point.y += point.vy;

        // Boundary bounce
        if (point.x < 0 || point.x > canvas.width) point.vx *= -0.8;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -0.8;

        // Keep points in bounds
        point.x = Math.max(0, Math.min(canvas.width, point.x));
        point.y = Math.max(0, Math.min(canvas.height, point.y));

        // Friction
        point.vx *= 0.99;
        point.vy *= 0.99;

        // Draw point
        ctx.fillStyle = 'hsla(var(--primary-hsl), 0.6)';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        points.slice(i + 1).forEach(otherPoint => {
          const dx = otherPoint.x - point.x;
          const dy = otherPoint.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.3;
            ctx.strokeStyle = `hsla(var(--primary-hsl), ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-50"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default InteractiveBackground;
