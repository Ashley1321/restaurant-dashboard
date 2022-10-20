// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZ6BQKfWkHKwhr2CipmktMCBZl3uSr30I",
  authDomain: "restaurant-app-122d5.firebaseapp.com",
  projectId: "restaurant-app-122d5",
  storageBucket: "restaurant-app-122d5.appspot.com",
  messagingSenderId: "401702814899",
  appId: "1:401702814899:web:f7b8dacbd33fa279141cc6",
  measurementId: "G-3RC53GGL91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const analytics = getAnalytics(app);
const storage = getStorage(app)

export {auth,db,storage,analytics}