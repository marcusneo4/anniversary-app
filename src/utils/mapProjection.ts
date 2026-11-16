import { MAP_LAT_TOP, MAP_WIDTH } from "../data/worldMap";

/*
 * Natural Earth projection, matching scripts/build-world-map.mjs.
 * If you change one, change the other and re-run the script.
 */
const RAD = Math.PI / 180;

function naturalEarth(lng: number, lat: number): [number, number] {
  const l = lng * RAD;
  const p = lat * RAD;
  const p2 = p * p;
  const p4 = p2 * p2;
  return [
    l * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4))),
    p * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)))
  ];
}

const SCALE = MAP_WIDTH / 2 / (Math.PI * 0.8707);
const Y_TOP = naturalEarth(0, MAP_LAT_TOP)[1];

/** [longitude, latitude] to map units. */
export function project(lng: number, lat: number): [number, number] {
  const [x, y] = naturalEarth(lng, lat);
  return [MAP_WIDTH / 2 + x * SCALE, (Y_TOP - y) * SCALE];
}

/** Great-circle distance in kilometres between two [longitude, latitude] points. */
export function distanceKm([lng1, lat1]: [number, number], [lng2, lat2]: [number, number]): number {
  const dLat = (lat2 - lat1) * RAD;
  const dLng = (lng2 - lng1) * RAD;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * RAD) * Math.cos(lat2 * RAD) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(a));
}
