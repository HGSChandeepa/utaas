import React, { useEffect, useState } from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import { getFirestore, doc, getDoc, getDocs } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiEdit } from "react-icons/ti";

import { FiDelete } from "react-icons/fi";

const Tasks = () => {
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

  ///fethch all forms from tthis user from the userFormType collection

  console.log(userForms[0]);

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
                {userForms.map((formData, index) => (
                  <div
                    key={index}
                    className="bg-white  p-4 rounded-lg shadow-md flex flex-row justify-between gap-3 mt-5 hover:bg-slate-100 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-101"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700 ">
                        Form Information {formData.formType}
                      </h3>

                      <div className=" flex gap-10 mt-3 ">
                        <p className="  bg-yellow-100 text-yellow-800   font-medium px-4 py-0.5 rounded-full text-md">
                          {formData.userData.firstName}{" "}
                          {formData.userData.lastName}
                        </p>
                        <p className="  bg-yellow-100 text-yellow-800   font-medium px-4 py-0.5 rounded-full text-md">
                          {formData.userData.email}{" "}
                        </p>
                        <p className="  bg-yellow-100 text-yellow-800   font-medium px-4 py-0.5 rounded-full text-md">
                          {formData.userData.department}{" "}
                        </p>
                      </div>
                      <div className=" mt-5">
                        <p className="pb-3 ">
                          <h2 className=" mb-3">applications form</h2>
                          {formData.selectedOption.map((option, index) => (
                            <span
                              className="  bg-blue-100 text-blue-800   font-medium px-4 py-0.5 rounded-full text-md"
                              key={index}
                            >
                              {option}
                            </span>
                          ))}
                        </p>
                        <hr />
                        <p className="mt-3">
                          Number Of Applicaions : {formData.numberOfApplication}{" "}
                        </p>
                        <p className=" mt-3 ">
                          Number Of Applicaions : {formData.numberOfSections}{" "}
                        </p>
                      </div>
                    </div>
                    <section>
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex gap-2">
                          <button className="bg-red-100 text-red-800 flex items-center gap-4   font-medium px-4 py-2 rounded-full text-md">
                            Delete <FiDelete />
                          </button>
                          <button className="bg-blue-100 text-blue-800 flex items-center gap-4   font-medium px-4 py-2 rounded-full text-md">
                            Edit <TiEdit />
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
