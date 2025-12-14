import { useState, useEffect } from "react";
import { closingToast, type ClosingToastContent } from "../data/content";
import { loadClosing } from "../utils/contentManager";

type ClosingToastProps = {
  isUnlocked: boolean;
  onPlayNext: () => void;
};

export function ClosingToast({ isUnlocked, onPlayNext }: ClosingToastProps) {
  const [content, setContent] = useState<ClosingToastContent>(closingToast);

  useEffect(() => {
    const saved = loadClosing();
    if (saved) {
      setContent(saved);
    }
  }, []);

  return (
    <section className="rounded-3xl bg-white/95 p-8 text-center shadow-2xl ring-1 ring-rose-100">
      <p className="text-sm uppercase tracking-[0.3em] text-rose-400">To be continued</p>
      <h2 className="mt-4 font-display text-4xl text-rose-900">{content.headline}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-rose-700">
        {isUnlocked
          ? content.body
          : "Solve the puzzle to unlock the note, the plan, and what I have tucked away for us."}
      </p>
      <button
        className="mt-8 rounded-full bg-gradient-to-r from-blush-500 to-blush-600 px-12 py-3 text-lg text-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={() => {
          if (isUnlocked) {
            window.open("https://www.youtube.com/watch?v=ULYksmjBwzY&list=PLIwKz7a1HOMAN0YXSJhlvZecCjnN4JYoQ&index=18", "_blank");
          } else {
            onPlayNext();
          }
        }}
        disabled={!isUnlocked}
      >
        {content.button}
      </button>
    </section>
  );
}

