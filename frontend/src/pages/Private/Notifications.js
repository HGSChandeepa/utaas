import React, { useEffect, useState } from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import { auth } from "../../config/firebase_configure";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase_configure";
import "react-toastify/dist/ReactToastify.css";
import { getNotifications } from "../../services/progress/progress_exam_duty";

const Tasks = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [notifications, setNotifications] = useState([]);

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

  //get all the notifications for the current user
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData) {
          const data = await getNotifications(userData.userEmail);
          setNotifications(data);
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
            <div className="bg-yellow-100 text-yellow-800 w-fit flex gap-2 font-medium px-4 py-1 rounded-full text-md">
              {userData && userData.userName} <span>Account</span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 ">
                All Your Notifications are here and you can view them here and
                take action on them also you can view the status of the
                notifications.Feel free to take action on them.So that you can
                be able to view the status of the notifications.
              </p>
            </div>
            {/* cards */}
            <div className="flex flex-col gap-5">
              <div className=" w-[1200px]">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="bg-slate-100 shadow-md rounded-md p-4"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h1 className="text-lg">
                            {notification.formData.form_type}
                          </h1>
                          <p className="text-gray-500">
                            {notification.message}
                          </p>
                        </div>
                        <div>
                          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white shadow-md rounded-md p-4">
                    <h1 className="text-xl font-semibold text-center">
                      No Notifications
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
