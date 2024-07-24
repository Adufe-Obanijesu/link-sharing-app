// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIDZNpXEZl1fPV9dJfPNxcBQvUvapELqc",
  authDomain: "hng11-e0702.firebaseapp.com",
  projectId: "hng11-e0702",
  storageBucket: "hng11-e0702.appspot.com",
  messagingSenderId: "1063045899253",
  appId: "1:1063045899253:web:5c55fe345930de1deaf6bc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getFirestore,
  addDoc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const db = getFirestore();

export {
  initializeApp,
  firebaseConfig,
  getAuth,
  where,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  addDoc,
  setDoc,
  collection,
  db,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
  getDocs,
  deleteObject,
};
