import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Sidebar, type SidebarTab } from "../components/Sidebar";

function renderSidebar(initialTab: SidebarTab = "home") {
  const handleTabChange = vi.fn();
  const handleToggle = vi.fn();

  render(
    <Sidebar
      activeTab={initialTab}
      onTabChange={handleTabChange}
      onToggle={handleToggle}
    />,
  );

  return { handleTabChange, handleToggle };
}

describe("Sidebar", () => {
  it("renders the Home tab as active by default styles when activeTab is 'home'", () => {
    renderSidebar("home");

    const homeButton = screen.getByRole("button", { name: /home/i });

    expect(homeButton).toHaveAttribute("aria-pressed", "true");
  });

  it("invokes onTabChange when a different tab is clicked", () => {
    const { handleTabChange } = renderSidebar("home");

    const quizButton = screen.getByRole("button", { name: /quiz/i });
    fireEvent.click(quizButton);

    expect(handleTabChange).toHaveBeenCalledWith("quiz");
  });

  it("toggles the sidebar open state when the toggle button is clicked", () => {
    const { handleToggle } = renderSidebar("home");

    const toggleButton = screen.getByLabelText(/toggle sidebar/i);
    fireEvent.click(toggleButton);

    expect(handleToggle).toHaveBeenCalled();
  });
});

