import { useEffect, useState } from "react";
import { AdminPanel } from "./AdminPanel";

/**
 * Edit mode for Marcus. There is no visible button on purpose:
 * press Ctrl+K (Cmd+K on Mac) to open or close it.
 */
export function EditMode() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((open) => !open);
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!isOpen) return null;

  return (
    <AdminPanel isOpen onClose={() => setIsOpen(false)} onContentUpdate={() => window.location.reload()} />
  );
}
