import React, { useEffect, useState } from "react";
import SideBar from "../../Components/Sidebar/SideBar";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import SampleCards from "../../Components/Cards/SampleCards";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        console.log(userId);
        const db = getFirestore();
        const userDataRef = doc(db, "users", userId);
        const userDataSnapshot = await getDoc(userDataRef);
        if (userDataSnapshot.exists()) {
          console.log(userDataSnapshot.data());
          setUserData(userDataSnapshot.data());
          setUserRole(userDataSnapshot.data().role);
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
    <div className="flex flex-row ">
      <div className="place-items-start align-top items-center">
        <SideBar />
      </div>


      <div className="p-5">
      <div className=" flex flex-col gap-10">
        <div className="flex justify-between gap-[500px] items-center">
          <div>
            {userData ? (
              <div className=" flex gap-3">
                <p className=" text-2xl text-gray-500">Hello</p>
                <p className=" text-2xl font-semibold text-blue-600">
                  {" "}
                  {userData.firstName}
                </p>
                <p className=" text-2xl font-semibold text-blue-600">
                  {userData.lastName}
                </p>
                <p className=" text-2xl text-gray-500"> Welcome Back!</p>
              </div>
            ) : (
              <span>Loading...</span>
            )}
          </div>
          <div>
            <div className="bg-yellow-100 text-yellow-800  font-medium px-2.5 py-0.5 rounded-full text-md">
              {userRole} Account
            </div>
          </div>
        </div>
      </div>
      {/* applicable forms */}

      <div>
        <section className=" mt-6 pr-20">
          <div className="flex flex-row gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-yellow-500 ">
                  Here Are Some Forms For You
                </h2>
                <p className="text-gray-500 ">
                  Apply for leave by filling in the form below and submitting it
                  to your department head. You will be notified of the status of
                  your application. And also, you can apply for a loan by
                  filling in the form below and submitting it to your department
                  head. You will be notified of the status of your application.
                </p>
              </div>
              {/* cards */}
              <div className=" mt-5 grid grid-cols-3 gap-5">
                <a href="/dashboard/exam">
                  <SampleCards
                    title="Exam Duty Forms"
                    description="Go to this step by step guideline process on how to certify for your weekly benefits."
                  />{" "}
                </a>
                <SampleCards
                  title="Vehical Resevation Forms"
                  description="Go to this step by step guideline process on how to certify for your weekly benefits."
                />{" "}
                <SampleCards
                  title="Cleaning Service Forms"
                  description="Go to this step by step guideline process on how to certify for your weekly benefits."
                />{" "}
                <SampleCards
                  title="Paper Marking Forms"
                  description="Go to this step by step guideline process on how to certify for your weekly benefits."
                />{" "}
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
