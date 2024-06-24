import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBkd2ZLlljyRqsztXP_o5mgf8T_eIaSrrE",
    authDomain: "atividade-frameworks-44fa0.firebaseapp.com",
    projectId: "atividade-frameworks-44fa0",
    storageBucket: "atividade-frameworks-44fa0.appspot.com",
    messagingSenderId: "1011256090494",
    appId: "1:1011256090494:web:eabd7183736861bed59d2f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);