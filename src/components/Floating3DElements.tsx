import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Floating3DElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 0]);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Floating 3D hearts */}
      <motion.div
        className="absolute top-20 right-20 float-3d"
        style={{
          rotateY,
          rotateX,
          translateZ
        }}
      >
        <motion.div
          className="float-3d-element"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            className="h-24 w-24 text-rose-400/30"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-16 float-3d"
        style={{
          rotateY: useTransform(scrollYProgress, [0, 1], [360, 0]),
          rotateX: useTransform(scrollYProgress, [0, 1], [180, 0])
        }}
      >
        <motion.div
          className="float-3d-element"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -15, 15, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <svg
            className="h-16 w-16 text-pink-400/25"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Floating romantic text */}
      <motion.div
        className="absolute top-1/2 left-1/4 font-handwritten text-4xl text-rose-300/20"
        style={{
          rotateZ: useTransform(scrollYProgress, [0, 1], [0, 15])
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        &hearts;
      </motion.div>
    </div>
  );
}

