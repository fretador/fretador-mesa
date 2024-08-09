import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SidebarCompRoot from "@/components/SidebarComp/SidebarCompRoot";
import { BoardUser } from "@/utils/Interfaces/BoardUsers";

// Mock do styles
jest.mock("./SidebarCompRoot.module.css", () => ({
  sidebar: "sidebar-class",
  retracted: "retracted-class",
  not_retracted: "not-retracted-class",
}));

// Criar um mock store
const mockStore = configureStore([]);

describe("SidebarCompRoot", () => {
  const mockUser: BoardUser = {
    id: "1",
    active: true,
    updateDate: "2024-08-09T12:00:00Z",
    creationDate: "2023-01-01T00:00:00Z",
    name: "Test User",
    email: "test@example.com",
    profile: "ADMINISTRADOR",
    hashPassword: "mockHash",
  };

  it("renders correctly when not retracted", () => {
    const store = mockStore({
      sidebar: { isRetracted: false },
    });

    render(
      <Provider store={store}>
        <SidebarCompRoot user={mockUser}>
          <div>Test Content</div>
        </SidebarCompRoot>
      </Provider>
    );

    const sidebar = screen.getByTestId("side-bar");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveClass("sidebar-class");
    expect(sidebar).toHaveClass("not-retracted-class");
    expect(sidebar).not.toHaveClass("retracted-class");
    expect(sidebar).toHaveTextContent("Test Content");
  });

  it("renders correctly when retracted", () => {
    const store = mockStore({
      sidebar: { isRetracted: true },
    });

    render(
      <Provider store={store}>
        <SidebarCompRoot user={mockUser}>
          <div>Test Content</div>
        </SidebarCompRoot>
      </Provider>
    );

    const sidebar = screen.getByTestId("side-bar");
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveClass("sidebar-class");
    expect(sidebar).toHaveClass("retracted-class");
    expect(sidebar).not.toHaveClass("not-retracted-class");
    expect(sidebar).toHaveTextContent("Test Content");
  });
});
