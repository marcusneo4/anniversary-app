import { useState } from "react";
import { motion } from "framer-motion";

const compatibilityQuestions = [
  {
    question: "What's your ideal weekend together?",
    options: [
      "Adventure and exploring new places",
      "Cozy home activities and relaxation",
      "Social events with friends",
      "Mix of everything"
    ]
  },
  {
    question: "How do you handle disagreements?",
    options: [
      "Talk it out immediately",
      "Take time to think, then discuss",
      "Use humor to lighten the mood",
      "Find a compromise together"
    ]
  },
  {
    question: "What's your love language?",
    options: [
      "Words of affirmation",
      "Quality time",
      "Physical touch",
      "Acts of service"
    ]
  },
  {
    question: "What makes you feel most loved?",
    options: [
      "Hearing 'I love you' and sweet messages",
      "Undivided attention and presence",
      "Hugs, cuddles, and physical closeness",
      "Thoughtful gestures and help with tasks"
    ]
  },
  {
    question: "How do you prefer to celebrate special moments?",
    options: [
      "Big celebration with friends and family",
      "Intimate, just the two of you",
      "Surprise gestures and gifts",
      "Simple, meaningful activities"
    ]
  }
];

const compatibilityResults = [
  {
    range: [90, 100],
    title: "Soulmates! 💕",
    message: "You two are perfectly matched! Your connection is deep, and you understand each other on every level."
  },
  {
    range: [75, 89],
    title: "Amazing Match! 💖",
    message: "You have incredible compatibility! Your relationship is strong and full of love and understanding."
  },
  {
    range: [60, 74],
    title: "Great Together! 💝",
    message: "You have good compatibility! With communication and effort, your bond will continue to grow stronger."
  },
  {
    range: [40, 59],
    title: "Growing Together! 🌱",
    message: "You have potential! Every relationship takes work, and you're both willing to grow together."
  },
  {
    range: [0, 39],
    title: "Learning Together! 📚",
    message: "Every relationship is unique! Focus on communication and finding common ground to strengthen your bond."
  }
];

export function CompatibilityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < compatibilityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateCompatibility = () => {
    // Calculate based on answer diversity and patterns
    const answerPatterns = answers.reduce((acc, ans) => {
      acc[ans] = (acc[ans] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    // More diverse answers = higher compatibility (shows understanding)
    const diversity = Object.keys(answerPatterns).length;
    const baseScore = 50 + (diversity * 8);
    
    // Bonus for balanced answers
    const balance = Math.max(...Object.values(answerPatterns)) - Math.min(...Object.values(answerPatterns));
    const balanceBonus = Math.max(0, 20 - balance * 5);
    
    return Math.min(100, Math.round(baseScore + balanceBonus));
  };

  const getResult = (score: number) => {
    return compatibilityResults.find(
      (result) => score >= result.range[0] && score <= result.range[1]
    ) || compatibilityResults[compatibilityResults.length - 1];
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const compatibilityScore = calculateCompatibility();
    const result = getResult(compatibilityScore);

    return (
      <section className="rounded-3xl bg-gradient-to-br from-rose-50 to-blush-50 p-8 shadow-2xl ring-1 ring-rose-100">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className="relative mx-auto h-32 w-32">
              <svg className="h-32 w-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-rose-200"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-blush-600"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - compatibilityScore / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-rose-900">{compatibilityScore}%</span>
              </div>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-3xl text-rose-900 mb-2"
          >
            {result.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-rose-700 max-w-md mx-auto"
          >
            {result.message}
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={reset}
            className="mt-6 rounded-full bg-gradient-to-r from-blush-500 to-blush-600 px-8 py-3 text-white transition hover:scale-105"
          >
            Take Again
          </motion.button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-gradient-to-br from-white to-rose-50 p-8 shadow-2xl ring-1 ring-rose-100">
      <div className="mb-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-rose-400">Quiz</p>
        <h2 className="mt-3 font-display text-3xl text-rose-900">Compatibility Quiz</h2>
        <p className="mt-2 text-sm text-rose-600">
          Question {currentQuestion + 1} of {compatibilityQuestions.length}
        </p>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-4"
      >
        <h3 className="text-center text-xl text-rose-800 font-medium">
          {compatibilityQuestions[currentQuestion].question}
        </h3>
        <div className="space-y-3">
          {compatibilityQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full rounded-xl border-2 border-rose-200 bg-white p-4 text-left text-rose-700 transition-all hover:border-blush-400 hover:bg-rose-50 hover:shadow-md"
            >
              {option}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

