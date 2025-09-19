// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATFKdCxCAVzSGVaYpUQQSf8XNrMxQGdYg",
  authDomain: "niwaas-89cd3.firebaseapp.com",
  projectId: "niwaas-89cd3",
  storageBucket: "niwaas-89cd3.firebasestorage.app",
  messagingSenderId: "964531655538",
  appId: "1:964531655538:web:07dfe6510e8c47cb17c3eb",
  measurementId: "G-EZ2P6XJ4BP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
export default app;