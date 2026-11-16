import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Nav, type TabId, tabs } from "./components/Nav";
import { OurYear } from "./components/OurYear";
import { Letters } from "./components/Letters";
import { EditMode } from "./components/EditMode";

const Places = lazy(() => import("./components/Places").then((m) => ({ default: m.Places })));

function tabFromHash(): TabId {
  if (typeof window === "undefined") return "year";
  const id = window.location.hash.replace("#", "");
  return tabs.some((tab) => tab.id === id) ? (id as TabId) : "year";
}

/**
 * App shell: three pages (Our year, Letters, Places) behind one navigation.
 * The current page is kept in the URL hash so a reload stays put.
 * Edit mode is hidden; open it with Ctrl+K (Cmd+K on Mac).
 */
export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>(tabFromHash);

  useEffect(() => {
    const onHashChange = () => setActiveTab(tabFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const changeTab = useCallback((tab: TabId) => {
    setActiveTab(tab);
    try {
      window.history.replaceState(null, "", tab === "year" ? window.location.pathname : `#${tab}`);
      window.scrollTo(0, 0);
    } catch {
      /* not available in every environment */
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen pb-24 md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Nav activeTab={activeTab} onTabChange={changeTab} />
        <main id="main">
          {activeTab === "year" && <OurYear onOpenLetters={() => changeTab("letters")} />}
          {activeTab === "letters" && <Letters />}
          {activeTab === "places" && (
            <Suspense fallback={<p className="px-6 py-24 text-center text-ink-soft">Loading the map…</p>}>
              <Places />
            </Suspense>
          )}
        </main>
        <EditMode />
      </div>
    </MotionConfig>
  );
}
