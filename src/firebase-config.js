import { initializeApp } from "firebase/app";
import {initializeFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

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

// const firebaseConfig = {
//   apiKey: "AIzaSyDBkSUi6px_ugYzDOrAIYiCuoBjaK5wKKA",
//   authDomain: "camp-b8837.firebaseapp.com",
//   projectId: "camp-b8837",
//   storageBucket: "camp-b8837.appspot.com",
//   messagingSenderId: "958461696255",
//   appId: "1:958461696255:web:ea0045e6bbb1539d1894ca",
//   measurementId: "G-42S43LG45Q"
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});
export const auth = getAuth(app);
