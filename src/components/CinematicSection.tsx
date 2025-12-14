import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

type CinematicSectionProps = {
  children: ReactNode;
  className?: string;
};

export function CinematicSection({ children, className = "" }: CinematicSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale, willChange: 'transform, opacity' }}
      className={`cinematic-dark relative rounded-2xl lg:rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border border-pink-300/30 ${className}`}
    >
      {/* Glowing orbs - Pastel */}
      <motion.div 
        className="absolute top-10 left-10 h-32 w-32 rounded-full bg-rose-300/30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-pink-300/30 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Subtle grid pattern - Pastel */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `linear-gradient(rgba(255,182,193,0.15) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,182,193,0.15) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
}

