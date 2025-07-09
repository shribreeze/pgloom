// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc3HHAmLm72ERDjryyN_viS-9jSD9Ok4I",
  authDomain: "pg-loom.firebaseapp.com",
  projectId: "pg-loom",
  storageBucket: "pg-loom.firebasestorage.app",
  messagingSenderId: "708408911652",
  appId: "1:708408911652:web:c8e17f1afe0aa2f691f5b1",
  measurementId: "G-LWP9NS3QY3"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
