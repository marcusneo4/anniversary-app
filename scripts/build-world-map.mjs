/**
 * Builds src/data/worldMap.ts from Natural Earth country outlines.
 *
 * Source: scripts/data/countries-50m.json, from the world-atlas package
 * (https://github.com/topojson/world-atlas, ISC licence). The outlines are
 * Natural Earth data, which is public domain.
 *
 * Run with:  node scripts/build-world-map.mjs
 *
 * The projection here must match src/utils/mapProjection.ts.
 */
import { readFileSync, writeFileSync } from "node:fs";

const SOURCE = new URL("./data/countries-50m.json", import.meta.url);
const OUTPUT = new URL("../src/data/worldMap.ts", import.meta.url);

/** Map width in SVG units. Height follows from the latitude crop. */
const WIDTH = 1000;
const LAT_TOP = 84;
const LAT_BOTTOM = -57;
/** Douglas-Peucker tolerance in SVG units. Lower = more detail, bigger file. */
const TOLERANCE = 0.35;
/** Islands smaller than this (SVG units) are dropped, except a country's largest piece. */
const MIN_ISLAND = 0.8;

/** Atlas names that differ from the names in src/data/countries.ts. */
const ALIASES = {
  Czechia: "Czech Republic",
  "Bosnia and Herz.": "Bosnia and Herzegovina",
  Macedonia: "North Macedonia",
  "Timor-Leste": "East Timor",
  Macao: "Macau",
  "United States of America": "United States",
  "Dominican Rep.": "Dominican Republic",
  "S. Sudan": "South Sudan",
  eSwatini: "Eswatini",
  "Central African Rep.": "Central African Republic",
  "Eq. Guinea": "Equatorial Guinea",
  Congo: "Republic of the Congo",
  "Dem. Rep. Congo": "Democratic Republic of the Congo",
  "Cabo Verde": "Cape Verde",
  "Solomon Is.": "Solomon Islands",
  "Marshall Is.": "Marshall Islands",
  "Cook Is.": "Cook Islands",
  "Fr. Polynesia": "French Polynesia"
};
/**
 * Keep only these parts of a country ([minLng, minLat, maxLng, maxLat]).
 * France's overseas regions (French Guiana, Réunion...) would otherwise light up
 * on other continents when France is marked as visited.
 */
const KEEP_BOX = { France: [-6, 41, 10, 52] };
const SKIP = new Set(["Antarctica", "Fr. S. Antarctic Lands", "Heard I. and McDonald Is.", "S. Geo. and the Is."]);

// Natural Earth projection (same formula as d3-geo's geoNaturalEarth1).
const RAD = Math.PI / 180;
function naturalEarth(lng, lat) {
  const l = lng * RAD;
  const p = lat * RAD;
  const p2 = p * p;
  const p4 = p2 * p2;
  return [
    l * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4))),
    p * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)))
  ];
}
const SCALE = WIDTH / 2 / (Math.PI * 0.8707);
const Y_TOP = naturalEarth(0, LAT_TOP)[1];
const HEIGHT = Math.round((Y_TOP - naturalEarth(0, LAT_BOTTOM)[1]) * SCALE);
const project = (lng, lat) => {
  const [x, y] = naturalEarth(lng, lat);
  return [WIDTH / 2 + x * SCALE, (Y_TOP - y) * SCALE];
};

const topo = JSON.parse(readFileSync(SOURCE, "utf8"));
const [sx, sy] = topo.transform.scale;
const [tx, ty] = topo.transform.translate;
const arcs = topo.arcs.map((arc) => {
  let x = 0;
  let y = 0;
  return arc.map(([dx, dy]) => {
    x += dx;
    y += dy;
    return [x * sx + tx, y * sy + ty];
  });
});

