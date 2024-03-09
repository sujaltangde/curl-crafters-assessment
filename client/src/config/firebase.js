// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJ7JJl5RQfs122SfztbXVGO4G4BD9LjfE",
  authDomain: "quizapp-910f3.firebaseapp.com",
  projectId: "quizapp-910f3",
  storageBucket: "quizapp-910f3.appspot.com",
  messagingSenderId: "119913365603",
  appId: "1:119913365603:web:111a4d75fda563c1583856"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);


export const auth = getAuth(firebase)