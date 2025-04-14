import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FirebaseApi,
    authDomain: "mindcare-vm.firebaseapp.com",
    projectId: "mindcare-vm",
    storageBucket: "mindcare-vm.firebasestorage.app",
    messagingSenderId: "433923455101",
    appId: "1:433923455101:web:2f9cc14822a55480b39914",
    measurementId: "G-CBN6HV1417"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  } catch (error) {
    console.error(error);
  }
};



export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error(error);
  }
};
