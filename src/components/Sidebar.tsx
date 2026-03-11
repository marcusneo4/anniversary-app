import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export type SidebarTab = "home" | "timeline" | "gallery" | "notes" | "love-meter" | "quiz" | "letter" | "dates" | "puzzle" | "share" | "stats" | "map";

type SidebarProps = {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  onToggle?: (isOpen: boolean) => void;
};

const tabs: { id: SidebarTab; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "timeline", label: "Timeline", icon: "📅" },
  { id: "gallery", label: "Gallery", icon: "🖼️" },
  { id: "notes", label: "Love Notes", icon: "💌" },
  { id: "stats", label: "Stats", icon: "📊" },
  { id: "map", label: "Locations", icon: "🗺️" },
  { id: "love-meter", label: "Love Meter", icon: "💖" },
  { id: "quiz", label: "Quiz", icon: "❓" },
  { id: "letter", label: "Letter", icon: "✍️" },
  { id: "dates", label: "Date Ideas", icon: "🌹" },
  { id: "puzzle", label: "Puzzle", icon: "🧩" },
  { id: "share", label: "Share", icon: "📤" }
];

export function Sidebar({ activeTab, onTabChange, onToggle }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    onToggle?.(isOpen);
  }, [isOpen, onToggle]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.button
        onClick={toggleSidebar}
        whileHover={{ scale: 1.05, boxShadow: "0 12px 28px rgba(236, 72, 153, 0.25), 0 4px 12px rgba(244, 63, 94, 0.12)" }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`fixed left-4 top-4 z-[100] flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 p-3 text-white shadow-tactile transition-shadow duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset-2 ${
          isOpen && isDesktop ? "lg:left-[19rem]" : "lg:left-4"
        }`}
        aria-label="Toggle sidebar"
      >
        <motion.svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </motion.svg>
      </motion.button>

      <motion.aside
        initial={false}
        animate={{ 
          x: isOpen ? 0 : (isDesktop ? 0 : -288), // On desktop, stay at 0 when collapsed (show icons)
          width: isOpen ? 288 : (isDesktop ? 48 : 0)
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 z-[90] h-screen glass-modern border-r border-pink-300/40 shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 245, 248, 0.95) 0%, rgba(255, 238, 242, 0.95) 100%)'
        }}
      >
        {/* Logo/Brand */}
        <motion.div
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.2 }}
          className="border-b border-pink-300/30 p-6 overflow-hidden"
        >
          <h1 className="text-2xl font-bold text-ink-primary whitespace-nowrap modern-headline gradient-text">Our Story</h1>
          <p className="mt-2 text-xs uppercase tracking-widest text-pink-500/70 modern-subheadline">2025</p>
        </motion.div>

        {/* Navigation */}
        <nav className="mt-8 space-y-2 px-4">
          {tabs.map((tab) => {
            const isActiveTab = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                aria-pressed={isActiveTab}
                onClick={() => {
                  onTabChange(tab.id);
                  if (!isDesktop) {
                    setIsOpen(false);
                  }
                }}
                whileHover={{ x: isOpen ? 4 : 0 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`flex min-h-[2.75rem] w-full items-center rounded-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400 focus-visible:outline-offset-1 ${
                  isOpen ? "px-4 py-3" : "justify-center px-2 py-3"
                } ${
                  isActiveTab
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-tactile"
                    : "border border-transparent text-ink-secondary hover:border-pink-300/40 hover:bg-surface-elevated/80 hover:text-ink-primary"
                }`}
                title={!isOpen ? tab.label : undefined}
              >
                <motion.div
                  className="flex items-center"
                  initial={false}
                  animate={{
                    justifyContent: isOpen ? "flex-start" : "center",
                  }}
                  style={{ gap: isOpen ? 12 : 0 }}
                >
                  <span className="text-xl flex-shrink-0">{tab.icon}</span>
                  <motion.span
                    className="font-medium whitespace-nowrap overflow-hidden"
                    animate={{
                      opacity: isOpen ? 1 : 0,
                      width: isOpen ? "auto" : 0,
                      marginLeft: isOpen ? 0 : -12,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {tab.label}
                  </motion.span>
                </motion.div>
              </motion.button>
            );
          })}
        </nav>

        {/* Decorative elements */}
        <motion.div
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 left-0 right-0 border-t border-pink-300/30 p-6 overflow-hidden"
        >
          <div className="text-center">
            <p className="text-xs text-pink-400/70">Made with ❤️</p>
          </div>
        </motion.div>
      </motion.aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[85] bg-pink-200/30 backdrop-blur-sm lg:hidden"
        />
      )}
    </>
  );
}

