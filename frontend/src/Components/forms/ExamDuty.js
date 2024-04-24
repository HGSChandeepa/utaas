import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { TiEdit } from "react-icons/ti";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../config/firebase_configure";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase_configure";
import { useNavigate } from "react-router-dom";

const FormComponentExamDuty = () => {
  //navigation
  const navigate = useNavigate();
  //fetch the user data
  const [userData, setUserData] = useState(null);

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

  //form data
  const [formData, setFormData] = useState({
    date: "",
    location: "",
    applicant_name: userData && userData.userName,
    applicant_email: userData && userData.userEmail,
    no_of_steps: 3,
    visible_to: ["Lecturer", "HOD", "Instructor"],
    form_type: "exam_duty",
    edited_by_first_reciver: false,
    edited_by_second_reciver: false,
    edited_by_third_reciver: false,
    current_step: 1,
    first_reciver_email: "rajitha@eie.ruh.ac.lk",
    second_reciver_email: "admin123@gmail.com",
    first_reciver_role: "HOD",
    second_reciver_role: "Admin",
    duty: "",
    role: "",
    amount: "",
    department: "",
  });
  //include user name and email in the form data
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      applicant_name: userData && userData.userName,
      applicant_email: userData && userData.userEmail,
      no_of_steps: 3,
      visible_to: ["Lecturer", "HOD", "Instructor"],
      form_type: "exam_duty",
      edited_by_first_reciver: true,
      edited_by_second_reciver: false,
      edited_by_third_reciver: false,
      current_step: 2,
      first_reciver_email: "rajitha@eie.ruh.ac.lk",
      second_reciver_email: "admin123@gmail.com",
      first_reciver_role: "HOD",
      second_reciver_role: "Admin",
    }));
  }, [userData]);

  //handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.date ||
      !formData.location ||
      !formData.duty ||
      !formData.role ||
      !formData.amount ||
      !formData.department
    ) {
      console.error("Please fill in all fields");
      // add toast
      toast.error("Please fill in all fields");
      return;
    }

    try {
      console.log("Form submitted with data:", formData);
      //store the form data in the firestore under the collection name exam_duty
      const docRef = await addDoc(collection(firestore, "exam_duty"), formData);
      console.log("Document written with ID: ", docRef.id);
      // add toast
      toast.success("Form submitted successfully");

      //navigate to the dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      // add toast
      toast.error("Error submitting form: " + error.message);
    }
  };

  return (
    <div className="w-[1000px] mx-auto my-8 p-6 bg-slate-100 rounded-md   border-2">
      <h2 className=" text-2xl font-semibold text-blue-600 border-b-4">
        Exam Duties
      </h2>
      <p className=" my-8 text-slate-500">
        This form is submitted by Admin and please fill this form before 2 days
        ( 48 hours). Exam duty form is used to apply for exam duty. Please fill
        in the form.
      </p>

      <div className=" my-5 bg-slate-300 p-4 rounded-full cursor-pointer">
        <ol class="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
          <li class="flex items-center text-blue-600 dark:text-blue-500 space-x-2.5 rtl:space-x-reverse">
            <span class="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
              1
            </span>
            <span>
              <h3 class="font-medium leading-tight">User info</h3>
              <p class="text-sm">Step details here</p>
            </span>
          </li>
          <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
            <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              2
            </span>
            <span>
              <h3 class="font-medium leading-tight">HOD review</h3>
              <p class="text-sm">Second approval</p>
            </span>
          </li>
          <li class="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5 rtl:space-x-reverse">
            <span class="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
              3
            </span>
            <span>
              <h3 class="font-medium leading-tight">Admin Finalization</h3>
              <p class="text-sm">Final Step</p>
            </span>
          </li>
        </ol>
      </div>
      <section className=" py-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex gap-2">
            <button className="bg-yellow-100 text-yellow-800 flex items-center gap-4   font-medium px-4 py-2 rounded-full text-md">
              Add In To Favourites <TiEdit />
            </button>
          </div>
        </div>
      </section>
      <form onSubmit={handleSubmit}>
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
            value={userData && userData.userName}
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
            value={userData && userData.userEmail}
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
  );
};

export default FormComponentExamDuty;
