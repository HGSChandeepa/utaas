import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, firestore } from "../../../config/firebase_configure";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const FormComponentPaperMarking = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    form_type: "paper_marking",
    voucherNumber: "",
    date: "",
    financialYear: "",
    voteLedgerFolio: "",
    feesLedgerFolio: "",
    resultsBoardDate: "",
    upfNo: "",
    name: "",
    email: "",
    subject: "",
    examinerName: "",
    address: "",
    tableEntries: [
      {
        title: "",
        settingDuration: "",
        settingNumberOfPapers: "",
        settingAmount: "",
        markingDuration: "",
        markingNumberOfPapers: "",
        markingAmount: "",
        assessingDuration: "",
        assessingNumberOfPapers: "",
        assessingAmount: "",
      },
    ],
    totalAmount: 0,
    isDataTrue: false,
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
    calculateTotal(newTableEntries);
  };

  const calculateTotal = (entries) => {
    const total = entries.reduce(
      (sum, entry) =>
        sum +
        parseFloat(entry.settingAmount || 0) +
        parseFloat(entry.markingAmount || 0) +
        parseFloat(entry.assessingAmount || 0),
      0
    );
    setFormData((prevData) => ({
      ...prevData,
      totalAmount: total,
    }));
  };

  const addTableRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      tableEntries: [
        ...prevData.tableEntries,
        {
          title: "",
          settingDuration: "",
          settingNumberOfPapers: "",
          settingAmount: "",
          markingDuration: "",
          markingNumberOfPapers: "",
          markingAmount: "",
          assessingDuration: "",
          assessingNumberOfPapers: "",
          assessingAmount: "",
        },
      ],
    }));
  };

  const removeTableRow = (index) => {
    const newTableEntries = formData.tableEntries.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      tableEntries: newTableEntries,
    }));
    calculateTotal(newTableEntries);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.voucherNumber ||
      !formData.date ||
      !formData.financialYear ||
      !formData.voteLedgerFolio ||
      !formData.feesLedgerFolio ||
      !formData.resultsBoardDate ||
      !formData.upfNo ||
      !formData.name ||
      !formData.subject ||
      !formData.examinerName ||
      !formData.address ||
      !formData.isDataTrue
    ) {
      toast.error("Please fill in all fields and confirm the data is true");
      return;
    }

    try {
      const docRef = await addDoc(
        collection(firestore, "paper_marking"),
        formData
      );
      await updateDoc(doc(firestore, "paper_marking", docRef.id), {
        form_id: docRef.id,
      });

      toast.success("Form submitted successfully");
      // Optionally reset the form
      setFormData({
        voucherNumber: "",
        date: "",
        financialYear: "",
        voteLedgerFolio: "",
        feesLedgerFolio: "",
        resultsBoardDate: "",
        upfNo: "",
        name: "",
        subject: "",
        examinerName: "",
        address: "",
        tableEntries: [
          {
            title: "",
            settingDuration: "",
            settingNumberOfPapers: "",
            settingAmount: "",
            markingDuration: "",
            markingNumberOfPapers: "",
            markingAmount: "",
            assessingDuration: "",
            assessingNumberOfPapers: "",
            assessingAmount: "",
          },
        ],
        totalAmount: 0,
        isDataTrue: false,
      });
    } catch (error) {
      toast.error("Error submitting form: " + error.message);
    }
  };

  return (
    <div className="w-[1000px] mx-auto mt-8 p-6 bg-gray-300 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-blue-600 border-b-4 mb-4">
        Paper Marking Payments
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
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
          <div>
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
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="financialYear"
            >
              Financial Year
            </label>
            <input
              type="text"
              id="financialYear"
              name="financialYear"
              value={formData.financialYear}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="voteLedgerFolio"
            >
              Vote Ledger Folio
            </label>
            <input
              type="text"
              id="voteLedgerFolio"
              name="voteLedgerFolio"
              value={formData.voteLedgerFolio}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="feesLedgerFolio"
            >
              Fees Ledger Folio
            </label>
            <input
              type="text"
              id="feesLedgerFolio"
              name="feesLedgerFolio"
              value={formData.feesLedgerFolio}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="resultsBoardDate"
            >
              Results Board Date
            </label>
            <input
              type="date"
              id="resultsBoardDate"
              name="resultsBoardDate"
              value={formData.resultsBoardDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label
              className="block text-gray-600 font-semibold mb-2"
              htmlFor="upfNo"
            >
              UPF No
            </label>
            <input
              type="text"
              id="upfNo"
              name="upfNo"
              value={formData.upfNo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
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
            htmlFor="name"
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
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="examinerName"
          >
            Name of Examiner
          </label>
          <input
            type="text"
            id="examinerName"
            name="examinerName"
            value={formData.examinerName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Fill the table accordingly
        </h3>
        {formData.tableEntries.map((entry, index) => (
          <div key={index} className="mb-4 border p-4 rounded-md bg-gray-200">
            <div className="mb-4">
              <label
                className="block text-gray-600 font-semibold mb-2"
                htmlFor={`title-${index}`}
              >
                Title of Paper
              </label>
              <input
                type="text"
                id={`title-${index}`}
                name="title"
                value={entry.title}
                onChange={(e) => handleTableChange(index, e)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <h4 className="font-semibold">
              Fee for Setting/Moderating & Translating of Paper
            </h4>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label
                  className="block text-gray-600 font-semibold mb-2"
                  htmlFor={`settingDuration-${index}`}
                >
                  Duration
                </label>
                <input
                  type="text"
                  id={`settingDuration-${index}`}
                  name="settingDuration"
                  value={entry.settingDuration}
                  onChange={(e) => handleTableChange(index, e)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 font-semibold mb-2"
                  htmlFor={`settingNumberOfPapers-${index}`}
                >
                  Number of Papers
                </label>
                <input
                  type="number"
                  id={`settingNumberOfPapers-${index}`}
                  name="settingNumberOfPapers"
                  value={entry.settingNumberOfPapers}
                  onChange={(e) => handleTableChange(index, e)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 font-semibold mb-2"
                  htmlFor={`settingAmount-${index}`}
                >
                  Amount to be Paid
                </label>
                <input
                  type="number"
                  id={`settingAmount-${index}`}
                  name="settingAmount"
                  value={entry.settingAmount}
                  onChange={(e) => handleTableChange(index, e)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <h4 className="font-semibold">Fee for Marking Scripts</h4>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label
                  className="block text-gray-600 font-semibold mb-2"
                  htmlFor={`markingDuration-${index}`}
                >
                  Duration
                </label>
                <input
                  type="text"
                  id={`markingDuration-${index}`}
                  name="markingDuration"
                  value={entry.markingDuration}
                  onChange={(e) => handleTableChange(index, e)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 font-semibold mb-2"
                  htmlFor={`markingNumberOfPapers-${index}`}
                >
                  Number of Papers
                </label>
                <input
                  type="number"
                  id={`markingNumberOfPapers-${index}`}
                  name="markingNumberOfPapers"
                  value={entry.markingNumberOfPapers}
                  onChange={(e) => handleTableChange(index, e)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 font-semibold mb-2"
                  htmlFor={`markingAmount-${index}`}
                >
                  Amount to be Paid
                </label>
                <input
                  type="number"
                  id={`markingAmount-${index}`}
                  name="markingAmount"
                  value={entry.markingAmount}
                  onChange={(e) => handleTableChange(index, e)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <h4 className="font-semibold">
              Fee for Assessing Practical/Clinical/Oral
            </h4>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label
                  className="block text-gray-600 font-semibold mb-2"
                  htmlFor={`assessingDuration-${index}`}
                >
                  Duration
                </label>
                <input
                  type="text"
                  id={`assessingDuration-${index}`}
                  name="assessingDuration"
                  value={entry.assessingDuration}
                  onChange={(e) => handleTableChange(index, e)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 font-semibold mb-2"
                  htmlFor={`assessingNumberOfPapers-${index}`}
                >
                  Number of Papers
                </label>
                <input
                  type="number"
                  id={`assessingNumberOfPapers-${index}`}
                  name="assessingNumberOfPapers"
                  value={entry.assessingNumberOfPapers}
                  onChange={(e) => handleTableChange(index, e)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 font-semibold mb-2"
                  htmlFor={`assessingAmount-${index}`}
                >
                  Amount to be Paid
                </label>
                <input
                  type="number"
                  id={`assessingAmount-${index}`}
                  name="assessingAmount"
                  value={entry.assessingAmount}
                  onChange={(e) => handleTableChange(index, e)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
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

        {/* total */}
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
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            disabled
          />
        </div>

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
