import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_Yg3qHrjqAsmFpV0n9RsHRUWe64mAI2I",
  authDomain: "chatgpt-gg.firebaseapp.com",
  projectId: "chatgpt-gg",
  storageBucket: "chatgpt-gg.appspot.com",
  messagingSenderId: "45784273928",
  appId: "1:45784273928:web:524bf39d2adc9a52602dbd",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };