import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfZbB3pAgQq0ykuFlmNkIS5s1aX1F-R9E",
  authDomain: "therapyassistant.firebaseapp.com",
  projectId: "therapyassistant",
  storageBucket: "therapyassistant.appspot.com",
  messagingSenderId: "272319287249",
  appId: "1:272319287249:web:e96d700bb3630ab4e9daf0",
  measurementId: "G-Z2JZCCVC3L"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };