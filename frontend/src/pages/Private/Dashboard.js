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
  const [Loading, setLoading] = useState(true);

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

        setLoading(false);
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

      <div className="flex flex-col p-10">
        {Loading ? (
          <div role="status" class="max-w-sm animate-pulse">
            <div class="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>

            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="flex flex-col ">
            <div className="flex flex-row justify-between items-center">
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
        )}

        {/* applicable forms */}

        <div>
          <section className=" mt-6 ">
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
                <div className=" mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  <a href="/dashboard/exam">
                    <SampleCards
                      title="Exam Duty Forms"
                      description="Go to this step by step guideline process on how to certify for your weekly benefits."
                    />{" "}
                  </a>
                  <a href="/dashboard/paper">
                    <SampleCards
                      title="Paper Marking Forms"
                      description="Go to this step by step guideline process on how to certify for your weekly benefits."
                    />{" "}
                  </a>
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
