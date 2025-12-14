import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoveLetter() {
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isOpened) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpened(true);
      setIsAnimating(false);
    }, 1500);
  };

  const letterContent = `HELLOOO to the sweetest and hottest GF IN THE ENTIRE UNIVERSE.

WOW i really can't believe it's been a year already but i still feel excited meeting you every single time. looking back at this year we really been thru ALOT TOGETHER. our first CNY together, first Valentine's dayy, first OVERSEAS TRIP, first LDR.

tbh i promised my self i would never do LDR with anyone. but with you i just felt that you were someone special and really worth the LDR and im really happy that things worked out sooo welll and we became even closer.

i tot if we lived together in Europe i would see another side of you that would be very unreasonable and mean? but that was the opposite. u were so easy to travel with and u LIKED ALL THE SAME FOOD AS ME and u weren't calculative or SHELTERED/Princess.

and ik

and Europe just felt like a fever dream it felt so long ago but u made me like travelling again. and everyday we still had so many things to talk about even till now and im very grateful every single day and wont take this r/s for granted.

and i was sooo sooo happy when u came back! i tot you might change after Europe like some ppl do LOOL BUT NAHH V GOOD.

and we also celebrated your 23rd birthday together I RLY HOPED U LIKED EVERYTHING cus i was planning everything out and in the future I hope to come up with interesting celebrations.

even though birthdays don't mean much to me. ik it really means alot to u n that's all that matters for me. seeing u smile every day

the later half of 2025 was very busy for both of us but we still tried to meet twice a week. n i was always eager to head over to RP Mrt just to have lunch with u n i never felt that it was troublesome.

the day u got ur dream internship also made me very happy n the support u gave me throughout my dbs application gave me the motivation to work hard for it!!

i just want to say im genuinely serious about you and i do see a long future with you in it ❤️`;

  return (
    <div className="relative w-full flex items-center justify-center py-16 px-4">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -10 }}
            className="relative cursor-pointer"
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Envelope */}
            <motion.div
              className="relative"
              animate={isAnimating ? {
                scale: [1, 1.1, 0.9],
                y: [0, -10, 0],
              } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {/* Envelope back */}
              <div className="relative w-64 h-48 bg-gradient-to-br from-pink-200 to-rose-300 rounded-lg shadow-2xl overflow-hidden">
                {/* Envelope flap */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-pink-300 to-rose-400 rounded-t-lg origin-top"
                  animate={isAnimating ? {
                    rotateX: [0, -160],
                    y: [0, -5],
                  } : {}}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                >
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent border-t-[24px] border-t-pink-400"></div>
                </motion.div>
                
                {/* Heart seal */}
                <motion.div
                  className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10"
                  animate={isAnimating ? {
                    scale: [1, 1.5, 0],
                    opacity: [1, 1, 0],
                  } : {
                    scale: [1, 1.1, 1],
                  }}
                  transition={isAnimating ? { duration: 1.5 } : { duration: 2, repeat: Infinity }}
                >
                  <svg className="w-12 h-12 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.div>

                {/* Sparkles */}
                {!isAnimating && (
                  <>
                    <motion.div
                      className="absolute top-4 right-8 w-2 h-2 bg-pink-400 rounded-full"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-rose-400 rounded-full"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    <motion.div
                      className="absolute top-12 left-8 w-1 h-1 bg-pink-300 rounded-full"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </>
                )}
              </div>
            </motion.div>

            {/* Click hint */}
            {!isAnimating && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-center text-pink-500 font-handwritten text-lg"
              >
                Click to open ❤️
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50, rotateY: -90 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            {/* Letter paper */}
            <div className="relative glass-modern rounded-2xl p-8 md:p-12 shadow-2xl border-2 border-pink-200/50">
              {/* Decorative corner */}
              <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-pink-300/40 rounded-tl-lg"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-pink-300/40 rounded-br-lg"></div>

              {/* Letter content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative z-10"
              >
                <div className="font-handwritten text-gray-700 text-lg md:text-xl leading-relaxed whitespace-pre-line">
                  {letterContent.split('\n\n').map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                      className="mb-6 last:mb-0"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Signature area */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="mt-12 flex items-center justify-end gap-3"
                >
                  <svg className="h-8 w-8 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="font-handwritten text-pink-500 text-2xl">Forever Yours</span>
                </motion.div>
              </motion.div>

              {/* Floating hearts */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-300/30 text-2xl"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + i * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  ❤️
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
