import React, { useEffect, useState } from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import "react-toastify/dist/ReactToastify.css";
import { TiEdit } from "react-icons/ti";
import { auth } from "../../config/firebase_configure";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase_configure";
import { FiCheck, FiDelete, FiEdit } from "react-icons/fi";
import {
  getExamForms,
  getFirstReviewerForms,
} from "../../services/progress/progress_exam_duty";

const Tasks = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [examForms, setExamForms] = useState([]);
  const [toBeFirstReviewedForms, setToBeFirstReviewedForms] = useState(null);
  const [toBeSecondReviewedForms, setToBeSecondReviewedForms] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = getDoc(docRef);
        //set the user data to the state
        docSnap
          .then((doc) => {
            if (doc.exists()) {
              const userData = doc.data();

              setUserData(userData);
              setUserRole(userData.role);
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          });
      } else {
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  //get all forms data
  useEffect(() => {
    getFirstReviewerForms().then((data) => {
      setToBeFirstReviewedForms(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="flex flex-row ml-10 mt-10">
      <div className="">
        <div className=" text-black w-64 h-full p-4"></div>
      </div>

      <div>
        <div className="flex flex-col gap-10">
          <div>
            <div className="place-items-start align-top items-center">
              <SideBar />
            </div>
            <div className="bg-yellow-100 text-yellow-800 w-40 flex gap-2 font-medium px-4 py-0.5 rounded-full text-md">
              {userRole} <span>Account</span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-yellow-500 ">
                Here Are Some Forms Submited By You
              </h2>
              <p className="text-gray-500 ">
                Apply for leave by filling in the form below and submitting it
                to your department head. You will be notified of the status of
                your application. And also, you can apply for a loan by filling
                in the form below and submitting it to your department head. You
                will be notified of the status of your application.
              </p>
            </div>
            {/* cards */}
            <div className="flex flex-col gap-5">
              <div className=" w-[1200px]">
                {toBeFirstReviewedForms &&
                  toBeFirstReviewedForms.map((formData, index) => (
                    <div
                      key={index}
                      className="bg-white  p-4 rounded-lg shadow-md flex flex-col justify-between gap-3 mt-5 hover:bg-slate-100 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-101"
                    >
                      <section>
                        <ol class="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-400 rounded-full shadow-sm  sm:text-base  sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                          <li class="flex items-center text-blue-600 ">
                            <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 ">
                              1
                            </span>
                            {formData.applicant_name}

                            <svg
                              class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 12 10"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m7 9 4-4-4-4M1 9l4-4-4-4"
                              />
                            </svg>
                          </li>
                          <li class="flex items-center text-blue-600">
                            <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 ">
                              2
                            </span>
                            {formData.first_reciver_email}

                            <svg
                              class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 12 10"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
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
                            <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 ">
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
                              <div className=" my-4">
                                <h2 className="text-lg text-slate-600 pb-4 ">
                                  Applicant Details
                                </h2>
                                <p className="text-gray-500 ">
                                  {formData.applicant_name}
                                </p>
                                <p className="text-gray-500 ">
                                  {formData.applicant_email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section>
                        <div className="flex flex-row justify-between items-center mt-8 mb-4">
                          <div className="flex gap-2">
                            <button className="bg-red-100 hover:bg-red-600 hover:text-white hover:ease-in-out text-red-800 flex items-center gap-4   font-medium px-4 py-2 rounded-full text-md">
                              Reject <FiDelete />
                            </button>
                            <button className="bg-yellow-100 hover:bg-yellow-600 hover:text-white hover:ease-in-out text-yellow-800 flex items-center gap-4   font-medium px-4 py-2 rounded-full text-md">
                              Edit <FiEdit />
                            </button>
                            <button className="bg-green-100 hover:bg-green-600 hover:text-white hover:ease-in-out text-green-800 flex items-center gap-4   font-medium px-4 py-2 rounded-full text-md">
                              Approve <FiCheck />
                            </button>
                          </div>
                        </div>
                      </section>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
