import type {
  GalleryMoment,
  TimelineMilestone,
  LoveNote,
  HeroContent,
  ClosingToastContent,
  MonthlyTimelineEntry
} from "../data/content";
import * as firebaseService from "./firebaseService";

const STORAGE_KEYS = {
  GALLERY: "anniversary_gallery",
  TIMELINE: "anniversary_timeline",
  LOVENOTES: "anniversary_lovenotes",
  HERO: "anniversary_hero",
  CLOSING: "anniversary_closing",
  MONTHLY_TIMELINE: "anniversary_monthly_timeline"
};

// Check if Firebase is configured
const isFirebaseConfigured = () => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  return apiKey && apiKey !== "your-api-key";
};

// Load content from Firebase or localStorage fallback
export async function loadContent<T>(key: string, defaultValue: T): Promise<T> {
  if (isFirebaseConfigured()) {
    try {
      // Try Firebase first
      switch (key) {
        case STORAGE_KEYS.GALLERY:
          const gallery = await firebaseService.loadGallery();
          return (gallery.length > 0 ? gallery : defaultValue) as T;
        case STORAGE_KEYS.TIMELINE:
          const timeline = await firebaseService.loadTimeline();
          return (timeline.length > 0 ? timeline : defaultValue) as T;
        case STORAGE_KEYS.LOVENOTES:
          const notes = await firebaseService.loadLoveNotes();
          return (notes.length > 0 ? notes : defaultValue) as T;
        case STORAGE_KEYS.HERO:
          const hero = await firebaseService.loadHero();
          return (hero || defaultValue) as T;
        case STORAGE_KEYS.CLOSING:
          const closing = await firebaseService.loadClosing();
          return (closing || defaultValue) as T;
        case STORAGE_KEYS.MONTHLY_TIMELINE:
          const monthly = await firebaseService.loadMonthlyTimeline();
          return (Object.keys(monthly).length > 0 ? monthly : defaultValue) as T;
        default:
          return defaultValue;
      }
    } catch (error) {
      console.error(`Error loading ${key} from Firebase, falling back to localStorage:`, error);
    }
  }
  
  // Fallback to localStorage
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

// Save content to Firebase or localStorage fallback
export async function saveContent<T>(key: string, content: T): Promise<void> {
  if (isFirebaseConfigured()) {
    try {
      // Try Firebase first
      switch (key) {
        case STORAGE_KEYS.GALLERY:
          await firebaseService.saveGallery(content as any);
          return;
        case STORAGE_KEYS.TIMELINE:
          await firebaseService.saveTimeline(content as any);
          return;
        case STORAGE_KEYS.LOVENOTES:
          await firebaseService.saveLoveNotes(content as any);
          return;
        case STORAGE_KEYS.HERO:
          await firebaseService.saveHero(content as any);
          return;
        case STORAGE_KEYS.CLOSING:
          await firebaseService.saveClosing(content as any);
          return;
        case STORAGE_KEYS.MONTHLY_TIMELINE:
          await firebaseService.saveMonthlyTimeline(content as any);
          return;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error saving ${key} to Firebase, falling back to localStorage:`, error);
    }
  }
  
  // Fallback to localStorage
  try {
    localStorage.setItem(key, JSON.stringify(content));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
}

// Content loaders (async versions for Firebase)
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

