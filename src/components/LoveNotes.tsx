import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { loveNotes, type LoveNote } from "../data/content";
import { loadLoveNotes } from "../utils/contentManager";
import { HandDrawnDecorations } from "./HandDrawnDecorations";

export function LoveNotes() {
  const [notes, setNotes] = useState<LoveNote[]>(loveNotes);

  useEffect(() => {
    const loadData = async () => {
      const saved = await loadLoveNotes();
      if (saved.length > 0) {
        setNotes(saved);
      } else {
        setNotes(loveNotes);
      }
    };
    loadData();
  }, []);

  return (
    <section className="relative rounded-3xl bg-gradient-to-br from-rose-50 via-pink-50/80 to-rose-100/90 p-8 md:p-12 shadow-2xl ring-1 ring-rose-200/50 romantic-texture overflow-hidden">
      <HandDrawnDecorations />
      
      <div className="relative mb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm uppercase tracking-[0.4em] text-rose-500 font-semibold"
        >
          Letters
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 font-display text-4xl md:text-5xl font-bold text-rose-900 editorial-headline"
        >
          Little notes for forever
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-lg text-rose-600 editorial-body"
        >
          Tap a card to flip between feelings and promises.
        </motion.p>
      </div>

      <div className="asymmetrical-grid relative z-10">
        {notes.map((note, index) => (
          <motion.article
            key={note.id}
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
            className="group rounded-3xl"
            style={{ perspective: "1200px" }}
            whileHover={{ scale: 1.02, zIndex: 10 }}
          >
            <div className="relative min-h-[280px] w-full transform rounded-3xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front side */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white via-rose-50 to-pink-50 p-8 shadow-xl border-2 border-rose-200/50 [backface-visibility:hidden]">
                <div className="flex items-start justify-between mb-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-blush-500 font-semibold">{note.title}</p>
                  <motion.svg
                    className="h-6 w-6 text-rose-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </motion.svg>
                </div>
                <p className="text-lg md:text-xl text-rose-800 editorial-body leading-relaxed">{note.body}</p>
              </div>
              
              {/* Back side */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 p-8 text-white shadow-xl border-2 border-rose-400/30 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="flex items-start justify-between mb-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/90 font-semibold">
                    Promise #{note.id}
                  </p>
                  <svg className="h-6 w-6 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <p className="text-xl md:text-2xl font-handwritten leading-relaxed">{note.promise}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

