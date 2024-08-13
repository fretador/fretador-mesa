import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SidebarCompRoot from "@/components/SidebarComp/SidebarCompRoot";
import { toggleSidebar } from "@/store/slices/sidebarSlice";
import { configureStore } from "@reduxjs/toolkit";

// Mock do redux
jest.mock("@/store/store", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock da action
jest.mock("@/store/slices/sidebarSlice", () => ({
  toggleSidebar: jest.fn(),
}));

// Criando um slice mock para o sidebar
const mockSidebarSlice = {
  name: "sidebar",
  initialState: { isRetracted: false },
  reducers: {
    toggleSidebar: (state) => {
      state.isRetracted = !state.isRetracted;
    },
  },
};

describe("SidebarCompRoot", () => {
  let store;
  let mockDispatch: jest.Mock<any, any, any>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        sidebar: mockSidebarSlice.reducer,
      },
    });
    mockDispatch = jest.fn();
    (require("@/store/store") as any).useAppDispatch.mockReturnValue(
      mockDispatch
    );
  });

  it("renders correctly when not retracted", () => {
    (require("@/store/store") as any).useAppSelector.mockReturnValue(false);

    render(
      <SidebarCompRoot user={{} as any}>
        <div>Sidebar content</div>
      </SidebarCompRoot>
    );

    expect(screen.getByTestId("side-bar")).toHaveClass("sidebar");
    expect(screen.getByTestId("side-bar")).toHaveClass("not_retracted");
    expect(screen.getByTestId("side-bar")).not.toHaveClass("retracted");
    expect(screen.getByText("Sidebar content")).toBeInTheDocument();
  });

  it("renders correctly when retracted", () => {
    (require("@/store/store") as any).useAppSelector.mockReturnValue(true);

    render(
      <SidebarCompRoot user={{} as any}>
        <div>Sidebar content</div>
      </SidebarCompRoot>
    );

    expect(screen.getByTestId("side-bar")).toHaveClass("sidebar");
    expect(screen.getByTestId("side-bar")).toHaveClass("retracted");
    expect(screen.getByTestId("side-bar")).not.toHaveClass("not_retracted");
    expect(screen.getByText("Sidebar content")).toBeInTheDocument();
  });

  it("dispatches toggleSidebar action when tab is clicked", () => {
    (require("@/store/store") as any).useAppSelector.mockReturnValue(false);

    render(
      <SidebarCompRoot user={{} as any}>
        <div>Sidebar content</div>
      </SidebarCompRoot>
    );

    const tab = screen.getByRole("navigation").querySelector(".tab");
    fireEvent.click(tab);

    expect(mockDispatch).toHaveBeenCalledWith(toggleSidebar());
  });

  it("applies custom className when provided", () => {
    (require("@/store/store") as any).useAppSelector.mockReturnValue(false);

    render(
      <SidebarCompRoot user={{} as any} className="custom-class">
        <div>Sidebar content</div>
      </SidebarCompRoot>
    );

    expect(screen.getByTestId("side-bar")).toHaveClass("custom-class");
  });
});
