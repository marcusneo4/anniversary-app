import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { heroContent, type HeroContent } from "../data/content";
import { loadHero } from "../utils/contentManager";

type HeroProps = {
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
};

export function Hero({ onPrimaryClick, onSecondaryClick }: HeroProps) {
  const [content, setContent] = useState<HeroContent>(heroContent);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const loadData = async () => {
      const saved = await loadHero();
      if (saved) {
        setContent(saved);
      }
    };
    loadData();
  }, []);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity, willChange: 'transform, opacity' }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden cinematic-dark px-4 md:px-8 lg:px-16"
    >
      {/* Animated background elements - Pastel */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-[10%] top-[20%] w-72 h-72 bg-pink-300/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute right-[15%] bottom-[25%] w-96 h-96 bg-rose-300/35 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute left-[50%] top-[50%] w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Grid pattern overlay - Pastel */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `linear-gradient(rgba(255,182,193,0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,182,193,0.15) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto py-32">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xs uppercase tracking-[0.5em] text-pink-400 font-semibold mb-6 modern-subheadline"
        >
          Our first chapter
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-[0.9] mb-8"
        >
          <span className="block gradient-text neon-glow modern-headline dynamic-glow">
            {content.heading.split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1, y: -5 }}
                style={{ marginRight: '0.1em' }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl text-xl md:text-2xl lg:text-3xl modern-body text-gray-600 leading-relaxed"
        >
          {content.subheading}
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="mx-auto mt-12 max-w-4xl rounded-2xl glass-modern glass-shimmer p-8 md:p-12 border border-pink-300/40"
        >
          <p className="text-xl md:text-2xl lg:text-3xl modern-body italic leading-relaxed text-gray-700">
            "{content.dedication}"
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <svg className="h-6 w-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="font-handwritten text-pink-400 text-lg">Forever & Always</span>
          </div>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center items-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.08, 
              boxShadow: "0 25px 50px rgba(255, 182, 193, 0.6)",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-gradient-to-r from-pink-400 to-rose-400 px-12 py-4 text-white text-lg font-semibold shadow-2xl transition-all relative overflow-hidden group"
            onClick={onPrimaryClick}
            animate={{
              boxShadow: [
                "0 10px 30px rgba(255, 182, 193, 0.4)",
                "0 15px 40px rgba(255, 182, 193, 0.6)",
                "0 10px 30px rgba(255, 182, 193, 0.4)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="relative z-10">{content.ctaPrimary}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: "rgba(255, 182, 193, 0.8)", backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border-2 border-pink-300/60 px-12 py-4 text-gray-700 text-lg font-semibold transition-all backdrop-blur-sm glass-modern"
            onClick={onSecondaryClick}
          >
            {content.ctaSecondary}
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-pink-400/60"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

