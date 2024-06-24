import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { firestore } from "../../config/firebase_configure";

//function to get all the exam docs in the firestore collection exam_forms store them in an array and return the array
export const getExamForms = async () => {
  const examForms = [];
  const examFormsCollection = collection(firestore, "exam_duty");
  const examFormsSnapshot = await getDocs(examFormsCollection);
  examFormsSnapshot.forEach((doc) => {
    examForms.push(doc.data());
  });
  return examForms;
};

//function to get all the forms wheere the first reviewer is the current user by the email
export const getFirstReviewerForms = async (email) => {
  const examForms = [];
  const examFormsCollection = collection(firestore, "exam_duty");
  const examFormsSnapshot = await getDocs(examFormsCollection);
  examFormsSnapshot.forEach((doc) => {
    const formData = doc.data();
    console.log(email, formData.first_reciver_email);

    if (
      formData &&
      formData.email &&
      formData.first_reciver_email.trim() === email.trim()
    ) {
      examForms.push(doc.data());
    }
  });

  console.log(examForms);

  return examForms;
};

//function to get all the forms where the second reviewer is the current user by the email
export const getSecondReviewerForms = async (email) => {
  const examForms = [];
  const examFormsCollection = collection(firestore, "exam_duty");
  const examFormsSnapshot = await getDocs(examFormsCollection);
  examFormsSnapshot.forEach((doc) => {
    const formData = doc.data();

    if (
      formData &&
      formData.email &&
      formData.second_reciver_email.trim() === email.trim()
    ) {
      examForms.push(doc.data());
    }
  });

  return examForms;
};

//get all the forms submited by the current user
export const getAllFormsByCurrentUser = async (email) => {
  const examForms = [];
  console.log(email);
  const examFormsCollection = collection(firestore, "exam_duty");
  const examFormsSnapshot = await getDocs(examFormsCollection);
  examFormsSnapshot.forEach((doc) => {
    const formData = doc.data();

    console.log(formData);

    if (formData && formData.email && formData.email.trim() === email.trim()) {
      examForms.push(formData);
    }

    console.log(examForms);
  });

  return examForms;
};

//methode to get the form by the form id
export const getFormById = async (formId) => {
  const examFormRef = doc(collection(firestore, "exam_duty"), formId);
  const examFormDoc = await getDoc(examFormRef);

  if (examFormDoc.exists()) {
    return examFormDoc.data();
  } else {
    console.log("Form not found for the specified form ID.");
  }
};

// methode to approve by the first reviewer

export const approveFirstReviewerService = async (formId) => {
  const examFormRef = doc(collection(firestore, "exam_duty"), formId);
  const examFormDoc = await getDoc(examFormRef);

  if (examFormDoc.exists()) {
    await setDoc(
      examFormDoc.ref,
      { appvover_by_first_reciver: true, current_step: 3 },
      { merge: true }
    );

    // Create a new document in the "notifications" collection
    try {
      const notificationRef = collection(firestore, "notifications");
      await addDoc(notificationRef, {
        message: `This form ${formId} has been approved by the first reviewer.The form is now in the second reviewer's queue. and will be reviewed soon. If you have any questions, please contact the reviewer directly.`,
        editedBy: examFormDoc.data().first_reciver_email,
        role: examFormDoc.data().first_reciver_role,
        formData: examFormDoc.data(), // Add form data to the notification
        timestamp: new Date(),
        typeof: "approved",
        form_type: "Exam Duty Payment Form",
      });
    } catch (error) {
      console.error("Error adding notification document: ", error);
    }

    console.log("Form approved by the first reviewer.");
  } else {
    console.log("Form not found for the specified form ID.");
  }
};

