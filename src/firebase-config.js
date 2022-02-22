// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAf7gj5192pc3F8aNwCa3bOE_ZlIZnD19Q",
    authDomain: "fir-chat-d1166.firebaseapp.com",
    projectId: "fir-chat-d1166",
    storageBucket: "fir-chat-d1166.appspot.com",
    messagingSenderId: "388498151719",
    appId: "1:388498151719:web:80db4090a7f0d411c23102"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();