import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { firestore } from "../../config/firebase_configure";
import Register from "./Register";

// Mocking getAuth function from firebase/auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    sendEmailVerification: jest.fn(),
  })),
}));

// Mocking firestore function from firebase/firestore
jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

describe("Register component", () => {
  test("renders correctly", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Check if the title is rendered
    expect(screen.getByText(/Input Your Information/i)).toBeInTheDocument();

    // Check if the form inputs are rendered
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Department/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telephone Number/i)).toBeInTheDocument();

    // Check if the "Register" button is rendered
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test("handles registration correctly", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Work Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Department/i), {
      target: { value: "Civil" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Telephone Number/i), {
      target: { value: "+94123456789" },
    });

    // Click the "Register" button
    fireEvent.click(screen.getByText(/Register/i));

    // Check if createUserWithEmailAndPassword is called with the correct arguments
    expect(getAuth().createUserWithEmailAndPassword).toHaveBeenCalledWith(
      "john@example.com",
      "password123"
    );

    // Check if setDoc is called with the correct arguments
    expect(firestore.doc).toHaveBeenCalledWith(
      firestore,
      "users",
      expect.any(String)
    );
    expect(firestore.setDoc).toHaveBeenCalledWith(expect.any(Object), {
      uid: expect.any(String),
      userEmail: "john@example.com",
      userName: "John Doe",
      department: "Civil",
      contactNumber: "+94123456789",
    });
  });
});
