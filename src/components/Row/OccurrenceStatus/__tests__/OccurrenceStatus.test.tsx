import React from "react";
import { render, screen } from "@testing-library/react";
import OccurrenceStatus from "../index";

describe("OccurrenceStatus Component", () => {
  it("renders the correct status and applies the corresponding class", () => {
    // Teste para status "aberto"
    const { rerender } = render(<OccurrenceStatus occurrenceStatus="aberto" />);
    const statusElement = screen.getByText("aberto");
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass("occurrenceStatusValue open");

    // Teste para status "em tratamento"
    rerender(<OccurrenceStatus occurrenceStatus="em tratamento" />);
    const treatmentStatusElement = screen.getByText("em tratamento");
    expect(treatmentStatusElement).toBeInTheDocument();
    expect(treatmentStatusElement).toHaveClass("occurrenceStatusValue treatment");

    // Teste para status "encerrado"
    rerender(<OccurrenceStatus occurrenceStatus="encerrado" />);
    const finishedStatusElement = screen.getByText("encerrado");
    expect(finishedStatusElement).toBeInTheDocument();
    expect(finishedStatusElement).toHaveClass("occurrenceStatusValue finished");
  });
});
