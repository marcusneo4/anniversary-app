import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  onSnapshot,
  type DocumentData 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Check if Firebase is available
const isFirebaseAvailable = () => {
  return db !== null;
};

// Collection names
const COLLECTIONS = {
  GALLERY: 'gallery',
  TIMELINE: 'timeline',
  LOVENOTES: 'loveNotes',
  HERO: 'hero',
  CLOSING: 'closing',
  MONTHLY_TIMELINE: 'monthlyTimeline',
  COUNTRIES: 'countries'
};

// Document ID (using a single document for all app data)
const APP_DOC_ID = 'anniversary-data';

// Generic functions for Firestore operations
async function getDocument(collectionName: string, docId: string = APP_DOC_ID): Promise<DocumentData | null> {
  if (!isFirebaseAvailable()) {
    return null;
  }
  try {
    const docRef = doc(db!, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    return null;
  }
}

async function setDocument(collectionName: string, data: any, docId: string = APP_DOC_ID): Promise<boolean> {
  if (!isFirebaseAvailable()) {
    return false;
  }
  try {
    const docRef = doc(db!, collectionName, docId);
    await setDoc(docRef, { data, updatedAt: new Date().toISOString() }, { merge: true });
    return true;
  } catch (error) {
    console.error(`Error setting document in ${collectionName}:`, error);
    return false;
  }
}

// Gallery operations
export async function loadGallery(): Promise<any[]> {
  const doc = await getDocument(COLLECTIONS.GALLERY);
  return doc?.data || [];
}

export async function saveGallery(gallery: any[]): Promise<boolean> {
  return await setDocument(COLLECTIONS.GALLERY, gallery);
}

// Timeline operations
export async function loadTimeline(): Promise<any[]> {
  const doc = await getDocument(COLLECTIONS.TIMELINE);
  return doc?.data || [];
}

export async function saveTimeline(timeline: any[]): Promise<boolean> {
  return await setDocument(COLLECTIONS.TIMELINE, timeline);
}

// Love Notes operations
export async function loadLoveNotes(): Promise<any[]> {
  const doc = await getDocument(COLLECTIONS.LOVENOTES);
  return doc?.data || [];
}

export async function saveLoveNotes(notes: any[]): Promise<boolean> {
  return await setDocument(COLLECTIONS.LOVENOTES, notes);
}

// Hero operations
export async function loadHero(): Promise<any | null> {
  const doc = await getDocument(COLLECTIONS.HERO);
  return doc?.data || null;
}

export async function saveHero(hero: any): Promise<boolean> {
  return await setDocument(COLLECTIONS.HERO, hero);
}

// Closing operations
export async function loadClosing(): Promise<any | null> {
  const doc = await getDocument(COLLECTIONS.CLOSING);
  return doc?.data || null;
}

export async function saveClosing(closing: any): Promise<boolean> {
  return await setDocument(COLLECTIONS.CLOSING, closing);
}

// Monthly Timeline operations
export async function loadMonthlyTimeline(): Promise<Record<number, any[]>> {
  const doc = await getDocument(COLLECTIONS.MONTHLY_TIMELINE);
  return doc?.data || {};
}

export async function saveMonthlyTimeline(timeline: Record<number, any[]>): Promise<boolean> {
  return await setDocument(COLLECTIONS.MONTHLY_TIMELINE, timeline);
}

// Countries operations
export async function loadCountries(): Promise<any[]> {
  const doc = await getDocument(COLLECTIONS.COUNTRIES);
  return doc?.data || [];
}

export async function saveCountries(countries: any[]): Promise<boolean> {
  return await setDocument(COLLECTIONS.COUNTRIES, countries);
}

// Convert image file to base64 (stored directly in Firestore - FREE!)
// This avoids needing Firebase Storage (which requires Blaze plan)
export function convertImageToBase64(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve(null);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        resolve(null);
      }
    };
    reader.onerror = () => {
      console.error('Failed to read image file');
      resolve(null);
    };
    reader.readAsDataURL(file);
  });
}

// Real-time subscription (optional - for live updates)
export function subscribeToData(
  collectionName: string,
  callback: (data: any) => void,
  docId: string = APP_DOC_ID
): () => void {
  if (!isFirebaseAvailable()) {
    // Return a no-op unsubscribe function if Firebase is not available
    return () => {};
  }
  const docRef = doc(db!, collectionName, docId);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data()?.data || null);
    } else {
      callback(null);
    }
  });
}
