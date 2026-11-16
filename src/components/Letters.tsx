import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { resolvePublicAssetUrl } from "../utils/assetUrl";

type Letter = {
  id: string;
  name: string;
  cover: string;
  pages: string[];
  /** Scans that were photographed sideways are turned upright. */
  rotate?: boolean;
  /** width / height of each page scan, used to reserve space. */
  ratio: number;
};

const dir = "/media/photos/Letters";

const letters: Letter[] = [
  { id: "A", name: "CIMB 2024 note", cover: `${dir}/Cover A.jpg`, pages: [`${dir}/Body A.jpg`], ratio: 1920 / 2560 },
  { id: "B", name: "CIMB 2024 letter", cover: `${dir}/Cover B.jpg`, pages: [`${dir}/Body B1.jpg`, `${dir}/Body B2.jpg`], ratio: 1960 / 2560 },
  { id: "C", name: "Christmas 2024", cover: `${dir}/Cover C.jpg`, pages: [`${dir}/Body C.jpg`], ratio: 1727 / 2560 },
  { id: "D", name: "Before Europe, 2025", cover: `${dir}/Cover D.jpg`, pages: [`${dir}/Body D.jpg`], ratio: 1779 / 2560 },
  { id: "E", name: "After Europe, 2025", cover: `${dir}/Cover E.jpg`, pages: [`${dir}/Body E.jpg`], rotate: true, ratio: 1838 / 2560 }
];

const TILTS = [-2, 1.5, -1, 2, -1.5];

function Reader({ letter, onClose }: { letter: Letter; onClose: () => void }) {
  const [page, setPage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageCount = letter.pages.length;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setPage((p) => Math.min(p + 1, pageCount - 1));
      if (event.key === "ArrowLeft") setPage((p) => Math.max(p - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, pageCount]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, left: 0 });
  }, [page, zoomed]);

  // A sideways scan is shown landscape: its box uses the inverse ratio.
  const boxRatio = letter.rotate ? 1 / letter.ratio : letter.ratio;
  const barButton =
    "inline-flex min-h-[2.75rem] items-center gap-2 rounded-full bg-white/15 px-4 text-sm font-semibold hover:bg-white/30 focus-visible:outline-white disabled:opacity-40";

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={letter.name} className="fixed inset-0 z-50 flex flex-col bg-ink text-white">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <p className="font-display text-xl">
          {letter.name}
          {pageCount > 1 && (
            <span className="ml-3 font-body text-sm text-white/70">
              Page {page + 1} of {pageCount}
            </span>
          )}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {pageCount > 1 && (
            <>
              <button type="button" className={barButton} disabled={page === 0} onClick={() => setPage(page - 1)}>
                Previous page
              </button>
              <button type="button" className={barButton} disabled={page === pageCount - 1} onClick={() => setPage(page + 1)}>
                Next page
              </button>
            </>
          )}
          <button type="button" className={barButton} aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>
            {zoomed ? "Zoom out" : "Zoom in"}
          </button>
          <button ref={closeRef} type="button" className={barButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-auto overscroll-contain px-3 pb-6 sm:px-6">
        <div
          className="relative mx-auto bg-white shadow-lift"
          style={{
            width: zoomed ? "220%" : "100%",
            maxWidth: zoomed ? "none" : `min(100%, calc((100vh - 9rem) * ${boxRatio}))`,
            aspectRatio: String(boxRatio)
          }}
          onDoubleClick={() => setZoomed(!zoomed)}
        >
          <img
            key={letter.pages[page]}
            src={resolvePublicAssetUrl(letter.pages[page])}
            alt={`${letter.name}, handwritten${pageCount > 1 ? `, page ${page + 1}` : ""}`}
            draggable={false}
            className="absolute left-1/2 top-1/2 max-w-none select-none"
            style={
              letter.rotate
                ? { width: `${letter.ratio * 100}%`, transform: "translate(-50%, -50%) rotate(-90deg)" }
                : { width: "100%", transform: "translate(-50%, -50%)" }
            }
          />
        </div>
      </div>
      <p className="px-6 pb-4 text-center text-xs text-white/60">
        {zoomed ? "Drag or scroll to move around the page." : "Double-tap the page, or use Zoom in, to read the small writing."}
      </p>
    </div>,
    document.body
  );
}

/** The handwritten letters: a row of covers, each opening in a reader with zoom. */
export function Letters() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = letters.find((letter) => letter.id === openId) ?? null;

  return (
    <section aria-labelledby="letters-title" className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-16">
      <h1 id="letters-title" className="font-display text-5xl sm:text-7xl">
        The handwritten ones
      </h1>
      <p className="mt-5 max-w-xl text-lg text-ink-soft">
        {letters.length} cards and letters, oldest first. Tap one to read it.
      </p>

      <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {letters.map((letter, i) => (
          <li key={letter.id}>
            <button
              type="button"
              onClick={() => setOpenId(letter.id)}
              className="print block w-full text-left"
              style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}
            >
              <span className="block aspect-[3/4] overflow-hidden bg-tulip-soft">
                <img
                  src={resolvePublicAssetUrl(letter.cover)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="mt-2 block px-1 font-display text-lg leading-tight">{letter.name}</span>
              <span className="block px-1 text-sm text-ink-soft">
                {letter.pages.length === 1 ? "1 page" : `${letter.pages.length} pages`}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open && <Reader letter={open} onClose={() => setOpenId(null)} />}
    </section>
  );
}
