import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { resolvePublicAssetUrl } from "../utils/assetUrl";

export type LightboxItem = {
  id: number;
  image: string;
  alt: string;
  caption: string;
  date?: string;
  location?: string;
  type?: "photo" | "video";
};

type LightboxProps = {
  items: LightboxItem[];
  index: number;
  /** Shown next to the counter, e.g. "April 2025". */
  title: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

const isVideo = (item: LightboxItem) => item.type === "video" || /\.(mp4|webm|mov)$/i.test(item.image);

/**
 * Full-screen photo viewer.
 * Left/right arrow keys, the on-screen arrows, or a swipe move between photos.
 * Esc or the close button closes it. The page behind keeps its scroll position.
 */
export function Lightbox({ items, index, title, onIndexChange, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const item = items[index];
  const hasMany = items.length > 1;

  const go = useCallback(
    (step: number) => onIndexChange((index + step + items.length) % items.length),
    [index, items.length, onIndexChange]
  );

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
      if (event.key === "ArrowRight" && hasMany) go(1);
      if (event.key === "ArrowLeft" && hasMany) go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, hasMany, onClose]);

  if (!item) return null;

  const arrowClass =
    "absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 sm:flex";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title}, photo ${index + 1} of ${items.length}`}
      className="fixed inset-0 z-50 flex flex-col bg-ink text-white"
      onClick={onClose}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null || !hasMany) return;
        const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
        if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-semibold">
          {title}
          <span className="ml-3 font-normal text-white/70">
            {index + 1} of {items.length}
          </span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full bg-white/15 px-4 text-sm font-semibold hover:bg-white/30 focus-visible:outline-white"
        >
          Close
          <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
        {hasMany && (
          <button
            type="button"
            aria-label="Previous photo"
            className={`${arrowClass} left-4 focus-visible:outline-white`}
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
        )}

        {isVideo(item) ? (
          <video
            key={item.id}
            src={resolvePublicAssetUrl(item.image)}
            controls
            playsInline
            className="max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <img
            key={item.id}
            src={resolvePublicAssetUrl(item.image)}
            alt={item.alt}
            className="max-h-full max-w-full bg-white object-contain p-1.5 shadow-lift sm:p-2"
            onClick={(e) => e.stopPropagation()}
          />
        )}

        {hasMany && (
          <button
            type="button"
            aria-label="Next photo"
            className={`${arrowClass} right-4 focus-visible:outline-white`}
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      <div className="px-6 pb-6 pt-4 text-center" onClick={(e) => e.stopPropagation()}>
        <p className="mx-auto max-w-2xl font-hand text-2xl leading-snug">{item.caption}</p>
        {(item.date || item.location) && (
          <p className="mt-1 text-sm text-white/70">{[item.date, item.location].filter(Boolean).join(", ")}</p>
        )}
        {hasMany && <p className="mt-2 text-xs text-white/60 sm:hidden">Swipe for the next one</p>}
      </div>
    </div>,
    document.body
  );
}
