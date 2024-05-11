import {
  getExamForms,
  getFirstReviewerForms,
  getSecondReviewerForms,
  getAllFormsByCurrentUser,
  getFormById,
  approveFirstReviewerService,
  approveSecondReviewerService,
  rejectFirstReviewerService,
  rejectSecondReviewerService,
  editedByFirstReviewerService,
  editedBySecondReviewerService,
  getNotifications,
} from "./progress_exam_duty"; // Import the service functions you want to test
import { firestore } from "../../config/firebase_configure"; // Import the Firestore configuration

// Mock firestore module
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(() => ({
    getDocs: jest.fn(),
    doc: jest.fn(() => ({
      getDoc: jest.fn(),
      setDoc: jest.fn(),
    })),
    addDoc: jest.fn(),
  })),
}));

describe("Firestore Service Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getExamForms should fetch all exam forms from Firestore", async () => {
    // Mock Firestore data
    const mockExamForms = [
      {
        id: "1",
        data: () => ({
          /* form data */
        }),
      },
    ];
    const getDocsMock = jest.fn(() => mockExamForms);
    firestore.collection.mockReturnValueOnce({ getDocs: getDocsMock });

    // Call the function
    const result = await getExamForms();

    // Check if Firestore functions are called correctly
    expect(firestore.collection).toHaveBeenCalledWith(firestore, "exam_duty");
    expect(getDocsMock).toHaveBeenCalled();

    // Check if the result matches the expected data
    expect(result).toEqual(mockExamForms.map((form) => form.data()));
  });

  // Similar tests for other service functions...
});
