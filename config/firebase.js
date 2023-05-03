
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import {getFirestore} from 'firebase/firestore';

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


export {firebase};
export {db};
