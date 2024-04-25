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

    if (
      formData &&
      formData.applicant_email &&
      formData.first_reciver_email.trim() === email.trim()
    ) {
      examForms.push(doc.data());
    }
  });

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
      formData.applicant_email &&
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

    if (
      formData &&
      formData.applicant_email &&
      formData.applicant_email.trim() === email.trim()
    ) {
      examForms.push(formData);
    }

    console.log(examForms);
  });

  return examForms;
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
        message: `Form ${formId} has been approved by the first reviewer.`,
        formData: examFormDoc.data(), // Add form data to the notification
        timestamp: new Date(),
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
        message: `Form ${formId} has been approved by the second reviewer.`,
        formData: examFormDoc.data(), // Add form data to the notification
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error adding notification document: ", error);
    }

    console.log("Form approved by the second reviewer.");
  } else {
    console.log("Form not found for the specified form ID.");
  }
};

//function to get all the notifications for the current user
export const getNotifications = async (email) => {
  const notifications = [];
  const notificationsCollection = collection(firestore, "notifications");
  const notificationsSnapshot = await getDocs(notificationsCollection);
  notificationsSnapshot.forEach((doc) => {
    const notificationData = doc.data();
    if (notificationData.formData.applicant_email.trim() === email.trim()) {
      notifications.push(notificationData);
    }
  });

  return notifications;
};
