import { useEffect, useRef, useState } from "react";
import { resolvePublicAssetUrl } from "../utils/assetUrl";

const SONG_URL = "/Audio/audio_1.ogg";

/** Plays or pauses the background song. Never starts on its own. */
export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    try {
      if (!audioRef.current) {
        const audio = new Audio(resolvePublicAssetUrl(SONG_URL));
        audio.loop = true;
        audio.volume = 0.3;
        audioRef.current = audio;
      }
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        setFailed(false);
      }
    } catch {
      setFailed(true);
      setIsPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isPlaying}
      className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border-2 border-ink/15 px-4 text-sm font-semibold text-ink transition-colors hover:border-ink"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-tulip-deep" fill="currentColor">
        {isPlaying ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5v14l11-7z" />}
      </svg>
      {failed ? "Music didn't load" : isPlaying ? "Pause music" : "Play music"}
    </button>
  );
}
