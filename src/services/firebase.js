// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAHjhuUJu_ldfFkc3anwsID1uHT7O8HKs",
  authDomain: "pixels-c9efa.firebaseapp.com",
  projectId: "pixels-c9efa",
  storageBucket: "pixels-c9efa.appspot.com",
  messagingSenderId: "136591592309",
  appId: "1:136591592309:web:470c55f94f6dffad3aa13c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
