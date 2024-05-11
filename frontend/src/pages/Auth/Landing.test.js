import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "./LandingPage";

describe("LandingPage component", () => {
  test("renders correctly", () => {
    render(<LandingPage />);

    // Check if the title is rendered
    expect(
      screen.getByText(/University Teachers’ Administrative Automation System/i)
    ).toBeInTheDocument();

    // Check if the text content is rendered
    expect(
      screen.getByText(/We have successfully created your new account/i)
    ).toBeInTheDocument();

    // Check if the button is rendered
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();

    // Check if both images are rendered
    expect(screen.getAllByAltText(/no internet/i)).toHaveLength(2);
  });
});
