import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroContent, openingLetter, type HeroContent } from "../data/content";
import { loadHero } from "../utils/contentManager";
import { Postmark } from "./Postmark";

const OPENED_KEY = "anniversary_letter_opened";

function wasOpened(): boolean {
  try {
    return localStorage.getItem(OPENED_KEY) === "1";
  } catch {
    return false;
  }
}

/** A small original tulip, drawn as the envelope's stamp. Tulips are her favourite. */
function TulipStamp() {
  return (
    <div className="stamp w-[4.5rem] rotate-3 shadow-print" aria-hidden>
      <svg viewBox="0 0 60 72" className="block w-full bg-tulip-soft">
        <path d="M30 40c0 12-1 20-1 28h2c0-8-1-16-1-28z" fill="#2F6B4F" />
        <path d="M30 60c-3-9-9-12-15-12 1 8 6 13 15 12zM31 56c2-7 7-10 13-10-1 7-5 11-13 10z" fill="#2F6B4F" />
        <path d="M30 42c-9 0-13-7-13-15 0-6 2-12 4-15l5 6 4-9 4 9 5-6c2 3 4 9 4 15 0 8-4 15-13 15z" fill="#C23E6A" />
        <path d="M30 42c-4-3-6-8-6-14 0-5 3-11 6-19 3 8 6 14 6 19 0 6-2 11-6 14z" fill="#E8648C" />
      </svg>
    </div>
  );
}

type OpeningLetterProps = {
  onSkip: () => void;
};

/**
 * The first thing on the site: an airmail envelope addressed to Shanna.
 * Opening it is the one staged animation; the letter then stays open on later visits.
 */
export function OpeningLetter({ onSkip }: OpeningLetterProps) {
  const [content, setContent] = useState<HeroContent>(heroContent);
  const [isOpen, setIsOpen] = useState(wasOpened);
  const letterRef = useRef<HTMLDivElement>(null);
  const justOpened = useRef(false);

  useEffect(() => {
    loadHero().then((saved) => {
      if (saved) setContent(saved);
    });
  }, []);

  useEffect(() => {
    if (isOpen && justOpened.current) {
      letterRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  const open = () => {
    justOpened.current = true;
    setIsOpen(true);
    try {
      localStorage.setItem(OPENED_KEY, "1");
    } catch {
      /* private mode: the letter just won't stay open next time */
    }
  };

  const close = () => {
    setIsOpen(false);
    try {
      localStorage.removeItem(OPENED_KEY);
    } catch {
      /* ignore */
    }
  };

  const paragraphs = openingLetter.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  return (
    <section aria-labelledby="opening-title" className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 id="opening-title" className="font-display text-5xl leading-[1.05] sm:text-7xl">
          {content.heading}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft sm:text-xl">{content.subheading}</p>
      </div>

      <div className="mt-10 sm:mt-14">
        <AnimatePresence mode="wait" initial={false}>
          {!isOpen ? (
            <motion.div
              key="envelope"
              exit={{ opacity: 0, y: -24, rotate: -3 }}
              transition={{ duration: 0.35, ease: "easeIn" }}
              className="mx-auto max-w-xl"
            >
              <button
                type="button"
                onClick={open}
                aria-label={`${content.ctaPrimary}. An envelope addressed to Shanna.`}
                className="airmail group block w-full -rotate-1 rounded-md p-2.5 text-left shadow-lift transition-transform duration-200 hover:rotate-0 sm:p-3"
              >
                <div className="relative aspect-[3/2] rounded-sm bg-sheet p-5 sm:p-8">
                  <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
                    <TulipStamp />
                    <Postmark
                      top="SINGAPORE"
                      center="14 DEC"
                      bottom="BY AIR MAIL"
                      className="absolute -left-14 top-6 h-24 w-24 -rotate-12 text-ink/55"
                    />
                  </div>
                  <div className="absolute bottom-[18%] left-[10%]">
                    <p className="font-hand text-2xl text-ink-soft sm:text-3xl">To</p>
                    <p className="font-hand text-5xl leading-none sm:text-7xl">Shanna</p>
                    <p className="mt-3 font-hand text-xl text-ink-soft sm:text-2xl">from Marcus</p>
                  </div>
                </div>
              </button>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button type="button" onClick={open} className="btn-primary">
                  {content.ctaPrimary}
                </button>
                <button type="button" onClick={onSkip} className="btn-quiet">
                  {content.ctaSecondary}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={justOpened.current ? { opacity: 0, y: 40, scaleY: 0.85 } : false}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
              style={{ transformOrigin: "top center" }}
              className="mx-auto max-w-2xl"
            >
              <div className="airmail h-2.5 rounded-t-md" aria-hidden />
              <article
                ref={letterRef}
                tabIndex={-1}
                aria-label="Letter from Marcus"
                className="bg-sheet px-6 py-10 shadow-lift outline-none sm:px-12 sm:py-14"
              >
                <p className="text-sm text-ink-soft">Written for our first anniversary, 14 December 2025</p>
                <div className="ruled mt-6 font-hand text-[1.45rem] sm:text-[1.6rem]">
                  {paragraphs.map((paragraph, i) => (
                    <p key={i} className="mb-[2.4rem] whitespace-pre-line last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <p className="mt-10 text-right font-hand text-4xl text-tulip-deep">Marcus</p>
              </article>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button type="button" onClick={onSkip} className="btn-primary">
                  See 2025 in photos
                </button>
                <button type="button" onClick={close} className="btn-quiet">
                  Put it back in the envelope
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
