import React, { useEffect, useState } from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../config/firebase_configure";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase_configure";
import { FiCheck, FiDelete, FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  getFirstReviewerForms,
  approveFirstReviewerService,
  getSecondReviewerForms,
  approveSecondReviewerService,
  rejectFirstReviewerService,
  rejectSecondReviewerService,
} from "../../services/progress/progress_exam_duty";

import {
  getFirstReviewerPaperMarkingForms,
  getSecondReviewerPaperMarkingForms,
  approveFirstReviewerServicePaperMarking,
  approveSecondReviewerServicePaperMarking,
  rejectFirstReviewerServicePaperMarking,
  rejectSecondReviewerServicePaperMarking,
} from "../../services/progress/progress_paper_marking";

const Tasks = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // for exam duty forms
  const [toBeFirstReviewedExamForms, setToBeFirstReviewedExamForms] = useState(
    []
  );
  const [toBeSecondReviewedExamForms, setToBeSecondReviewedExamForms] =
    useState([]);

  // for paper marking forms
  const [
    toBeFirstReviewedPaperMarkingForms,
    setToBeFirstReviewedPaperMarkingForms,
  ] = useState([]);
  const [
    toBeSecondReviewedPaperMarkingForms,
    setToBeSecondReviewedPaperMarkingForms,
  ] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      try {
        if (user) {
          const docRef = doc(firestore, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserData(userData);
            setUserRole(userData.role);
          } else {
            console.log("No such document!");
          }
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // Fetch forms data
  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        setLoading(true);
        try {
          // ? Exam Duty Forms
          // Fetch first reviewer forms
          const firstReviewerData = await getFirstReviewerForms(
            userData.userEmail
          );
          // console.log(firstReviewerData);
          //store the data in the state as a list
          setToBeFirstReviewedExamForms(
            await getFirstReviewerForms(userData.userEmail)
          );
          console.log("first", toBeFirstReviewedExamForms);

          // Fetch second reviewer forms
          const secondReviewerData = await getSecondReviewerForms(
            userData.userEmail
          );
          setToBeSecondReviewedExamForms(secondReviewerData);
          console.log("second", toBeSecondReviewedExamForms);

          // ? Paper Marking Forms
          // Fetch first reviewer paper marking forms
          const firstReviewerPaperMarkingData =
            await getFirstReviewerPaperMarkingForms(userData.userEmail);
          setToBeFirstReviewedPaperMarkingForms(firstReviewerPaperMarkingData);

          // Fetch second reviewer paper marking forms

          const secondReviewerPaperMarkingData =
            await getSecondReviewerPaperMarkingForms(userData.userEmail);
          setToBeSecondReviewedPaperMarkingForms(
            secondReviewerPaperMarkingData
          );
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [userData]);

  // Method to approve by the first reviewer
  const approveByFirstReviewer = async (formId) => {
    try {
      await approveFirstReviewerService(formId);
      toast.success("Form approved successfully");
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred, please try again");
    }
  };

  // Method to approve by the second reviewer
  const approveBySecondReviewer = async (formId) => {
    try {
      await approveSecondReviewerService(formId);
      toast.success("Form approved successfully");
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred, please try again");
    }
  };

  // Method to reject by the first reviewer
  const rejectFormByFirstReviwer = async (formId) => {
    try {
      await rejectFirstReviewerService(formId);
      toast.success("Form rejected successfully");
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred, please try again");
    }
  };

  // Method to reject by the second reviewer
  const rejectFormBySecondReviwer = async (formId) => {
    try {
      await rejectSecondReviewerService(formId);
      toast.success("Form rejected successfully");
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred, please try again");
    }
  };

  // Method to approve by the first reviewer for paper marking
  const approveByFirstReviewerPaperMarking = async (formId) => {
    try {
      await approveFirstReviewerServicePaperMarking(formId);
      toast.success("Form approved successfully");
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred, please try again");
    }
  };

  // Method to approve by the second reviewer for paper marking
  const approveBySecondReviewerPaperMarking = async (formId) => {
    try {
      await approveSecondReviewerServicePaperMarking(formId);
      toast.success("Form approved successfully");
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred, please try again");
    }
  };

  // Method to reject by the first reviewer for paper marking
  const rejectFormByFirstReviwerPaperMarking = async (formId) => {
    try {
      await rejectFirstReviewerServicePaperMarking(formId);
      toast.success("Form rejected successfully");
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred, please try again");
    }
  };

  // Method to reject by the second reviewer for paper marking
  const rejectFormBySecondReviwerPaperMarking = async (formId) => {
    try {
      await rejectSecondReviewerServicePaperMarking(formId);
      toast.success("Form rejected successfully");
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred, please try again");
    }
  };

  return (
    <div className="flex flex-row ">
      <div className="place-items-start align-top items-center">
        <SideBar />
      </div>
      <div>
        <div className="flex flex-col gap-2 p-9">
          <div className="bg-yellow-100 text-yellow-800 w-fit  flex gap-2 font-medium px-4 py-0.5 rounded-full text-md">
            {userRole} <span>Account</span>
          </div>
          <h2 className="text-2xl font-semibold text-yellow-500">
            Here Are Some Forms Submitted By You
          </h2>
          <p className="text-gray-500 justify-start ">
            Apply for leave by filling in the form below and submitting it to
            your department head. You will be notified of the status of your
            application. And also, you can apply for a loan by filling in the
            form below and submitting it to your department head. You will be
            notified of the status of your application.
          </p>
        </div>
        {loading && (
          <div className="flex justify-center items-center h-full">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <div className="flex flex-row gap-10">
          <div className="flex flex-col w-[90%] gap-5 p-4">
            {/* Cards */}
            <div className="flex flex-col gap-5">
              <div>
                {toBeFirstReviewedExamForms &&
                  toBeFirstReviewedExamForms.map((formData, index) =>
                    formData.current_step === 2 ? (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between gap-3 mt-5 hover:bg-slate-100 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-101"
                      >
                        <h2 className="text-xl font-semibold text-slate-500 py-3 bg-blue-100 w-fit px-5 rounded-full border-blue-400 border-2">
                          You are the First Reviewer of this Form
                        </h2>
                        <section>
                          <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-400 rounded-full shadow-sm sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                            <li className="flex items-center text-blue-600">
                              <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0">
                                1
                              </span>
                              {formData.applicant_name}

                              <svg
                                className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 12 10"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                                />
                              </svg>
                            </li>
                            <li className="flex items-center text-blue-600">
                              <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0">
                                2
                              </span>
                              {formData.first_reciver_email}

                              <svg
                                className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 12 10"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                                />
                              </svg>
                            </li>
                            <li
                              className={
                                formData.current_step === 3
                                  ? "text-blue-600"
                                  : "flex"
                              }
                            >
                              <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0">
                                3
                              </span>
                              {formData.second_reciver_email}
                            </li>
                          </ol>
                        </section>
                        <section>
                          <div className="flex flex-row justify-between items-center ">
                            <div className="flex gap-2">
                              <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-semibold text-yellow-500">
                                  Exam Duty Form
                                </h2>
                                <div className="my-4">
                                  <h2 className="text-lg text-slate-600 pb-4">
                                    Applicant Details
                                  </h2>
                                  <p className="text-gray-500">
                                    {formData.name}
                                  </p>
                                  <p className="text-gray-500">
                                    {formData.email}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <section>
                          <div className="flex flex-row justify-between items-center mt-8 mb-4">
                            <div className="flex gap-2">
                              <button
                                className="bg-red-100 hover:bg-red-600 hover:text-white hover:ease-in-out text-red-800 flex items-center gap-4 font-medium px-4 py-2 rounded-full text-md"
                                onClick={() =>
                                  formData.current_step === 2 &&
                                  rejectFormByFirstReviwer(formData.form_id)
                                }
                              >
                                Reject <FiDelete />
                              </button>
                              <a
                                href={`/dashboard/exam/${formData.form_id}`}
                                className="bg-yellow-100 hover:bg-yellow-600 hover:text-white hover:ease-in-out text-yellow-800 flex items-center gap-4 font-medium px-4 py-2 rounded-full text-md"
                              >
                                Edit <FiEdit />
                              </a>
                              <button
                                onClick={() =>
                                  formData.current_step === 2 &&
                                  approveByFirstReviewer(formData.form_id)
                                }
                                className="bg-green-100 hover:bg-green-600 hover:text-white hover:ease-in-out text-green-800 flex items-center gap-4 font-medium px-4 py-2 rounded-full text-md"
                              >
                                Approve <FiCheck />
                              </button>
                            </div>
                          </div>
                        </section>
                      </div>
                    ) : null
                  )}

                {toBeSecondReviewedExamForms.map((formData, index) =>
                  formData.current_step === 3 ? (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between gap-3 mt-5 hover:bg-slate-100 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-101"
                    >
                      <h2 className="text-xl font-semibold text-slate-500 py-3 bg-blue-100 w-fit px-5 rounded-full border-blue-400 border-2">
                        You are the Second Reviewer of this Form
                      </h2>
                      <section>
                        <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-400 rounded-full shadow-sm sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                          <li className="flex items-center text-blue-600">
                            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0">
                              1
                            </span>
                            {formData.applicant_name}

                            <svg
                              className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 12 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m7 9 4-4-4-4M1 9l4-4-4-4"
                              />
                            </svg>
                          </li>
                          <li className="flex items-center text-blue-600">
                            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0">
                              2
                            </span>
                            {formData.first_reciver_email}

                            <svg
                              className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 12 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m7 9 4-4-4-4M1 9l4-4-4-4"
                              />
                            </svg>
                          </li>
                          <li className="flex items-center text-blue-600">
                            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0">
                              3
                            </span>
                            {formData.second_reciver_email}
                          </li>
                        </ol>
                      </section>
                      <section>
                        <div className="flex flex-row justify-between items-center">
                          <div className="flex gap-2">
                            <div className="flex flex-col gap-1">
                              <h2 className="text-xl font-semibold text-yellow-500">
                                Exam Duty Form
                              </h2>
                              <div className="my-4">
                                <h2 className="text-lg text-slate-600 pb-4">
                                  Applicant Details
                                </h2>
                                <p className="text-gray-500">{formData.name}</p>
                                <p className="text-gray-500">
                                  {formData.email}
                                </p>  
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section>
                        <div className="flex flex-row justify-between items-center mt-8 mb-4">
                          <div className="flex gap-2">
                            <button
                              className="bg-red-100 hover:bg-red-600 hover:text-white hover:ease-in-out text-red-800 flex items-center gap-4 font-medium px-4 py-2 rounded-full text-md"
                              onClick={() =>
                                formData.current_step === 3 &&
                                rejectFormBySecondReviwer(formData.form_id)
                              }
                            >
                              Reject <FiDelete />
                            </button>
                            <a
                              href={`/dashboard/exam/${formData.form_id}`}
                              className="bg-yellow-100 hover:bg-yellow-600 hover:text-white hover:ease-in-out text-yellow-800 flex items-center gap-4 font-medium px-4 py-2 rounded-full text-md"
                            >
                              Edit <FiEdit />
                            </a>
                            <button
                              onClick={() =>
                                formData.current_step === 3 &&
                                approveBySecondReviewer(formData.form_id)
                              }
                              className="bg-green-100 hover:bg-green-600 hover:text-white hover:ease-in-out text-green-800 flex items-center gap-4 font-medium px-4 py-2 rounded-full text-md"
                            >
                              Approve <FiCheck />
                            </button>
                          </div>
                        </div>
                      </section>
                    </div>
                  ) : null
                )}

                {/* paper marking forms */}
                {toBeFirstReviewedPaperMarkingForms.map((formData, index) =>
                  formData.current_step === 2 ? (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between gap-3 mt-5 hover:bg-slate-100 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-101"
                    >
                      <h2 className="text-xl font-semibold text-slate-500 py-3 bg-blue-100 w-fit px-5 rounded-full border-blue-400 border-2">
                        You are the First Reviewer of this Form
                      </h2>
                      <section>
                        <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-400 rounded-full shadow-sm sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                          <li className="flex items-center text-blue-600">
                            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0">
                              1
                            </span>
                            {formData.applicant_name}

                            <svg
                              className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 12 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m7 9 4-4-4-4M1 9l4-4-4-4"
                              />
                            </svg>
                          </li>
                          <li className="flex items-center text-blue-600">
                            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0">
                              2
                            </span>
                            {formData.first_reciver_email}

                            <svg
                              className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 12 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m7 9 4-4-4-4M1 9l4-4-4-4"
                              />
                            </svg>
                          </li>
                          <li
                            className={
                              formData.current_step === 3
                                ? "text-blue-600"
                                : "flex"
                            }
                          >
                            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0">
                              3
                            </span>
                            {formData.second_reciver_email}
                          </li>
                        </ol>
                      </section>
                      <section>
                        <div className="flex flex-row justify-between items-center ">
                          <div className="flex gap-2">
                            <div className="flex flex-col gap-1">
                              <h2 className="text-xl font-semibold text-yellow-500">
                                Paper Marking Form
                              </h2>
                              <div className="my-4">
                                <h2 className="text-lg text-slate-600 pb-4">
                                  Applicant Details
                                </h2>
                                <p className="text-gray-500">{formData.name}</p>
                                <p className="text-gray-500">
                                  {formData.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section>
                        <div className="flex flex-row justify-between items-center mt-8 mb-4">
                          <div className="flex gap-2">
                            <button
                              className="bg-red-100 hover:bg-red-600 hover:text-white hover:ease-in-out text-red-800 flex items-center gap-4 font-medium px-4 py-2 rounded-full text-md"
                              onClick={() =>
                                formData.current_step === 2 &&
                                rejectFormByFirstReviwerPaperMarking(
                                  formData.form_id
                                )
                              }
                            >
                              Reject <FiDelete />
                            </button>
                            <a
                              href={`/dashboard/exam/${formData.form_id}`}
                              className="bg-yellow-100 hover:bg-yellow-600 hover:text-white hover:ease-in-out text-yellow-800 flex items-center gap-4 font-medium px-4 py-2 rounded-full text-md"
                            >
                              Edit <FiEdit />
                            </a>
                            <button
                              onClick={() =>
                                formData.current_step === 2 &&
                                approveByFirstReviewerPaperMarking(
                                  formData.form_id
                                )
                              }
                              className="bg-green-100 hover:bg-green-600 hover:text-white hover:ease-in-out text-green-800 flex items-center gap-4 font-medium px-4 py-2 rounded-full text-md"
                            >
                              Approve <FiCheck />
                            </button>
                          </div>
                        </div>
                      </section>
                    </div>
                  ) : null
                )}

                {toBeSecondReviewedPaperMarkingForms.map((formData, index) =>
                  formData.current_step === 3 ? (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between gap-3 mt-5 hover:bg-slate-100 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-101"
                    >
                      <h2 className="text-xl font-semibold text-slate-500 py-3 bg-blue-100 w-fit px-5 rounded-full border-blue-400 border-2">
                        You are the Second Reviewer of this Form
                      </h2>
                      <section>
                        <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-400 rounded-full shadow-sm sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                          <li className="flex items-center text-blue-600">
                            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0">
                              1
                            </span>
                            {formData.applicant_name}

                            <svg
                              className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 12 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m7 9 4-4-4-4M1 9l4-4-4-4"
                              />
                            </svg>
                          </li>
                          <li className="flex items-center text-blue-600">
                            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0">
                              2
                            </span>
                            {formData.first_reciver_email}

                            <svg
                              className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 12 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m7 9 4-4-4-4M1 9l4-4-4-4"
                              />
                            </svg>
                          </li>
                          <li className="flex items-center text-blue-600">
                            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0">
                              3
                            </span>
                            {formData.second_reciver_email}
                          </li>
                        </ol>
                      </section>
                      <section>
                        <div className="flex flex-row justify-between items-center">
                          <div className="flex gap-2">
                            <div className="flex flex-col gap-1">
                              <h2 className="text-xl font-semibold text-yellow-500">
                                Paper Marking Form
                              </h2>
                              <div className="my-4">
                                <h2 className="text-lg text-slate-600 pb-4">
                                  Applicant Details
                                </h2>
                                <p className="text-gray-500">{formData.name}</p>
                                <p className="text-gray-500">
                                  {formData.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section>
                        <div className="flex flex-row justify-between items-center mt-8 mb-4">
                          <div className="flex gap-2">
                            <button
                              className="bg-red-100 hover:bg-red-600 hover:text-white hover:ease-in-out text-red-800 flex items-center gap-4 font-medium px-4 py-2 rounded-full text-md"
                              onClick={() =>
                                formData.current_step === 3 &&
                                rejectFormBySecondReviwerPaperMarking(
                                  formData.form_id
                                )
                              }
                            >
                              Reject <FiDelete />
                            </button>
                            <a
                              href={`/dashboard/exam/${formData.form_id}`}
                              className="bg-yellow-100 hover:bg-yellow-600 hover:text-white hover:ease-in-out text-yellow-800 flex items-center gap-4 font-medium px-4 py-2 rounded-full text-md"
                            >
                              Edit <FiEdit />
                            </a>
                            <button
                              onClick={() =>
                                formData.current_step === 3 &&
                                approveBySecondReviewerPaperMarking(
                                  formData.form_id
                                )
                              }
                              className="bg-green-100 hover:bg-green-600 hover:text-white hover:ease-in-out text-green-800 flex items-center gap-4 font-medium px-4 py-2 rounded-full text-md"
                            >
                              Approve <FiCheck />
                            </button>
                          </div>
                        </div>
                      </section>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
