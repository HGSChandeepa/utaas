import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../../../Components/Sidebar/SideBar";
import { auth } from "../../../config/firebase_configure";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../../config/firebase_configure";
import { toast } from "react-toastify";
import {
  editedBySecondReviewerService,
  editedByFirstReviewerService,
} from "../../../services/progress/progress_exam_duty";

function ExamDutyById() {
  const { examFormId } = useParams();
  console.log(examFormId);

  // State for form data
  const [formData, setFormData] = useState({
    date: "",
    department: "",
    location: "",
    duty: "",
    role: "",
    amount: "",
  });

  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [abletoEdit, setAbleToEdit] = useState(false);

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

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If the user is able to edit the form, update the form data in the firestore
    if (abletoEdit) {
      try {
        const docRef = doc(firestore, "exam_duty", examFormId);
        await setDoc(docRef, formData);

        // Call the appropriate service based on the user's role
        if (
          userData &&
          userData.userEmail.trim() === formData.first_reciver_email.trim()
        ) {
          await editedByFirstReviewerService(examFormId);
        }
        if (
          userData &&
          userData.userEmail.trim() === formData.second_reciver_email.trim()
        ) {
          await editedBySecondReviewerService(examFormId);
        }

        console.log("Form data updated successfully");
        // Show a toast message
        toast.success("Form data updated successfully");
      } catch (error) {
        console.error("Error updating document:", error);
        // Show an error toast message
        toast.error("Error updating form data");
      }
    } else {
      console.log("You can't edit this form");
      // Show a toast message
      toast.error("You can't edit this form");
    }
  };

  //get the form data by the form id
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (examFormId) {
          const docRef = doc(firestore, "exam_duty", examFormId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const formData = docSnap.data();
            setFormData(formData);

            // Check if the user has permission to edit the form
            if (userData && userData.userEmail === formData.applicant_email) {
              setAbleToEdit(false); // User can edit the form
            } else if (
              userData &&
              userData.userEmail === formData.first_reciver_email &&
              formData.edited_by_second_reciver
            ) {
              setAbleToEdit(false); // Form already edited by second receiver
            } else {
              setAbleToEdit(true); // Default to not able to edit
            }
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [examFormId, userData]);

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
            <div className="flex flex-col gap-2 overflow-hidden">
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

              <section className="my-5">
                {abletoEdit ? (
                  <h2 className="text-md font-semibold text-green-500 w-fit p-2 px-3  bg-green-100 rounded-full">
                    You are able to Edit
                  </h2>
                ) : (
                  <h2 className="text-md font-semibold text-red-500 w-fit p-2 px-3  bg-red-100 rounded-full">
                    You are not able to Edit
                  </h2>
                )}
              </section>
              <div className="grid grid-cols-2">
                <form
                  onSubmit={handleSubmit}
                  className=" mb-5 border-2 p-10 rounded-lg border-gray-200 bg-slate-50 "
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-600 font-semibold mb-2"
                      htmlFor="date"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      //defaultValue as now"

                      className=" px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <select
                      className="border rounded-full py-2 px-3 mb-4 text-grey-darker w-72"
                      defaultValue=""
                      onChange={handleChange}
                      name="department"
                      value={formData.department}
                    >
                      <option value="" disabled>
                        Select Department
                      </option>
                      <option value="Civil">CEE</option>
                      <option value="Electrical">EIE</option>
                      <option value="Mechanical">MME</option>
                      <option value="IS">IS</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-600 font-semibold mb-2"
                      htmlFor="location"
                    >
                      Applicant Name
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData && formData.applicant_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-600 font-semibold mb-2"
                      htmlFor="location"
                    >
                      Applicant Email
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData && formData.applicant_email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-600 font-semibold mb-2"
                      htmlFor="location"
                    >
                      Application For
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-600 font-semibold mb-2"
                      htmlFor="duty"
                    >
                      Possible Time and Date
                    </label>
                    <input
                      type="text"
                      id="duty"
                      name="duty"
                      value={formData.duty}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-600 font-semibold mb-2"
                      htmlFor="role"
                    >
                      Applying Position
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-600 font-semibold mb-2"
                      htmlFor="amount"
                    >
                      No Of Days
                    </label>
                    <input
                      type="text"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamDutyById;
