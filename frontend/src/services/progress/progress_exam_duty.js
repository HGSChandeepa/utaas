import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
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
    if (doc.data().first_reciver_email.trim() === email.trim()) {
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

    if (formData && formData.applicant_email.trim() === email.trim()) {
      examForms.push(formData);
    }
  });

  return examForms;
};

// methode to approve by the first reviewer
export const approveByFirstReviewer = async (formId) => {
  const examFormRef = doc(collection(firestore, "exam_duty"), formId);
  const examFormDoc = await getDoc(examFormRef);

  if (examFormDoc.exists()) {
    await setDoc(
      examFormDoc.ref,
      { appvover_by_first_reciver: true },
      { merge: true }
    );
  } else {
    console.log("Form not found for the specified email and form ID.");
  }
};
