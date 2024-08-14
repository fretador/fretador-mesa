import React from "react";
import { render } from "@testing-library/react";
import SidebarCompHeader from "@/components/SidebarComp/SidebarCompHeader";

// Mocking dependencies
jest.mock("@/store/store", () => ({
  useAppSelector: jest.fn(() => false),
}));

jest.mock("@/assets/images/fretadorIcon.svg", () => "div");

jest.mock("@/components/CustomImage", () => "img");

describe("SidebarCompHeader", () => {
  const mockUser = {
    name: "John Doe",
    profilePicture: "https://example.com/profile.jpg",
  };

  it("renders without crashing", () => {
    render(<SidebarCompHeader user={mockUser} />);
  });
});
