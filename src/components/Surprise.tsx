import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { closingToast, puzzleClues, puzzleSolution, story, type ClosingToastContent } from "../data/content";
import { loadClosing } from "../utils/contentManager";

const SOLVED_KEY = "anniversary_puzzle_solved";
const DAY = 24 * 60 * 60 * 1000;

/** Whole days until the next anniversary. 0 means it is today. */
export function daysUntilAnniversary(now = new Date()): number {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let next = new Date(today.getFullYear(), story.anniversaryMonth - 1, story.anniversaryDay);
  if (next.getTime() < today.getTime()) {
    next = new Date(today.getFullYear() + 1, story.anniversaryMonth - 1, story.anniversaryDay);
  }
  return Math.round((next.getTime() - today.getTime()) / DAY);
}

function readSolved(): boolean {
  try {
    return localStorage.getItem(SOLVED_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * The ending: a countdown to the anniversary, then a four-letter puzzle.
 * Clues never show their answers. Solving it reveals the closing note.
 */
export function Surprise() {
  const [closing, setClosing] = useState<ClosingToastContent>(closingToast);
  const [entry, setEntry] = useState("");
  const [isSolved, setIsSolved] = useState(readSolved);
  const [error, setError] = useState<string | null>(null);
  const daysLeft = daysUntilAnniversary();
  const solution = puzzleSolution.toUpperCase();
  const clues = [...puzzleClues].sort((a, b) => a.id - b.id);

  useEffect(() => {
    loadClosing().then((saved) => {
      if (saved) setClosing(saved);
    });
  }, []);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const guess = entry.trim().toUpperCase();
    if (guess === solution) {
      setIsSolved(true);
      setError(null);
      try {
        localStorage.setItem(SOLVED_KEY, "1");
      } catch {
        /* ignore */
      }
      const calm = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (!calm) {
        try {
          confetti({ particleCount: 140, spread: 80, origin: { y: 0.7 }, colors: ["#E8648C", "#C23E6A", "#FFFFFF", "#F8D3DD"] });
        } catch {
          /* confetti needs a canvas; fine to skip */
        }
      }
    } else if (guess.length !== solution.length) {
      setError(`The word has ${solution.length} letters, one per clue.`);
    } else {
      setError("Not that word. Check each clue again, in order.");
    }
  };

  return (
    <section id="surprise" aria-labelledby="surprise-title" className="scroll-mt-16 bg-ink text-white">
      <div className="airmail h-2" aria-hidden />
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <p className="font-hand text-3xl text-tulip-soft">
          {daysLeft === 0
            ? "It's today. Happy anniversary, Shanna."
            : `${daysLeft} ${daysLeft === 1 ? "day" : "days"} until 14 December.`}
        </p>
        <h2 id="surprise-title" className="mt-3 font-display text-4xl sm:text-6xl">
          One more thing
        </h2>

        {isSolved ? (
          <div className="mt-10" role="status">
            <h3 className="font-display text-3xl text-tulip-soft">{closing.headline}</h3>
            <p className="mt-4 max-w-xl text-lg text-white/85">{closing.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={story.surpriseUrl}
                target="_blank"
                rel="noreferrer"
                className="btn bg-white text-ink hover:bg-tulip-soft focus-visible:outline-white"
              >
                {closing.button}
              </a>
              <button
                type="button"
                className="btn border-2 border-white/30 text-white hover:border-white focus-visible:outline-white"
                onClick={() => {
                  setIsSolved(false);
                  setEntry("");
                  try {
                    localStorage.removeItem(SOLVED_KEY);
                  } catch {
                    /* ignore */
                  }
                }}
              >
                Lock it again
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              There's a note locked behind a {solution.length}-letter word. Each clue gives you one letter, in order.
              Everything you need is on this site.
            </p>

            <ol className="mt-10 space-y-5">
              {clues.map((clue, i) => (
                <li key={clue.id} className="flex gap-4">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-tulip font-display text-lg text-tulip-soft"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-lg">{clue.hint}</p>
                    <p className="text-sm text-white/60">Look in: {clue.location}</p>
                  </div>
                </li>
              ))}
            </ol>

            <form onSubmit={submit} className="mt-10" noValidate>
              <label htmlFor="puzzle-word" className="block text-sm font-semibold">
                The word
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  id="puzzle-word"
                  value={entry}
                  onChange={(event) => {
                    setEntry(event.target.value);
                    setError(null);
                  }}
                  maxLength={12}
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "puzzle-error" : undefined}
                  className="min-h-[3rem] w-full rounded-full border-2 border-white/30 bg-white/10 px-6 font-display text-2xl uppercase tracking-[0.3em] text-white placeholder:text-white/30 focus:border-white focus:outline-none sm:max-w-xs"
                  placeholder={"_".repeat(solution.length)}
                />
                <button type="submit" className="btn bg-tulip text-ink hover:bg-white focus-visible:outline-white">
                  Unlock the note
                </button>
              </div>
              <p id="puzzle-error" role="alert" className="mt-3 min-h-[1.5rem] text-tulip-soft">
                {error}
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
