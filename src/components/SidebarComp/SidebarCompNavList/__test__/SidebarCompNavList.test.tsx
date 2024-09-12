import React from "react";
import { render, screen } from "@testing-library/react";
import NavList from "@/components/SidebarComp/SidebarCompNavList";

// Mock do CSS Module
jest.mock("./SidebarCompList.module.css", () => ({
  navList: "mockNavListClass",
}));

describe("NavList", () => {
  it("renders children correctly", () => {
    render(
      <NavList>
        <li>Item 1</li>
        <li>Item 2</li>
      </NavList>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("applies the correct CSS class", () => {
    render(
      <NavList>
        <li>Test Item</li>
      </NavList>
    );

    const list = screen.getByRole("list");
    expect(list).toHaveClass("mockNavListClass");
  });
});
