import React from "react";
import { render, screen } from "@testing-library/react";
import Separator from "@/components/SidebarComp/SidebarCompSeparator";

// Mock do CSS Module
jest.mock("./SidebarCompSeparator.module.css", () => ({
  separator_container: "mockSeparatorContainerClass",
  separator: "mockSeparatorClass",
}));

describe("Separator", () => {
  it("renders separator when not retracted", () => {
    render(<Separator isRetracted={false} />);

    const container = screen.getByTestId("separator-container");

    expect(container).toHaveClass("mockSeparatorContainerClass");

    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass("mockSeparatorClass");
  });

  it("does not render separator when retracted", () => {
    render(<Separator isRetracted={true} />);

    const container = screen.getByTestId("separator-container");
    expect(container).toHaveClass("mockSeparatorContainerClass");

    const separator = screen.queryByRole("separator");
    expect(separator).not.toBeInTheDocument();
  });
});
