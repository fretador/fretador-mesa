import React from "react";
import { render, screen } from "@testing-library/react";
import NavItem from "../index";

// Mock do CSS Module
jest.mock("./SidebarCompItem.module.css", () => ({
  navItem: "mockNavItemClass",
  retracted: "mockRetractedClass",
  focused: "mockFocusedClass",
  icon: "mockIconClass",
  text: "mockTextClass",
  badge: "mockBadgeClass",
}));

describe("NavItem", () => {
  const mockIcon = <span data-testid="mock-icon">Icon</span>;

  it("renders correctly when not retracted", () => {
    render(
      <NavItem
        icon={mockIcon}
        text="Home"
        isRetracted={false}
        isFocused={false}
      />
    );

    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveClass("mockNavItemClass");
    expect(screen.getByRole("listitem")).not.toHaveClass("mockRetractedClass");
  });

  it("renders correctly when retracted", () => {
    render(
      <NavItem
        icon={mockIcon}
        text="Home"
        isRetracted={true}
        isFocused={false}
      />
    );

    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveClass("mockNavItemClass");
    expect(screen.getByRole("listitem")).toHaveClass("mockRetractedClass");
  });

  it("applies focused class when isFocused is true", () => {
    render(
      <NavItem
        icon={mockIcon}
        text="Home"
        isRetracted={false}
        isFocused={true}
      />
    );

    expect(screen.getByRole("listitem")).toHaveClass("mockFocusedClass");
  });

  it("renders badge when provided and greater than 0", () => {
    render(
      <NavItem
        icon={mockIcon}
        text="Home"
        isRetracted={false}
        isFocused={false}
        badge={5}
      />
    );

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("5")).toHaveClass("mockBadgeClass");
  });

  it("does not render badge when it is 0", () => {
    render(
      <NavItem
        icon={mockIcon}
        text="Home"
        isRetracted={false}
        isFocused={false}
        badge={0}
      />
    );

    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("does not render badge when it is undefined", () => {
    render(
      <NavItem
        icon={mockIcon}
        text="Home"
        isRetracted={false}
        isFocused={false}
      />
    );

    expect(screen.queryByRole("badge")).not.toBeInTheDocument();
  });
});
