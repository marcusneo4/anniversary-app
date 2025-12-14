import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Decoration {
  id: number;
  x: number;
  y: number;
  size: number;
  type: "flower" | "heart" | "star" | "cloud" | "butterfly";
  rotation: number;
}

export function PastelDecorations() {
  const [decorations, setDecorations] = useState<Decoration[]>([]);

  useEffect(() => {
    const decorationCount = 20;
    const initialDecorations: Decoration[] = Array.from({ length: decorationCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40,
      type: ["flower", "heart", "star", "cloud", "butterfly"][Math.floor(Math.random() * 5)] as Decoration["type"],
      rotation: Math.random() * 360
    }));
    setDecorations(initialDecorations);
  }, []);

  const renderDecoration = (decoration: Decoration) => {
    const baseStyle = {
      position: "absolute" as const,
      left: `${decoration.x}%`,
      top: `${decoration.y}%`,
      width: `${decoration.size}px`,
      height: `${decoration.size}px`,
      transform: `rotate(${decoration.rotation}deg)`,
      opacity: 0.6
    };

    switch (decoration.type) {
      case "flower":
        return (
          <motion.div
            key={decoration.id}
            style={baseStyle}
            animate={{
              rotate: [decoration.rotation, decoration.rotation + 360],
              scale: [1, 1.1, 1],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="15" fill="#ffb3d9" opacity="0.8" />
              <circle cx="35" cy="35" r="12" fill="#ffcce6" opacity="0.7" />
              <circle cx="65" cy="35" r="12" fill="#ffcce6" opacity="0.7" />
              <circle cx="35" cy="65" r="12" fill="#ffcce6" opacity="0.7" />
              <circle cx="65" cy="65" r="12" fill="#ffcce6" opacity="0.7" />
              <circle cx="50" cy="25" r="10" fill="#ffe0f0" opacity="0.6" />
              <circle cx="75" cy="50" r="10" fill="#ffe0f0" opacity="0.6" />
              <circle cx="50" cy="75" r="10" fill="#ffe0f0" opacity="0.6" />
              <circle cx="25" cy="50" r="10" fill="#ffe0f0" opacity="0.6" />
            </svg>
          </motion.div>
        );
      
      case "heart":
        return (
          <motion.div
            key={decoration.id}
            style={baseStyle}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [decoration.rotation, decoration.rotation + 10, decoration.rotation]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 100 100" fill="#ff91c7">
              <path d="M50,85 C30,65 10,45 10,30 C10,20 18,12 28,12 C38,12 50,24 50,24 C50,24 62,12 72,12 C82,12 90,20 90,30 C90,45 70,65 50,85 Z" />
            </svg>
          </motion.div>
        );

      case "star":
        return (
          <motion.div
            key={decoration.id}
            style={baseStyle}
            animate={{
              rotate: [decoration.rotation, decoration.rotation + 360],
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <svg viewBox="0 0 100 100" fill="#ffd9e6">
              <path d="M50,10 L55,35 L80,35 L60,50 L65,75 L50,60 L35,75 L40,50 L20,35 L45,35 Z" />
            </svg>
          </motion.div>
        );

      case "cloud":
        return (
          <motion.div
            key={decoration.id}
            style={baseStyle}
            animate={{
              x: [0, 20, 0],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 100 100" fill="#ffe8f0">
              <ellipse cx="30" cy="50" rx="25" ry="20" />
              <ellipse cx="50" cy="50" rx="30" ry="25" />
              <ellipse cx="70" cy="50" rx="25" ry="20" />
            </svg>
          </motion.div>
        );

      case "butterfly":
        return (
          <motion.div
            key={decoration.id}
            style={baseStyle}
            animate={{
              y: [0, -15, 0],
              rotate: [decoration.rotation, decoration.rotation + 5, decoration.rotation]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 100 100" fill="none">
              <ellipse cx="30" cy="50" rx="20" ry="35" fill="#ffb3d9" opacity="0.7" />
              <ellipse cx="70" cy="50" rx="20" ry="35" fill="#ffb3d9" opacity="0.7" />
              <ellipse cx="50" cy="50" rx="8" ry="25" fill="#ff91c7" opacity="0.8" />
              <circle cx="50" cy="40" r="5" fill="#ff91c7" />
              <path d="M50,35 L45,30 M50,35 L55,30" stroke="#ff91c7" strokeWidth="2" />
            </svg>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {decorations.map((decoration) => renderDecoration(decoration))}
    </div>
  );
}
