import React, { useEffect, useState } from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import { auth } from "../../config/firebase_configure";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase_configure";
import "react-toastify/dist/ReactToastify.css";
import { getAllFormsByCurrentUser } from "../../services/progress/progress_exam_duty";
import { getAllPaperMarkingFormsByCurrentUser } from "../../services/progress/progress_paper_marking"; // Import the function to get paper marking forms

const Progress = () => {
  const [examDutyForms, setExamDutyForms] = useState([]);
  const [paperMarkingForms, setPaperMarkingForms] = useState([]); // State to hold paper marking forms
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData) {
          setLoading(true);
          const examDutyData = await getAllFormsByCurrentUser(
            userData.userEmail
          );
          const paperMarkingData = await getAllPaperMarkingFormsByCurrentUser(
            userData.userEmail
          ); // Fetch paper marking forms
          setExamDutyForms(examDutyData);
          setPaperMarkingForms(paperMarkingData); // Set paper marking forms
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  const renderFormStatus = (form) => (
    <div className="mt-4">
      <p className="text-sm text-gray-600">
        Form Submitted Successfully:{" "}
        {form.edited_by_applicant ? (
          <span className="text-green-500">&#10003;</span>
        ) : (
          <span className="text-red-500">&#10007;</span>
        )}
      </p>
      <p className="text-sm text-gray-600">
        Edited by First Reviewer ({form.first_reciver_email}):{" "}
        {form.edited_by_first_reciver ? (
          <span className="text-green-500">&#10003;</span>
        ) : (
          <span className="text-red-500">&#10007;</span>
        )}
      </p>
      <p className="text-sm text-gray-600">
        Edited by Second Reviewer ({form.second_reciver_email}):{" "}
        {form.edited_by_second_reciver ? (
          <span className="text-green-500">&#10003;</span>
        ) : (
          <span className="text-red-500">&#10007;</span>
        )}
      </p>
      <p className="text-sm text-gray-600">
        Approved by First Reviewer ({form.first_reciver_email}):{" "}
        {form.appvover_by_first_reciver ? (
          <span className="text-green-500">&#10003;</span>
        ) : (
          <span className="text-red-500">&#10007;</span>
        )}
      </p>
      <p className="text-sm text-gray-600">
        Approved by Second Reviewer ({form.second_reciver_email}):{" "}
        {form.appvover_by_second_reciver ? (
          <span className="text-green-500">&#10003;</span>
        ) : (
          <span className="text-red-500">&#10007;</span>
        )}
      </p>
      <p className="text-sm text-gray-600">
        Rejected by First Reviewer ({form.first_reciver_email}):{" "}
        {form.rejected_by_first_reciver ? (
          <span className="text-green-500">&#10003;</span>
        ) : (
          <span className="text-red-500">&#10007;</span>
        )}
      </p>
      <p className="text-sm text-gray-600">
        Rejected by Second Reviewer ({form.second_reciver_email}):{" "}
        {form.rejected_by_second_reciver ? (
          <span className="text-green-500">&#10003;</span>
        ) : (
          <span className="text-red-500">&#10007;</span>
        )}
      </p>
    </div>
  );

  return (
    <div className="flex flex-row min-h-screen ">
      <div className="place-items-start align-top items-center">
        <SideBar />
      </div>
      <div className="flex flex-col flex-grow p-10">
        <div className="flex flex-col mb-6">
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
            className={`text-2xl font-semibold mt-4 ${
              userRole === "HOD"
                ? "text-blue-500"
                : userRole === "Admin"
                ? "text-green-500"
                : userRole === "Lecturer"
                ? "text-yellow-500"
                : ""
            }`}
          >
            Your Submitted Forms
          </h2>
          <p className="text-gray-600 mt-2">
            View the status of your submitted forms below. You will be notified
            of the status of your application.
          </p>
        </div>
        {loading ? (
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
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-gray-700 mt-6">
              Exam Duty Forms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {examDutyForms.map((form, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {form.applicant_name}
                  </h3>
                  <p className="text-gray-600 mb-2">{form.applicant_email}</p>
                  <p className="text-gray-600 mb-2">{form.department}</p>
                  <p className="text-gray-600 mb-2">{form.form_type}</p>
                  {renderFormStatus(form)}
                  <a
                    href={`/dashboard/exam/${form.form_id}`}
                    className="text-blue-600 mt-4 block hover:underline hover:text-blue-400 font-semibold"
                  >
                    See the Full Form
                  </a>
                </div>
              ))}
            </div>

            {examDutyForms.length === 0 && (
              <div className="bg-white py-6 opacity-40 rounded-lg  mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Exam Duty Forms Found
                </h3>
                <p className="text-gray-600 mb-2">
                  You have not submitted any exam duty forms yet.
                </p>
              </div>
            )}

            <h3 className="text-2xl font-semibold text-gray-700 mt-6">
              Paper Marking Forms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {paperMarkingForms.map((form, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {form.applicant_name}
                  </h3>
                  <p className="text-gray-600 mb-2">{form.applicant_email}</p>
                  <p className="text-gray-600 mb-2">{form.department}</p>
                  <p className="text-gray-600 mb-2">{form.form_type}</p>
                  {renderFormStatus(form)}
                  <a
                    href={`/dashboard/paper-marking/${form.form_id}`} // Update the URL accordingly
                    className="text-blue-600 mt-4 block hover:underline hover:text-blue-400 font-semibold"
                  >
                    See the Full Form
                  </a>
                </div>
              ))}

              {paperMarkingForms.length === 0 && (
                <div className="bg-white py-6 opacity-40 w-full rounded-lg  mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Paper Marking Forms Found
                  </h3>
                  <p className="text-gray-600 mb-2">
                    You have not submitted any paper marking forms yet.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Progress;
