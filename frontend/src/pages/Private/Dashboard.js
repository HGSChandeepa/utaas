import React, { useEffect, useState } from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import SampleCards from "../../Components/Cards/SampleCards";
import { auth } from "../../config/firebase_configure";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase_configure";

import { getExamForms } from "../../services/progress/progress_exam_duty";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);

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
  const [examForms, setExamForms] = useState([]);
  useEffect(() => {
    getExamForms().then((data) => {
      setExamForms(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="flex flex-row ">
      <div className="place-items-start align-top items-center">
        <SideBar />
      </div>

      <div className="flex flex-col p-4">
        <div className="flex flex-col mx-5">
          <div className="flex flex-row justify-between items-center">
            <div>
              {userData ? (
                <div className=" flex gap-3 justify-between">
                  <p className=" text-2xl text-gray-500">Hello</p>
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
                    {userData && userData.userName}
                  </h2>

                  <p className=" text-2xl text-gray-500"> Welcome Back!</p>
                </div>
              ) : (
                <span className="flex flex-col justify-center items-center">
                  <div className="animate-spin flex justify-center items-center rounded-full h-12 w-12 border-t-2 border-s-2 border-b-1 border-[#4743E0]"></div>
                  Loading...
                </span>
              )}
            </div>
            <div>
              <div
                className={`font-medium px-2.5 py-0.5 rounded-full text-md ${
                  userRole === "HOD"
                    ? "bg-blue-100 text-blue-800"
                    : userRole === "Admin"
                    ? "bg-green-100 text-green-800"
                    : userRole === "Lecturer"
                    ? "bg-yellow-100 text-yellow-800"
                    : ""
                }`}
              >
                {userRole} Account
              </div>
            </div>
          </div>
        </div>
        {/* applicable forms */}

        <div>
          <section className=" mt-6 px-16">
            <div className="flex flex-row gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
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
                    Here Are Some Forms For You
                  </h2>

                  <p className="text-gray-500 ">
                    Apply for leave by filling in the form below and submitting
                    it to your department head. You will be notified of the
                    status of your application. And also, you can apply for a
                    loan by filling in the form below and submitting it to your
                    department head. You will be notified of the status of your
                    application.
                  </p>
                </div>
                {/* cards */}
                <div className=" mt-5 grid grid-cols-3 gap-5">
                  <a href="/dashboard/exam">
                    <SampleCards
                      title="Exam Duty Forms"
                      description="Go to this step by step guideline process on how to certify for your weekly benefits."
                    />{" "}
                  </a>
                  <SampleCards
                    title="Vehical Resevation Forms"
                    description="Go to this step by step guideline process on how to certify for your weekly benefits."
                  />{" "}
                  <SampleCards
                    title="Cleaning Service Forms"
                    description="Go to this step by step guideline process on how to certify for your weekly benefits."
                  />{" "}
                  <SampleCards
                    title="Paper Marking Forms"
                    description="Go to this step by step guideline process on how to certify for your weekly benefits."
                  />{" "}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
