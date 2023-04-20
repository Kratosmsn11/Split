// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa7zia2RmVNoMdPbcH1yrxfL2cQnfm-Xw",
  authDomain: "chatapp-4f78c.firebaseapp.com",
  projectId: "chatapp-4f78c",
  storageBucket: "chatapp-4f78c.appspot.com",
  messagingSenderId: "689212763652",
  appId: "1:689212763652:web:3f8ed7baa6166d3bb4cf51",
  measurementId: "G-8GMFVXED5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);