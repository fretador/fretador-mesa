import { render, screen } from "@testing-library/react";
import FreightStatus from "../index";

describe("FreightStatus Component", () => {
  it("renders the correct freight status text", () => {
    const freightStatus = "DISPONIVEL";
    render(<FreightStatus freightStatus={freightStatus} />);
    
    const freightStatusElement = screen.getByText(freightStatus);
    expect(freightStatusElement).toBeInTheDocument();
  });

  it("renders an empty paragraph when freightStatus prop is not provided", () => {
    render(<FreightStatus />);
    
    const freightStatusElement = screen.getByRole("paragraph");
    expect(freightStatusElement).toBeInTheDocument();
    expect(freightStatusElement).toHaveTextContent("");
  });

  it("applies the correct CSS class", () => {
    const freightStatus = "APROVAR";
    render(<FreightStatus freightStatus={freightStatus} />);
    
    const freightStatusElement = screen.getByText(freightStatus);
    expect(freightStatusElement).toHaveClass("freightStatusText");
  });
});
