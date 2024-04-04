import React, { useEffect, useState } from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import { getFirestore, doc, getDoc, getDocs } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiEdit } from "react-icons/ti";

import { FiDelete } from "react-icons/fi";

const Progress = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userid, setUserId] = useState(null);
  const [userFormType, setUserFormType] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userForms, setUserForms] = useState([]);
  const [examDutyForms, setExamDutyForms] = useState([]);

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

          // Fetch user forms from "ExamDutyForms" collection
          const examDutyFormsCollectionRef = collection(db, "ExamDutyForms");
          const examDutyFormsSnapshot = await getDocs(
            examDutyFormsCollectionRef
          );
          const examDutyFormsData = examDutyFormsSnapshot.docs.map((doc) =>
            doc.data()
          );
          setExamDutyForms(examDutyFormsData);

          console.log(examDutyFormsData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  ///fethch all forms from tthis user from the userFormType collection

  console.log(userForms[0]);

  return (
    <div className="flex flex-row">
      
      <div>
        <div className="flex flex-row gap-10">
          <div>
            <div className="place-items-start align-top items-center">
              <SideBar />
            </div>
            
          </div>
          <div className="flex flex-col gap-5">
          <div className="bg-yellow-100 text-yellow-800 w-40 flex gap-2 font-medium px-4 py-0.5 rounded-full text-md">
              {userRole} <span>Account</span>
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
            </div>
            {/* cards */}
            <div className="flex flex-col gap-5">
              <div className=" w-[1200px]">
                {examDutyForms.map((form, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between items-center bg-slate-100 p-4 rounded-md shadow-md mb-7"
                  >
                    <div>
                      <div className="flex gap-2 ml-[900px]">
                        <button className="bg-red-100 text-red-800 flex items-center gap-4   font-medium px-4 py-2 rounded-full text-md">
                          Delete <FiDelete />
                        </button>
                      </div>
                      <h3 className="text-xl font-semibold text-yellow-500 mb-4">
                        {form.form_type}
                      </h3>
                      <p className="text-gray-500">
                        Applied Time : {form.time}
                      </p>
                      <p className="text-gray-500">
                        Applied Dates : {form.date}
                      </p>
                      <p className="text-gray-500">
                        Department : {form.department}
                      </p>

                      <hr />

                      <p className="text-blue-500 mt-5 text-lg font-semibold">
                        Form Applied By : {form.role}
                      </p>

                      <hr />
                      <div className=" mt-10 bg-slate-200 w-[1000px] p-5 rounded-lg border-2 border-yellow-400">
                        <h1 className="text-yellow-500 bg-yellow-100 px-5 py-2 rounded-full mt-5 text-lg font-semibold">
                          Progress Traccking <span>{form.form_type}</span> Form
                        </h1>

                        <div className=" mt-5">
                          <h1>show the status here...</h1>
                        </div>
                      </div>
                    </div>
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

export default Progress;
