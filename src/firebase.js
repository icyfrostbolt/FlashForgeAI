// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy5k6o5ADegj6DtseQTQei0tRTsHk3DI4",
  authDomain: "flashforge-7c12f.firebaseapp.com",
  projectId: "flashforge-7c12f",
  storageBucket: "flashforge-7c12f.firebasestorage.app",
  messagingSenderId: "344139418819",
  appId: "1:344139418819:web:4c8c14d29f1dc35f9a2676",
  measurementId: "G-3HHLYLNH5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);