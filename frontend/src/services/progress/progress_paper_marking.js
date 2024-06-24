import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { firestore } from "../../config/firebase_configure";

// Function to get all the paper marking docs in the Firestore collection paper_marking, store them in an array, and return the array
export const getPaperMarkingForms = async () => {
  const paperMarkingForms = [];
  const paperMarkingFormsCollection = collection(firestore, "paper_marking");
  const paperMarkingFormsSnapshot = await getDocs(paperMarkingFormsCollection);
  paperMarkingFormsSnapshot.forEach((doc) => {
    paperMarkingForms.push(doc.data());
  });
  return paperMarkingForms;
};

// Function to get all the forms where the first reviewer is the current user by the email
export const getFirstReviewerPaperMarkingForms = async (email) => {
  const paperMarkingForms = [];
  const paperMarkingFormsCollection = collection(firestore, "paper_marking");
  const paperMarkingFormsSnapshot = await getDocs(paperMarkingFormsCollection);
  paperMarkingFormsSnapshot.forEach((doc) => {
    const formData = doc.data();
    console.log(email, formData.first_reciver_email);

    if (
      formData &&
      formData.email &&
      formData.first_reciver_email.trim() === email.trim()
    ) {
      paperMarkingForms.push(doc.data());
    }
  });

  console.log(paperMarkingForms);

  return paperMarkingForms;
};

// Function to get all the forms where the second reviewer is the current user by the email
export const getSecondReviewerPaperMarkingForms = async (email) => {
  const paperMarkingForms = [];
  const paperMarkingFormsCollection = collection(firestore, "paper_marking");
  const paperMarkingFormsSnapshot = await getDocs(paperMarkingFormsCollection);
  paperMarkingFormsSnapshot.forEach((doc) => {
    const formData = doc.data();

    if (
      formData &&
      formData.email &&
      formData.second_reciver_email.trim() === email.trim()
    ) {
      paperMarkingForms.push(doc.data());
    }
  });

  return paperMarkingForms;
};

// Function to get all the forms submitted by the current user
export const getAllPaperMarkingFormsByCurrentUser = async (email) => {
  const paperMarkingForms = [];
  console.log(email);
  const paperMarkingFormsCollection = collection(firestore, "paper_marking");
  const paperMarkingFormsSnapshot = await getDocs(paperMarkingFormsCollection);
  paperMarkingFormsSnapshot.forEach((doc) => {
    const formData = doc.data();

    console.log(formData);

    if (formData && formData.email && formData.email.trim() === email.trim()) {
      paperMarkingForms.push(formData);
    }

    console.log(paperMarkingForms);
  });

  return paperMarkingForms;
};

// Method to get the form by the form id
export const getPaperMarkingFormById = async (formId) => {
  const paperMarkingFormRef = doc(
    collection(firestore, "paper_marking"),
    formId
  );
  const paperMarkingFormDoc = await getDoc(paperMarkingFormRef);

  if (paperMarkingFormDoc.exists()) {
    return paperMarkingFormDoc.data();
  } else {
    console.log("Form not found for the specified form ID.");
  }
};

// Method to approve by the first reviewer
export const approveFirstReviewerServicePaperMarking = async (formId) => {
  const paperMarkingFormRef = doc(
    collection(firestore, "paper_marking"),
    formId
  );
  const paperMarkingFormDoc = await getDoc(paperMarkingFormRef);

  if (paperMarkingFormDoc.exists()) {
    await setDoc(
      paperMarkingFormDoc.ref,
      { appvover_by_first_reciver: true, current_step: 3 },
      { merge: true }
    );

    // Create a new document in the "notifications" collection
    try {
      const notificationRef = collection(firestore, "notifications");
      await addDoc(notificationRef, {
        message: `This form ${formId} has been approved by the first reviewer.The form is now in the second reviewer's queue. and will be reviewed soon. If you have any questions, please contact the reviewer directly.`,
        editedBy: paperMarkingFormDoc.data().first_reciver_email,
        role: paperMarkingFormDoc.data().first_reciver_role,
        formData: paperMarkingFormDoc.data(), // Add form data to the notification
        timestamp: new Date(),
        typeof: "approved",
        form_type: "Paper Marking Payment Form",
      });
    } catch (error) {
      console.error("Error adding notification document: ", error);
    }

    console.log("Form approved by the first reviewer.");
  } else {
    console.log("Form not found for the specified form ID.");
  }
};

