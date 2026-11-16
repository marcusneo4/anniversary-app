import { useId } from "react";

type PostmarkProps = {
  /** Big text in the middle, e.g. "APR". */
  center: string;
  /** Text around the top of the ring, e.g. "2025". */
  top: string;
  /** Text around the bottom of the ring. */
  bottom?: string;
  className?: string;
};

/** A round postmark. Decorative: the same information is in the heading next to it. */
export function Postmark({ center, top, bottom, className = "" }: PostmarkProps) {
  const id = useId().replace(/:/g, "");
  return (
    <svg aria-hidden viewBox="0 0 120 120" className={className}>
      <defs>
        <path id={`${id}-t`} d="M 22 60 A 38 38 0 0 1 98 60" />
        <path id={`${id}-b`} d="M 16 60 A 44 44 0 0 0 104 60" />
      </defs>
      <g fill="none" stroke="currentColor">
        <circle cx="60" cy="60" r="55" strokeWidth="2.5" />
        <circle cx="60" cy="60" r="28" strokeWidth="1.5" />
      </g>
      <g fill="currentColor" fontFamily="Figtree, sans-serif" fontWeight="700" textAnchor="middle">
        <text fontSize="13" letterSpacing="3">
          <textPath href={`#${id}-t`} startOffset="50%">
            {top}
          </textPath>
        </text>
        {bottom && (
          <text fontSize="10" letterSpacing="2">
            <textPath href={`#${id}-b`} startOffset="50%">
              {bottom}
            </textPath>
          </text>
        )}
        <text x="60" y="67" fontSize="19" letterSpacing="1">
          {center}
        </text>
      </g>
    </svg>
  );
}
