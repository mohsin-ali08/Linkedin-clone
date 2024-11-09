// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Import the authentication module

const firebaseConfig = {
  apiKey: "AIzaSyDy9_ishE1vGTl9LdZIIWbdQPsp7vSrFp4",
  authDomain: "bloging-web-f829e.firebaseapp.com",
  projectId: "bloging-web-f829e",
  storageBucket: "bloging-web-f829e.appspot.com",
  messagingSenderId: "411057216272",
  appId: "1:411057216272:web:e05a06212d93366e1d6395",
  measurementId: "G-K79BX35VXF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // Initialize Firebase Authentication

export { db, storage, auth }; // Export the auth instance
