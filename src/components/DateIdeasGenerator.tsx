import { useState } from "react";
import { motion } from "framer-motion";

const dateCategories = {
  romantic: [
    "Sunset picnic at the beach with homemade snacks",
    "Candlelit dinner at home with your favorite playlist",
    "Stargazing in a quiet park with blankets and hot cocoa",
    "Couple's spa night with face masks and massages",
    "Wine tasting at a local vineyard or at home"
  ],
  adventurous: [
    "Hiking to a scenic viewpoint for sunrise",
    "Trying a new activity together (rock climbing, kayaking, etc.)",
    "Road trip to a nearby town you've never visited",
    "Outdoor movie night under the stars",
    "Exploring a new neighborhood on foot"
  ],
  cozy: [
    "Baking together and taste-testing your creations",
    "Movie marathon with all your favorite films",
    "Board game night with snacks and drinks",
    "Reading to each other by candlelight",
    "Building a fort and watching shows inside"
  ],
  creative: [
    "Painting or drawing session together",
    "Cooking a new cuisine you've never tried",
    "DIY project for your home together",
    "Photography walk capturing beautiful moments",
    "Writing love letters to each other"
  ],
  fun: [
    "Arcade or amusement park day",
    "Karaoke night at home or at a venue",
    "Escape room challenge together",
    "Dance class or just dancing in your living room",
    "Trivia night at a local bar or at home"
  ]
};

export function DateIdeasGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [generatedIdea, setGeneratedIdea] = useState("");
  const [showIdea, setShowIdea] = useState(false);

  const generateIdea = (category: string) => {
    const ideas = dateCategories[category as keyof typeof dateCategories];
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    setGeneratedIdea(randomIdea);
    setSelectedCategory(category);
    setShowIdea(true);
  };

  const generateRandom = () => {
    const allCategories = Object.keys(dateCategories);
    const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
    generateIdea(randomCategory);
  };

  const reset = () => {
    setShowIdea(false);
    setGeneratedIdea("");
    setSelectedCategory(null);
  };

  if (showIdea) {
    return (
      <section className="rounded-3xl bg-gradient-to-br from-rose-50 to-blush-50 p-8 shadow-2xl ring-1 ring-rose-100">
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-rose-400">Your Date Idea</p>
          <h2 className="mt-3 font-display text-3xl text-rose-900">💕 Perfect Plan</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-rose-100 text-center"
        >
          <div className="mb-4">
            <span className="inline-block rounded-full bg-blush-100 px-4 py-1 text-sm font-medium text-blush-700 capitalize">
              {selectedCategory}
            </span>
          </div>
          <p className="text-2xl font-medium text-rose-900 leading-relaxed">{generatedIdea}</p>
        </motion.div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={generateRandom}
            className="rounded-full bg-gradient-to-r from-blush-500 to-blush-600 px-6 py-3 text-white transition hover:scale-105"
          >
            🎲 Get Another Idea
          </button>
          <button
            onClick={reset}
            className="rounded-full border border-rose-300 px-6 py-3 text-rose-600 transition hover:bg-white"
          >
            Choose Category
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-gradient-to-br from-white to-rose-50 p-8 shadow-2xl ring-1 ring-rose-100">
      <div className="mb-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-rose-400">Generator</p>
        <h2 className="mt-3 font-display text-3xl text-rose-900">Date Ideas Generator</h2>
        <p className="mt-2 text-sm text-rose-600">Find the perfect date idea for you two</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Object.keys(dateCategories).map((category) => (
            <button
              key={category}
              onClick={() => generateIdea(category)}
              className="rounded-xl border-2 border-rose-200 bg-white p-4 text-sm font-medium text-rose-700 capitalize transition-all hover:border-blush-400 hover:bg-rose-50 hover:shadow-md"
            >
              {category === "romantic" && "💕"}
              {category === "adventurous" && "🏔️"}
              {category === "cozy" && "🏠"}
              {category === "creative" && "🎨"}
              {category === "fun" && "🎉"}
              <br />
              {category}
            </button>
          ))}
        </div>

        <button
          onClick={generateRandom}
          className="w-full rounded-full bg-gradient-to-r from-blush-500 to-blush-600 px-8 py-3 text-white transition hover:scale-105"
        >
          🎲 Surprise Me!
        </button>
      </div>
    </section>
  );
}

