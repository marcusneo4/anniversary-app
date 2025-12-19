// Collection/storage keys for localStorage
const STORAGE_KEYS = {
  COUNTRIES: 'anniversary_countries'
};

// Load countries from localStorage
export async function loadCountries(): Promise<any[]> {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.COUNTRIES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading countries:', error);
  }
  return [];
}

// Save countries to localStorage
export async function saveCountries(countries: any[]): Promise<boolean> {
  try {
    localStorage.setItem(STORAGE_KEYS.COUNTRIES, JSON.stringify(countries));
    return true;
  } catch (error) {
    console.error('Error saving countries:', error);
    return false;
  }
}
