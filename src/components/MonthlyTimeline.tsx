import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { monthlyTimelineData, type MonthlyTimelineEntry } from "../data/content";
import { loadMonthlyTimeline } from "../utils/contentManager";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function MonthlyTimeline() {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [entries, setEntries] = useState<Record<number, MonthlyTimelineEntry[]>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const saved = loadMonthlyTimeline();
    if (Object.keys(saved).length > 0) {
      setEntries(saved);
    } else {
      // Initialize with empty entries for each month
      const initialEntries: Record<number, MonthlyTimelineEntry[]> = {};
      months.forEach((_, index) => {
        initialEntries[index] = monthlyTimelineData[index] || [];
      });
      setEntries(initialEntries);
    }
  }, []);

  const currentMonthEntries = entries[selectedMonth] || [];

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-gradient-to-br from-white via-rose-50/50 to-pink-50/50 p-8 shadow-2xl ring-1 ring-rose-100"
    >
      <div className="mb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm uppercase tracking-[0.4em] text-rose-500 font-semibold"
        >
          2025 Timeline
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 font-display text-5xl md:text-6xl font-bold text-rose-900 editorial-headline"
        >
          Our Year in Pictures
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-lg md:text-xl text-rose-700 editorial-body"
        >
          Each month holds memories we'll treasure forever
        </motion.p>
      </div>

      {/* Month Selector */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {months.map((month, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedMonth(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
              selectedMonth === index
                ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg"
                : "bg-white text-rose-700 hover:bg-rose-100 border border-rose-200"
            }`}
          >
            {month.slice(0, 3)}
          </motion.button>
        ))}
      </div>

      {/* Selected Month Display */}
      <motion.div
        key={selectedMonth}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h3 className="font-display text-3xl text-rose-900">{months[selectedMonth]} 2025</h3>
          <p className="mt-2 text-sm text-rose-600">
            {currentMonthEntries.length} {currentMonthEntries.length === 1 ? "memory" : "memories"}
          </p>
        </div>

        {currentMonthEntries.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-rose-300 bg-rose-50/50 p-12 text-center">
            <p className="text-rose-500">No memories added for {months[selectedMonth]} yet</p>
            <p className="mt-2 text-sm text-rose-400">Add your photos and captions in the admin panel</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentMonthEntries.map((entry, index) => (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-rose-100 transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-rose-100 to-rose-200">
                  {entry.type === "video" ? (
                    <video
                      src={entry.image}
                      className="h-full w-full object-cover"
                      loop
                      muted
                      playsInline
                      onMouseEnter={(e) => (e.currentTarget.muted = false)}
                      onMouseLeave={(e) => (e.currentTarget.muted = true)}
                    />
                  ) : (
                    <img
                      src={entry.image}
                      alt={entry.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="flex h-full items-center justify-center bg-rose-50 text-sm text-rose-400">
                              <span>Image not found</span>
                            </div>
                          `;
                        }
                      }}
                    />
                  )}
                  {entry.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="rounded-full bg-white/90 p-3 shadow-lg">
                        <svg className="h-8 w-8 text-rose-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="p-6">
                  {entry.date && (
                    <p className="text-xs uppercase tracking-wider text-rose-400 mb-2">
                      {entry.date}
                    </p>
                  )}
                  <p className="text-lg font-medium text-rose-900 line-clamp-2">{entry.caption}</p>
                  {entry.location && (
                    <p className="mt-2 text-sm text-rose-600">📍 {entry.location}</p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </motion.div>
    </motion.section>
  );
}

