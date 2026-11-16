import { useEffect, useMemo, useState } from "react";
import { monthlyTimelineData, type MonthlyTimelineEntry } from "../data/content";
import { loadMonthlyTimeline } from "../utils/contentManager";
import { resolvePublicAssetUrl } from "../utils/assetUrl";
import { Lightbox } from "./Lightbox";
import { Postmark } from "./Postmark";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const YEAR = 2025;
/** Photos shown per month before "Show all". */
const PREVIEW_COUNT = 8;
/** Small fixed tilts so the prints look hand-placed. */
const TILTS = [-1.6, 1.1, -0.6, 1.8, -1.2, 0.7, 1.4, -0.9];

const isVideo = (entry: MonthlyTimelineEntry) => entry.type === "video" || /\.(mp4|webm|mov)$/i.test(entry.image);

/** Built-in photos first, then anything added in edit mode. */
function mergeEntries(saved: Record<number, MonthlyTimelineEntry[]>) {
  const merged: Record<number, MonthlyTimelineEntry[]> = {};
  MONTHS.forEach((_, month) => {
    const defaults = monthlyTimelineData[month] || [];
    const known = new Set(defaults.map((entry) => entry.image));
    const extra = (saved[month] || []).filter((entry) => !known.has(entry.image));
    merged[month] = [...defaults, ...extra];
  });
  return merged;
}

export function countPhotos(): number {
  return Object.values(monthlyTimelineData).reduce((sum, list) => sum + list.length, 0);
}

function Print({ entry, tilt, onOpen }: { entry: MonthlyTimelineEntry; tilt: number; onOpen: () => void }) {
  const [missing, setMissing] = useState(false);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="print block w-full text-left"
      style={{ transform: `rotate(${tilt}deg)` }}
      aria-label={`Open photo: ${entry.caption}`}
    >
      <span className="relative block aspect-[4/5] overflow-hidden bg-tulip-soft">
        {missing ? (
          <span className="flex h-full items-center justify-center p-3 text-center text-sm text-ink-soft">
            This photo didn't load
          </span>
        ) : isVideo(entry) ? (
          <>
            <video src={resolvePublicAssetUrl(entry.image)} muted playsInline preload="metadata" className="h-full w-full object-cover" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/70 text-white">
                <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </>
        ) : (
          <img
            src={resolvePublicAssetUrl(entry.image)}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setMissing(true)}
            className="h-full w-full object-cover"
          />
        )}
      </span>
      <span className="mt-2 block px-1 font-hand text-xl leading-tight text-ink line-clamp-2">{entry.caption}</span>
    </button>
  );
}

/**
 * 2025, one chapter per month. Months without photos are left out.
 * A month rail (side on wide screens, chips on phones) jumps between chapters.
 */
export function Months() {
  const [entries, setEntries] = useState(() => mergeEntries({}));
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [viewer, setViewer] = useState<{ month: number; index: number } | null>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    loadMonthlyTimeline().then((saved) => setEntries(mergeEntries(saved)));
  }, []);

  const chapters = useMemo(
    () => MONTHS.map((name, month) => ({ name, month, list: entries[month] || [] })).filter((c) => c.list.length > 0),
    [entries]
  );

  // Highlight the month currently on screen.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (hits) => {
        hits.forEach((hit) => {
          if (hit.isIntersecting) setCurrent(Number((hit.target as HTMLElement).dataset.month));
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    document.querySelectorAll<HTMLElement>("[data-month]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapters.length]);

  const jumpTo = (month: number) => {
    document.getElementById(`month-${month}`)?.scrollIntoView({ block: "start" });
  };

  if (chapters.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="font-display text-4xl">2025 in photos</h2>
        <p className="mt-4 text-ink-soft">No photos yet. Press Ctrl+K to open edit mode and add some.</p>
      </section>
    );
  }

  return (
    <section id="photos" aria-labelledby="photos-title" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="airmail h-1.5 rounded-full" aria-hidden />
        <div className="py-12 sm:py-16">
          <h2 id="photos-title" className="font-display text-4xl sm:text-6xl">
            {YEAR}, month by month
          </h2>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">
            Every photo opens bigger. Tap one, then swipe or use the arrow keys.
          </p>
        </div>
      </div>

      {/* Month chips on phones and tablets */}
      <nav aria-label="Jump to a month" className="sticky top-16 z-30 border-y border-ink/10 bg-paper/95 backdrop-blur lg:hidden">
        <ul className="flex gap-1 overflow-x-auto px-3 py-2">
          {chapters.map(({ name, month }) => (
            <li key={month} className="shrink-0">
              <button
                type="button"
                onClick={() => jumpTo(month)}
                aria-current={current === month ? "true" : undefined}
                className={`min-h-[2.5rem] rounded-full px-4 text-sm font-semibold ${
                  current === month ? "bg-ink text-white" : "text-ink hover:bg-tulip-soft"
                }`}
              >
                {name.slice(0, 3)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:grid lg:grid-cols-[7rem_1fr] lg:gap-10">
        {/* Month rail on wide screens */}
        <nav aria-label="Jump to a month" className="hidden lg:block">
          <ul className="sticky top-24 space-y-0.5 border-l-2 border-ink/10">
            {chapters.map(({ name, month }) => (
              <li key={month}>
                <button
                  type="button"
                  onClick={() => jumpTo(month)}
                  aria-current={current === month ? "true" : undefined}
                  className={`-ml-0.5 block w-full border-l-2 py-1.5 pl-4 text-left text-sm font-semibold transition-colors ${
                    current === month ? "border-tulip-deep text-tulip-deep" : "border-transparent text-ink-soft hover:text-ink"
                  }`}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          {chapters.map(({ name, month, list }) => {
            const showAll = expanded[month] || list.length <= PREVIEW_COUNT;
            const visible = showAll ? list : list.slice(0, PREVIEW_COUNT);
            return (
              <section
                key={month}
                id={`month-${month}`}
                data-month={month}
                aria-labelledby={`month-${month}-title`}
                className="scroll-mt-32 pb-20 pt-8 lg:scroll-mt-24"
              >
                <header className="mb-8 flex items-center gap-4">
                  <Postmark top={String(YEAR)} center={name.slice(0, 3).toUpperCase()} className="h-20 w-20 shrink-0 -rotate-12 text-tulip-deep" />
                  <div>
                    <h3 id={`month-${month}-title`} className="font-display text-3xl sm:text-4xl">
                      {name}
                    </h3>
                    <p className="text-ink-soft">
                      {list.length} {list.length === 1 ? "photo" : "photos"}
                    </p>
                  </div>
                </header>

                <ul className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 sm:gap-x-6 xl:grid-cols-4">
                  {visible.map((entry, i) => (
                    <li key={entry.id}>
                      <Print
                        entry={entry}
                        tilt={TILTS[(i + month) % TILTS.length]}
                        onOpen={() => setViewer({ month, index: list.indexOf(entry) })}
                      />
                    </li>
                  ))}
                </ul>

                {!showAll && (
                  <button
                    type="button"
                    onClick={() => setExpanded((prev) => ({ ...prev, [month]: true }))}
                    className="btn-quiet mt-8"
                  >
                    Show all {list.length} from {name}
                  </button>
                )}
              </section>
            );
          })}
        </div>
      </div>

      {viewer && entries[viewer.month] && (
        <Lightbox
          items={entries[viewer.month]}
          index={viewer.index}
          title={`${MONTHS[viewer.month]} ${YEAR}`}
          onIndexChange={(index) => setViewer({ month: viewer.month, index })}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
}
