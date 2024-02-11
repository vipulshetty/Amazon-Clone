// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "clone-f3d66.firebaseapp.com",
  projectId: "clone-f3d66",
  storageBucket: "clone-f3d66.appspot.com",
  messagingSenderId: "68783870673",
  appId: "1:68783870673:web:97f1aeb9234982eba72bf0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Sign in with google
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