// methode to approve by the second reviewer
export const approveSecondReviewerService = async (formId) => {
  const examFormRef = doc(collection(firestore, "exam_duty"), formId);
  const examFormDoc = await getDoc(examFormRef);

  if (examFormDoc.exists()) {
    await setDoc(
      examFormDoc.ref,
      { appvover_by_second_reciver: true, current_step: 4 },
      { merge: true }
    );

    // Create a new document in the "notifications" collection
    try {
      const notificationRef = collection(firestore, "notifications");
      await addDoc(notificationRef, {
        message: `This form ${formId} has been approved by the second reviewer.The form is now in the second reviewer's queue. and will be reviewed soon. If you have any questions, please contact the reviewer directly.`,
        editedBy: examFormDoc.data().second_reciver_email,
        role: examFormDoc.data().second_reciver_role,
        formData: examFormDoc.data(), // Add form data to the notification
        timestamp: new Date(),
        typeof: "approved",
        form_type: "Exam Duty Payment Form",
      });
    } catch (error) {
      console.error("Error adding notification document: ", error);
    }

    console.log("Form approved by the second reviewer.");
  } else {
    console.log("Form not found for the specified form ID.");
  }
};

//methode to reject by the first reviewer and send notification to the applicant
export const rejectFirstReviewerService = async (formId) => {
  const examFormRef = doc(collection(firestore, "exam_duty"), formId);
  const examFormDoc = await getDoc(examFormRef);

  if (examFormDoc.exists()) {
    await setDoc(
      examFormDoc.ref,
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
        message: `This form ${formId} has been rejected by the first reviewer.The form is now in the second reviewer's queue. and will be reviewed soon. If you have any questions, please contact the reviewer directly.`,
        editedBy: examFormDoc.data().first_reciver_email,
        role: examFormDoc.data().first_reciver_role,
        formData: examFormDoc.data(), // Add form data to the notification
        timestamp: new Date(),
        typeof: "rejected",
        form_type: "Exam Duty Payment Form",
      });
    } catch (error) {
      console.error("Error adding notification document: ", error);
    }

    console.log("Form rejected by the first reviewer.");
  } else {
    console.log("Form not found for the specified form ID.");
  }
};

//methode to reject by the second reviewer and send notification to the applicant
export const rejectSecondReviewerService = async (formId) => {
  const examFormRef = doc(collection(firestore, "exam_duty"), formId);
  const examFormDoc = await getDoc(examFormRef);

  if (examFormDoc.exists()) {
    await setDoc(
      examFormDoc.ref,
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
        editedBy: examFormDoc.data().second_reciver_email,
        role: examFormDoc.data().second_reciver_role,
        formData: examFormDoc.data(), // Add form data to the notification
        timestamp: new Date(),
        typeof: "rejected",
        form_type: "Exam Duty Payment Form",
      });
    } catch (error) {
      console.error("Error adding notification document: ", error);
    }

    console.log("Form rejected by the second reviewer.");
  } else {
    console.log("Form not found for the specified form ID.");
  }
};

//methoed to edited by the first reviewer and send notification to the applicant
export const editedByFirstReviewerService = async (formId) => {
  const examFormRef = doc(collection(firestore, "exam_duty"), formId);
  const examFormDoc = await getDoc(examFormRef);

  if (examFormDoc.exists()) {
    await setDoc(
      examFormDoc.ref,
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
        message: `This form ${formId} has been edited by the first reviewer.The form is now in the second reviewer's queue. and will be reviewed soon. If you have any questions, please contact the reviewer directly.`,
        editedBy: examFormDoc.data().first_reciver_email,
        role: examFormDoc.data().first_reciver_role,
        formData: examFormDoc.data(), // Add form data to the notification
        timestamp: new Date(),
        typeof: "edited",
        form_type: "Exam Duty Payment Form",
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

//methoed to edited by the second reviewer and send notification to the applicant
export const editedBySecondReviewerService = async (formId) => {
  const examFormRef = doc(collection(firestore, "exam_duty"), formId);
  const examFormDoc = await getDoc(examFormRef);

  if (examFormDoc.exists()) {
    await setDoc(
      examFormDoc.ref,
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
        editedBy: examFormDoc.data().second_reciver_email,
        role: examFormDoc.data().second_reciver_role,
        formData: examFormDoc.data(), // Add form data to the notification
        timestamp: new Date(),
        typeof: "editded",
        form_type: "Exam Duty Payment Form",
      });
    } catch (error) {
      console.error("Error adding notification document: ", error);
    }

    console.log("Form edited by the second reviewer.");
  } else {
    console.log("Form not found for the specified form ID.");
  }
};

//function to get all the notifications for the current user
export const getNotifications = async (email) => {
  try {
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
  } catch (error) {
    console.error("Error getting notifications: ", error);
    return [];
  }
};
