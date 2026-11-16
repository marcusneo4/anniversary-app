import { MusicToggle } from "./MusicToggle";

export type TabId = "year" | "letters" | "places";

export const tabs: { id: TabId; label: string; icon: JSX.Element }[] = [
  {
    id: "year",
    label: "Our year",
    icon: (
      <path d="M12 20.5c-5-3.9-7.5-6.7-7.5-9.7C4.5 8.3 6.3 6.7 8.3 6.7c1.5 0 2.8.8 3.7 2.2.9-1.4 2.2-2.2 3.7-2.2 2 0 3.8 1.6 3.8 4.1 0 3-2.5 5.8-7.5 9.700z" />
    )
  },
  {
    id: "letters",
    label: "Letters",
    icon: (
      <>
        <rect x="3.5" y="6" width="17" height="12" rx="1.5" />
        <path d="M4 7l8 6.500L20 7" />
      </>
    )
  },
  {
    id: "places",
    label: "Places",
    icon: (
      <>
        <path d="M12 21s6.5-5.6 6.5-10.500a6.5 6.5 0 10-13 0C5.5 15.4 12 21 12 21z" />
        <circle cx="12" cy="10.5" r="2.2" />
      </>
    )
  }
];

type NavProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

/**
 * Top bar on every screen (name + music). The three page links sit in the
 * top bar on wide screens and in a bottom bar on phones, where thumbs reach.
 */
export function Nav({ activeTab, onTabChange }: NavProps) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <p className="font-display text-xl leading-none">Shanna &amp; Marcus</p>
          <nav aria-label="Pages" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    type="button"
                    aria-current={activeTab === tab.id ? "page" : undefined}
                    onClick={() => onTabChange(tab.id)}
                    className={`min-h-[2.75rem] rounded-full px-5 font-semibold transition-colors ${
                      activeTab === tab.id ? "bg-ink text-white" : "text-ink hover:bg-tulip-soft"
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <MusicToggle />
        </div>
      </header>

      <nav
        aria-label="Pages"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <ul className="mx-auto grid max-w-md grid-cols-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex min-h-[3.75rem] w-full flex-col items-center justify-center gap-0.5 text-sm font-semibold ${
                    isActive ? "text-tulip-deep" : "text-ink-soft"
                  }`}
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill={isActive ? "currentColor" : "none"}
                    fillOpacity={isActive ? 0.18 : 0}
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {tab.icon}
                  </svg>
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
