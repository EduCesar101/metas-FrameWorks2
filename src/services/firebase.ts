import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuHOa0WkhSrPHVBF__NMFc9qWglYST3b4",
  authDomain: "goal-app-auth-beta.firebaseapp.com",
  projectId: "goal-app-auth-beta",
  storageBucket: "goal-app-auth-beta.appspot.com",
  messagingSenderId: "608705532865",
  appId: "1:608705532865:web:c283c4ed8a53f3576a1540"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);