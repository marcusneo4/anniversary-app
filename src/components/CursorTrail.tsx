import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

export function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let trailId = 0;
    const maxTrailLength = 15;

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++,
        timestamp: Date.now()
      };

      setMousePos({ x: e.clientX, y: e.clientY });
      setTrail((prev) => {
        const filtered = prev.filter(
          (point) => Date.now() - point.timestamp < 300
        );
        return [newPoint, ...filtered].slice(0, maxTrailLength);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Main cursor glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: 30,
          height: 30,
          background: "radial-gradient(circle, rgba(255, 182, 193, 0.6) 0%, transparent 70%)",
          filter: "blur(10px)",
          transform: "translate(-50%, -50%)"
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Trail points */}
      {trail.map((point, index) => {
        const size = 8 - (index * 0.4);
        const opacity = 0.6 - (index * 0.04);
        
        return (
          <motion.div
            key={point.id}
            className="absolute rounded-full"
            initial={{
              scale: 0,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: opacity
            }}
            exit={{
              scale: 0,
              opacity: 0
            }}
            style={{
              left: point.x,
              top: point.y,
              width: size,
              height: size,
              background: `radial-gradient(circle, hsl(${320 + index * 2}, 70%, 70%) 0%, transparent 70%)`,
              filter: "blur(2px)",
              transform: "translate(-50%, -50%)"
            }}
            transition={{
              duration: 0.3
            }}
          />
        );
      })}
    </div>
  );
}
