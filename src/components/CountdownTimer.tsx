import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type CountdownTimerProps = {
  targetDate: string; // Format: "YYYY-MM-DD"
  label?: string;
};

export function CountdownTimer({ targetDate, label = "Until our next anniversary" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds }
  ];

  return (
    <section className="rounded-2xl lg:rounded-3xl glass-modern p-8 md:p-12 border border-white/10 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-pink-600/10 opacity-50"></div>
      
      <div className="relative z-10">
        <div className="mb-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.5em] text-pink-400/70 font-semibold mb-4 modern-subheadline"
          >
            {label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white modern-headline"
          >
            Counting the moments
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {units.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="rounded-xl glass-modern p-6 md:p-8 text-center border border-white/10 relative overflow-hidden group"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <motion.div
                key={unit.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white relative z-10 modern-headline gradient-text"
              >
                {String(unit.value).padStart(2, "0")}
              </motion.div>
              <div className="mt-3 text-xs md:text-sm uppercase tracking-wider text-gray-400 relative z-10 modern-subheadline">{unit.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

