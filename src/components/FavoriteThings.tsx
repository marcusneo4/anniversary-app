import { motion } from "framer-motion";
import { useState } from "react";

const favoriteThings = [
  { name: "Llamas", emoji: "🦙", color: "from-amber-200 to-orange-200" },
  { name: "Jelly Cat", emoji: "🧸", color: "from-pink-200 to-rose-200" },
  { name: "Paris Eiffel Tower", emoji: "🗼", color: "from-blue-200 to-indigo-200" },
  { name: "Seafood", emoji: "🦞", color: "from-cyan-200 to-teal-200" },
  { name: "Miffy", emoji: "🐰", color: "from-yellow-200 to-amber-200" },
  { name: "Tulips", emoji: "🌷", color: "from-pink-300 to-rose-300" }
];

export function FavoriteThings() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-surface-elevated via-rose-50/60 to-pink-50/50 p-8 md:p-12 shadow-tactile ring-1 ring-rose-100/80">
      {/* Asymmetric header — left-aligned on larger screens for organic feel */}
      <div className="mb-12 max-w-2xl md:pl-2">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="text-sm uppercase tracking-[0.4em] text-rose-500 font-semibold"
        >
          Things She Loves
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="mt-4 font-display text-4xl md:text-5xl font-bold text-ink-primary editorial-headline"
        >
          Her Favorite Things
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="mt-3 text-lg md:text-xl text-ink-muted editorial-body"
        >
          The little things that make her smile
        </motion.p>
      </div>

      {/* Asymmetrical masonry-style grid — varied heights for organic layout */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto] lg:auto-rows-[minmax(140px,auto)]">
        {favoriteThings.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.12 + index * 0.08, type: "spring", stiffness: 120, damping: 22 }}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={() => setSelectedItem(selectedItem === index ? null : index)}
            className={`group relative min-h-[10rem] cursor-pointer overflow-hidden rounded-2xl bg-surface-elevated p-6 shadow-tactile ring-1 ring-rose-100/60 transition-shadow duration-300 hover:shadow-tactile-hover focus-within:ring-2 focus-within:ring-rose-300/50 ${
              index === 0 ? "lg:row-span-2 lg:self-stretch" : ""
            } ${index === 4 ? "lg:col-span-2" : ""}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-20`} />
            <div className="relative flex min-h-full flex-col items-center justify-center text-center">
              <motion.div
                className="mb-3 text-6xl md:text-7xl"
                animate={selectedItem === index ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                {item.emoji}
              </motion.div>
              <h3 className="font-display text-xl font-bold text-ink-primary md:text-2xl">
                {item.name}
              </h3>
            </div>
            {selectedItem === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-rose-200"
              >
                <p className="text-center text-sm text-ink-muted">
                  One of the things that brings joy to her heart 💕
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
