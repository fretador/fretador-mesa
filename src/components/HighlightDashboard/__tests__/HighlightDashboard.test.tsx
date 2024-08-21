import { render, screen } from "@testing-library/react";
import HighlightDashboard from "../index";
import styles from '../HighlightDashboard.module.css';

describe("HighlightDashboard Component", () => {
  // Teste de Renderização Básica
  it("should render the number, title, and link correctly", () => {
    render(<HighlightDashboard number="10" title="fretes em andamento" src="/fretes" />);
    
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("fretes em andamento")).toBeInTheDocument();
    expect(screen.getByText("Ver")).toBeInTheDocument();
  });

  // Teste de Classificação Dinâmica
  it("should apply the correct class based on the title", () => {
    const { container } = render(<HighlightDashboard number="15" title="ocorrências" src="/ocorrencias" />);
    
    const numberElement = container.querySelector(`.${styles.number}`);
    expect(numberElement).toHaveClass(styles.occurrences);
  });

  // Teste do Link e Ícone
  it("should render the link with the correct href and icon", () => {
    render(<HighlightDashboard number="20" title="novos cadastros" src="/cadastros" />);
    
    const linkElement = screen.getByText("Ver");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/cadastros");
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument(); // Verifica se o ícone está presente
  });

  // Teste com Valores Diferentes
  const titles: { title: string, expectedClass: string }[] = [
    { title: "fretes em andamento", expectedClass: styles.freightInProgress },
    { title: "ocorrências", expectedClass: styles.occurrences },
    { title: "novos cadastros", expectedClass: styles.newRegistrations },
    { title: "cargas em aberto", expectedClass: styles.openLoads },
  ];

  titles.forEach(({ title, expectedClass }) => {
    it(`should render the correct class for title ${title}`, () => {
      const { container } = render(<HighlightDashboard number="30" title={title as any} src="/test" />);
      
      const numberElement = container.querySelector(`.${styles.number}`);
      expect(numberElement).toHaveClass(expectedClass);
    });
  });
})
