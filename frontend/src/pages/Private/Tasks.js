import React, { useEffect, useState } from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import { getFirestore, doc, getDoc, getDocs } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  console.log(userFormType);

  ///fethch all forms from tthis user from the userFormType collection

  useEffect(() => {
    const fetchUserForms = async () => {
      try {
        const db = getFirestore();
        const userFormsRef = collection(db, userFormType);
        const userFormsSnapshot = await getDocs(userFormsRef);

        userFormsSnapshot.forEach((doc) => {
          const userFormData = doc.data();

          //fetch all the forms for the user with the email
          if (userEmail === userFormData.userData.email) {
            console.log(userFormData);
            //insert the form data into the userForms state
            setUserForms((prev) => [...prev, userFormData]);
          }
        });

        setUserForms(userFormsSnapshot);
      } catch (error) {
        console.error("Error fetching user forms:", error);
      }
    };
    if (userFormType) {
      fetchUserForms();
    }
  }, [userFormType]);

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
            <div className="bg-yellow-100 text-yellow-800 w-36  font-medium px-2.5 py-0.5 rounded-full text-md">
              {userRole} Account
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
            <div className=" mt-5 grid grid-cols-3 gap-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
