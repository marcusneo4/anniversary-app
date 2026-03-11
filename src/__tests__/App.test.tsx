import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders the hero section on initial load", () => {
    render(<App />);

    const heroHeading = screen.getByText(/Every Moment/i);
    expect(heroHeading).toBeInTheDocument();
  });
});

