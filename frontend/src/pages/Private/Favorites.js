import React, { useEffect, useState } from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { TiEdit } from "react-icons/ti";
import "react-toastify/dist/ReactToastify.css";
import { firestore, auth } from "../../config/firebase_configure";
import { formImage } from "../../../src/assets/index";

const Tasks = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [frequentForms, setFrequentForms] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingForms, setLoadingForms] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const docRef = doc(firestore, "users", user.uid);
        getDoc(docRef)
          .then((doc) => {
            if (doc.exists()) {
              const userData = doc.data();
              setUserData(userData);
              setUserRole(userData.role);
              setUserEmail(userData.userEmail);
              console.log(userData.userEmail);
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.error("Error getting document:", error);
          })
          .finally(() => {
            setLoadingUser(false);
          });
      } else {
        setUserData(null);
        setLoadingUser(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userEmail) {
        const db = getFirestore();
        const formsRef = collection(db, "frequently_accessed_forms");
        const formsSnapshot = await getDocs(formsRef);
        const formsList = formsSnapshot.docs.map((doc) => doc.data());

        // get the forms that have the current user email
        const userForms = formsList.filter(
          (form) => form.formData.email === userEmail
        );

        setFrequentForms(userForms);
        setLoadingForms(false);
      }
    };

    fetchData();
  }, [userEmail]);

  return (
    <div className="flex flex-row w-full">
      <div className="place-items-start align-top items-center">
        <SideBar />
      </div>
      <div className="flex-grow p-4">
        {loadingUser ? (
          <div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="flex flex-col">
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
        <section>
          <div className="mt-6">
            <div className="flex flex-row justify-between items-center">
              <div>
                <div className="font-medium px-2.5 py-0.5 rounded-full text-md bg-blue-100 text-blue-800">
                  Frequent Forms
                </div>
              </div>
            </div>
            <div className="mt-4">
              {loadingForms ? (
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className="">
                  {frequentForms.map((form, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-lg p-4 my-5"
                    >
                      <div className="flex flex-row justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {form.form_name}
                          </h3>
                        </div>
                        <div>
                          <TiEdit className="text-blue-500 text-xl" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 my-5">
                          {form.formData.email}
                        </p>
                        <p className="text-sm text-gray-500">
                          {form.form_description}
                        </p>
                        <a
                          href={
                            form.formData.form_type === "exam_duty"
                              ? `/dashboard/exam`
                              : `/dashboard/paper`
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4">
                            View Form
                          </button>
                        </a>
                      </div>
                    </div>
                  ))}
                  {frequentForms.length === 0 && (
                    <div className="bg-white flex flex-col items-center justify-center rounded-md p-4">
                      <img
                        src={formImage}
                        alt="notifications"
                        className="w-[400px]"
                      />
                      <h1 className="text-md font-normal text-center opacity-40">
                        No Frequent Forms Found Feel free to add some!
                      </h1>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tasks;
