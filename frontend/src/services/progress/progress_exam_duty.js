import { collection, getDocs } from "firebase/firestore";
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
    if (doc.data().first_reviewer === email) {
      examForms.push(doc.data());
    }
  });
  return examForms;
};
