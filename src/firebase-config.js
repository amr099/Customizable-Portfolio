import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAH2sAnci31c_1KjBub4l9Me-6qDxMQ7DA",
    authDomain: "custom-portfolio-38133.firebaseapp.com",
    projectId: "custom-portfolio-38133",
    storageBucket: "custom-portfolio-38133.appspot.com",
    messagingSenderId: "1060354694003",
    appId: "1:1060354694003:web:a773dc3a6412a90e1fc306",
    measurementId: "G-KBBHCMMDMG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
