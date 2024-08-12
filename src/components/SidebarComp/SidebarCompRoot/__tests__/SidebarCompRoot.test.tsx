import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SidebarCompRoot from "@/components/SidebarComp/SidebarCompRoot";
import { BoardUser } from "@/utils/Interfaces/BoardUsers";
import { toggleSidebar } from "@/store/slices/sidebarSlice";

// Mock do styles
jest.mock("./SidebarCompRoot.module.css", () => ({
  sidebar: "sidebar-class",
  retracted: "retracted-class",
  not_retracted: "not-retracted-class",
  tab: "tab-class",
  sidebarRetracted: "sidebar-retracted-class",
  sidebarExpanded: "sidebar-expanded-class",
  transparentTab: "transparent-tab-class",
  tabContent: "tab-content-class",
  retractedClipPath: "retracted-clip-path-class",
  expandedClipPath: "expanded-clip-path-class",
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
    expect(sidebar).toHaveClass("not_retracted-class");
    expect(sidebar).not.toHaveClass("retracted-class");
    expect(sidebar).toHaveTextContent("Test Content");

    const tab = sidebar.querySelector(".tab-class");
    expect(tab).toBeInTheDocument();
    expect(tab).toHaveClass("sidebar-expanded-class");
    expect(tab).not.toHaveClass("transparent-tab-class");

    const tabContent = tab?.querySelector(".tab-content-class");
    expect(tabContent).toBeInTheDocument();
    expect(tabContent).toHaveClass("expanded-clip-path-class");
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
    expect(sidebar).not.toHaveClass("not_retracted-class");
    expect(sidebar).toHaveTextContent("Test Content");

    const tab = sidebar.querySelector(".tab-class");
    expect(tab).toBeInTheDocument();
    expect(tab).toHaveClass("sidebar-retracted-class");
    expect(tab).toHaveClass("transparent-tab-class");

    const tabContent = tab?.querySelector(".tab-content-class");
    expect(tabContent).toBeInTheDocument();
    expect(tabContent).toHaveClass("retracted-clip-path-class");
  });

  it("toggles sidebar when tab is clicked", () => {
    const store = mockStore({
      sidebar: { isRetracted: false },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SidebarCompRoot user={mockUser}>
          <div>Test Content</div>
        </SidebarCompRoot>
      </Provider>
    );

    const tab = screen.getByTestId("side-bar").querySelector(".tab-class");
    fireEvent.click(tab!);

    expect(store.dispatch).toHaveBeenCalledWith(toggleSidebar());
  });
});
