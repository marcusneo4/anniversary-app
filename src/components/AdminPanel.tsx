import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  heroContent,
  timelineMilestones,
  galleryMoments,
  loveNotes,
  closingToast,
  monthlyTimelineData,
  type HeroContent as HeroContentType,
  type TimelineMilestone,
  type GalleryMoment,
  type LoveNote,
  type ClosingToastContent,
  type MonthlyTimelineEntry
} from "../data/content";
import {
  loadGallery,
  saveGallery,
  loadTimeline,
  saveTimeline,
  loadLoveNotes,
  saveLoveNotes,
  loadHero,
  saveHero,
  loadClosing,
  saveClosing,
  loadMonthlyTimeline,
  saveMonthlyTimeline,
  resetAllContent
} from "../utils/contentManager";

type AdminPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onContentUpdate: () => void;
};

type Tab = "hero" | "gallery" | "timeline" | "monthly" | "notes" | "closing";

export function AdminPanel({ isOpen, onClose, onContentUpdate }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("hero");
  const [hero, setHero] = useState<HeroContentType>(heroContent);
  const [gallery, setGallery] = useState<GalleryMoment[]>(galleryMoments);
  const [timeline, setTimeline] = useState<TimelineMilestone[]>(timelineMilestones);
  const [monthlyTimeline, setMonthlyTimeline] = useState<Record<number, MonthlyTimelineEntry[]>>({});
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [notes, setNotes] = useState<LoveNote[]>(loveNotes);
  const [closing, setClosing] = useState<ClosingToastContent>(closingToast);
  const [saved, setSaved] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    if (isOpen) {
      // Load saved content or use defaults
      const savedHero = loadHero();
      const savedGallery = loadGallery();
      const savedTimeline = loadTimeline();
      const savedMonthly = loadMonthlyTimeline();
      const savedNotes = loadLoveNotes();
      const savedClosing = loadClosing();

      setHero(savedHero || heroContent);
      setGallery(savedGallery.length > 0 ? savedGallery : galleryMoments);
      setTimeline(savedTimeline.length > 0 ? savedTimeline : timelineMilestones);
      setMonthlyTimeline(Object.keys(savedMonthly).length > 0 ? savedMonthly : monthlyTimelineData);
      setNotes(savedNotes.length > 0 ? savedNotes : loveNotes);
      setClosing(savedClosing || closingToast);
    }
  }, [isOpen]);

  const handleSave = () => {
    saveHero(hero);
    saveGallery(gallery);
    saveTimeline(timeline);
    saveMonthlyTimeline(monthlyTimeline);
    saveLoveNotes(notes);
    saveClosing(closing);
    setSaved(true);
    onContentUpdate();
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset all content to defaults? This cannot be undone.")) {
      resetAllContent();
      setHero(heroContent);
      setGallery(galleryMoments);
      setTimeline(timelineMilestones);
      setMonthlyTimeline(monthlyTimelineData);
      setNotes(loveNotes);
      setClosing(closingToast);
      onContentUpdate();
    }
  };

  const addGalleryItem = () => {
    const newId = gallery.length > 0 ? Math.max(...gallery.map((g) => g.id)) + 1 : 1;
    setGallery([
      ...gallery,
      {
        id: newId,
        image: "/media/photos/photo-" + newId + ".jpg",
        alt: "New memory",
        caption: "Edit this caption...",
        type: "photo"
      }
    ]);
  };

  const updateGalleryItem = (id: number, field: keyof GalleryMoment, value: string) => {
    setGallery(gallery.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const deleteGalleryItem = (id: number) => {
    setGallery(gallery.filter((item) => item.id !== id));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-rose-100 bg-gradient-to-r from-rose-50 to-blush-50 p-6">
            <h2 className="font-display text-2xl text-rose-900">Edit Content</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-rose-600 transition hover:bg-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-rose-100 bg-white overflow-x-auto">
            {(["hero", "gallery", "timeline", "monthly", "notes", "closing"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium capitalize transition whitespace-nowrap ${
                  activeTab === tab
                    ? "border-b-2 border-rose-600 text-rose-600"
                    : "text-rose-600 hover:bg-rose-50"
                }`}
              >
                {tab === "monthly" ? "Monthly Timeline" : tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="h-[calc(90vh-140px)] overflow-y-auto bg-white p-6 text-rose-900">
            {/* Prominent Save Button at Top */}
            <div className="sticky top-0 z-10 mb-4 flex justify-end bg-white pb-4">
              <button
                onClick={handleSave}
                className={`rounded-lg px-6 py-2.5 text-sm font-medium text-white shadow-lg transition ${
                  saved
                    ? "bg-green-500"
                    : "bg-gradient-to-r from-blush-500 to-blush-600 hover:from-blush-600 hover:to-blush-700"
                }`}
              >
                {saved ? "✓ Saved!" : "💾 Save Changes"}
              </button>
            </div>
            {activeTab === "hero" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-rose-700">Heading</label>
                  <input
                    type="text"
                    value={hero.heading}
                    onChange={(e) => setHero({ ...hero, heading: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-rose-200 bg-white px-4 py-2 text-rose-900 focus:border-blush-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-rose-700">Subheading</label>
                  <textarea
                    value={hero.subheading}
                    onChange={(e) => setHero({ ...hero, subheading: e.target.value })}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-rose-200 bg-white px-4 py-2 text-rose-900 focus:border-blush-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-rose-700">Dedication</label>
                  <textarea
                    value={hero.dedication}
                    onChange={(e) => setHero({ ...hero, dedication: e.target.value })}
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-rose-200 bg-white px-4 py-2 text-rose-900 focus:border-blush-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-rose-700">Primary Button</label>
                    <input
                      type="text"
                      value={hero.ctaPrimary}
                      onChange={(e) => setHero({ ...hero, ctaPrimary: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-rose-200 bg-white px-4 py-2 text-rose-900 focus:border-blush-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-rose-700">Secondary Button</label>
                    <input
                      type="text"
                      value={hero.ctaSecondary}
                      onChange={(e) => setHero({ ...hero, ctaSecondary: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-rose-200 bg-white px-4 py-2 text-rose-900 focus:border-blush-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="space-y-4">
                <button
                  onClick={addGalleryItem}
                  className="w-full rounded-lg border-2 border-dashed border-rose-300 bg-rose-50 py-4 text-rose-600 transition hover:bg-rose-100"
                >
                  + Add New Memory
                </button>
                {gallery.map((item) => (
                  <div key={item.id} className="rounded-lg border border-rose-200 bg-white p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-rose-600">Memory #{item.id}</span>
                      <button
                        onClick={() => deleteGalleryItem(item.id)}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-rose-600">Image/Video Path</label>
                        <input
                          type="text"
                          value={item.image}
                          onChange={(e) => updateGalleryItem(item.id, "image", e.target.value)}
                          placeholder="/media/photos/photo-1.jpg"
                          className="mt-1 w-full rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-blush-500 focus:outline-none"
                        />
                        <p className="mt-1 text-xs text-rose-400">
                          Use /media/photos/ for photos or /media/videos/ for videos
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs text-rose-600">Alt Text</label>
                        <input
                          type="text"
                          value={item.alt}
                          onChange={(e) => updateGalleryItem(item.id, "alt", e.target.value)}
                          className="mt-1 w-full rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-blush-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-rose-600">Caption</label>
                        <textarea
                          value={item.caption}
                          onChange={(e) => updateGalleryItem(item.id, "caption", e.target.value)}
                          rows={2}
                          className="mt-1 w-full rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-blush-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "timeline" && (
              <div className="space-y-4">
                {timeline.map((milestone) => (
                  <div key={milestone.id} className="rounded-lg border border-rose-200 bg-white p-4">
                    <h3 className="mb-3 font-medium text-rose-900">Milestone #{milestone.id}</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) =>
                          setTimeline(
                            timeline.map((m) => (m.id === milestone.id ? { ...m, title: e.target.value } : m))
                          )
                        }
                        placeholder="Title"
                        className="w-full rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-blush-500 focus:outline-none"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={milestone.date}
                          onChange={(e) =>
                            setTimeline(
                              timeline.map((m) => (m.id === milestone.id ? { ...m, date: e.target.value } : m))
                            )
                          }
                          placeholder="Date"
                          className="rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-blush-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={milestone.location}
                          onChange={(e) =>
                            setTimeline(
                              timeline.map((m) =>
                                m.id === milestone.id ? { ...m, location: e.target.value } : m
                              )
                            )
                          }
                          placeholder="Location"
                          className="rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-blush-500 focus:outline-none"
                        />
                      </div>
                      <textarea
                        value={milestone.description}
                        onChange={(e) =>
                          setTimeline(
                            timeline.map((m) =>
                              m.id === milestone.id ? { ...m, description: e.target.value } : m
                            )
                          )
                        }
                        rows={2}
                        placeholder="Description"
                        className="w-full rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-blush-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "monthly" && (
              <div className="space-y-6">
                {/* Month Selector */}
                <div className="flex flex-wrap gap-2 border-b border-rose-200 pb-4">
                  {months.map((month, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMonth(index)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        selectedMonth === index
                          ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white"
                          : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>

                {/* Current Month Entries */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-medium text-rose-900">
                      {months[selectedMonth]} 2025 - {monthlyTimeline[selectedMonth]?.length || 0} entries
                    </h3>
                    <button
                      onClick={() => {
                        const currentEntries = monthlyTimeline[selectedMonth] || [];
                        const newId = currentEntries.length > 0 
                          ? Math.max(...currentEntries.map((e) => e.id)) + 1 
                          : 1;
                        setMonthlyTimeline({
                          ...monthlyTimeline,
                          [selectedMonth]: [
                            ...currentEntries,
                            {
                              id: newId,
                              image: "/media/photos/photo-" + newId + ".jpg",
                              alt: "New memory",
                              caption: "Edit this caption...",
                              date: "",
                              location: "",
                              type: "photo"
                            }
                          ]
                        });
                      }}
                      className="rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2 text-sm text-white transition hover:from-rose-600 hover:to-pink-600"
                    >
                      + Add Memory
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(monthlyTimeline[selectedMonth] || []).map((entry) => (
                      <div key={entry.id} className="rounded-lg border border-rose-200 bg-white p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-sm font-medium text-rose-600">Entry #{entry.id}</span>
                          <button
                            onClick={() => {
                              const currentEntries = monthlyTimeline[selectedMonth] || [];
                              setMonthlyTimeline({
                                ...monthlyTimeline,
                                [selectedMonth]: currentEntries.filter((e) => e.id !== entry.id)
                              });
                            }}
                            className="text-sm text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-rose-600">Image/Video Path</label>
                            <input
                              type="text"
                              value={entry.image}
                              onChange={(e) => {
                                const currentEntries = monthlyTimeline[selectedMonth] || [];
                                setMonthlyTimeline({
                                  ...monthlyTimeline,
                                  [selectedMonth]: currentEntries.map((item) =>
                                    item.id === entry.id ? { ...item, image: e.target.value } : item
                                  )
                                });
                              }}
                              placeholder="/media/photos/photo-1.jpg"
                              className="mt-1 w-full rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-rose-500 focus:outline-none"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-rose-600">Date</label>
                              <input
                                type="text"
                                value={entry.date || ""}
                                onChange={(e) => {
                                  const currentEntries = monthlyTimeline[selectedMonth] || [];
                                  setMonthlyTimeline({
                                    ...monthlyTimeline,
                                    [selectedMonth]: currentEntries.map((item) =>
                                      item.id === entry.id ? { ...item, date: e.target.value } : item
                                    )
                                  });
                                }}
                                placeholder="e.g., Jan 15"
                                className="mt-1 w-full rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-rose-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-rose-600">Location (optional)</label>
                              <input
                                type="text"
                                value={entry.location || ""}
                                onChange={(e) => {
                                  const currentEntries = monthlyTimeline[selectedMonth] || [];
                                  setMonthlyTimeline({
                                    ...monthlyTimeline,
                                    [selectedMonth]: currentEntries.map((item) =>
                                      item.id === entry.id ? { ...item, location: e.target.value } : item
                                    )
                                  });
                                }}
                                placeholder="e.g., Singapore"
                                className="mt-1 w-full rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-rose-500 focus:outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-rose-600">Caption</label>
                            <textarea
                              value={entry.caption}
                              onChange={(e) => {
                                const currentEntries = monthlyTimeline[selectedMonth] || [];
                                setMonthlyTimeline({
                                  ...monthlyTimeline,
                                  [selectedMonth]: currentEntries.map((item) =>
                                    item.id === entry.id ? { ...item, caption: e.target.value } : item
                                  )
                                });
                              }}
                              rows={2}
                              className="mt-1 w-full rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-rose-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-rose-600">Alt Text</label>
                            <input
                              type="text"
                              value={entry.alt}
                              onChange={(e) => {
                                const currentEntries = monthlyTimeline[selectedMonth] || [];
                                setMonthlyTimeline({
                                  ...monthlyTimeline,
                                  [selectedMonth]: currentEntries.map((item) =>
                                    item.id === entry.id ? { ...item, alt: e.target.value } : item
                                  )
                                });
                              }}
                              className="mt-1 w-full rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-rose-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-rose-600">Type</label>
                            <select
                              value={entry.type || "photo"}
                              onChange={(e) => {
                                const currentEntries = monthlyTimeline[selectedMonth] || [];
                                setMonthlyTimeline({
                                  ...monthlyTimeline,
                                  [selectedMonth]: currentEntries.map((item) =>
                                    item.id === entry.id ? { ...item, type: e.target.value as "photo" | "video" } : item
                                  )
                                });
                              }}
                              className="mt-1 w-full rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-rose-500 focus:outline-none"
                            >
                              <option value="photo">Photo</option>
                              <option value="video">Video</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(monthlyTimeline[selectedMonth] || []).length === 0 && (
                      <div className="rounded-lg border-2 border-dashed border-rose-300 bg-rose-50 p-8 text-center">
                        <p className="text-rose-500">No entries for {months[selectedMonth]} yet</p>
                        <p className="mt-2 text-sm text-rose-400">Click "Add Memory" to get started</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="rounded-lg border border-rose-200 bg-white p-4">
                    <h3 className="mb-3 font-medium text-rose-900">Note #{note.id}</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={note.title}
                        onChange={(e) =>
                          setNotes(notes.map((n) => (n.id === note.id ? { ...n, title: e.target.value } : n)))
                        }
                        placeholder="Title"
                        className="w-full rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-blush-500 focus:outline-none"
                      />
                      <textarea
                        value={note.body}
                        onChange={(e) =>
                          setNotes(notes.map((n) => (n.id === note.id ? { ...n, body: e.target.value } : n)))
                        }
                        rows={2}
                        placeholder="Body"
                        className="w-full rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-blush-500 focus:outline-none"
                      />
                      <textarea
                        value={note.promise}
                        onChange={(e) =>
                          setNotes(notes.map((n) => (n.id === note.id ? { ...n, promise: e.target.value } : n)))
                        }
                        rows={1}
                        placeholder="Promise"
                        className="w-full rounded border border-rose-200 bg-white px-3 py-1.5 text-sm text-rose-900 focus:border-blush-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "closing" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-rose-700">Headline</label>
                  <input
                    type="text"
                    value={closing.headline}
                    onChange={(e) => setClosing({ ...closing, headline: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-rose-200 bg-white px-4 py-2 text-rose-900 focus:border-blush-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-rose-700">Body</label>
                  <textarea
                    value={closing.body}
                    onChange={(e) => setClosing({ ...closing, body: e.target.value })}
                    rows={4}
                    className="mt-1 w-full rounded-lg border border-rose-200 bg-white px-4 py-2 text-rose-900 focus:border-blush-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-rose-700">Button Text</label>
                  <input
                    type="text"
                    value={closing.button}
                    onChange={(e) => setClosing({ ...closing, button: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-rose-200 bg-white px-4 py-2 text-rose-900 focus:border-blush-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-rose-100 bg-rose-50 p-4">
            <button
              onClick={handleReset}
              className="rounded-lg border border-rose-300 px-4 py-2 text-sm text-rose-600 transition hover:bg-white"
            >
              Reset to Defaults
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="rounded-lg border border-rose-300 px-6 py-2 text-sm text-rose-600 transition hover:bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`rounded-lg px-6 py-2 text-sm text-white transition ${
                  saved
                    ? "bg-green-500"
                    : "bg-gradient-to-r from-blush-500 to-blush-600 hover:from-blush-600 hover:to-blush-700"
                }`}
              >
                {saved ? "✓ Saved!" : "Save Changes"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

