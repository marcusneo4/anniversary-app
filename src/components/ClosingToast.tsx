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
    const loadData = async () => {
      const saved = await loadClosing();
      if (saved) {
        setContent(saved);
      }
    };
    loadData();
  }, []);

  return (
    <section className="rounded-3xl bg-surface-elevated p-8 text-center shadow-tactile ring-1 ring-rose-100/80">
      <p className="text-sm uppercase tracking-[0.3em] text-rose-500">To be continued</p>
      <h2 className="mt-4 font-display text-4xl text-ink-primary">{content.headline}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-muted">
        {isUnlocked
          ? content.body
          : "Solve the puzzle to unlock the note, the plan, and what I have tucked away for us."}
      </p>
      <button
        className="mt-8 min-h-[2.75rem] rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-10 py-3 text-lg font-semibold text-white shadow-tactile transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.04] hover:shadow-tactile-hover active:scale-[0.98] active:shadow-tactile-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
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

