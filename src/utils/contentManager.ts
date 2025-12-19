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

// Load content from localStorage
export async function loadContent<T>(key: string, defaultValue: T): Promise<T> {
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
export async function saveContent<T>(key: string, content: T): Promise<void> {
  try {
    localStorage.setItem(key, JSON.stringify(content));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

// Content loaders
export async function loadGallery(): Promise<GalleryMoment[]> {
  return await loadContent(STORAGE_KEYS.GALLERY, []);
}

export async function saveGallery(gallery: GalleryMoment[]): Promise<void> {
  await saveContent(STORAGE_KEYS.GALLERY, gallery);
}

export async function loadTimeline(): Promise<TimelineMilestone[]> {
  return await loadContent(STORAGE_KEYS.TIMELINE, []);
}

export async function saveTimeline(timeline: TimelineMilestone[]): Promise<void> {
  await saveContent(STORAGE_KEYS.TIMELINE, timeline);
}

export async function loadLoveNotes(): Promise<LoveNote[]> {
  return await loadContent(STORAGE_KEYS.LOVENOTES, []);
}

export async function saveLoveNotes(notes: LoveNote[]): Promise<void> {
  await saveContent(STORAGE_KEYS.LOVENOTES, notes);
}

export async function loadHero(): Promise<HeroContent | null> {
  return await loadContent(STORAGE_KEYS.HERO, null);
}

export async function saveHero(hero: HeroContent): Promise<void> {
  await saveContent(STORAGE_KEYS.HERO, hero);
}

export async function loadClosing(): Promise<ClosingToastContent | null> {
  return await loadContent(STORAGE_KEYS.CLOSING, null);
}

export async function saveClosing(closing: ClosingToastContent): Promise<void> {
  await saveContent(STORAGE_KEYS.CLOSING, closing);
}

export async function loadMonthlyTimeline(): Promise<Record<number, MonthlyTimelineEntry[]>> {
  return await loadContent(STORAGE_KEYS.MONTHLY_TIMELINE, {});
}

export async function saveMonthlyTimeline(timeline: Record<number, MonthlyTimelineEntry[]>): Promise<void> {
  await saveContent(STORAGE_KEYS.MONTHLY_TIMELINE, timeline);
}

// Reset all content to defaults
export function resetAllContent(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
