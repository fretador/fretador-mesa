import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Botao from "../index";

describe("Botao", () => {
  it("renders the button with the correct text", () => {
    render(<Botao text="Clique aqui" onClick={() => {}} />);

    const buttonElement = screen.getByText(/clique aqui/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Botao text="Clique aqui" onClick={handleClick} />);

    const buttonElement = screen.getByText(/clique aqui/i);
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
