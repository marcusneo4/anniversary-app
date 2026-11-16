import { useMemo } from "react";

/** For Marcus, inside edit mode: the link and a QR code to hand over on the day. */
export function ShareCard() {
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${window.location.pathname}`;
  }, []);

  const qrSrc = `https://quickchart.io/qr?text=${encodeURIComponent(shareUrl)}&size=200&light=ffffff&dark=3b1730`;

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center">
      <div className="flex-1 space-y-3">
        <h3 className="font-display text-2xl">Hand it over on the day</h3>
        <p>Send her this link, or print the QR code on a card.</p>
        <ul className="list-disc space-y-2 pl-6 text-sm">
          <li>Open the site on her phone once beforehand so the photos load fast.</li>
          <li>The music only starts when she taps Play music.</li>
          <li>Edit mode is Ctrl+K. She won't see a button for it.</li>
        </ul>
        <code className="block break-all text-xs">{shareUrl}</code>
      </div>
      <img src={qrSrc} alt="QR code for the site link" className="mx-auto h-48 w-48 border border-rose-100 bg-white p-2" />
    </div>
  );
}
