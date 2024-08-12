import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "@/components/Sidebar";

// Mock para SVGs
jest.mock("\\.svg$", () => () => "SvgMock");

// Mock para next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    const { src, alt } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />;
  },
}));

// Mock para os ícones
jest.mock("@/utils/icons", () => ({
  HomeIcon: () => <div data-testid="mock-home-icon" />,
  TruckIcon: () => <div data-testid="mock-truck-icon" />,
  PersonAddIcon: () => <div data-testid="mock-person-add-icon" />,
  PeopleIcon: () => <div data-testid="mock-people-icon" />,
  WarningIcon: () => <div data-testid="mock-warning-icon" />,
  FinanceIcon: () => <div data-testid="mock-finance-icon" />,
  SettingsIcon: () => <div data-testid="mock-settings-icon" />,
  SupportIcon: () => <div data-testid="mock-support-icon" />,
  HelpIcon: () => <div data-testid="mock-help-icon" />,
  LogoutIcon: () => <div data-testid="mock-logout-icon" />,
}));

describe("Sidebar", () => {
  const user = "Lili";
  const avatarUrl = "/path-to-avatar.jpg";

  it("renders correctly when not retracted", () => {
    render(<Sidebar user={user} avatarUrl={avatarUrl} />);

    // Verifica se o avatar e o texto "Olá, Lili!" estão presentes
    expect(screen.getByAltText("User avatar")).toBeInTheDocument();
    expect(screen.getByTestId("user-greeting")).toHaveTextContent(
      `Olá, ${user}!`
    );

    // Verifica se todos os textos dos itens de navegação estão presentes
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Meus Fretes")).toBeInTheDocument();
    expect(screen.getByText("Motoristas")).toBeInTheDocument();
    expect(screen.getByText("Clientes")).toBeInTheDocument();
    expect(screen.getByText("Ocorrências")).toBeInTheDocument();
    expect(screen.getByText("Financeiro")).toBeInTheDocument();
    expect(screen.getByText("Configurações")).toBeInTheDocument();
    expect(screen.getByText("Atendimento")).toBeInTheDocument();
    expect(screen.getByText("Ajuda")).toBeInTheDocument();
    expect(screen.getByText("Deslogar")).toBeInTheDocument();
  });

  it("renders correctly when retracted", () => {
    render(<Sidebar user={user} avatarUrl={avatarUrl} />);

    // Clicar no botão para retrair a sidebar
    fireEvent.click(screen.getByTestId("toggle-button"));

    // Verifica se o avatar está presente
    expect(screen.getByAltText("User avatar")).toBeInTheDocument();

    // Verifica se todos os textos dos itens de navegação não estão presentes
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Meus Fretes")).not.toBeInTheDocument();
    expect(screen.queryByText("Motoristas")).not.toBeInTheDocument();
    expect(screen.queryByText("Clientes")).not.toBeInTheDocument();
    expect(screen.queryByText("Ocorrências")).not.toBeInTheDocument();
    expect(screen.queryByText("Financeiro")).not.toBeInTheDocument();
    expect(screen.queryByText("Configurações")).not.toBeInTheDocument();
    expect(screen.queryByText("Atendimento")).not.toBeInTheDocument();
    expect(screen.queryByText("Ajuda")).not.toBeInTheDocument();
    expect(screen.queryByText("Deslogar")).not.toBeInTheDocument();
  });
});
