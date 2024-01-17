const handleSubmitExamDuty = async (e) => {
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
    const formsCollection = collection(firestore, "forms");
    await addDoc(formsCollection, formData);

    console.log("Form submitted with data:", formData);
    // Optionally, you can reset the form data after submission
    setFormData({
      date: "",
      time: "",
      location: "",
      duty: "",
      role: "",
      amount: "",
      department: "",
    });
  } catch (error) {
    console.error("Error submitting form:", error.message);
  }
};

const handleSubmitPaperMarking = async (e) => {
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

const handleSubmitVehical = async (e) => {
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
