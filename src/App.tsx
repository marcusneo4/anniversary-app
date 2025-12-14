import { useState, useEffect } from "react";
import { Sidebar, type SidebarTab } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { MonthlyTimeline } from "./components/MonthlyTimeline";
import { MemoryGallery } from "./components/MemoryGallery";
import { LoveNotes } from "./components/LoveNotes";
import { PuzzleUnlock } from "./components/PuzzleUnlock";
import { ClosingToast } from "./components/ClosingToast";
import { AmbientAudioToggle } from "./components/AmbientAudioToggle";
import { SparkleBackdrop } from "./components/SparkleBackdrop";
import { ShareCard } from "./components/ShareCard";
import { EditButton } from "./components/EditButton";
import { CountdownTimer } from "./components/CountdownTimer";
import { LoveMeter } from "./components/LoveMeter";
import { CompatibilityQuiz } from "./components/CompatibilityQuiz";
import { LoveLetterGenerator } from "./components/LoveLetterGenerator";
import { DateIdeasGenerator } from "./components/DateIdeasGenerator";
import { RelationshipStats } from "./components/RelationshipStats";
import { InteractiveMap } from "./components/InteractiveMap";
import { FavoriteThings } from "./components/FavoriteThings";
import { FloatingParticles } from "./components/FloatingParticles";
import { ScrollProgress } from "./components/ScrollProgress";
import { Floating3DElements } from "./components/Floating3DElements";
import { CinematicSection } from "./components/CinematicSection";
import { PastelDecorations } from "./components/PastelDecorations";
import { CursorTrail } from "./components/CursorTrail";
import { LoveLetter } from "./components/LoveLetter";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [activeTab, setActiveTab] = useState<SidebarTab>("home");
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="min-h-screen flex flex-col">
            <Hero
              onPrimaryClick={() => setActiveTab("timeline")}
              onSecondaryClick={() => setActiveTab("puzzle")}
            />
            <CinematicSection>
              <LoveLetter />
            </CinematicSection>
            <CinematicSection>
              <div className="text-center py-24 px-4">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-xs uppercase tracking-[0.5em] text-pink-600 font-semibold mb-6 modern-subheadline drop-shadow-sm"
                >
                  Our Journey
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-gray-800 modern-headline mb-8 gradient-text neon-glow"
                >
                  Every Moment<br />Matters
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl lg:text-2xl text-gray-800 modern-body max-w-3xl mx-auto leading-relaxed drop-shadow-sm"
                >
                  From the first hello to forever, every second has been a chapter in our love story.
                </motion.p>
              </div>
            </CinematicSection>
            <div className="px-4 pb-24 space-y-24">
              <CountdownTimer targetDate="2026-12-14" label="Until our next anniversary" />
              <FavoriteThings />
            </div>
          </div>
        );
      case "timeline":
        return <MonthlyTimeline />;
      case "gallery":
        return <MemoryGallery />;
      case "notes":
        return <LoveNotes />;
      case "love-meter":
        return <LoveMeter />;
      case "quiz":
        return <CompatibilityQuiz />;
      case "letter":
        return <LoveLetterGenerator />;
      case "dates":
        return <DateIdeasGenerator />;
      case "puzzle":
        return <PuzzleUnlock onSolved={() => setIsPuzzleSolved(true)} />;
      case "share":
        return <ShareCard />;
      case "stats":
        return <RelationshipStats />;
      case "map":
        return <InteractiveMap />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen dark-gradient-2 relative overflow-hidden">
      {/* Animated background gradient orbs - Dynamic */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-300/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-300/35 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.25, 1],
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        {/* Additional dynamic orbs */}
        <motion.div 
          className="absolute top-3/4 right-1/3 w-64 h-64 bg-rose-200/25 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.35, 1],
            x: [0, 35, 0],
            y: [0, -35, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </div>
      
      <PastelDecorations />
      <ScrollProgress />
      <FloatingParticles />
      <Floating3DElements />
      <CursorTrail />
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onToggle={setIsSidebarOpen} />
      
      <main 
        className="min-h-screen transition-all duration-500 relative z-10"
        style={{ 
          marginLeft: isDesktop 
            ? (isSidebarOpen ? '18rem' : '3rem')
            : '0',
          willChange: 'margin-left'
        }}
      >
        <div className="min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.98 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.4, 0, 0.2, 1],
                scale: { duration: 0.3 }
              }}
              style={{ willChange: 'transform, opacity' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      <AmbientAudioToggle />
      <EditButton />
      {isPuzzleSolved && activeTab !== "share" && (
        <div className="fixed bottom-4 right-4 z-40">
          <ClosingToast
            isUnlocked={isPuzzleSolved}
            onPlayNext={() => {
              window.alert("Surprise date night unlocked! Check your messages tonight.");
            }}
          />
        </div>
      )}
    </div>
  );
}

