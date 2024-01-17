// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnbMRrh2cD6MuDSO7dUfL6-jOCBC3MiLw",
  authDomain: "dreamhire-393307.firebaseapp.com",
  databaseURL: "http://localhost:8080",
  projectId: "dreamhire-393307",
  storageBucket: "dreamhire-393307.appspot.com",
  messagingSenderId: "1017891805750",
  appId: "1:1017891805750:web:e8cd3542fefdb9b70a1697",
  measurementId: "G-8Y9SRCJ0ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);