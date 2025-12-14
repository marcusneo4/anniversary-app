import type {
  GalleryMoment,
  TimelineMilestone,
  LoveNote,
  HeroContent,
  ClosingToastContent,
  MonthlyTimelineEntry
} from "../data/content";

const STORAGE_KEYS = {
  GALLERY: "anniversary_gallery",
  TIMELINE: "anniversary_timeline",
  LOVENOTES: "anniversary_lovenotes",
  HERO: "anniversary_hero",
  CLOSING: "anniversary_closing",
  MONTHLY_TIMELINE: "anniversary_monthly_timeline"
};

// Load content from localStorage or return default
export function loadContent<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error(`Error loading ${key}:`, error);
  }
  return defaultValue;
}

// Save content to localStorage
export function saveContent<T>(key: string, content: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(content));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

// Content loaders
export function loadGallery(): GalleryMoment[] {
  return loadContent(STORAGE_KEYS.GALLERY, []);
}

export function saveGallery(gallery: GalleryMoment[]): void {
  saveContent(STORAGE_KEYS.GALLERY, gallery);
}

export function loadTimeline(): TimelineMilestone[] {
  return loadContent(STORAGE_KEYS.TIMELINE, []);
}

export function saveTimeline(timeline: TimelineMilestone[]): void {
  saveContent(STORAGE_KEYS.TIMELINE, timeline);
}

export function loadLoveNotes(): LoveNote[] {
  return loadContent(STORAGE_KEYS.LOVENOTES, []);
}

export function saveLoveNotes(notes: LoveNote[]): void {
  saveContent(STORAGE_KEYS.LOVENOTES, notes);
}

export function loadHero(): HeroContent | null {
  return loadContent(STORAGE_KEYS.HERO, null);
}

export function saveHero(hero: HeroContent): void {
  saveContent(STORAGE_KEYS.HERO, hero);
}

export function loadClosing(): ClosingToastContent | null {
  return loadContent(STORAGE_KEYS.CLOSING, null);
}

export function saveClosing(closing: ClosingToastContent): void {
  saveContent(STORAGE_KEYS.CLOSING, closing);
}

export function loadMonthlyTimeline(): Record<number, MonthlyTimelineEntry[]> {
  return loadContent(STORAGE_KEYS.MONTHLY_TIMELINE, {});
}

export function saveMonthlyTimeline(timeline: Record<number, MonthlyTimelineEntry[]>): void {
  saveContent(STORAGE_KEYS.MONTHLY_TIMELINE, timeline);
}

// Reset all content to defaults
export function resetAllContent(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}

