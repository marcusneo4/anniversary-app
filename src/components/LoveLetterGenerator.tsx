import { useState } from "react";
import { motion } from "framer-motion";

const letterTemplates = [
  {
    title: "Sweet & Simple",
    template: (name: string) => `My dearest ${name || "love"},

Every day with you feels like a gift. Your smile lights up my world, and your laugh is my favorite sound. I'm so grateful to have you in my life.

With all my love`
  },
  {
    title: "Romantic & Poetic",
    template: (name: string) => `To my beautiful ${name || "darling"},

You are the melody to my song, the color to my world, and the warmth to my heart. In your eyes, I found my home. In your arms, I found my peace.

Forever yours`
  },
  {
    title: "Fun & Playful",
    template: (name: string) => `Hey ${name || "you"},

You're my favorite person to do absolutely nothing with. Whether we're on an adventure or just being weird together, every moment is perfect because it's with you.

Love, your weirdo`
  },
  {
    title: "Deep & Meaningful",
    template: (name: string) => `My ${name || "love"},

You've shown me what it means to be truly seen and loved. Thank you for being patient with me, for making me laugh, and for choosing me every single day.

All my love, always`
  }
];

export function LoveLetterGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [recipientName, setRecipientName] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [showLetter, setShowLetter] = useState(false);

  const generateLetter = () => {
    const letter = letterTemplates[selectedTemplate].template(recipientName);
    setGeneratedLetter(letter);
    setShowLetter(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    alert("Letter copied to clipboard!");
  };

  const reset = () => {
    setShowLetter(false);
    setGeneratedLetter("");
  };

  if (showLetter) {
    return (
      <section className="rounded-3xl bg-gradient-to-br from-rose-50 to-blush-50 p-8 shadow-2xl ring-1 ring-rose-100">
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-rose-400">Your Love Letter</p>
          <h2 className="mt-3 font-display text-3xl text-rose-900">💌 Special Message</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-rose-100"
        >
          <div className="whitespace-pre-wrap text-rose-800 leading-relaxed">{generatedLetter}</div>
        </motion.div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={copyToClipboard}
            className="rounded-full bg-gradient-to-r from-blush-500 to-blush-600 px-6 py-3 text-white transition hover:scale-105"
          >
            📋 Copy Letter
          </button>
          <button
            onClick={reset}
            className="rounded-full border border-rose-300 px-6 py-3 text-rose-600 transition hover:bg-white"
          >
            Create Another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-gradient-to-br from-white to-rose-50 p-8 shadow-2xl ring-1 ring-rose-100">
      <div className="mb-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-rose-400">Generator</p>
        <h2 className="mt-3 font-display text-3xl text-rose-900">Love Letter Generator</h2>
        <p className="mt-2 text-sm text-rose-600">Create a heartfelt message for your special someone</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-rose-700 mb-2">Recipient's Name</label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Enter their name..."
            className="w-full rounded-xl border border-rose-200 bg-white px-4 py-3 text-rose-900 focus:border-blush-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-rose-700 mb-3">Choose a Style</label>
          <div className="grid grid-cols-2 gap-3">
            {letterTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => setSelectedTemplate(index)}
                className={`rounded-xl border-2 p-3 text-sm transition-all ${
                  selectedTemplate === index
                    ? "border-blush-500 bg-blush-50 text-blush-700"
                    : "border-rose-200 bg-white text-rose-700 hover:border-rose-300"
                }`}
              >
                {template.title}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateLetter}
          disabled={!recipientName.trim()}
          className="w-full rounded-full bg-gradient-to-r from-blush-500 to-blush-600 px-8 py-3 text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ✨ Generate Love Letter
        </button>
      </div>
    </section>
  );
}

