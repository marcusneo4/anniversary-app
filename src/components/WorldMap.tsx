import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MAP_HEIGHT, MAP_WIDTH, countryPaths } from "../data/worldMap";
import { project } from "../utils/mapProjection";

export type MapPlace = {
  id: number;
  /** Key into countryPaths, e.g. "Morocco". */
  country: string;
  /** What to call it on screen, e.g. "North Africa". */
  label: string;
  coords: [number, number];
  isHome: boolean;
};

/** x, y, width, height in map units. */
type View = [number, number, number, number];

export type MapFocus = { kind: "all" } | { kind: "world" } | { kind: "places"; ids: number[] } | { kind: "place"; id: number };

type WorldMapProps = {
  places: MapPlace[];
  focus: MapFocus;
  selectedId: number | null;
  onSelect: (id: number) => void;
};

const COLORS = {
  ocean: "#FBE4EB",
  land: "#FFFFFF",
  border: "#EBC0CD",
  visited: "#E8648C",
  selected: "#C23E6A",
  ink: "#3B1730"
};
const FULL: View = [0, 0, MAP_WIDTH, MAP_HEIGHT];
const MIN_WIDTH = 90;
const TWEEN_MS = 650;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Grow a box to the container's aspect ratio, add padding, keep it on the map. */
function fitView(box: View, aspect: number, padding = 0.18): View {
  let [x, y, w, h] = box;
  const padX = Math.max(w * padding, 12);
  const padY = Math.max(h * padding, 12);
  x -= padX;
  y -= padY * 1.6; // extra room above pins for labels
  w += padX * 2;
  h += padY * 2.6;
  if (w < MIN_WIDTH) {
    x -= (MIN_WIDTH - w) / 2;
    w = MIN_WIDTH;
  }
  if (w / h > aspect) {
    const newH = w / aspect;
    y -= (newH - h) / 2;
    h = newH;
  } else {
    const newW = h * aspect;
    x -= (newW - w) / 2;
    w = newW;
  }
  if (w > MAP_WIDTH && h > MAP_HEIGHT) {
    const scale = Math.max(MAP_WIDTH / w, MAP_HEIGHT / h);
    w *= scale;
    h *= scale;
  }
  x = w >= MAP_WIDTH ? (MAP_WIDTH - w) / 2 : Math.min(Math.max(x, 0), MAP_WIDTH - w);
  y = h >= MAP_HEIGHT ? (MAP_HEIGHT - h) / 2 : Math.min(Math.max(y, 0), MAP_HEIGHT - h);
  return [x, y, w, h];
}

function boxAround(points: [number, number][]): View {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return [x, y, Math.max(...xs) - x, Math.max(...ys) - y];
}

/** A curved flight path from home, bending towards the north like a real route. */
function routePath([x1, y1]: [number, number], [x2, y2]: [number, number]): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  let nx = -dy / len;
  let ny = dx / len;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const bend = len * 0.22;
  const cx = (x1 + x2) / 2 + nx * bend;
  const cy = (y1 + y2) / 2 + ny * bend;
  return `M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`;
}

const HEART = "M0 3.2C-2.6 1.2-4 -0.3-4 -1.9-4 -3.3-3 -4.2-1.9 -4.2-1.1 -4.2-0.4 -3.8 0 -3.1 0.4 -3.8 1.1 -4.2 1.9 -4.2 3 -4.2 4 -3.3 4 -1.9 4 -0.3 2.6 1.2 0 3.2Z";

/**
 * The world map with a pin per place and dashed flight paths from home.
 * It zooms (by changing the SVG viewBox) to whatever `focus` asks for.
 */
