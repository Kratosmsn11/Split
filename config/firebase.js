// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDELoE8JW8XKCatY9HnoarpNkY1LtiDLE8",
  authDomain: "split-cst499.firebaseapp.com",
  projectId: "split-cst499",
  storageBucket: "split-cst499.appspot.com",
  messagingSenderId: "376800778250",
  appId: "1:376800778250:web:a574b4302acb30587ae7f3",
  measurementId: "G-K6N4WZ0Z4C"
};
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

const db = getFirestore();
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export {firebase};
export {db};
