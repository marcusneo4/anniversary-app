import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryMoments, type GalleryMoment } from "../data/content";
import { loadGallery } from "../utils/contentManager";

export function MemoryGallery() {
  const [moments, setMoments] = useState<GalleryMoment[]>(galleryMoments);
  const [missingImages, setMissingImages] = useState<Record<number, boolean>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState<GalleryMoment | null>(null);
  const [filter, setFilter] = useState<"all" | "photo" | "video">("all");
  const [layout, setLayout] = useState<"grid" | "masonry">("grid");

  useEffect(() => {
    const saved = loadGallery();
    if (saved.length > 0) {
      setMoments(saved);
    } else {
      // Initialize with default gallery if nothing saved
      setMoments(galleryMoments);
    }
  }, []);

  const openLightbox = (moment: GalleryMoment) => {
    setSelectedMoment(moment);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setSelectedMoment(null), 300);
  };

  const isVideo = (path: string) => {
    return /\.(mp4|webm|mov)$/i.test(path);
  };

  return (
    <>
      <section className="rounded-3xl bg-gradient-to-br from-rose-50/80 via-white/90 to-pink-50/80 p-8 shadow-2xl ring-1 ring-rose-200 backdrop-blur-sm">
        <div className="mb-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-[0.4em] text-rose-500 font-semibold"
          >
            Gallery
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-4xl md:text-5xl font-bold text-rose-900 editorial-headline"
          >
            The snapshots I replay
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-lg md:text-xl text-rose-600 editorial-body"
          >
            Borrowed light, blurry selfies, and the kind of grins that hurt after.
          </motion.p>
        </div>

        {/* Filters and Layout Toggle */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
          <div className="flex gap-2 rounded-full bg-white/80 p-1 shadow-lg ring-1 ring-rose-200">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md"
                  : "text-rose-700 hover:bg-rose-50"
              }`}
            >
              All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("photo")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filter === "photo"
                  ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md"
                  : "text-rose-700 hover:bg-rose-50"
              }`}
            >
              📸 Photos
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("video")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filter === "video"
                  ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md"
                  : "text-rose-700 hover:bg-rose-50"
              }`}
            >
              🎥 Videos
            </motion.button>
          </div>
          <div className="flex gap-2 rounded-full bg-white/80 p-1 shadow-lg ring-1 ring-rose-200">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLayout("grid")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                layout === "grid"
                  ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md"
                  : "text-rose-700 hover:bg-rose-50"
              }`}
            >
              Grid
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLayout("masonry")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                layout === "masonry"
                  ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md"
                  : "text-rose-700 hover:bg-rose-50"
              }`}
            >
              Masonry
            </motion.button>
          </div>
        </div>

        <div className={`gap-6 ${
          layout === "grid" 
            ? "grid md:grid-cols-2 lg:grid-cols-3" 
            : "columns-1 md:columns-2 lg:columns-3"
        }`}>
          {moments
            .filter(moment => {
              if (filter === "all") return true;
              const isVid = isVideo(moment.image);
              return filter === "video" ? isVid : !isVid;
            })
            .map((moment, index) => {
            const isVid = isVideo(moment.image);
            return (
              <motion.article
                key={moment.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`group relative overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-rose-100/70 transition-all hover:scale-[1.02] hover:shadow-xl ${
                  layout === "masonry" ? "mb-6 break-inside-avoid" : ""
                }`}
              >
                <div className="relative h-64 overflow-hidden rounded-t-3xl bg-gradient-to-br from-rose-100 to-rose-200">
                  {isVid ? (
                    <video
                      src={moment.image}
                      className="h-full w-full object-cover"
                      loop
                      muted
                      playsInline
                      onMouseEnter={(e) => (e.currentTarget.muted = false)}
                      onMouseLeave={(e) => (e.currentTarget.muted = true)}
                    />
                  ) : (
                    <img
                      src={moment.image}
                      alt={moment.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={() =>
                        setMissingImages((prev) => ({
                          ...prev,
                          [moment.id]: true
                        }))
                      }
                    />
                  )}
                  {missingImages[moment.id] && !moment.image.startsWith('data:image') && (
                    <div className="absolute inset-0 flex items-center justify-center bg-rose-50 text-sm text-rose-400">
                      <span>No media yet — add to /media/photos or /media/videos</span>
                    </div>
                  )}
                  {isVid && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="rounded-full bg-white/90 p-3 shadow-lg">
                        <svg className="h-8 w-8 text-rose-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div
                  className="space-y-2 p-6 cursor-pointer"
                  onClick={() => openLightbox(moment)}
                >
                  <p className="text-lg text-rose-800 line-clamp-2">{moment.caption}</p>
                  <p className="text-sm uppercase tracking-[0.3em] text-rose-400">#{moment.id}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-5xl"
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {isVideo(selectedMoment.image) ? (
                <video
                  src={selectedMoment.image}
                  className="max-h-[90vh] rounded-2xl"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={selectedMoment.image}
                  alt={selectedMoment.alt}
                  className="max-h-[90vh] rounded-2xl"
                />
              )}
              <div className="mt-4 rounded-2xl bg-white/10 p-4 text-center backdrop-blur-sm">
                <p className="text-lg text-white">{selectedMoment.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
