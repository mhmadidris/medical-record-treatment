// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBO9gt-cWYmQHk-3iKMZWOffKq6f1wbInk",
    authDomain: "medical-record-treatment.firebaseapp.com",
    projectId: "medical-record-treatment",
    storageBucket: "medical-record-treatment.appspot.com",
    messagingSenderId: "595653202066",
    appId: "1:595653202066:web:d983bb4305b0438ebfd64b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);