function ringPoints(indexes) {
  const points = [];
  for (const i of indexes) {
    const arc = i < 0 ? arcs[~i].slice().reverse() : arcs[i];
    points.push(...(points.length ? arc.slice(1) : arc));
  }
  // Rings that cross the date line (eastern Russia, Fiji) would draw a band across
  // the whole map. Shift their western half past 180 so they run off the right edge.
  const crosses = points.some((p, i) => i > 0 && Math.abs(p[0] - points[i - 1][0]) > 180);
  if (crosses) return points.map(([lng, lat]) => [lng < 0 ? lng + 360 : lng, lat]);
  return points;
}

function simplify(points, tolerance) {
  if (points.length < 4) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = points[a];
    const [bx, by] = points[b];
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy);
    let maxDist = 0;
    let index = -1;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = points[i];
      const dist = len < 1e-9 ? Math.hypot(px - ax, py - ay) : Math.abs((px - ax) * dy - (py - ay) * dx) / len;
      if (dist > maxDist) {
        maxDist = dist;
        index = i;
      }
    }
    if (maxDist > tolerance) {
      keep[index] = 1;
      stack.push([a, index], [index, b]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

const round = (n) => Math.round(n * 10);
const fmt = (n) => String(n / 10);

function ringToPath(points) {
  const simplified = simplify(points, TOLERANCE);
  const last = simplified[simplified.length - 1];
  if (simplified.length > 1 && last[0] === simplified[0][0] && last[1] === simplified[0][1]) simplified.pop();
  if (simplified.length < 3) return "";
  let px = round(simplified[0][0]);
  let py = round(simplified[0][1]);
  const steps = [];
  for (let i = 1; i < simplified.length; i++) {
    const qx = round(simplified[i][0]);
    const qy = round(simplified[i][1]);
    if (qx === px && qy === py) continue;
    steps.push(`${fmt(qx - px)} ${fmt(qy - py)}`);
    px = qx;
    py = qy;
  }
  if (steps.length < 2) return "";
  return `M${fmt(round(simplified[0][0]))} ${fmt(round(simplified[0][1]))}l${steps.join(" ")}z`.replace(/ -/g, "-");
}

const paths = {};
for (const geometry of topo.objects.countries.geometries) {
  const atlasName = geometry.properties.name;
  if (SKIP.has(atlasName)) continue;
  const name = ALIASES[atlasName] ?? atlasName;
  const polygons = geometry.type === "Polygon" ? [geometry.arcs] : geometry.type === "MultiPolygon" ? geometry.arcs : [];
  const rings = polygons.flatMap((polygon) =>
    polygon.map((ring) => {
      const lngLat = ringPoints(ring);
      const box = KEEP_BOX[name];
      if (box) {
        const [lng, lat] = lngLat[0];
        if (lng < box[0] || lat < box[1] || lng > box[2] || lat > box[3]) return { points: [], size: -1 };
      }
      const points = lngLat.map(([lng, lat]) => project(lng, lat));
      const xs = points.map((p) => p[0]);
      const ys = points.map((p) => p[1]);
      const size = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
      return { points, size };
    })
  );
  const largest = Math.max(...rings.map((r) => r.size));
  const d = rings
    .filter((r) => r.size >= 0 && (r.size >= MIN_ISLAND || r.size === largest))
    .map((r) => ringToPath(r.points))
    .join("");
  if (d) paths[name] = (paths[name] ?? "") + d;
}

const names = Object.keys(paths).sort((a, b) => a.localeCompare(b));
const body = names.map((name) => `  ${JSON.stringify(name)}: ${JSON.stringify(paths[name])}`).join(",\n");

writeFileSync(
  OUTPUT,
  `/* eslint-disable */
// Generated by scripts/build-world-map.mjs. Do not edit by hand.
// Country outlines: Natural Earth (public domain), via the world-atlas package (ISC).

export const MAP_WIDTH = ${WIDTH};
export const MAP_HEIGHT = ${HEIGHT};
export const MAP_LAT_TOP = ${LAT_TOP};

/** SVG path data per country, keyed by the names used in src/data/countries.ts. */
export const countryPaths: Record<string, string> = {
${body}
};
`
);

console.log(`Wrote ${names.length} countries, ${WIDTH}x${HEIGHT}, ${(JSON.stringify(paths).length / 1024).toFixed(0)} KB of path data.`);
