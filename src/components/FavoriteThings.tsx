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
    <section className="rounded-3xl bg-gradient-to-br from-white via-rose-50/50 to-pink-50/50 p-8 md:p-12 shadow-2xl ring-1 ring-rose-100">
      <div className="mb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm uppercase tracking-[0.4em] text-rose-500 font-semibold"
        >
          Things She Loves
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 font-display text-4xl md:text-5xl font-bold text-rose-900 editorial-headline"
        >
          Her Favorite Things
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-lg md:text-xl text-rose-700 editorial-body"
        >
          The little things that make her smile
        </motion.p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favoriteThings.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => setSelectedItem(selectedItem === index ? null : index)}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-rose-100 transition-all cursor-pointer hover:shadow-xl"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity group-hover:opacity-20`} />
            <div className="relative text-center">
              <motion.div
                className="mb-4 text-7xl"
                animate={selectedItem === index ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                {item.emoji}
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-rose-900">
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
                <p className="text-sm text-rose-600 text-center">
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
