import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { auth } from "../../config/firebase_configure"; // Import your firebase configuration
import Login from "./Login";

describe("Login component", () => {
  test("renders correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check if the title is rendered
    expect(screen.getByText(/Log Into Your Account/i)).toBeInTheDocument();

    // Check if the form inputs are rendered
    expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    // Check if the "Log In" button is rendered
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });

  test("handles login correctly", async () => {
    // Mock signInWithEmailAndPassword function
    const signInWithEmailAndPasswordMock = jest.fn(() => Promise.resolve());
    auth.signInWithEmailAndPassword = signInWithEmailAndPasswordMock;

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill out the email and password fields
    fireEvent.change(screen.getByLabelText(/Work Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    // Click the "Log In" button
    fireEvent.click(screen.getByText(/Log In/i));

    // Check if signInWithEmailAndPassword is called with the correct arguments
    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(
      auth,
      "test@example.com",
      "password123"
    );
  });
});
