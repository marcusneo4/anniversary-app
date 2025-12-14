import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { timelineMilestones, galleryMoments, loveNotes } from "../data/content";

export function RelationshipStats() {
  const [daysTogether, setDaysTogether] = useState(0);
  const [hoursTogether, setHoursTogether] = useState(0);
  const [minutesTogether, setMinutesTogether] = useState(0);

  useEffect(() => {
    // Calculate days since official dating start (September 21, 2024)
    const startDate = new Date("2024-09-21");
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - startDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

    // Animate counting up
    const animateValue = (
      setter: (val: number) => void,
      target: number,
      duration: number
    ) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateValue(setDaysTogether, diffDays, 2000);
    animateValue(setHoursTogether, diffHours, 2000);
    animateValue(setMinutesTogether, diffMinutes, 2000);
  }, []);

  const stats = [
    {
      label: "Days Together",
      value: daysTogether.toLocaleString(),
      icon: "📅",
      color: "from-rose-500 to-pink-500"
    },
    {
      label: "Memories Captured",
      value: galleryMoments.length,
      icon: "📸",
      color: "from-pink-500 to-rose-500"
    },
    {
      label: "Milestones",
      value: timelineMilestones.length,
      icon: "⭐",
      color: "from-rose-400 to-pink-400"
    },
    {
      label: "Love Notes",
      value: loveNotes.length,
      icon: "💌",
      color: "from-pink-400 to-rose-400"
    },
    {
      label: "Locations Visited",
      value: new Set(timelineMilestones.map(m => m.location)).size,
      icon: "🌍",
      color: "from-rose-600 to-pink-600"
    },
    {
      label: "Hours Together",
      value: (daysTogether * 24 + hoursTogether).toLocaleString(),
      icon: "⏰",
      color: "from-pink-600 to-rose-600"
    }
  ];

  return (
    <section className="rounded-3xl bg-gradient-to-br from-white via-rose-50/50 to-pink-50/50 p-8 md:p-12 shadow-2xl ring-1 ring-rose-100 romantic-texture">
      <div className="mb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm uppercase tracking-[0.4em] text-rose-500 font-semibold"
        >
          By The Numbers
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 font-display text-5xl md:text-6xl font-bold text-rose-900 editorial-headline"
        >
          Our Story in Stats
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-lg md:text-xl text-rose-700 editorial-body"
        >
          Every moment counted, every memory treasured
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 inline-block rounded-full bg-gradient-to-r from-rose-200 to-pink-200 px-6 py-2 border border-rose-300/50"
        >
          <p className="text-sm font-semibold text-rose-800">
            💕 Officially dating since September 21, 2024 💕
          </p>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-rose-100 transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity group-hover:opacity-10`} />
            <div className="relative">
              <motion.div
                className="mb-4 text-5xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                {stat.icon}
              </motion.div>
              <div className="mb-3 font-display text-4xl md:text-5xl font-bold text-rose-900 editorial-headline">
                {stat.value}
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-rose-600">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 rounded-3xl bg-gradient-to-r from-rose-200 via-pink-200 to-rose-300 p-8 text-center border-2 border-rose-300/50"
      >
        <p className="text-2xl md:text-3xl font-handwritten text-rose-800">
          And counting... <span className="text-4xl">💕</span>
        </p>
      </motion.div>
    </section>
  );
}

