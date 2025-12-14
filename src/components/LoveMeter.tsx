import { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  {
    question: "What's the best part of our relationship?",
    options: ["Laughing together", "Adventures", "Quiet moments", "All of the above"]
  },
  {
    question: "How do you feel when we're together?",
    options: ["Happy", "Complete", "At home", "All of the above"]
  },
  {
    question: "What's our favorite shared memory?",
    options: ["First date", "Travel adventures", "Everyday moments", "All of them"]
  }
];

export function LoveMeter() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateLove = () => {
    // All answers are "All of the above" = 100%
    const allCorrect = answers.every((ans) => ans === 3);
    if (allCorrect) return 100;

    // Calculate based on answers
    const score = answers.reduce((sum, ans) => sum + (ans === 3 ? 33.33 : 25), 0);
    return Math.min(100, Math.round(score));
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const loveLevel = calculateLove();
    return (
      <section className="rounded-3xl bg-gradient-to-br from-rose-50 to-blush-50 p-8 shadow-2xl ring-1 ring-rose-100">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
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
                  animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - loveLevel / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-rose-900">{loveLevel}%</span>
              </div>
            </div>
          </motion.div>
          <h2 className="font-display text-3xl text-rose-900">
            {loveLevel === 100 ? "Perfect Match! 💕" : loveLevel >= 75 ? "Amazing! 💖" : "Great! 💝"}
          </h2>
          <p className="mt-4 text-rose-700">
            {loveLevel === 100
              ? "You two are absolutely perfect for each other!"
              : "Your love is beautiful and growing every day."}
          </p>
          <button
            onClick={reset}
            className="mt-6 rounded-full bg-gradient-to-r from-blush-500 to-blush-600 px-8 py-3 text-white transition hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-gradient-to-br from-white to-rose-50 p-8 shadow-2xl ring-1 ring-rose-100 relative z-10" style={{ pointerEvents: 'auto' }}>
      <div className="mb-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-rose-400">Quiz</p>
        <h2 className="mt-3 font-display text-3xl text-rose-900">Love Meter</h2>
        <p className="mt-2 text-sm text-rose-600">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-4"
      >
        <h3 className="text-center text-xl text-rose-800">{questions[currentQuestion].question}</h3>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full rounded-xl border-2 border-rose-200 bg-white p-4 text-left text-rose-700 transition-all hover:border-blush-400 hover:bg-rose-50 hover:shadow-md cursor-pointer relative z-10"
              style={{ pointerEvents: 'auto' }}
            >
              {option}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

