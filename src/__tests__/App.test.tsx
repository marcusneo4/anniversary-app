import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = "";
  });

  it("opens on the envelope with the letter closed", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: /two years of us/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^open the letter$/i })).toBeInTheDocument();
    expect(screen.queryByRole("article", { name: /letter from marcus/i })).not.toBeInTheDocument();
  });

  it("shows the letter after the envelope is opened", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /^open the letter$/i }));
    expect(await screen.findByRole("article", { name: /letter from marcus/i })).toBeInTheDocument();
  });

  it("switches pages from the navigation", () => {
    render(<App />);
    const nav = screen.getAllByRole("navigation", { name: /pages/i })[0];
    fireEvent.click(within(nav).getByRole("button", { name: /letters/i }));
    expect(screen.getByRole("heading", { level: 1, name: /handwritten/i })).toBeInTheDocument();
    expect(within(nav).getByRole("button", { name: /letters/i })).toHaveAttribute("aria-current", "page");
  });

  it("has no visible edit button", () => {
    render(<App />);
    expect(screen.queryByTitle(/edit content/i)).not.toBeInTheDocument();
  });
});
