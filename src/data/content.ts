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
    image: "/media/photos/photo-1.jpg",
    alt: "A beautiful memory together",
    caption: "A beautiful moment captured forever"
  },
  {
    id: 2,
    image: "/media/photos/photo-2.jpg",
    alt: "Another special memory together",
    caption: "Another special memory together"
  },
  {
    id: 3,
    image: "/media/photos/photo_1_2025-12-14_11-32-10.jpg",
    alt: "Cherished memory",
    caption: "A moment we'll treasure forever"
  },
  {
    id: 4,
    image: "/media/photos/photo_2_2025-12-14_11-32-10.jpg",
    alt: "Special moment",
    caption: "Captured in time, forever in our hearts"
  },
  {
    id: 5,
    image: "/media/photos/photo_3_2025-12-14_11-32-10.jpg",
    alt: "Beautiful memory",
    caption: "These are the moments that matter"
  },
  {
    id: 6,
    image: "/media/photos/photo_4_2025-12-14_11-32-10.jpg",
    alt: "Precious memory",
    caption: "Every picture tells our story"
  },
  {
    id: 7,
    image: "/media/photos/photo_5_2025-12-14_11-32-10.jpg",
    alt: "Loving memory",
    caption: "Together, always"
  },
  {
    id: 8,
    image: "/media/photos/photo_6_2025-12-14_11-32-10.jpg",
    alt: "Sweet memory",
    caption: "Frozen in time, alive in our hearts"
  },
  {
    id: 9,
    image: "/media/photos/photo_7_2025-12-14_11-32-10.jpg",
    alt: "Treasured moment",
    caption: "The best moments are the ones we share"
  },
  {
    id: 10,
    image: "/media/photos/photo_8_2025-12-14_11-32-10.jpg",
    alt: "Beautiful memory",
    caption: "A snapshot of happiness"
  },
  {
    id: 11,
    image: "/media/photos/photo_9_2025-12-14_11-32-10.jpg",
    alt: "Special moment",
    caption: "Love captured in a frame"
  },
  {
    id: 12,
    image: "/media/photos/photo_10_2025-12-14_11-32-10.jpg",
    alt: "Cherished memory",
    caption: "These memories will last forever"
  },
  {
    id: 13,
    image: "/media/photos/photo_11_2025-12-14_11-32-10.jpg",
    alt: "Precious moment",
    caption: "Every moment with you is a gift"
  },
  {
    id: 14,
    image: "/media/photos/photo_12_2025-12-14_11-32-10.jpg",
    alt: "Loving memory",
    caption: "Together we create beautiful memories"
  },
  {
    id: 15,
    image: "/media/photos/photo_13_2025-12-14_11-32-10.jpg",
    alt: "Sweet memory",
    caption: "A picture is worth a thousand words"
  },
  {
    id: 16,
    image: "/media/photos/photo_14_2025-12-14_11-32-10.jpg",
    alt: "Treasured moment",
    caption: "Capturing our journey together"
  },
  {
    id: 17,
    image: "/media/photos/photo_15_2025-12-14_11-32-10.jpg",
    alt: "Beautiful memory",
    caption: "These moments define us"
  },
  {
    id: 18,
    image: "/media/photos/photo_16_2025-12-14_11-32-10.jpg",
    alt: "Special memory",
    caption: "Forever in our hearts"
  },
  {
    id: 19,
    image: "/media/photos/photo_17_2025-12-14_11-32-10.jpg",
    alt: "Cherished moment",
    caption: "Love in every frame"
  },
  {
    id: 20,
    image: "/media/photos/photo_18_2025-12-14_11-32-10.jpg",
    alt: "Precious memory",
    caption: "A collection of our best moments"
  },
  {
    id: 21,
    image: "/media/photos/photo_19_2025-12-14_11-32-10.jpg",
    alt: "Loving memory",
    caption: "Every photo tells our story"
  },
  {
    id: 22,
    image: "/media/photos/photo_20_2025-12-14_11-32-10.jpg",
    alt: "Sweet memory",
    caption: "Memories that will never fade"
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
  button: "Play this"
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
  0: [ // January
    { id: 1, image: "/media/photos/January/photo_1_2025-12-14_14-01-32.jpg", alt: "January memory", caption: "New year, new adventures, same us" },
    { id: 2, image: "/media/photos/January/photo_2_2025-12-14_14-01-32.jpg", alt: "January memory", caption: "When the world felt quiet, we found our rhythm" },
    { id: 3, image: "/media/photos/January/photo_3_2025-12-14_14-01-32.jpg", alt: "January memory", caption: "Laughing until our cheeks hurt" },
    { id: 4, image: "/media/photos/January/photo_4_2025-12-14_14-01-32.jpg", alt: "January memory", caption: "The kind of moment that makes everything else fade away" },
    { id: 5, image: "/media/photos/January/photo_5_2025-12-14_14-01-32.jpg", alt: "January memory", caption: "Proof that the best days are the ones we spend together" },
    { id: 6, image: "/media/photos/January/photo_6_2025-12-14_14-01-32.jpg", alt: "January memory", caption: "You make ordinary moments feel extraordinary" },
    { id: 7, image: "/media/photos/January/photo_7_2025-12-14_14-01-32.jpg", alt: "January memory", caption: "Caught in the perfect light, just like us" },
    { id: 8, image: "/media/photos/January/photo_8_2025-12-14_14-01-32.jpg", alt: "January memory", caption: "These are the memories I'll replay forever" },
    { id: 9, image: "/media/photos/January/photo_9_2025-12-14_14-01-32.jpg", alt: "January memory", caption: "When time stood still and we didn't mind" },
    { id: 10, image: "/media/photos/January/photo_10_2025-12-14_14-01-32.jpg", alt: "January memory", caption: "The start of something beautiful" },
    { id: 11, image: "/media/photos/January/photo_11_2025-12-14_14-01-32.jpg", alt: "January memory", caption: "Frozen in time, alive in our hearts" },
    { id: 12, image: "/media/photos/January/photo_12_2025-12-14_14-01-32.jpg", alt: "January memory", caption: "January taught us that home isn't a place, it's you" }
  ],
  1: [ // February
    { id: 13, image: "/media/photos/February/photo_1_2025-12-14_14-02-28.jpg", alt: "February memory", caption: "Love in the air, and everywhere we looked" },
    { id: 14, image: "/media/photos/February/photo_2_2025-12-14_14-02-28.jpg", alt: "February memory", caption: "The month that reminded us why we chose each other" },
    { id: 15, image: "/media/photos/February/photo_3_2025-12-14_14-02-28.jpg", alt: "February memory", caption: "Sweet moments that taste like forever" },
    { id: 16, image: "/media/photos/February/photo_4_2025-12-14_14-02-28.jpg", alt: "February memory", caption: "When every day felt like a celebration" },
    { id: 17, image: "/media/photos/February/photo_5_2025-12-14_14-02-28.jpg", alt: "February memory", caption: "Captured: the exact moment I knew I was yours" },
    { id: 18, image: "/media/photos/February/photo_6_2025-12-14_14-02-28.jpg", alt: "February memory", caption: "February's gift: more reasons to smile" },
    { id: 19, image: "/media/photos/February/photo_7_2025-12-14_14-02-28.jpg", alt: "February memory", caption: "The kind of day that makes you believe in magic" }
  ],
  2: [], // March
  3: [ // April
    { id: 20, image: "/media/photos/April/photo_1_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "Spring bloomed, and so did we" },
    { id: 21, image: "/media/photos/April/photo_2_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "Sunset oranges and your laugh—perfect harmony" },
    { id: 22, image: "/media/photos/April/photo_3_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "The secret beach picnic where time forgot to tick" },
    { id: 23, image: "/media/photos/April/photo_4_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "You insisted the clouds looked like marshmallows. I believed you." },
    { id: 24, image: "/media/photos/April/photo_5_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "When the playlist shuffled to our song" },
    { id: 25, image: "/media/photos/April/photo_6_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "April taught us that adventures don't need a destination" },
    { id: 26, image: "/media/photos/April/photo_7_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "The moment we realized we were building something real" },
    { id: 27, image: "/media/photos/April/photo_8_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "Caught mid-laugh, the way I love you most" },
    { id: 28, image: "/media/photos/April/photo_9_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "When everything else faded and it was just us" },
    { id: 29, image: "/media/photos/April/photo_10_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "Proof that the best moments are unplanned" },
    { id: 30, image: "/media/photos/April/photo_11_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "April's promise: more days like this" },
    { id: 31, image: "/media/photos/April/photo_12_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "The kind of day that makes you want to freeze time" },
    { id: 32, image: "/media/photos/April/photo_13_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "When the world felt big and we felt invincible" },
    { id: 33, image: "/media/photos/April/photo_14_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "April's gift: memories that still make me smile" },
    { id: 34, image: "/media/photos/April/photo_15_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "The moment I knew we were writing our own story" },
    { id: 35, image: "/media/photos/April/photo_16_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "Together, we turned ordinary into extraordinary" },
    { id: 36, image: "/media/photos/April/photo_17_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "April showed us that love grows in the quiet moments too" },
    { id: 37, image: "/media/photos/April/photo_18_2025-12-14_14-02-52.jpg", alt: "April memory", caption: "Forever grateful for April and everything it brought us" }
  ],
  4: [ // May
    { id: 38, image: "/media/photos/May/photo_1_2025-12-14_14-03-11.jpg", alt: "May memory", caption: "May flowers and your smile—nature's best work" },
    { id: 39, image: "/media/photos/May/photo_2_2025-12-14_14-03-11.jpg", alt: "May memory", caption: "When the weather warmed and so did our hearts" },
    { id: 40, image: "/media/photos/May/photo_3_2025-12-14_14-03-11.jpg", alt: "May memory", caption: "The month we learned to dance in the rain together" },
    { id: 41, image: "/media/photos/May/photo_4_2025-12-14_14-03-11.jpg", alt: "May memory", caption: "Caught in a moment of pure joy" },
    { id: 42, image: "/media/photos/May/photo_5_2025-12-14_14-03-11.jpg", alt: "May memory", caption: "May's reminder: we're exactly where we're meant to be" },
    { id: 43, image: "/media/photos/May/photo_6_2025-12-14_14-03-11.jpg", alt: "May memory", caption: "When every day felt like a new beginning" },
    { id: 44, image: "/media/photos/May/photo_7_2025-12-14_14-03-11.jpg", alt: "May memory", caption: "The kind of moment that makes you believe in forever" },
    { id: 45, image: "/media/photos/May/photo_8_2025-12-14_14-03-11.jpg", alt: "May memory", caption: "May taught us that love is in the details" },
    { id: 46, image: "/media/photos/May/photo_9_2025-12-14_14-03-11.jpg", alt: "May memory", caption: "Proof that the best memories are the ones we make together" }
  ],
  5: [ // June
    { id: 47, image: "/media/photos/June/photo_1_2025-12-14_14-03-32.jpg", alt: "June memory", caption: "Summer arrived and so did our best days yet" },
    { id: 48, image: "/media/photos/June/photo_2_2025-12-14_14-03-32.jpg", alt: "June memory", caption: "Long days, longer conversations, infinite love" },
    { id: 49, image: "/media/photos/June/photo_3_2025-12-14_14-03-32.jpg", alt: "June memory", caption: "When the sun set and we didn't want the day to end" },
    { id: 50, image: "/media/photos/June/photo_4_2025-12-14_14-03-32.jpg", alt: "June memory", caption: "June's promise: endless summer nights together" },
    { id: 51, image: "/media/photos/June/photo_5_2025-12-14_14-03-32.jpg", alt: "June memory", caption: "The moment we realized we were building our forever" },
    { id: 52, image: "/media/photos/June/photo_6_2025-12-14_14-03-32.jpg", alt: "June memory", caption: "Caught in golden hour, just like our love" },
    { id: 53, image: "/media/photos/June/photo_7_2025-12-14_14-03-32.jpg", alt: "June memory", caption: "June showed us that every moment with you is golden" }
  ],
  6: [ // July
    { id: 54, image: "/media/photos/July/photo_1_2025-12-14_14-03-51.jpg", alt: "July memory", caption: "The storm cancelled our plans, but gave us something better" },
    { id: 55, image: "/media/photos/July/photo_2_2025-12-14_14-03-51.jpg", alt: "July memory", caption: "Bus stop #27 became our favorite place that day" },
    { id: 56, image: "/media/photos/July/photo_3_2025-12-14_14-03-51.jpg", alt: "July memory", caption: "When rain turned into our perfect shelter" },
    { id: 57, image: "/media/photos/July/photo_4_2025-12-14_14-03-51.jpg", alt: "July memory", caption: "Playlists and confessions in the quiet of the storm" },
    { id: 58, image: "/media/photos/July/photo_5_2025-12-14_14-03-51.jpg", alt: "July memory", caption: "July taught us that the best moments are unplanned" },
    { id: 59, image: "/media/photos/July/photo_6_2025-12-14_14-03-51.jpg", alt: "July memory", caption: "When we turned a bus stop into our living room" },
    { id: 60, image: "/media/photos/July/photo_7_2025-12-14_14-03-51.jpg", alt: "July memory", caption: "The day we learned that home is wherever you are" },
    { id: 61, image: "/media/photos/July/photo_8_2025-12-14_14-03-51.jpg", alt: "July memory", caption: "Caught in the rain, caught in each other's eyes" },
    { id: 62, image: "/media/photos/July/photo_9_2025-12-14_14-03-51.jpg", alt: "July memory", caption: "July's gift: finding beauty in unexpected places" },
    { id: 63, image: "/media/photos/July/photo_10_2025-12-14_14-03-51.jpg", alt: "July memory", caption: "When the world got quiet and we got closer" },
    { id: 64, image: "/media/photos/July/photo_11_2025-12-14_14-03-51.jpg", alt: "July memory", caption: "Proof that perfect days don't need perfect weather" },
    { id: 65, image: "/media/photos/July/photo_12_2025-12-14_14-03-51.jpg", alt: "July memory", caption: "The moment we realized we could make anywhere feel like home" },
    { id: 66, image: "/media/photos/July/photo_13_2025-12-14_14-03-51.jpg", alt: "July memory", caption: "July memories: when rain became our favorite sound" }
  ],
  7: [ // August
    { id: 67, image: "/media/photos/August/photo_1_2025-12-14_14-04-11.jpg", alt: "August memory", caption: "August's warmth matched only by your smile" },
    { id: 68, image: "/media/photos/August/photo_2_2025-12-14_14-04-11.jpg", alt: "August memory", caption: "When summer nights felt endless and so did our love" },
    { id: 69, image: "/media/photos/August/photo_3_2025-12-14_14-04-11.jpg", alt: "August memory", caption: "The month we learned that time flies when you're happy" },
    { id: 70, image: "/media/photos/August/photo_4_2025-12-14_14-04-11.jpg", alt: "August memory", caption: "Caught in a moment of pure contentment" },
    { id: 71, image: "/media/photos/August/photo_5_2025-12-14_14-04-11.jpg", alt: "August memory", caption: "August's reminder: we're building something beautiful" },
    { id: 72, image: "/media/photos/August/photo_6_2025-12-14_14-04-11.jpg", alt: "August memory", caption: "When every day felt like a celebration of us" },
    { id: 73, image: "/media/photos/August/photo_7_2025-12-14_14-04-11.jpg", alt: "August memory", caption: "The kind of moment that makes you want to pause time" },
    { id: 74, image: "/media/photos/August/photo_8_2025-12-14_14-04-11.jpg", alt: "August memory", caption: "August taught us that love grows in the sunshine too" },
    { id: 75, image: "/media/photos/August/photo_9_2025-12-14_14-04-11.jpg", alt: "August memory", caption: "Proof that the best days are the ones we share" },
    { id: 76, image: "/media/photos/August/photo_10_2025-12-14_14-04-11.jpg", alt: "August memory", caption: "When the world felt big and we felt invincible together" },
    { id: 77, image: "/media/photos/August/photo_11_2025-12-14_14-04-11.jpg", alt: "August memory", caption: "August's gift: memories that still make my heart skip" },
    { id: 78, image: "/media/photos/August/photo_12_2025-12-14_14-04-11.jpg", alt: "August memory", caption: "The moment we realized we were exactly where we belonged" },
    { id: 79, image: "/media/photos/August/photo_13_2025-12-14_14-04-11.jpg", alt: "August memory", caption: "Together, we turned August into our favorite month" },
    { id: 80, image: "/media/photos/August/photo_14_2025-12-14_14-04-11.jpg", alt: "August memory", caption: "Forever grateful for August and all it brought us" }
  ],
  8: [ // September
    { id: 81, image: "/media/photos/September/photo_1_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "Passport stamps and sushi—Osaka showed us the world" },
    { id: 82, image: "/media/photos/September/photo_2_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "You taught me that travel is about who laughs with you when you get lost" },
    { id: 83, image: "/media/photos/September/photo_3_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "The month we learned that adventures are better shared" },
    { id: 84, image: "/media/photos/September/photo_4_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "When getting lost became our favorite pastime" },
    { id: 85, image: "/media/photos/September/photo_5_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "September's gift: discovering new places and each other" },
    { id: 86, image: "/media/photos/September/photo_6_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "The moment we realized we were perfect travel partners" },
    { id: 87, image: "/media/photos/September/photo_7_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "Caught exploring, just like we explore each other's hearts" },
    { id: 88, image: "/media/photos/September/photo_8_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "When the maps argued but we found our way together" },
    { id: 89, image: "/media/photos/September/photo_9_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "September taught us that home is wherever we are together" },
    { id: 90, image: "/media/photos/September/photo_10_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "Proof that the best souvenirs are the memories we make" },
    { id: 91, image: "/media/photos/September/photo_11_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "The kind of adventure that makes you want to explore forever" },
    { id: 92, image: "/media/photos/September/photo_12_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "September's promise: more stamps, more stories, more us" },
    { id: 93, image: "/media/photos/September/photo_13_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "When we realized we could make anywhere feel like home" },
    { id: 94, image: "/media/photos/September/photo_14_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "Together, we turned September into our greatest adventure" },
    { id: 95, image: "/media/photos/September/photo_15_2025-12-14_14-04-34.jpg", alt: "September memory", caption: "Forever grateful for September and the journey it started" }
  ],
  9: [ // October
    { id: 96, image: "/media/photos/October/photo_1_2025-12-14_14-04-53.jpg", alt: "October memory", caption: "October's colors matched the warmth in our hearts" },
    { id: 97, image: "/media/photos/October/photo_2_2025-12-14_14-04-53.jpg", alt: "October memory", caption: "When autumn arrived and we fell deeper in love" },
    { id: 98, image: "/media/photos/October/photo_3_2025-12-14_14-04-53.jpg", alt: "October memory", caption: "The month we learned that love changes with the seasons" },
    { id: 99, image: "/media/photos/October/photo_4_2025-12-14_14-04-53.jpg", alt: "October memory", caption: "Caught in a moment of perfect autumn bliss" },
    { id: 100, image: "/media/photos/October/photo_5_2025-12-14_14-04-53.jpg", alt: "October memory", caption: "October's reminder: we're growing together, not apart" },
    { id: 101, image: "/media/photos/October/photo_6_2025-12-14_14-04-53.jpg", alt: "October memory", caption: "When every day felt like a cozy adventure" },
    { id: 102, image: "/media/photos/October/photo_7_2025-12-14_14-04-53.jpg", alt: "October memory", caption: "The kind of moment that makes you want to stay forever" },
    { id: 103, image: "/media/photos/October/photo_8_2025-12-14_14-04-53.jpg", alt: "October memory", caption: "October taught us that love is in the quiet moments too" },
    { id: 104, image: "/media/photos/October/photo_9_2025-12-14_14-04-53.jpg", alt: "October memory", caption: "Proof that the best days are the ones we spend together" },
    { id: 105, image: "/media/photos/October/photo_10_2025-12-14_14-04-53.jpg", alt: "October memory", caption: "When the world felt peaceful and we felt complete" },
    { id: 106, image: "/media/photos/October/photo_11_2025-12-14_14-04-53.jpg", alt: "October memory", caption: "October's gift: memories that still warm my heart" },
    { id: 107, image: "/media/photos/October/photo_12_2025-12-14_14-04-53.jpg", alt: "October memory", caption: "Forever grateful for October and the love it deepened" }
  ],
  10: [ // November
    { id: 108, image: "/media/photos/November/photo_1_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "November's gratitude: you, always you" },
    { id: 109, image: "/media/photos/November/photo_2_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "When the year started winding down but our love kept growing" },
    { id: 110, image: "/media/photos/November/photo_3_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "The month we realized how much we had to be thankful for" },
    { id: 111, image: "/media/photos/November/photo_4_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "Caught in a moment of pure gratitude" },
    { id: 112, image: "/media/photos/November/photo_5_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "November's reminder: we're exactly where we're meant to be" },
    { id: 113, image: "/media/photos/November/photo_6_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "When every day felt like a reason to celebrate" },
    { id: 114, image: "/media/photos/November/photo_7_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "The kind of moment that makes you want to pause time" },
    { id: 115, image: "/media/photos/November/photo_8_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "November taught us that love is in the everyday moments" },
    { id: 116, image: "/media/photos/November/photo_9_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "Proof that the best memories are the ones we make together" },
    { id: 117, image: "/media/photos/November/photo_10_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "When the world felt peaceful and we felt complete" },
    { id: 118, image: "/media/photos/November/photo_11_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "November's gift: memories that still make me smile" },
    { id: 119, image: "/media/photos/November/photo_12_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "The moment we realized we were building our forever" },
    { id: 120, image: "/media/photos/November/photo_13_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "Together, we turned November into our favorite month" },
    { id: 121, image: "/media/photos/November/photo_14_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "When every moment felt like a gift" },
    { id: 122, image: "/media/photos/November/photo_15_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "November showed us that love grows in gratitude" },
    { id: 123, image: "/media/photos/November/photo_16_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "The kind of day that makes you believe in forever" },
    { id: 124, image: "/media/photos/November/photo_17_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "Caught in the perfect light, just like our love" },
    { id: 125, image: "/media/photos/November/photo_18_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "November's promise: more days like this" },
    { id: 126, image: "/media/photos/November/photo_19_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "When time stood still and we didn't mind" },
    { id: 127, image: "/media/photos/November/photo_20_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "Frozen in time, alive in our hearts" },
    { id: 128, image: "/media/photos/November/photo_21_2025-12-14_14-05-14.jpg", alt: "November memory", caption: "Forever grateful for November and everything it brought us" }
  ],
  11: [] // December
};

