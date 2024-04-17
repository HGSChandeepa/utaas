import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../../config/firebase_configure";
import SideBar from "../../Components/Sidebar/SideBar";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../config/firebase_configure";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

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
              console.log(userData);
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

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out successfully");
        toast.success("User signed out successfully");
        navigate("/"); // Redirect to the landing page after logout
      })
      .catch((error) => {
        toast.error("Error signing out:", error.message);
        console.error("Error signing out:", error.message);
      });
  };

  return (
    <div className="flex flex-row ml-10 mt-10">
      <div className="">
        <div className="place-items-start align-top items-center">
          <SideBar />
        </div>
        <div className=" text-black w-64 h-full p-4"></div>
      </div>

      <div className=" flex gap-10">
        <div className="container mx-auto py-8">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {userData ? (
              <>
                <h1 className="text-2xl mb-4">Welcome, {userData.userName}</h1>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
                  <p className="text-gray-700">{userData.userEmail}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Contact Number:
                  </label>
                  <p className="text-gray-700">{userData.contactNumber}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Department:
                  </label>
                  <p className="text-gray-700">{userData.department}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Role:
                  </label>
                  <p className="text-gray-700">{userData.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Log Out
                </button>
              </>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
