import React from "react";
import { render, screen } from "@testing-library/react";
import PaymentMethod from "../index";

describe("PaymentMethod Component", () => {
  it("renders the correct payment method and applies the corresponding class", () => {
    // Teste para "adiantamento"
    const { rerender } = render(<PaymentMethod paymentMethod="adiantamento" />);
    const advanceElement = screen.getByText("adiantamento");
    expect(advanceElement).toBeInTheDocument();
    expect(advanceElement).toHaveClass("paymentMethodValue advance");

    // Teste para "saldo"
    rerender(<PaymentMethod paymentMethod="saldo" />);
    const balanceElement = screen.getByText("saldo");
    expect(balanceElement).toBeInTheDocument();
    expect(balanceElement).toHaveClass("paymentMethodValue balance");

    // Teste para "saldo parcial"
    rerender(<PaymentMethod paymentMethod="saldo parcial" />);
    const partialBalanceElement = screen.getByText("saldo parcial");
    expect(partialBalanceElement).toBeInTheDocument();
    expect(partialBalanceElement).toHaveClass("paymentMethodValue partialBalance");

    // Teste para "despesas"
    rerender(<PaymentMethod paymentMethod="despesas" />);
    const expensesElement = screen.getByText("despesas");
    expect(expensesElement).toBeInTheDocument();
    expect(expensesElement).toHaveClass("paymentMethodValue expenses");
  });
});
