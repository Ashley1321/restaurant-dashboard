// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPzgfA617h4qGEDFsYSBwjzUnMFSKhQNY",
  authDomain: "restaurant-d24b4.firebaseapp.com",
  projectId: "restaurant-d24b4",
  storageBucket: "restaurant-d24b4.appspot.com",
  messagingSenderId: "936557414441",
  appId: "1:936557414441:web:af3f5ca0086b673156f438",
  measurementId: "G-17XYH3R6TZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const analytics = getAnalytics(app);
const storage = getStorage(app)

export {auth,db,storage,analytics}