import { useMemo } from "react";

export function ShareCard() {
  const shareUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "https://your-anniversary-site.com";
  }, []);

  const qrSrc = `https://quickchart.io/qr?text=${encodeURIComponent(shareUrl)}&size=200&light=fff7fa&dark=7a1e46`;

  return (
    <section className="rounded-3xl bg-rose-50/90 p-8 shadow-2xl ring-1 ring-rose-100">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex-1 space-y-3 text-rose-800">
          <p className="text-sm uppercase tracking-[0.3em] text-rose-400">Share the surprise</p>
          <h2 className="font-display text-3xl text-rose-900">Ready for our anniversary night</h2>
          <p>
            Scan or send this link on the day, queue the playlist, and keep the puzzle hint cards
            handy. The QR works great for a printed card or in the restaurant menu.
          </p>
          <ul className="list-disc space-y-2 pl-6 text-sm text-rose-700">
            <li>Open the site on your phone ahead of time to cache the assets.</li>
            <li>Use screen brightness 80%+ so the colors glow in candlelight.</li>
            <li>Toggle the music before handing over your phone.</li>
          </ul>
        </div>
        <div className="mx-auto flex flex-col items-center gap-3 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-rose-100">
          <img src={qrSrc} alt="QR code linking to the anniversary microsite" className="h-48 w-48" />
          <code className="text-xs text-rose-500">{shareUrl}</code>
        </div>
      </div>
    </section>
  );
}



