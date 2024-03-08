// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDmKDR51VQj-LC3SdiXig3D89MfEEo5fY",
  authDomain: "interestassignment.firebaseapp.com",
  projectId: "interestassignment",
  storageBucket: "interestassignment.appspot.com",
  messagingSenderId: "359007118023",
  appId: "1:359007118023:web:8eeddba818ff11735e14e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestoreDb = getFirestore(app);
export { app, auth, firestoreDb };
