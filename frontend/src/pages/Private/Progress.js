import React, { useEffect, useState } from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import { auth } from "../../config/firebase_configure";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase_configure";
import "react-toastify/dist/ReactToastify.css";
import { getAllFormsByCurrentUser } from "../../services/progress/progress_exam_duty";

const Progress = () => {
  const [examDutyForms, setExamDutyForms] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);

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
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData) {
          const data = await getAllFormsByCurrentUser(userData.userEmail);
          setExamDutyForms(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [userData]);

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
                {examDutyForms.map((form, index) => {
                  return (
                    <div key={index} className=" p-5 bg-slate-100 mb-5">
                      <h1>{form.applicant_name}</h1>
                      <h1>{form.applicant_email}</h1>
                      <h1>{form.department}</h1>
                      <h1>{form.form_type}</h1>
                      <h1>
                        Form Submited Sucessfully:{" "}
                        <span className=" text-blue-500">
                          {form.edited_by_applicant.toString()}
                        </span>
                      </h1>
                      <br />
                      <h1>
                        Edited By the Firse Reviver {form.first_reciver_email}
                        <span className=" text-blue-500">
                          : {form.edited_by_first_reciver.toString()}
                        </span>
                      </h1>
                      <h1>
                        Edited By the Second Reviver {form.second_reciver_email}
                        :
                        <span className=" text-blue-500">
                          {form.edited_by_second_reciver.toString()}{" "}
                        </span>
                      </h1>

                      <br />

                      <h1>
                        Approved By the Firse Reviver {form.first_reciver_email}
                        <span className=" text-blue-500">
                          : {form.appvover_by_first_reciver.toString()}
                        </span>
                      </h1>
                      <h1>
                        Approved By the Second Reviver{" "}
                        {form.second_reciver_email}:
                        <span className=" text-blue-500">
                          {form.appvover_by_second_reciver.toString()}{" "}
                        </span>
                      </h1>

                      <br />

                      <h1>
                        Rejected By the Firse Reviver {form.first_reciver_email}
                        <span className=" text-blue-500">
                          : {form.rejected_by_first_reciver.toString()}
                        </span>
                      </h1>
                      <h1>
                        Rejected By the Second Reviver{" "}
                        {form.second_reciver_email}:
                        <span className=" text-blue-500">
                          {form.rejected_by_second_reciver.toString()}{" "}
                        </span>
                      </h1>
                      <a
                        href={`/dashboard/exam/${form.form_id}`}
                        className=" text-blue-800 mt-5  hover:underline hover:text-blue-500  font-semibold"
                      >
                        See the Full Form
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
