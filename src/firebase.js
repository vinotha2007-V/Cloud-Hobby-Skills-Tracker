import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPqsu0TxJOpDAjy4YscZCnyRg7iE8qJp4",
  authDomain: "cloud-hobby-skills-track-c321c.firebaseapp.com",
  projectId: "cloud-hobby-skills-track-c321c",
  storageBucket: "cloud-hobby-skills-track-c321c.firebasestorage.app",
  messagingSenderId: "788156586239",
  appId: "1:788156586239:web:16811f4a07edf4c48154ca"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;