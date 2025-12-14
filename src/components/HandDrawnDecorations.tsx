import { motion } from "framer-motion";

export function HandDrawnDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Hand-drawn hearts */}
      <motion.svg
        className="absolute top-10 right-10 h-16 w-16 text-rose-300/40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </motion.svg>

      <motion.svg
        className="absolute bottom-20 left-8 h-12 w-12 text-pink-300/30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.15, 1],
          rotate: [0, -8, 8, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </motion.svg>

      {/* Hand-drawn swirls */}
      <motion.svg
        className="absolute top-1/3 left-4 h-20 w-20 text-rose-200/20"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      >
        <path d="M50,20 Q30,40 20,50 Q10,60 20,70 Q30,80 50,80 Q70,80 80,70 Q90,60 80,50 Q70,40 50,20" />
      </motion.svg>

      {/* Romantic script text decoration */}
      <motion.div
        className="absolute bottom-10 right-1/4 font-handwritten text-6xl text-rose-200/20"
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          rotate: [-10, 5, -10]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        ✨
      </motion.div>
    </div>
  );
}

