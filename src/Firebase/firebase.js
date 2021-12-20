// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
import{firestore} from "firebase/firestore"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQFDvXzpwAQKU9kUuIE1PgJ4v3NH78Zaw",
  authDomain: "clone-2b77c.firebaseapp.com",
  projectId: "clone-2b77c",
  storageBucket: "clone-2b77c.appspot.com",
  messagingSenderId: "838579970895",
  appId: "1:838579970895:web:39c1f88375b89c575ddb3a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth()

export { db, auth,createUserWithEmailAndPassword,signInWithEmailAndPassword};