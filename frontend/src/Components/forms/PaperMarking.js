import React, { useState } from "react";
import firebase, { firestore } from "../../config/firebase_configure";
import { collection, addDoc } from "firebase/firestore";

const FormComponentPaperMarking = () => {
  const [formData, setFormData] = useState({
    examModule: "",
    name: "",
    code: "",
    task: "",
    amount: "",
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
      !formData.examModule ||
      !formData.name ||
      !formData.code ||
      !formData.task ||
      !formData.amount
    ) {
      console.error("Please fill in all fields");
      return;
    }

    try {
      // Add the form data to Firestore
      const formsCollection = collection(firestore, "forms");
      await addDoc(formsCollection, formData);

      console.log("Form submitted with data:", formData);
      // Optionally, you can reset the form data after submission
      setFormData({
        examModule: "",
        name: "",
        code: "",
        task: "",
        amount: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className=" text-2xl font-semibold text-blue-600 border-b-4">
        Paper Marking
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="examModule"
          >
            Exam Module
          </label>
          <input
            type="text"
            id="examModule"
            name="examModule"
            value={formData.examModule}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="code"
          >
            Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="task"
          >
            Task
          </label>
          <select
            id="task"
            name="task"
            value={formData.task}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Task</option>
            <option value="1stInvigilator">1st Invigilator</option>
            <option value="2ndInvigilator">2nd Invigilator</option>
            <option value="moderator">Moderator</option>
          </select>
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

export default FormComponentPaperMarking;