// Method to approve by the second reviewer
export const approveSecondReviewerServicePaperMarking = async (formId) => {
  const paperMarkingFormRef = doc(
    collection(firestore, "paper_marking"),
    formId
  );
  const paperMarkingFormDoc = await getDoc(paperMarkingFormRef);

  if (paperMarkingFormDoc.exists()) {
    await setDoc(
      paperMarkingFormDoc.ref,
      { appvover_by_second_reciver: true, current_step: 4 },
      { merge: true }
    );

    // Create a new document in the "notifications" collection
    try {
      const notificationRef = collection(firestore, "notifications");
      await addDoc(notificationRef, {
        message: `This form ${formId} has been approved by the second reviewer.The form is now in the second reviewer's queue. and will be reviewed soon. If you have any questions, please contact the reviewer directly.`,
        editedBy: paperMarkingFormDoc.data().second_reciver_email,
        role: paperMarkingFormDoc.data().second_reciver_role,
        formData: paperMarkingFormDoc.data(), // Add form data to the notification
        timestamp: new Date(),
        typeof: "approved",
        form_type: "Paper Marking Payment Form",
      });
    } catch (error) {
      console.error("Error adding notification document: ", error);
    }

    console.log("Form approved by the second reviewer.");
  } else {
    console.log("Form not found for the specified form ID.");
  }
};

// Method to reject by the first reviewer and send notification to the applicant
export const rejectFirstReviewerServicePaperMarking = async (formId) => {
  const paperMarkingFormRef = doc(
    collection(firestore, "paper_marking"),
    formId
  );
  const paperMarkingFormDoc = await getDoc(paperMarkingFormRef);

  if (paperMarkingFormDoc.exists()) {
    await setDoc(
      paperMarkingFormDoc.ref,
      {
        appvover_by_first_reciver: false,
        rejected_by_first_reciver: true,
        current_step: 3,
      },
      { merge: true }
    );

    // Create a new document in the "notifications" collection
    try {
      const notificationRef = collection(firestore, "notifications");
      await addDoc(notificationRef, {
        message: `This form ${formId} has been rejected by the second reviewer.The form is now in the second reviewer's queue. and will be reviewed soon. If you have any questions, please contact the reviewer directly.`,
        editedBy: paperMarkingFormDoc.data().first_reciver_email,
        role: paperMarkingFormDoc.data().first_reciver_role,
        formData: paperMarkingFormDoc.data(), // Add form data to the notification
        timestamp: new Date(),
        typeof: "rejected",
        form_type: "Paper Marking Payment Form",
      });
    } catch (error) {
      console.error("Error adding notification document: ", error);
    }

    console.log("Form rejected by the first reviewer.");
  } else {
    console.log("Form not found for the specified form ID.");
  }
};

// Method to reject by the second reviewer and send notification to the applicant
export const rejectSecondReviewerServicePaperMarking = async (formId) => {
  const paperMarkingFormRef = doc(
    collection(firestore, "paper_marking"),
    formId
  );
  const paperMarkingFormDoc = await getDoc(paperMarkingFormRef);

  if (paperMarkingFormDoc.exists()) {
    await setDoc(
      paperMarkingFormDoc.ref,
      {
        appvover_by_second_reciver: false,
        rejected_by_second_reciver: true,
        current_step: 4,
      },
      { merge: true }
    );

    // Create a new document in the "notifications" collection
    try {
      const notificationRef = collection(firestore, "notifications");
      await addDoc(notificationRef, {
        message: `This form ${formId} has been rejected by the second reviewer.The form is now in the second reviewer's queue. and will be reviewed soon. If you have any questions, please contact the reviewer directly.`,
        editedBy: paperMarkingFormDoc.data().second_reciver_email,
        role: paperMarkingFormDoc.data().second_reciver_role,
        formData: paperMarkingFormDoc.data(), // Add form data to the notification
        timestamp: new Date(),
        typeof: "rejected",
        form_type: "Paper Marking Payment Form",
      });
    } catch (error) {
      console.error("Error adding notification document: ", error);
    }

    console.log("Form rejected by the second reviewer.");
  } else {
    console.log("Form not found for the specified form ID.");
  }
};