export function WorldMap({ places, focus, selectedId, onSelect }: WorldMapProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 800, height: 400 });
  const [view, setView] = useState<View>(FULL);
  const viewRef = useRef<View>(FULL);
  const frameRef = useRef<number | null>(null);

  const projected = useMemo(
    () => places.map((place) => ({ ...place, point: project(place.coords[0], place.coords[1]) })),
    [places]
  );
  const home = projected.find((p) => p.isHome) ?? null;
  const visitedCountries = useMemo(() => new Set(places.map((p) => p.country)), [places]);
  const selected = projected.find((p) => p.id === selectedId) ?? null;

  // Track the map's size on screen so zooming fills it and pins stay the same pixel size.
  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) setSize({ width: rect.width, height: rect.height });
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const aspect = size.width / size.height;

  const target = useMemo<View>(() => {
    if (focus.kind === "world" || projected.length === 0) return fitView(FULL, aspect, 0);
    if (focus.kind === "place") {
      const place = projected.find((p) => p.id === focus.id);
      if (!place) return fitView(FULL, aspect, 0);
      const [x, y] = place.point;
      return fitView([x - 40, y - 25, 80, 50], aspect, 0.1);
    }
    const chosen = focus.kind === "places" ? projected.filter((p) => focus.ids.includes(p.id)) : projected;
    return fitView(boxAround(chosen.map((p) => p.point)), aspect);
  }, [focus, projected, aspect]);

  // Glide from the current view to the target view.
  useEffect(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const from = viewRef.current;
    if (prefersReducedMotion() || typeof requestAnimationFrame === "undefined") {
      viewRef.current = target;
      setView(target);
      return;
    }
    const start = performance.now();
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / TWEEN_MS);
      const k = ease(t);
      const next = from.map((v, i) => v + (target[i] - v) * k) as View;
      viewRef.current = next;
      setView(next);
      if (t < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target]);

  /** Map units per screen pixel, so pins, labels and lines keep a steady size. */
  const unit = view[2] / size.width;

  // Labels: selected first, then left to right; skip any that would overlap one already placed.
  const labels = useMemo(() => {
    const showAll = view[2] < 620;
    const order = [...projected].sort((a, b) => {
      if (a.id === selectedId) return -1;
      if (b.id === selectedId) return 1;
      if (a.isHome !== b.isHome) return a.isHome ? -1 : 1;
      return a.point[0] - b.point[0];
    });
    const placed: { x: number; y: number; w: number; h: number; id: number }[] = [];
    for (const place of order) {
      if (!showAll && place.id !== selectedId && !place.isHome) continue;
      const fontSize = 13 * unit;
      const w = place.label.length * fontSize * 0.58 + 6 * unit;
      const h = fontSize * 1.3;
      const x = place.point[0] - w / 2;
      const y = place.point[1] - 12 * unit - h;
      const hits = placed.some((b) => x < b.x + b.w && x + w > b.x && y < b.y + b.h && y + h > b.y);
      if (!hits) placed.push({ x, y, w, h, id: place.id });
    }
    return new Set(placed.map((b) => b.id));
  }, [projected, selectedId, unit, view]);

  return (
    <div ref={wrapperRef} className="relative h-full w-full overflow-hidden" style={{ background: COLORS.ocean }}>
      <svg
        viewBox={view.join(" ")}
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full touch-manipulation"
        role="group"
        aria-label="World map of the places we have been"
      >
        <g aria-hidden>
          {Object.entries(countryPaths).map(([name, d]) => {
            const isVisited = visitedCountries.has(name);
            const isSelected = selected?.country === name;
            return (
              <path
                key={name}
                d={d}
                fill={isSelected ? COLORS.selected : isVisited ? COLORS.visited : COLORS.land}
                stroke={isVisited ? "#FFFFFF" : COLORS.border}
                strokeWidth={0.6 * unit}
                strokeLinejoin="round"
              />
            );
          })}
        </g>

        {home && (
          <g aria-hidden fill="none" strokeLinecap="round">
            {projected
              .filter((p) => !p.isHome)
              .map((p) => (
                <path
                  key={p.id}
                  d={routePath(home.point, p.point)}
                  stroke={COLORS.ink}
                  strokeOpacity={selectedId === null || selectedId === p.id ? 0.55 : 0.18}
                  strokeWidth={1.4 * unit}
                  strokeDasharray={`${5 * unit} ${4 * unit}`}
                />
              ))}
            {selected && !selected.isHome && (
              <motion.path
                key={`route-${selected.id}`}
                d={routePath(home.point, selected.point)}
                stroke={COLORS.selected}
                strokeWidth={2.4 * unit}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut", delay: 0.25 }}
              />
            )}
          </g>
        )}

        {projected.map((place) => {
          const isSelected = place.id === selectedId;
          const [x, y] = place.point;
          return (
            <g
              key={place.id}
              transform={`translate(${x} ${y})`}
              role="button"
              tabIndex={0}
              aria-label={place.isHome ? `${place.label} (home)` : place.label}
              aria-pressed={isSelected}
              className="cursor-pointer outline-none [&:focus-visible_.ring]:opacity-100"
              onClick={() => onSelect(place.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(place.id);
                }
              }}
            >
              <circle r={20 * unit} fill="transparent" />
              <circle className="ring opacity-0" r={11 * unit} fill="none" stroke={COLORS.ink} strokeWidth={2 * unit} />
              {place.isHome ? (
                <path
                  d={HEART}
                  transform={`scale(${(isSelected ? 2.3 : 1.8) * unit})`}
                  fill={COLORS.ink}
                  stroke="#FFFFFF"
                  strokeWidth={0.9}
                />
              ) : (
                <circle
                  r={(isSelected ? 6.5 : 5) * unit}
                  fill={isSelected ? COLORS.ink : COLORS.selected}
                  stroke="#FFFFFF"
                  strokeWidth={2 * unit}
                />
              )}
              {labels.has(place.id) && (
                <text
                  y={-12 * unit}
                  textAnchor="middle"
                  fontSize={13 * unit}
                  fontWeight={700}
                  fontFamily="Figtree, system-ui, sans-serif"
                  fill={COLORS.ink}
                  stroke="#FFFFFF"
                  strokeWidth={3.5 * unit}
                  strokeLinejoin="round"
                  paintOrder="stroke"
                  pointerEvents="none"
                >
                  {place.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
