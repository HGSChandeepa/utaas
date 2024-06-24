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
import { formImage } from "../../../src/assets/index";

const Tasks = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [approverdExambyfist, setApproverdExambyfist] = useState(0);

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
      window.location.reload();
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
      window.location.reload();
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
      window.location.reload();
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
      window.location.reload();
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
      window.location.reload();
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
      window.location.reload();
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
      window.location.reload();
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
      window.location.reload();
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
          <div
            className={`font-medium px-2.5 py-0.5 rounded-full text-md w-fit ${
              userRole === "HOD"
                ? "bg-blue-100 text-blue-800"
                : userRole === "Admin"
                ? "bg-green-100 text-green-800"
                : userRole === "Lecturer"
                ? "bg-yellow-100 text-yellow-800"
                : ""
            }`}
          >
            {userRole} <span>Account</span>
          </div>
          <h2
            className={`text-2xl font-semibold ${
              userRole === "HOD"
                ? "text-blue-500"
                : userRole === "Admin"
                ? "text-green-500"
                : userRole === "Lecturer"
                ? "text-yellow-500"
                : ""
            }`}
          >
            Here are the forms that need your review
          </h2>
          <p className="text-gray-700 justify-start ">
            You can approve or reject the forms below, based on the information
            and documents provided also you can edit the form if needed. and
            notify the applicant about the decision.then the form will be sent
            to the next reviewer.feel free to contact the applicant if you need
            more information.
          </p>
        </div>
        {loading && (
          <div className="flex flex-col gap-5 justify-start mx-10  h-full">
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full  w-[500px] mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[1100px] mb-2.5"></div>

              <span className="sr-only">Loading...</span>
            </div>
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full  w-[500px] mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full  max-w-[1100px] mb-2.5"></div>

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
                    formData.current_step === 2 &&
                    formData.rejected_by_first_reciver === false ? (
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
                              {formData.name}

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
                                <h2 className="text-xl font-semibold text-blue-700">
                                  Exam Duty Form
                                </h2>
                                <p className="text-blue-500">
                                  Examination: {formData.examinationName}
                                </p>
                                <div className="my-1">
                                  <h2 className="text-md text-black pb-4">
                                    Applicant Details
                                  </h2>

                                  <p className="text-gray-400 text-sm">
                                    Applicant Name: {formData.name}
                                  </p>
                                  <p className="text-gray-400 text-sm">
                                    Applicant Email: {formData.email}
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
                  formData.current_step === 3 &&
                  formData.rejected_by_second_reciver === false ? (
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
                  formData.current_step === 2 &&
                  formData.approveByFirstReviewerPaperMarking === false ? (
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
                  formData.current_step === 3 &&
                  formData.approveSecondReviewerServicePaperMarking ===
                    false ? (
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

                {toBeFirstReviewedExamForms.length === 0 &&
                  toBeSecondReviewedExamForms.length === 0 &&
                  toBeFirstReviewedPaperMarkingForms.length === 0 &&
                  toBeSecondReviewedPaperMarkingForms.length === 0 && (
                    <div className="bg-white flex flex-col items-center justify-center  rounded-md p-4">
                    <img
                      src={formImage}
                      alt="notifications"
                      className="w-[400px]"
                    />
                    <h1 className="text-md font-normal text-center opacity-40">
                      No forms to review at the moment ,Please check back later!
                    </h1>
                  </div>
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
