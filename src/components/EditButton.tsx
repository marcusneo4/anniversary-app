import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminPanel } from "./AdminPanel";

export function EditButton() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [contentKey, setContentKey] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isAdminOpen) {
        setIsAdminOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isAdminOpen]);

  const handleContentUpdate = () => {
    setContentKey((prev) => prev + 1);
    window.location.reload(); // Simple refresh to reload content
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blush-500 to-blush-600 text-white shadow-2xl transition hover:shadow-blush-500/50"
        title="Edit Content (Ctrl+K)"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </motion.button>

      <AdminPanel
        key={contentKey}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onContentUpdate={handleContentUpdate}
      />
    </>
  );
}

