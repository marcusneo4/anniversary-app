import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { timelineMilestones, type TimelineMilestone } from "../data/content";
import { loadTimeline } from "../utils/contentManager";

export function Timeline() {
  const [milestones, setMilestones] = useState<TimelineMilestone[]>(timelineMilestones);

  useEffect(() => {
    const loadData = async () => {
      const saved = await loadTimeline();
      if (saved.length > 0) {
        setMilestones(saved);
      } else {
        setMilestones(timelineMilestones);
      }
    };
    loadData();
  }, []);

  return (
    <section className="rounded-3xl bg-white/90 p-8 shadow-2xl ring-1 ring-rose-100">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-rose-400">Milestones</p>
        <h2 className="mt-3 font-display text-3xl text-rose-900">How we got here</h2>
        <p className="mt-2 text-rose-600">
          Each dot on this timeline is a heartbeat we chose to share.
        </p>
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-4 top-0 h-full w-1 rounded-full bg-gradient-to-b from-blush-300 to-blush-500 sm:left-1/2 sm:-ml-0.5" />
        <ul className="space-y-12">
          {milestones.map((milestone, index) => (
            <motion.li
              key={milestone.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col gap-4 rounded-2xl bg-white/80 p-6 shadow-lg ring-1 ring-rose-50 sm:w-[calc(50%-1.5rem)] ${
                index % 2 === 0 ? "sm:ml-auto sm:text-left" : "sm:mr-auto sm:text-right"
              }`}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-blush-400">
                {milestone.date} • {milestone.location}
              </span>
              <h3 className="font-display text-2xl text-rose-900">{milestone.title}</h3>
              <p className="text-rose-700">{milestone.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

