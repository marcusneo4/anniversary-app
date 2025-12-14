import { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { puzzleClues, puzzleSolution } from "../data/content";

const normalizedSolution = puzzleSolution.toUpperCase();

type PuzzleUnlockProps = {
  onSolved: () => void;
};

export function PuzzleUnlock({ onSolved }: PuzzleUnlockProps) {
  const [entry, setEntry] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  const clueDisplay = useMemo(() => puzzleClues.sort((a, b) => a.id - b.id), []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanedInput = entry.trim().toUpperCase();

    if (cleanedInput === normalizedSolution) {
      setIsSolved(true);
      setStatusMessage("You unlocked it! Scroll down for the surprise note.");
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });
      onSolved();
    } else {
      setIsSolved(false);
      setStatusMessage("Hmm, not quite. Revisit the clues hidden above!");
    }
  };

  return (
    <section className="rounded-3xl bg-gradient-to-br from-rose-900 to-rose-700 p-8 text-white shadow-2xl ring-1 ring-rose-700/60">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/70">Puzzle time</p>
        <h2 className="mt-3 font-display text-3xl">Unlock our future</h2>
        <p className="mt-2 text-white/80">
          Each clue hides a letter from the story you just relived. Combine them to reveal the word
          that keeps us grounded.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {clueDisplay.map((clue) => (
          <article
            key={clue.id}
            className="rounded-2xl border border-white/30 bg-white/10 p-4 backdrop-blur"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">
              Clue {clue.id} • {clue.location}
            </p>
            <p className="mt-3 text-lg">{clue.hint}</p>
            <p className="mt-4 text-sm text-white/60">
              Answer fragment: <span className="text-white">{clue.answerFragment}</span>
            </p>
          </article>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          className="flex-1 rounded-full border border-white/30 bg-white/15 px-6 py-3 text-lg text-white placeholder:text-white/50 focus:border-white focus:outline-none"
          placeholder="Type the word the clues spell out"
          value={entry}
          onChange={(event) => setEntry(event.target.value)}
        />
        <button
          type="submit"
          className="rounded-full bg-white px-8 py-3 text-rose-700 shadow-lg transition hover:scale-105 hover:bg-rose-50"
        >
          Unlock
        </button>
      </form>

      {statusMessage && (
        <p className={`mt-4 text-center text-sm ${isSolved ? "text-white" : "text-pink-200"}`}>
          {statusMessage}
        </p>
      )}
    </section>
  );
}

