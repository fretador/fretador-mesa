import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./../index";
import Botao from "@/components/Botao";

describe("Home should be rendering correctly", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /hello world/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
