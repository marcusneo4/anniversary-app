import { useEffect, useMemo, useRef, useState } from "react";
import { HOME, allCountries, countriesByRegion, defaultVisitedCountries, regions, type VisitedCountry } from "../data/countries";
import { loadCountries, saveCountries } from "../utils/storageService";
import { distanceKm } from "../utils/mapProjection";
import { WorldMap, type MapFocus, type MapPlace } from "./WorldMap";

const defaultNames = new Set(defaultVisitedCountries.map((c) => c.name));
const TILTS = [-1.5, 1, -0.5, 1.5];

const displayName = (country: VisitedCountry) =>
  country.name === "Morocco" && country.note === "North Africa" ? "North Africa" : country.name;

const lookup = (name: string) => allCountries.find((c) => c.name === name);
const homeCoords = lookup(HOME)?.coordinates ?? null;

type Place = MapPlace & { region: string; date?: string; note?: string; km: number | null; removable: boolean };

const formatKm = (km: number) => `${(Math.round(km / 100) * 100).toLocaleString()} km from home`;

/** Every country we have been to together: a map with flight paths from home, and one stamp each. */
export function Places() {
  const [visited, setVisited] = useState<VisitedCountry[]>(defaultVisitedCountries);
  const [loaded, setLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [focus, setFocus] = useState<MapFocus>({ kind: "all" });
  const [focusLabel, setFocusLabel] = useState("All our places");
  const [showForm, setShowForm] = useState(false);
  const [region, setRegion] = useState("Europe");
  const [search, setSearch] = useState("");
  const [pick, setPick] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadCountries().then((saved: VisitedCountry[]) => {
      const extra = saved.filter((c) => !defaultNames.has(c.name));
      setVisited([...defaultVisitedCountries, ...extra]);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) void saveCountries(visited);
  }, [visited, loaded]);

  /** Home first, then nearest to furthest. */
  const places = useMemo<Place[]>(() => {
    const list: Place[] = [];
    for (const country of visited) {
      const data = lookup(country.name);
      if (!data) continue;
      const isHome = country.name === HOME;
      list.push({
        id: country.id,
        country: country.name,
        label: displayName(country),
        coords: data.coordinates,
        isHome,
        region: data.region,
        date: country.date,
        note: country.note && country.note !== "North Africa" ? country.note : undefined,
        km: homeCoords && !isHome ? distanceKm(homeCoords, data.coordinates) : null,
        removable: !defaultNames.has(country.name)
      });
    }
    return list.sort((a, b) => (a.isHome ? -1 : b.isHome ? 1 : (a.km ?? 0) - (b.km ?? 0)));
  }, [visited]);

  const visitedRegions = useMemo(() => {
    const counts = new Map<string, number[]>();
    places.forEach((p) => counts.set(p.region, [...(counts.get(p.region) ?? []), p.id]));
    return [...counts.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [places]);

  const selected = places.find((p) => p.id === selectedId) ?? null;
  const furthest = places.reduce<Place | null>((max, p) => (p.km !== null && (!max || p.km > (max.km ?? 0)) ? p : max), null);

  const select = (id: number, fromStamp = false) => {
    if (id === selectedId) {
      clearSelection();
      return;
    }
    setSelectedId(id);
    setFocus({ kind: "place", id });
    if (fromStamp) {
      const calm = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      mapRef.current?.scrollIntoView?.({ block: "nearest", behavior: calm ? "auto" : "smooth" });
    }
  };

  const clearSelection = () => {
    setSelectedId(null);
    setFocus(focusLabel === "Whole world" ? { kind: "world" } : { kind: "all" });
    if (focusLabel !== "Whole world") setFocusLabel("All our places");
  };

  const chooseView = (label: string, next: MapFocus) => {
    setSelectedId(null);
    setFocusLabel(label);
    setFocus(next);
  };

  const options = useMemo(
    () =>
      (countriesByRegion[region] || [])
        .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) && !visited.some((v) => v.name === c.name))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [region, search, visited]
  );

  const add = (event: React.FormEvent) => {
    event.preventDefault();
    if (!pick) {
      setStatus("Choose a country from the list first.");
      return;
    }
    const added: VisitedCountry = { id: Date.now(), name: pick, date: date.trim() || undefined, note: note.trim() || undefined };
    setVisited((list) => [...list, added]);
    setStatus(`Added ${pick}. It's on the map now.`);
    setSelectedId(added.id);
    setFocus({ kind: "place", id: added.id });
    setPick("");
    setDate("");
    setNote("");
    setSearch("");
    setShowForm(false);
    mapRef.current?.scrollIntoView?.({ block: "nearest" });
  };

  const remove = (place: Place) => {
    setVisited((list) => list.filter((c) => c.id !== place.id));
    if (selectedId === place.id) clearSelection();
    setStatus(`Removed ${place.label}.`);
  };

  const continents = visitedRegions.length;
  const viewButton = (active: boolean) =>
    `min-h-[2.5rem] shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${
      active ? "bg-ink text-white" : "bg-sheet text-ink hover:bg-tulip-soft"
    }`;
  const field = "w-full rounded-lg border-2 border-ink/15 bg-white px-4 py-2.5 text-ink focus:border-ink focus:outline-none";

  return (
    <section aria-labelledby="places-title" className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-16">
      <h1 id="places-title" className="font-display text-5xl sm:text-7xl">
        {places.length} {places.length === 1 ? "country" : "countries"} on {continents} {continents === 1 ? "continent" : "continents"}
      </h1>
      <p className="mt-5 max-w-xl text-lg text-ink-soft">
        Home is {HOME}.
        {furthest && furthest.km !== null && ` The furthest we've gone together is ${furthest.label}, ${formatKm(furthest.km)}.`}
      </p>

      {/* Map */}
      <div ref={mapRef} className="mt-10 scroll-mt-24 bg-sheet p-2 shadow-print sm:p-3">
        <div role="toolbar" aria-label="Map view" className="flex gap-2 overflow-x-auto pb-2">
          <button
            type="button"
            aria-pressed={selectedId === null && focusLabel === "All our places"}
            className={viewButton(selectedId === null && focusLabel === "All our places")}
            onClick={() => chooseView("All our places", { kind: "all" })}
          >
            All our places
          </button>
          {visitedRegions.map(([name, ids]) => (
            <button
              key={name}
              type="button"
              aria-pressed={selectedId === null && focusLabel === name}
              className={viewButton(selectedId === null && focusLabel === name)}
              onClick={() => chooseView(name, { kind: "places", ids })}
            >
              {name}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={selectedId === null && focusLabel === "Whole world"}
            className={viewButton(selectedId === null && focusLabel === "Whole world")}
            onClick={() => chooseView("Whole world", { kind: "world" })}
          >
            Whole world
          </button>
        </div>

        <div className="aspect-[4/3] w-full sm:aspect-[2/1]">
          <WorldMap places={places} focus={focus} selectedId={selectedId} onSelect={(id) => select(id)} />
        </div>

        <div aria-live="polite" className="flex min-h-[4.5rem] flex-wrap items-center justify-between gap-3 px-2 pt-3">
          {selected ? (
            <>
              <div>
                <p className="font-display text-2xl leading-tight">{selected.label}</p>
                <p className="text-sm text-ink-soft">
                  {selected.isHome ? "Home" : selected.km !== null ? formatKm(selected.km) : selected.region}
                  {selected.date ? `, ${selected.date}` : ""}
                </p>
                {selected.note && <p className="font-hand text-xl leading-tight">{selected.note}</p>}
              </div>
              <button type="button" onClick={clearSelection} className="btn-quiet">
                Back to all places
              </button>
            </>
          ) : (
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-ink-soft">
              <li className="flex items-center gap-2">
                <span aria-hidden className="inline-block h-3 w-5 rounded-sm bg-tulip" />
                Been there together
              </li>
              <li className="flex items-center gap-2">
                <svg aria-hidden viewBox="0 0 24 8" className="h-2 w-6">
                  <path d="M1 4h22" stroke="#3B1730" strokeOpacity=".6" strokeWidth="2" strokeDasharray="4 3" />
                </svg>
                Flights from home
              </li>
              <li>Tap a pin or a stamp to zoom in.</li>
            </ul>
          )}
        </div>
      </div>

      {/* Stamps */}
      <h2 className="mt-16 font-display text-3xl sm:text-4xl">Nearest to furthest</h2>
      <ul className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {places.map((place, i) => {
          const isSelected = selectedId === place.id;
          return (
            <li
              key={place.id}
              className="drop-shadow-[0_6px_10px_rgba(59,23,48,0.22)]"
              style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}
            >
              <div className="stamp h-full">
                <div
                  className={`flex h-full min-h-[9rem] flex-col justify-between border-2 p-4 transition-colors ${
                    isSelected ? "border-ink bg-tulip-soft" : place.isHome ? "border-ink/40 bg-paper" : "border-tulip bg-paper"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => select(place.id, true)}
                    aria-pressed={isSelected}
                    className="text-left"
                  >
                    <span className="block text-sm font-semibold text-tulip-deep">{place.isHome ? "Home" : place.region}</span>
                    <span className="mt-1 block font-display text-2xl leading-tight">{place.label}</span>
                    {place.km !== null && <span className="mt-1 block text-sm text-ink-soft">{formatKm(place.km)}</span>}
                    {place.date && <span className="block text-sm text-ink-soft">{place.date}</span>}
                    {place.note && <span className="mt-1 block font-hand text-xl leading-tight">{place.note}</span>}
                  </button>
                  {place.removable && (
                    <button
                      type="button"
                      onClick={() => remove(place)}
                      className="mt-3 self-start text-sm font-semibold text-ink-soft underline underline-offset-4 hover:text-ink"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <p role="status" className="mt-6 min-h-[1.5rem] font-semibold text-stem">
        {status}
      </p>

      {/* Add a country */}
      <div className="mt-2">
        <button type="button" onClick={() => setShowForm(!showForm)} aria-expanded={showForm} className="btn-quiet">
          {showForm ? "Cancel" : "Add a country"}
        </button>

        {showForm && (
          <form onSubmit={add} className="mt-6 max-w-2xl space-y-5 bg-sheet p-6 shadow-print">
            <fieldset>
              <legend className="mb-2 text-sm font-semibold">Region</legend>
              <div className="flex flex-wrap gap-2">
                {regions.map((name) => (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={region === name}
                    onClick={() => {
                      setRegion(name);
                      setSearch("");
                      setPick("");
                    }}
                    className={`min-h-[2.5rem] rounded-full px-4 text-sm font-semibold ${
                      region === name ? "bg-ink text-white" : "bg-paper text-ink hover:bg-tulip-soft"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="place-search" className="mb-2 block text-sm font-semibold">
                Country
              </label>
              <input
                id="place-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`Search ${region}`}
                className={field}
              />
              <div className="mt-2 max-h-52 overflow-y-auto rounded-lg border-2 border-ink/15 p-1.5">
                {options.length > 0 ? (
                  <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                    {options.map((country) => (
                      <li key={country.name}>
                        <button
                          type="button"
                          aria-pressed={pick === country.name}
                          onClick={() => {
                            setPick(country.name);
                            setStatus(null);
                          }}
                          className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                            pick === country.name ? "bg-tulip-deep font-semibold text-white" : "hover:bg-paper"
                          }`}
                        >
                          {country.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-3 py-2 text-sm text-ink-soft">
                    {search ? "No match in this region, or it's already added." : "Everything in this region is already added."}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="place-date" className="mb-2 block text-sm font-semibold">
                  When (optional)
                </label>
                <input id="place-date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="September 2025" className={field} />
              </div>
              <div>
                <label htmlFor="place-note" className="mb-2 block text-sm font-semibold">
                  A memory (optional)
                </label>
                <input id="place-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="The best seafood" className={field} />
              </div>
            </div>

            <button type="submit" className="btn-primary">
              {pick ? `Add ${pick}` : "Add country"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
