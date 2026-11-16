import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { Places } from "../components/Places";
import { distanceKm, project } from "../utils/mapProjection";
import { MAP_HEIGHT, MAP_WIDTH, countryPaths } from "../data/worldMap";
import { defaultVisitedCountries } from "../data/countries";

describe("map data", () => {
  it("has an outline for every default country", () => {
    defaultVisitedCountries.forEach((c) => expect(countryPaths[c.name]).toBeTruthy());
  });

  it("projects places inside the map", () => {
    const [x, y] = project(103.8, 1.35); // Singapore
    expect(x).toBeGreaterThan(0);
    expect(x).toBeLessThan(MAP_WIDTH);
    expect(y).toBeGreaterThan(0);
    expect(y).toBeLessThan(MAP_HEIGHT);
  });

  it("measures distances in kilometres", () => {
    const km = distanceKm([103.82, 1.35], [2.35, 48.86]); // Singapore to Paris
    expect(km).toBeGreaterThan(10500);
    expect(km).toBeLessThan(10900);
  });
});

describe("Places", () => {
  beforeEach(() => localStorage.clear());

  it("counts countries and continents", async () => {
    render(<Places />);
    expect(await screen.findByRole("heading", { level: 1, name: /7 countries on 3 continents/i })).toBeInTheDocument();
  });

  it("zooms to a place when its stamp is pressed", async () => {
    render(<Places />);
    const stamp = await screen.findByRole("button", { name: /portugal.*km from home/i });
    fireEvent.click(stamp);
    expect(stamp).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /back to all places/i })).toBeInTheDocument();
    const pin = within(screen.getByRole("group", { name: /world map/i })).getByRole("button", { name: "Portugal" });
    expect(pin).toHaveAttribute("aria-pressed", "true");
  });
});
