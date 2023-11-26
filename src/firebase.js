import { initializeApp } from "firebase/app"
import { getStorage } from 'firebase/storage'
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDDD-Ouf-k8G1YJKUNw-VQmzOxzIBwGLWw",
    authDomain: "podcast-plateform.firebaseapp.com",
    projectId: "podcast-plateform",
    storageBucket: "podcast-plateform.appspot.com",
    messagingSenderId: "571480361040",
    appId: "1:571480361040:web:1299982cf395548ced2955",
    measurementId: "G-VTRE4Q8G7G"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)