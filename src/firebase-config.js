import { initializeApp } from "firebase/app";
import {initializeFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyClxeJlCWJdmu1aDTb8m5fVxvVQmOY5380",
//   authDomain: "campus-disc.firebaseapp.com",
//   projectId: "campus-disc",
//   storageBucket: "campus-disc.appspot.com",
//   messagingSenderId: "662925651494",
//   appId: "1:662925651494:web:5352e737483d3492fe80e7",
//   measurementId: "G-B3VPC9YS0P"
// };

const firebaseConfig = {
  apiKey: "AIzaSyA7XmA8peHb2tWg0OOX0soMfM98UJUPPlI",
  authDomain: "camp-f96d1.firebaseapp.com",
  projectId: "camp-f96d1",
  storageBucket: "camp-f96d1.appspot.com",
  messagingSenderId: "128095446817",
  appId: "1:128095446817:web:fd6d4d7f8581b29b07c060",
  measurementId: "G-YPVEFCTL07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});
export const auth = getAuth(app);
