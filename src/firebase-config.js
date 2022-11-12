import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth'; //FIX THIS

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClxeJlCWJdmu1aDTb8m5fVxvVQmOY5380",
  authDomain: "campus-disc.firebaseapp.com",
  projectId: "campus-disc",
  storageBucket: "campus-disc.appspot.com",
  messagingSenderId: "662925651494",
  appId: "1:662925651494:web:5352e737483d3492fe80e7",
  measurementId: "G-B3VPC9YS0P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); //FIX THIS