import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { monthlyTimelineData, type MonthlyTimelineEntry } from "../data/content";
import { loadMonthlyTimeline, saveMonthlyTimeline } from "../utils/contentManager";
import { resolvePublicAssetUrl } from "../utils/assetUrl";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function MonthlyTimeline() {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [entries, setEntries] = useState<Record<number, MonthlyTimelineEntry[]>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeEntry, setActiveEntry] = useState<MonthlyTimelineEntry | null>(null);
  const [lightboxImageError, setLightboxImageError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!isLightboxOpen) {
      return;
    }

    const { scrollY } = window;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    const loadData = async () => {
      const saved = await loadMonthlyTimeline();
      
      // Always ensure default images are present
      // Merge saved data with default timeline, ensuring defaults are always included
      const mergedEntries: Record<number, MonthlyTimelineEntry[]> = {};
      
      months.forEach((_, index) => {
        const defaultEntries = monthlyTimelineData[index] || [];
        const savedEntries = saved[index] || [];
        
        // Create a set of default image paths to avoid duplicates
        const defaultImagePaths = new Set(defaultEntries.map(e => e.image));
        // Filter out saved entries that match defaults
        const savedWithoutDefaults = savedEntries.filter(e => !defaultImagePaths.has(e.image));
        
        // Combine: default entries first, then any additional saved items
        mergedEntries[index] = [...defaultEntries, ...savedWithoutDefaults];
      });
      
      setEntries(mergedEntries);
      
      // If no saved data exists, save the defaults to ensure persistence
      if (Object.keys(saved).length === 0) {
        try {
          await saveMonthlyTimeline(mergedEntries);
        } catch (e) {
          // If save fails, it's okay - defaults will still show
          // Save failed; defaults still display
        }
      }
    };
    loadData();
  }, []);

  const currentMonthEntries = entries[selectedMonth] || [];

  const handleOpenLightbox = (entry: MonthlyTimelineEntry) => {
    setLightboxImageError(false);
    setActiveEntry(entry);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => setActiveEntry(null), 250);
  };

  return (
    <>
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-gradient-to-br from-white via-rose-50/50 to-pink-50/50 p-8 shadow-2xl ring-1 ring-rose-100"
    >
      <div className="mb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm uppercase tracking-[0.4em] text-rose-500 font-semibold"
        >
          2025 Timeline
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 font-display text-5xl md:text-6xl font-bold text-rose-900 editorial-headline"
        >
          Our Year in Pictures
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-lg md:text-xl text-rose-700 editorial-body"
        >
          Each month holds memories we'll treasure forever
        </motion.p>
      </div>

      {/* Month Selector */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {months.map((month, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedMonth(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
              selectedMonth === index
                ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg"
                : "bg-white text-rose-700 hover:bg-rose-100 border border-rose-200"
            }`}
          >
            {month.slice(0, 3)}
          </motion.button>
        ))}
      </div>

      {/* Selected Month Display */}
      <motion.div
        key={selectedMonth}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h3 className="font-display text-3xl text-rose-900">{months[selectedMonth]} 2025</h3>
          <p className="mt-2 text-sm text-rose-600">
            {currentMonthEntries.length} {currentMonthEntries.length === 1 ? "memory" : "memories"}
          </p>
        </div>

        {currentMonthEntries.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-rose-300 bg-rose-50/50 p-12 text-center">
            <p className="text-rose-500">No memories added for {months[selectedMonth]} yet</p>
            <p className="mt-2 text-sm text-rose-400">Add your photos and captions in the admin panel</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentMonthEntries.map((entry, index) => (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-rose-100 transition-all hover:scale-[1.02] hover:shadow-xl"
                onClick={() => handleOpenLightbox(entry)}
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-rose-100 to-rose-200">
                  {entry.type === "video" ? (
                    <video
                      src={resolvePublicAssetUrl(entry.image)}
                      className="h-full w-full object-cover object-center"
                      loop
                      muted
                      playsInline
                      onMouseEnter={(e) => (e.currentTarget.muted = false)}
                      onMouseLeave={(e) => (e.currentTarget.muted = true)}
                    />
                  ) : (
                    <img
                      src={resolvePublicAssetUrl(entry.image)}
                      alt={entry.alt}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector("[data-image-fallback]")) {
                          const fallback = document.createElement("div");
                          fallback.setAttribute("data-image-fallback", "");
                          fallback.className = "flex h-full items-center justify-center bg-rose-50 text-sm text-rose-400";
                          fallback.textContent = "Image not found";
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  )}
                  {entry.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="rounded-full bg-white/90 p-3 shadow-lg">
                        <svg className="h-8 w-8 text-rose-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="p-6">
                  {entry.date && (
                    <p className="mb-2 text-xs uppercase tracking-wider text-rose-400">
                      {entry.date}
                    </p>
                  )}
                  <p className="text-lg font-medium text-rose-900 line-clamp-2">{entry.caption}</p>
                  {entry.location && (
                    <p className="mt-2 text-sm text-rose-600">📍 {entry.location}</p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </motion.div>
    </motion.section>
    {typeof document !== "undefined" &&
      createPortal(
        <AnimatePresence mode="wait">
          {isLightboxOpen && activeEntry && (
            <motion.div
              key={`lightbox-${activeEntry.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
              onClick={handleCloseLightbox}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(event) => event.stopPropagation()}
                className="relative max-h-[90vh] w-full max-w-5xl flex flex-col items-center justify-center"
              >
                <button
                  type="button"
                  onClick={handleCloseLightbox}
                  className="absolute -top-12 right-0 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
                  aria-label="Close"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {activeEntry.type === "video" ? (
                  <video
                    key={`video-${activeEntry.id}`}
                    src={resolvePublicAssetUrl(activeEntry.image)}
                    className="max-h-[90vh] w-auto max-w-full rounded-2xl object-contain"
                    controls
                    autoPlay
                  />
                ) : (
                  <div className="relative flex min-h-[200px] min-w-[200px] items-center justify-center">
                    <img
                      key={`img-${activeEntry.id}`}
                      src={resolvePublicAssetUrl(activeEntry.image)}
                      alt={activeEntry.alt}
                      className={`max-h-[85vh] w-auto max-w-full rounded-2xl object-contain ${lightboxImageError ? "hidden" : ""}`}
                      loading="eager"
                      decoding="async"
                      onError={() => setLightboxImageError(true)}
                    />
                    {lightboxImageError && (
                      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/10 px-8 py-6 backdrop-blur-sm">
                        <p className="text-white">Image could not be loaded</p>
                        <p className="text-sm text-white/70">Check that the file exists in public/media/photos or re-upload via Admin</p>
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-4 rounded-2xl bg-white/10 p-4 text-center backdrop-blur-sm max-w-full">
                  <p className="text-lg text-white">{activeEntry.caption}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

