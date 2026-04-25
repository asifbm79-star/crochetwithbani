import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCwKK9EIAZxZ7IEDXt5V4NoPufJJWEzm4",
    authDomain: "crochetwithbani.firebaseapp.com",
    projectId: "crochetwithbani",
    storageBucket: "crochetwithbani.firebasestorage.app",
    messagingSenderId: "877701198708",
    appId: "1:877701198708:web:c180e596cd41fe8d7b3221"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication & Database
export const auth = getAuth(app);
export const db = getFirestore(app);

// Setup Google Login Provider
export const googleProvider = new GoogleAuthProvider();