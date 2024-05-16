import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../../../Components/Sidebar/SideBar";
import FormComponentExamDuty from "../../../Components/forms/exam_duty/ExamDuty";
import FormComponentExamDutyTwo from "../../../Components/forms/exam_duty/ExamDutyTwo";
import { auth } from "../../../config/firebase_configure";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../config/firebase_configure";

function ExamDuty() {
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

  return (
    <div>
      <div className="flex flex-row ">
        <div className="place-items-start align-top items-center">
          <SideBar />
        </div>
        <div>
          <div className="flex flex-col gap-10 p-4">
            <div className="flex flex-col gap-2">
              <div className="bg-yellow-100 text-yellow-800 w-40 flex gap-2 font-medium px-4 py-0.5 rounded-full text-md">
                {userRole} <span>Account</span>
              </div>
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
              <div className="grid grid-cols-2">
                <FormComponentExamDuty />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamDuty;
