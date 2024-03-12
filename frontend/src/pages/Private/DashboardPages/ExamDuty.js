import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, getDocs } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../../../Components/Sidebar/SideBar";
import FormComponentExamDuty from "../../../Components/forms/ExamDuty";

function ExamDuty() {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userid, setUserId] = useState(null);
  const [userFormType, setUserFormType] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userForms, setUserForms] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        setUserId(userId);
        console.log(userId);
        const db = getFirestore();
        const userDataRef = doc(db, "users", userId);

        const userDataSnapshot = await getDoc(userDataRef);
        if (userDataSnapshot.exists()) {
          const userData = userDataSnapshot.data();
          setUserData(userData);
          setUserRole(userData.role);
          setUserFormType(userData.role + "forms");
          setUserEmail(userData.email);

          // Fetch user forms from a separate collection
          const userFormsCollectionRef = collection(
            db,
            "users",
            userId,
            "forms"
          );
          const userFormsSnapshot = await getDocs(userFormsCollectionRef);
          const userFormsData = userFormsSnapshot.docs.map((doc) => doc.data());
          setUserForms(userFormsData);

          console.log("User Data:", userData);
          console.log("User Forms:", userFormsData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div>
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
              <div>
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
