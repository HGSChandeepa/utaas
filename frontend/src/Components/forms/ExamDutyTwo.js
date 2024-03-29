import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase_configure";
import { TiEdit } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormComponentExamDutyTwo = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    duty: "",
    role: "",
    amount: "",
    department: "",
    form_type: "exam_duty",
  });

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
      !formData.time ||
      !formData.location ||
      !formData.duty ||
      !formData.role ||
      !formData.amount ||
      !formData.department
    ) {
      console.error("Please fill in all fields");
      return;
    }

    try {
      // Add the form data to Firestore
      const formsCollection = collection(firestore, "ExamDutyForms");
      await addDoc(formsCollection, formData);

      console.log("Form submitted with data:", formData);
      // add toast
      toast.success("New Form Added Successfully");
      // Optionally, you can reset the form data after submission
      setFormData({
        date: "",
        time: "",
        location: "",
        duty: "",
        role: "",
        amount: "",
        department: "",
        form_type: "ExamDutyForms",
      });
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div className="w-[500px] mx-auto mt-8 p-6 bg-gray-50 rounded-md shadow-md">
      <h2 className=" text-2xl font-semibold text-blue-600 border-b-4">
        Exam Duties
      </h2>
      <section className=" py-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex gap-2">
            {/* <button className="bg-red-100 text-red-800 flex items-center gap-4   font-medium px-4 py-2 rounded-full text-md">
                            Delete <FiDelete />
                          </button> */}
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
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="time"
          >
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
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
            Location
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
            Duty
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
            Role
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
            Amount
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

export default FormComponentExamDutyTwo;
