import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../../../Components/Sidebar/SideBar";
import FormComponentExamDuty from "../../../Components/forms/exam_duty/ExamDuty";
import { auth } from "../../../config/firebase_configure";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../config/firebase_configure";
import { uorLogo } from "../../../assets/index";

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

              <div className=" flex p-6 items-center justify-center gap-7">
                <div>
                  <img src={uorLogo} alt="uni logo" className="w-0 md:w-32" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-yellow-500 ">
                    Exam Duty payment form from University Of Ruhuna
                  </h2>
                  <p className="text-gray-500 ">
                    Please fill the form below to pay the exam duty fee and
                    submit the you can track the status of your payment and get
                    the receipt from the dashboard for this please visite the
                    progress page, Thank you.
                  </p>
                </div>
              </div>
              <div className="p-5 md:px-20 lg:px-28">
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
