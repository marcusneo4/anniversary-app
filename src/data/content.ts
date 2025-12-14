export type HeroContent = {
  heading: string;
  subheading: string;
  dedication: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const heroContent: HeroContent = {
  heading: "365 days of us",
  subheading: "Every laugh, quiet moment, and spontaneous adventure brought us here.",
  dedication:
    "To Shanna, my favorite person: thank you for choosing me in the loud, in the quiet, and in every in-between. - Marcus",
  ctaPrimary: "Relive our story",
  ctaSecondary: "Unlock the surprise"
};

export type TimelineMilestone = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
};

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: 1,
    title: "First Date • Latte & Laughs",
    date: "05 Feb 2024",
    location: "Knots & Pans",
    description:
      "We tried to play it cool but laughed too loudly over crooked latte art. That awkward high-five? Still adorable."
  },
  {
    id: 2,
    title: "Secret Beach Picnic",
    date: "27 Apr 2024",
    location: "Tanjong Beach",
    description:
      "Sunset oranges, a playlist on shuffle, and you insisting the clouds looked like marshmallows. I believed you."
  },
  {
    id: 3,
    title: "Rainy Day Shelter",
    date: "13 Jul 2024",
    location: "Bus stop #27",
    description:
      "The storm cancelled our plans, so we turned a bus stop into our living room, complete with playlists and confessions."
  },
  {
    id: 4,
    title: "Passport Stamps & Sushi",
    date: "23 Sep 2024",
    location: "Osaka",
    description:
      "You taught me that travel is less about destinations and more about who laughs with you when you get lost."
  },
  {
    id: 5,
    title: "Our First Anniversary",
    date: "14 Dec 2025",
    location: "Our kitchen",
    description:
      "One year together, Shanna. We burnt dessert, improvised a dance floor, and talked about futures like they were already happening."
  }
];

export type GalleryMoment = {
  id: number;
  image: string;
  alt: string;
  caption: string;
  type?: "photo" | "video";
};

// Placeholder image data URIs for gallery
const placeholderImage = (color: string) => 
  `data:image/svg+xml,${encodeURIComponent(`<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" fill="${color}"/>
    <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">Photo Placeholder</text>
  </svg>`)}`;

export const galleryMoments: GalleryMoment[] = [
  {
    id: 1,
    image: "/assets/gallery/lattes.jpg",
    alt: "Two latte cups with hearts drawn on the foam",
    caption: "You swore yours looked like a cat, I still think it was a potato."
  },
  {
    id: 2,
    image: "/assets/gallery/picnic.jpg",
    alt: "Picnic blanket overlooking the ocean",
    caption: "Our blanket, the wind, and the way you kept tucking my hair behind my ear."
  },
  {
    id: 3,
    image: "/assets/gallery/bus-stop.jpg",
    alt: "Raindrops on bus stop glass with two figures in silhouette",
    caption: "Sheltered from the storm, but somehow even more in it together."
  },
  {
    id: 4,
    image: "/assets/gallery/train.jpg",
    alt: "Couple reflected in train window during a night ride",
    caption: "Jet lagged, snack-stuffed, and deliriously happy."
  },
  {
    id: 5,
    image: "/assets/gallery/kitchen-dance.jpg",
    alt: "Hands intertwined while dancing in a kitchen",
    caption: "Our kitchen light dimmed, but the playlist refused to end—just like us."
  },
  {
    id: 6,
    image: placeholderImage("#fecdd3"),
    alt: "Memory placeholder",
    caption: "A beautiful moment waiting to be captured"
  },
  {
    id: 7,
    image: placeholderImage("#fbcfe8"),
    alt: "Memory placeholder",
    caption: "Another special memory together"
  },
  {
    id: 8,
    image: placeholderImage("#f9a8d4"),
    alt: "Memory placeholder",
    caption: "Cherished moments we'll never forget"
  }
];

export type LoveNote = {
  id: number;
  title: string;
  body: string;
  promise: string;
};

export const loveNotes: LoveNote[] = [
  {
    id: 1,
    title: "For the mornings",
    body: "I will keep making breakfast badly just to watch you smile when I try.",
    promise: "Promise: Warm drinks & first hugs, always."
  },
  {
    id: 2,
    title: "For the adventures",
    body: "We’ll keep collecting passport stamps and inside jokes, even if the maps argue with us.",
    promise: "Promise: Seatmate, co-navigator, snack guardian."
  },
  {
    id: 3,
    title: "For the storms",
    body: "When life gets loud, I’ll be your quiet place—the umbrella, the playlist, the calm.",
    promise: "Promise: Shelter on demand."
  },
  {
    id: 4,
    title: "For the future",
    body: "I choose you in every possibility, every timeline, every version of our story.",
    promise: "Promise: Forever asking, forever choosing."
  }
];

export type PuzzleClue = {
  id: number;
  hint: string;
  answerFragment: string;
  location: string;
};

export const puzzleClues: PuzzleClue[] = [
  {
    id: 1,
    hint: "Count the letters of the word we couldn’t stop saying on date one.",
    answerFragment: "L",
    location: "Hero dedication"
  },
  {
    id: 2,
    hint: "Find the month hidden in the Osakan adventure and take its first letter.",
    answerFragment: "O",
    location: "Timeline card"
  },
  {
    id: 3,
    hint: "Look for the gallery caption that mentions a playlist and grab the first vowel.",
    answerFragment: "V",
    location: "Gallery caption"
  }
];

export const puzzleSolution = "LOVE";

export type ClosingToastContent = {
  headline: string;
  body: string;
  button: string;
};

export const closingToast: ClosingToastContent = {
  headline: "Here's to chapter two",
  body: "If the first year felt like a favorite song, imagine what the remix will do. Let's keep writing the lyrics, one surprise at a time.",
  button: "Play Our Song"
};

export type MonthlyTimelineEntry = {
  id: number;
  image: string;
  alt: string;
  caption: string;
  date?: string;
  location?: string;
  type?: "photo" | "video";
};

export const monthlyTimelineData: Record<number, MonthlyTimelineEntry[]> = {
  0: [], // January
  1: [], // February
  2: [], // March
  3: [], // April
  4: [], // May
  5: [], // June
  6: [], // July
  7: [], // August
  8: [], // September
  9: [], // October
  10: [], // November
  11: [] // December
};