// Method to be edited by the first reviewer and send notification to the applicant
export const editedByFirstReviewerServicePaperMarking = async (formId) => {
  const paperMarkingFormRef = doc(
    collection(firestore, "paper_marking"),
    formId
  );
  const paperMarkingFormDoc = await getDoc(paperMarkingFormRef);

  if (paperMarkingFormDoc.exists()) {
    await setDoc(
      paperMarkingFormDoc.ref,
      {
        edited_by_first_reciver: true,
        current_step: 2,
      },
      { merge: true }
    );

    // Create a new document in the "notifications" collection
    try {
      const notificationRef = collection(firestore, "notifications");
      await addDoc(notificationRef, {
        message: `This form ${formId} has been edited by the second reviewer.The form is now in the second reviewer's queue. and will be reviewed soon. If you have any questions, please contact the reviewer directly.`,
        editedBy: paperMarkingFormDoc.data().first_reciver_email,
        role: paperMarkingFormDoc.data().first_reciver_role,
        formData: paperMarkingFormDoc.data(), // Add form data to the notification
        timestamp: new Date(),
        typeof: "edited",
        form_type: "Paper Marking Payment Form",
      });
      console.log("Form edited by the first reviewer.");
    } catch (error) {
      console.error("Error adding notification document: ", error);
    }

    console.log("Form edited by the first reviewer.");
  } else {
    console.log("Form not found for the specified form ID.");
  }
};

// Method to be edited by the second reviewer and send notification to the applicant
export const editedBySecondReviewerServicePaperMarking = async (formId) => {
  const paperMarkingFormRef = doc(
    collection(firestore, "paper_marking"),
    formId
  );
  const paperMarkingFormDoc = await getDoc(paperMarkingFormRef);

  if (paperMarkingFormDoc.exists()) {
    await setDoc(
      paperMarkingFormDoc.ref,
      {
        edited_by_second_reciver: true,
        current_step: 3,
      },
      { merge: true }
    );

    // Create a new document in the "notifications" collection
    try {
      const notificationRef = collection(firestore, "notifications");
      await addDoc(notificationRef, {
        message: `This form ${formId} has been edited by the second reviewer.The form is now in the second reviewer's queue. and will be reviewed soon. If you have any questions, please contact the reviewer directly.`,
        editedBy: paperMarkingFormDoc.data().second_reciver_email,
        role: paperMarkingFormDoc.data().second_reciver_role,
        formData: paperMarkingFormDoc.data(), // Add form data to the notification
        timestamp: new Date(),
        typeof: "edited",
        form_type: "Paper Marking Payment Form",
      });
    } catch (error) {
      console.error("Error adding notification document: ", error);
    }

    console.log("Form edited by the second reviewer.");
  } else {
    console.log("Form not found for the specified form ID.");
  }
};

// Function to get all the notifications for the current user
export const getNotifications = async (email) => {
  const notifications = [];
  const notificationsCollection = collection(firestore, "notifications");
  const notificationsSnapshot = await getDocs(notificationsCollection);
  notificationsSnapshot.forEach((doc) => {
    const notificationData = doc.data();
    if (notificationData.formData.email.trim() === email.trim()) {
      notifications.push(notificationData);
    }
  });

  return notifications;
};
