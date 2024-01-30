// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0MbCh6G4d459PtwdZcc0FlpKYt3H-PYw",
  authDomain: "chat-app-a79bd.firebaseapp.com",
  projectId: "chat-app-a79bd",
  storageBucket: "chat-app-a79bd.appspot.com",
  messagingSenderId: "761292501816",
  appId: "1:761292501816:web:95439e5373990cf38ac7cd",
  measurementId: "G-28T2MPQKW0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage()
export const db = getFirestore()