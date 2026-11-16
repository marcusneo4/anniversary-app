import { useEffect, useState } from "react";
import { story } from "../data/content";
import { defaultVisitedCountries, type VisitedCountry } from "../data/countries";
import { loadCountries } from "../utils/storageService";
import { OpeningLetter } from "./OpeningLetter";
import { Months, countPhotos } from "./Months";
import { Surprise } from "./Surprise";

const DAY = 24 * 60 * 60 * 1000;

function daysTogether(): number {
  const start = new Date(`${story.togetherSince}T00:00:00`).getTime();
  return Math.max(0, Math.floor((Date.now() - start) / DAY));
}

type OurYearProps = {
  onOpenLetters: () => void;
};

/** The main page: envelope and letter, 2025 month by month, three numbers, the surprise. */
export function OurYear({ onOpenLetters }: OurYearProps) {
  const [countries, setCountries] = useState(defaultVisitedCountries.length);

  useEffect(() => {
    loadCountries().then((saved: VisitedCountry[]) => {
      const names = new Set([...defaultVisitedCountries, ...saved].map((c) => c.name));
      setCountries(names.size);
    });
  }, []);

  const scrollToPhotos = () => document.getElementById("photos")?.scrollIntoView({ block: "start" });

  return (
    <>
      <OpeningLetter onSkip={scrollToPhotos} />
      <Months />

      <section aria-label="So far" className="mx-auto max-w-4xl px-6 pb-24 pt-4 text-center">
        <p className="font-display text-3xl leading-snug sm:text-5xl sm:leading-tight">
          {daysTogether().toLocaleString()} days, {countPhotos()} photos and {countries} countries so far.
        </p>
        <p className="mt-6 text-lg text-ink-soft">
          The handwritten ones are on their own page.
        </p>
        <button type="button" onClick={onOpenLetters} className="btn-primary mt-6">
          Read the letters
        </button>
      </section>

      <Surprise />
    </>
  );
}
