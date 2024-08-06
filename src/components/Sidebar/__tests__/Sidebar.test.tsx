import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SideBar from "./../SideBar"; // Substitua pelo caminho correto do seu componente

describe("SideBar should be rendering correctly", () => {
  beforeEach(() => {
    render(<SideBar user="Fulano" />);
  });

  it("renders the Fretador icon", () => {
    const fretadorIcon = screen.getByAltText("Fretador icon"); // Certifique-se de adicionar o atributo alt ao ícone
    expect(fretadorIcon).toBeInTheDocument();
  });

  it("renders the user avatar and greeting", () => {
    const avatar = screen.getByAltText("User avatar"); // Certifique-se de adicionar o atributo alt ao avatar
    const greeting = screen.getByText(/Olá, Fulano!/i);

    expect(avatar).toBeInTheDocument();
    expect(greeting).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    const navItems = [
      { name: "Home", icon: "home" },
      { name: "Meus Fretes", icon: "truck" },
      { name: "Motoristas", icon: "drivers" },
      { name: "Clientes", icon: "clients" },
      { name: "Ocorrências", icon: "incidents" },
      { name: "Financeiro", icon: "finance" },
      { name: "Configurações", icon: "settings" },
      { name: "Atendimento", icon: "support" },
      { name: "Ajuda", icon: "help" },
      { name: "Deslogar", icon: "logout" },
    ];

    navItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByTestId(`icon-${item.icon}`)).toBeInTheDocument();
    });
  });

  it("should be retractable", () => {
    const toggleButton = screen.getByTestId("toggle-button"); // Adicione um atributo data-testid ao botão de retração
    const navBar = screen.getByTestId("side-bar"); // Adicione um atributo data-testid à barra de navegação

    fireEvent.click(toggleButton);
    expect(navBar).toHaveClass("retracted"); // Certifique-se de que a classe 'retracted' seja adicionada quando retraído

    fireEvent.click(toggleButton);
    expect(navBar).not.toHaveClass("retracted"); // Certifique-se de que a classe 'retracted' seja removida quando expandido
  });

  it("should navigate to correct pages", () => {
    const homeLink = screen.getByText("Home");
    fireEvent.click(homeLink);
    expect(window.location.pathname).toBe("/home"); // Ajuste a verificação de URL conforme necessário

    const fretesLink = screen.getByText("Meus Fretes");
    fireEvent.click(fretesLink);
    expect(window.location.pathname).toBe("/meus-fretes"); // Ajuste a verificação de URL conforme necessário
  });
});
