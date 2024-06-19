import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, firestore } from "../../../config/firebase_configure";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const FormComponentExamDuty = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    form_type: "exam_duty",
    voucherNumber: "",
    date: "",
    currencyType: "",
    noOfCheques: "",
    name: "",
    email: "",
    post: "",
    reservedAddress: "",
    examinationName: "",
    examinationHall: "",
    completedExamDuty: "",
    tableEntries: [{ date: "", startTime: "", endTime: "", amountToBePaid: 0 }],
    isDataTrue: false,
    totalAmount: 0,
    first_reciver_email: "rajitha@eie.ruh.ac.lk",
    second_reciver_email: "devikar@is.ruh.ac.lk",
    first_reciver_role: "HOD",
    second_reciver_role: "Admin",
    edited_by_applicant: true,
    edited_by_first_reciver: false,
    edited_by_second_reciver: false,
    appvover_by_first_reciver: false,
    appvover_by_second_reciver: false,
    rejected_by_first_reciver: false,
    rejected_by_second_reciver: false,
    current_step: 1,
    no_of_steps: 3,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const docRef = doc(firestore, "users", user.uid);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setUserData(userData);
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

  useEffect(() => {
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        name: userData.userName,
        email: userData.userEmail,
        current_step: 2,
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTableChange = (index, e) => {
    const { name, value } = e.target;
    const newTableEntries = formData.tableEntries.map((entry, i) => {
      if (i === index) {
        return { ...entry, [name]: value };
      }
      return entry;
    });
    setFormData((prevData) => ({
      ...prevData,
      tableEntries: newTableEntries,
    }));
  };

  const addTableRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      tableEntries: [
        ...prevData.tableEntries,
        { date: "", startTime: "", endTime: "", amountToBePaid: 0 },
      ],
    }));
  };

  const removeTableRow = (index) => {
    const newTableEntries = formData.tableEntries.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      tableEntries: newTableEntries,
    }));
  };

  const calculateTotalAmount = () => {
    const total = formData.tableEntries.reduce(
      (sum, entry) => sum + parseFloat(entry.amountToBePaid || 0),
      0
    );
    setFormData((prevData) => ({
      ...prevData,
      totalAmount: total,
    }));
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [formData.tableEntries]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.voucherNumber ||
      !formData.date ||
      !formData.currencyType ||
      !formData.noOfCheques ||
      !formData.name ||
      !formData.email ||
      !formData.post ||
      !formData.reservedAddress ||
      !formData.examinationName ||
      !formData.examinationHall ||
      !formData.completedExamDuty ||
      !formData.isDataTrue
    ) {
      toast.error("Please fill in all fields and confirm the data is true");
      return;
    }

    try {
      const docRef = await addDoc(collection(firestore, "exam_duty"), formData);
      await updateDoc(doc(firestore, "exam_duty", docRef.id), {
        form_id: docRef.id,
      });

      toast.success("Form submitted successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error submitting form: " + error.message);
    }
  };

  return (
    <div className="w-[1000px] mx-auto my-8 p-6 bg-slate-300 rounded-md border-2">
      <h2 className="text-2xl font-semibold text-blue-600 border-b-4">
        Exam Duties
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="voucherNumber"
          >
            Voucher Number
          </label>
          <input
            type="text"
            id="voucherNumber"
            name="voucherNumber"
            value={formData.voucherNumber}
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
            htmlFor="currencyType"
          >
            Currency Type
          </label>
          <input
            type="text"
            id="currencyType"
            name="currencyType"
            value={formData.currencyType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="noOfCheques"
          >
            No. Of Cheques
          </label>
          <input
            type="number"
            id="noOfCheques"
            name="noOfCheques"
            value={formData.noOfCheques}
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
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="post"
          >
            Post
          </label>
          <input
            type="text"
            id="post"
            name="post"
            value={formData.post}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="reservedAddress"
          >
            The Reserved Address
          </label>
          <input
            type="text"
            id="reservedAddress"
            name="reservedAddress"
            value={formData.reservedAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="examinationName"
          >
            Examination Name
          </label>
          <input
            type="text"
            id="examinationName"
            name="examinationName"
            value={formData.examinationName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="examinationHall"
          >
            Examination Hall
          </label>
          <input
            type="text"
            id="examinationHall"
            name="examinationHall"
            value={formData.examinationHall}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="completedExamDuty"
          >
            Completed Exam Duty
          </label>
          <input
            type="text"
            id="completedExamDuty"
            name="completedExamDuty"
            value={formData.completedExamDuty}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Fill the table accordingly
        </h3>
        {formData.tableEntries.map((entry, index) => (
          <div key={index} className="mb-4 border p-4 rounded-md">
            <div className="flex justify-between items-center">
              <label
                className="block text-gray-600 font-semibold mb-2"
                htmlFor={`date-${index}`}
              >
                Date
              </label>
              <input
                type="date"
                id={`date-${index}`}
                name="date"
                value={entry.date}
                onChange={(e) => handleTableChange(index, e)}
                className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <label
                className="block text-gray-600 font-semibold mb-2"
                htmlFor={`startTime-${index}`}
              >
                Start Time
              </label>
              <input
                type="time"
                id={`startTime-${index}`}
                name="startTime"
                value={entry.startTime}
                onChange={(e) => handleTableChange(index, e)}
                className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <label
                className="block text-gray-600 font-semibold mb-2"
                htmlFor={`endTime-${index}`}
              >
                End Time
              </label>
              <input
                type="time"
                id={`endTime-${index}`}
                name="endTime"
                value={entry.endTime}
                onChange={(e) => handleTableChange(index, e)}
                className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <label
                className="block text-gray-600 font-semibold mb-2"
                htmlFor={`amountToBePaid-${index}`}
              >
                Amount to be Paid
              </label>
              <input
                type="number"
                id={`amountToBePaid-${index}`}
                name="amountToBePaid"
                value={entry.amountToBePaid}
                onChange={(e) => handleTableChange(index, e)}
                className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => removeTableRow(index)}
              className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTableRow}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray"
        >
          New+
        </button>

        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDataTrue"
              name="isDataTrue"
              checked={formData.isDataTrue}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="isDataTrue" className="text-gray-600">
              I hereby promise these amounts are true and the details I entered
              are true.
            </label>
          </div>
        </div>

        <div className="mt-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="totalAmount"
          >
            Total Amount
          </label>
          <input
            type="number"
            id="totalAmount"
            name="totalAmount"
            value={formData.totalAmount}
            readOnly
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-200"
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
