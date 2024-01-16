import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDRVNsvFA-hNOZ2O5-dAlujXaQ9nCKwtAc",
  authDomain: "utaas-e8cb2.firebaseapp.com",
  projectId: "utaas-e8cb2",
  storageBucket: "utaas-e8cb2.appspot.com",
  messagingSenderId: "693800414447",
  appId: "1:693800414447:web:7f99d95c334441d1f9ff1a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

export { auth, firestore, database };     
