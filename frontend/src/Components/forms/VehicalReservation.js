import React, { useState } from "react";
import firebase, { firestore } from "../../config/firebase_configure";
import { collection, addDoc } from "firebase/firestore";

const FormComponentVehicleReservation = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    users: "",
    price: "",
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
      !formData.from ||
      !formData.to ||
      !formData.date ||
      !formData.time ||
      !formData.users ||
      !formData.price
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
        from: "",
        to: "",
        date: "",
        time: "",
        users: "",
        price: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className=" text-2xl font-semibold text-blue-600 border-b-4">
        Vehicle Reservation
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="from"
          >
            From
          </label>
          <input
            type="text"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="to"
          >
            To
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

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

        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="users"
          >
            Amount of Users
          </label>
          <input
            type="number"
            id="users"
            name="users"
            value={formData.users}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
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

export default FormComponentVehicleReservation;
