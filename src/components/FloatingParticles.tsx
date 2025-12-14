import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: "heart" | "sparkle" | "circle";
  rotation: number;
  rotationSpeed: number;
  trail: Array<{ x: number; y: number; opacity: number }>;
  hue: number;
  pulsePhase: number;
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const particleCount = 15; // Reduced for better performance
    const initialParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
      const type = i % 3 === 0 ? "heart" : i % 3 === 1 ? "sparkle" : "circle";
      return {
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 20 + 10,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.3,
        type: type as "heart" | "sparkle" | "circle",
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        trail: [],
        hue: Math.random() * 60 + 320, // Pink to rose range
        pulsePhase: Math.random() * Math.PI * 2
      };
    });

    setParticles(initialParticles);

    let particlesState = [...initialParticles];
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16; // Normalize to 60fps
      lastTime = currentTime;

      particlesState = particlesState.map((particle) => {
        // Update pulse phase
        const newPulsePhase = particle.pulsePhase + 0.02;
        
        // Mouse interaction with stronger effect
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        const minDistance = 50;

        let newSpeedX = particle.speedX;
        let newSpeedY = particle.speedY;

        if (distance < maxDistance && distance > 0) {
          const force = distance < minDistance 
            ? (minDistance - distance) / minDistance * 0.3 // Repel when too close
            : (maxDistance - distance) / maxDistance * 0.15; // Attract when in range
          
          const angle = Math.atan2(dy, dx);
          if (distance < minDistance) {
            // Repel
            newSpeedX -= Math.cos(angle) * force;
            newSpeedY -= Math.sin(angle) * force;
          } else {
            // Attract
            newSpeedX += Math.cos(angle) * force;
            newSpeedY += Math.sin(angle) * force;
          }
        }

        // Apply friction
        newSpeedX *= 0.98;
        newSpeedY *= 0.98;

        // Update position
        let newX = particle.x + newSpeedX * deltaTime;
        let newY = particle.y + newSpeedY * deltaTime;

        // Wrap around edges
        if (newX < -50) newX = window.innerWidth + 50;
        if (newX > window.innerWidth + 50) newX = -50;
        if (newY < -50) newY = window.innerHeight + 50;
        if (newY > window.innerHeight + 50) newY = -50;

        // Update trail
        const newTrail = [
          { x: particle.x, y: particle.y, opacity: 0.3 },
          ...particle.trail.slice(0, 5)
        ].map((point, i) => ({
          ...point,
          opacity: point.opacity * 0.7
        }));

        // Update rotation
        const newRotation = particle.rotation + particle.rotationSpeed * deltaTime;

        // Pulsing opacity
        const pulseOpacity = 0.4 + Math.sin(newPulsePhase) * 0.3;

        return {
          ...particle,
          x: newX,
          y: newY,
          speedX: newSpeedX,
          speedY: newSpeedY,
          rotation: newRotation,
          opacity: pulseOpacity,
          trail: newTrail,
          pulsePhase: newPulsePhase
        };
      });

      setParticles([...particlesState]);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Enhanced mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      particlesState = particlesState.map((p) => ({
        ...p,
        x: Math.min(p.x, window.innerWidth),
        y: Math.min(p.y, window.innerHeight)
      }));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ willChange: 'transform' }}>
      {particles.map((particle) => (
        <div key={particle.id} className="absolute" style={{ left: 0, top: 0 }}>
          {/* Trail effect */}
          {particle.trail.map((point, i) => (
            <div
              key={`trail-${i}`}
              className="absolute rounded-full"
              style={{
                left: point.x - particle.size / 4,
                top: point.y - particle.size / 4,
                width: particle.size / 2,
                height: particle.size / 2,
                opacity: point.opacity,
                background: `radial-gradient(circle, hsl(${particle.hue}, 70%, 70%) 0%, transparent 70%)`,
                filter: `blur(${particle.size / 4}px)`,
                transform: `translate(${point.x}px, ${point.y}px)`
              }}
            />
          ))}
          
          {/* Main particle */}
          <motion.div
            className="absolute"
            style={{
              left: particle.x,
              top: particle.y,
              transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
              opacity: particle.opacity,
              filter: `hue-rotate(${Math.sin(particle.pulsePhase) * 10}deg) drop-shadow(0 0 ${particle.size / 2}px hsl(${particle.hue}, 80%, 70%))`
            }}
            animate={{
              scale: [1, 1.2, 1],
              filter: [
                `hue-rotate(0deg) drop-shadow(0 0 ${particle.size / 2}px hsl(${particle.hue}, 80%, 70%))`,
                `hue-rotate(10deg) drop-shadow(0 0 ${particle.size}px hsl(${particle.hue}, 90%, 75%))`,
                `hue-rotate(0deg) drop-shadow(0 0 ${particle.size / 2}px hsl(${particle.hue}, 80%, 70%))`
              ]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {particle.type === "heart" ? (
              <svg
                width={particle.size}
                height={particle.size}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-pink-400"
                style={{
                  filter: `drop-shadow(0 0 ${particle.size / 3}px currentColor)`
                }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : particle.type === "sparkle" ? (
              <svg
                width={particle.size}
                height={particle.size}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-rose-400"
                style={{
                  filter: `drop-shadow(0 0 ${particle.size / 3}px currentColor)`
                }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ) : (
              <div
                className="rounded-full"
                style={{
                  width: particle.size,
                  height: particle.size,
                  background: `radial-gradient(circle, hsl(${particle.hue}, 80%, 75%) 0%, hsl(${particle.hue}, 60%, 60%) 100%)`,
                  boxShadow: `0 0 ${particle.size}px hsl(${particle.hue}, 80%, 70%)`
                }}
              />
            )}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

