import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SONG_URL = "/Audio/audio_1.ogg";

export function AmbientAudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(SONG_URL);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    setIsReady(true);

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlayback = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio playback failed", error);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      onClick={togglePlayback}
      disabled={!isReady}
      className="fixed top-6 right-6 z-30 flex items-center gap-3 rounded-full bg-white px-4 py-2 text-rose-700 shadow-xl border-2 border-rose-300/60 backdrop-blur-sm transition hover:scale-105 disabled:cursor-not-allowed font-semibold"
    >
      <span className="h-3 w-3 rounded-full bg-blush-500 shadow-inner">
        {isPlaying && <span className="sr-only">Playing</span>}
      </span>
      {isPlaying ? "Pause this" : "Play this"}
    </motion.button>
  );
}

