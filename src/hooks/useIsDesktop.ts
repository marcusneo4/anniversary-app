import { useEffect, useState } from "react";

/**
 * Determines whether the viewport is at or above a given desktop breakpoint.
 *
 * This hook is browser-safe and falls back to `false` when `window` is not available.
 *
 * @param minimumDesktopWidthPx - The minimum viewport width in pixels that should be considered a desktop layout.
 * @returns `true` when the viewport width is at or above the desktop breakpoint, otherwise `false`.
 */
export function useIsDesktop(minimumDesktopWidthPx: number = 1024): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.innerWidth >= minimumDesktopWidthPx;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let animationFrameId: number | null = null;

    const updateIsDesktop = () => {
      const nextIsDesktop = window.innerWidth >= minimumDesktopWidthPx;
      setIsDesktop((previousIsDesktop) =>
        previousIsDesktop === nextIsDesktop ? previousIsDesktop : nextIsDesktop,
      );
    };

    const handleResize = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = window.requestAnimationFrame(updateIsDesktop);
    };

    window.addEventListener("resize", handleResize);
    updateIsDesktop();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [minimumDesktopWidthPx]);

  return isDesktop;
}

