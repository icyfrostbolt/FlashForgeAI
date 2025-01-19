// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyDo9sC6z4Anum-bOUyzO6BzKzGBpjgCSfE",

  authDomain: "flashforge-2d6ec.firebaseapp.com",

  projectId: "flashforge-2d6ec",

  storageBucket: "flashforge-2d6ec.firebasestorage.app",

  messagingSenderId: "552754710121",

  appId: "1:552754710121:web:1235b821a9b73797c104f8",

  measurementId: "G-B170SETTZY"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
