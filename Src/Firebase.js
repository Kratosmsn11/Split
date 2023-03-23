// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDELoE8JW8XKCatY9HnoarpNkY1LtiDLE8",
  authDomain: "split-cst499.firebaseapp.com",
  projectId: "split-cst499",
  storageBucket: "split-cst499.appspot.com",
  messagingSenderId: "376800778250",
  appId: "1:376800778250:web:a574b4302acb30587ae7f3",
  measurementId: "G-K6N4WZ0Z4C"
};



export const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);