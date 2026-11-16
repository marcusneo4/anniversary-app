import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Surprise, daysUntilAnniversary } from "../components/Surprise";
import { puzzleClues, puzzleSolution } from "../data/content";

describe("Surprise", () => {
  beforeEach(() => localStorage.clear());

  it("never prints the answer letters next to the clues", () => {
    render(<Surprise />);
    puzzleClues.forEach((clue) => {
      expect(screen.queryByText(new RegExp(`^${clue.answerFragment}$`))).not.toBeInTheDocument();
    });
  });

  it("explains a wrong guess and unlocks on the right word", () => {
    render(<Surprise />);
    const input = screen.getByLabelText(/the word/i);
    fireEvent.change(input, { target: { value: "ab" } });
    fireEvent.click(screen.getByRole("button", { name: /unlock the note/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/letters/i);

    fireEvent.change(input, { target: { value: puzzleSolution.toLowerCase() } });
    fireEvent.click(screen.getByRole("button", { name: /unlock the note/i }));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("counts down to the next 14 December and never goes negative", () => {
    expect(daysUntilAnniversary(new Date(2026, 10, 16))).toBe(28);
    expect(daysUntilAnniversary(new Date(2026, 11, 14))).toBe(0);
    expect(daysUntilAnniversary(new Date(2026, 11, 15))).toBe(364);
  });
});
