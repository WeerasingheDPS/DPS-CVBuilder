// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcNa4N2NpaP2HdS8yfL7f8Z6UBl_v02lo",
  authDomain: "dps-cv-builder-01.firebaseapp.com",
  projectId: "dps-cv-builder-01",
  storageBucket: "dps-cv-builder-01.appspot.com",
  messagingSenderId: "130293895514",
  appId: "1:130293895514:web:821e1de7925b21e093e363",
  measurementId: "G-KNJ9FMXGMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
