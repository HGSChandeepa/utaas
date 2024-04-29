import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDRVNsvFA-hNOZ2O5-dAlujXaQ9nCKwtAc",
  authDomain: "utaas-e8cb2.firebaseapp.com/login",
  projectId: "utaas-e8cb2",
  storageBucket: "utaas-e8cb2.appspot.com",
  messagingSenderId: "693800414447",
  appId: "1:693800414447:web:7f99d95c334441d1f9ff1a",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = app.firestore();
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, firestore, database, storage };
