import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HandDrawnDecorations } from "./HandDrawnDecorations";
import { resolvePublicAssetUrl } from "../utils/assetUrl";

type LetterCover = "A" | "B" | "C" | "D" | "E";

interface BodyImages {
  [key: string]: string[];
}

const bodyImages: BodyImages = {
  A: ["/media/photos/Letters/Body A.jpg"],
  B: ["/media/photos/Letters/Body B1.jpg", "/media/photos/Letters/Body B2.jpg"],
  C: ["/media/photos/Letters/Body C.jpg"],
  D: ["/media/photos/Letters/Body D.jpg"],
  E: ["/media/photos/Letters/Body E.jpg"],
};

const letterNames: { [key in LetterCover]: string } = {
  A: "CIMB 2024 Note",
  B: "CIMB 2024 Letter",
  C: "Christmas 2024",
  D: "PreEurope 2025",
  E: "Post Europe 2025",
};

// Letters that should be displayed horizontally
const horizontalLetters: LetterCover[] = ["B", "E"];

const covers: LetterCover[] = ["A", "B", "C", "D", "E"];

interface ZoomState {
  scale: number;
  x: number;
  y: number;
}

export function LoveNotes() {
  const [selectedCover, setSelectedCover] = useState<LetterCover | null>(null);
  const [zoomStates, setZoomStates] = useState<{ [key: string]: ZoomState }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggingKey, setDraggingKey] = useState<string | null>(null);
  const imageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const getCoverImage = (cover: LetterCover) =>
    resolvePublicAssetUrl(`/media/photos/Letters/Cover ${cover}.jpg`);

  const closeModal = () => {
    setSelectedCover(null);
    setZoomStates({});
    setIsDragging(false);
    setDraggingKey(null);
  };

  const getImageKey = (cover: LetterCover, idx: number) => `${cover}-${idx}`;

  const getZoomState = (key: string): ZoomState => {
    return zoomStates[key] || { scale: 1, x: 0, y: 0 };
  };

  const setZoomState = (key: string, state: ZoomState) => {
    setZoomStates(prev => ({ ...prev, [key]: state }));
  };

  const handleWheel = (e: React.WheelEvent, key: string) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const currentState = getZoomState(key);
    const newScale = Math.min(Math.max(1, currentState.scale + delta), 5);
    
    if (newScale > 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setZoomState(key, {
        scale: newScale,
        x: x - (x - currentState.x) * (newScale / currentState.scale),
        y: y - (y - currentState.y) * (newScale / currentState.scale),
      });
    } else {
      setZoomState(key, { scale: 1, x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent, key: string) => {
    const currentState = getZoomState(key);
    if (currentState.scale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDraggingKey(key);
      setDragStart({ x: e.clientX - currentState.x, y: e.clientY - currentState.y });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && draggingKey) {
      const currentState = getZoomState(draggingKey);
      setZoomState(draggingKey, {
        ...currentState,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggingKey(null);
  };

  const zoomIn = (key: string) => {
    const currentState = getZoomState(key);
    const newScale = Math.min(currentState.scale + 0.5, 5);
    setZoomState(key, { ...currentState, scale: newScale });
  };

  const zoomOut = (key: string) => {
    const currentState = getZoomState(key);
    const newScale = Math.max(currentState.scale - 0.5, 1);
    if (newScale === 1) {
      setZoomState(key, { scale: 1, x: 0, y: 0 });
    } else {
      setZoomState(key, { ...currentState, scale: newScale });
    }
  };

  const resetZoom = (key: string) => {
    setZoomState(key, { scale: 1, x: 0, y: 0 });
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, draggingKey, dragStart]);

  return (
    <section className="relative rounded-3xl bg-gradient-to-br from-rose-50 via-pink-50/80 to-rose-100/90 p-8 md:p-12 shadow-2xl ring-1 ring-rose-200/50 romantic-texture overflow-hidden">
      <HandDrawnDecorations />
      
      <div className="relative mb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm uppercase tracking-[0.4em] text-rose-500 font-semibold"
        >
          Letters
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 font-display text-4xl md:text-5xl font-bold text-rose-900 editorial-headline"
        >
          Little notes for forever
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-lg text-rose-600 editorial-body"
        >
          Click on a letter to read the handwritten message.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
        {covers.map((cover, index) => (
          <motion.div
            key={cover}
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            className="group cursor-pointer"
            onClick={() => setSelectedCover(cover)}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-rose-200/50 bg-white">
              <img
                src={getCoverImage(cover)}
                alt={`Cover ${cover}`}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-semibold text-lg">{letterNames[cover]}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for viewing body images */}
      <AnimatePresence>
        {selectedCover && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Back Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 left-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors flex items-center gap-2 px-4"
                  aria-label="Back"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">Back</span>
                </button>
                
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                  aria-label="Close"
                >
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Body Images */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-rose-900 mb-6 text-center">
                    {letterNames[selectedCover]}
                  </h3>
                  <div
                    className={`grid gap-6 ${
                      bodyImages[selectedCover].length > 1
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1"
                    }`}
                  >
                    {bodyImages[selectedCover].map((imagePath, idx) => {
                      const isHorizontal = horizontalLetters.includes(selectedCover);
                      const isSingleImage = bodyImages[selectedCover].length === 1;
                      const isLetterE = selectedCover === "E";
                      const imageKey = getImageKey(selectedCover, idx);
                      const zoomState = getZoomState(imageKey);
                      const needsRotation = isLetterE;

                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 ${
                            isHorizontal || isSingleImage ? "flex justify-center items-center" : ""
                          }`}
                        >
                          {/* Zoom Controls */}
                          <div className="absolute top-4 right-4 z-20 flex gap-2 bg-white/90 rounded-lg p-1 shadow-lg">
                            <button
                              onClick={() => zoomIn(imageKey)}
                              className="p-2 hover:bg-gray-100 rounded transition-colors"
                              aria-label="Zoom In"
                            >
                              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                            <button
                              onClick={() => zoomOut(imageKey)}
                              className="p-2 hover:bg-gray-100 rounded transition-colors"
                              aria-label="Zoom Out"
                            >
                              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            {zoomState.scale > 1 && (
                              <button
                                onClick={() => resetZoom(imageKey)}
                                className="p-2 hover:bg-gray-100 rounded transition-colors"
                                aria-label="Reset Zoom"
                              >
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                              </button>
                            )}
                          </div>

                          {/* Zoomable Image Container */}
                          <div
                            ref={(el) => (imageRefs.current[imageKey] = el)}
                            className={`relative w-full h-full overflow-hidden ${
                              isHorizontal || isSingleImage || needsRotation ? "flex justify-center items-center min-h-[400px]" : ""
                            }`}
                            onWheel={(e) => handleWheel(e, imageKey)}
                            onMouseDown={(e) => handleMouseDown(e, imageKey)}
                            style={{ cursor: zoomState.scale > 1 ? (isDragging && draggingKey === imageKey ? 'grabbing' : 'grab') : 'default' }}
                          >
                            <img
                              src={resolvePublicAssetUrl(imagePath)}
                              alt={`Body ${selectedCover}${bodyImages[selectedCover].length > 1 ? ` Page ${idx + 1}` : ""}`}
                              className={`${
                                isHorizontal || needsRotation
                                  ? "max-w-full max-h-[70vh] w-auto h-auto object-contain" 
                                  : isSingleImage
                                  ? "max-w-full max-h-[80vh] w-auto h-auto object-contain"
                                  : "w-full h-auto object-contain"
                              } transition-transform duration-200`}
                              style={{
                                transform: `translate(${zoomState.x}px, ${zoomState.y}px) scale(${zoomState.scale}) ${needsRotation ? 'rotate(-90deg)' : ''}`,
                                transformOrigin: 'center center',
                              }}
                              draggable={false}
                            />
                          </div>
                          
                          {bodyImages[selectedCover].length > 1 && (
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 text-white text-sm text-center">
                              Page {idx + 1} of {bodyImages[selectedCover].length}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

