import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { auth } from "../firebase";

// Register
export async function registerUser(email, password) {
  return await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
}

// Login
export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

// Logout
export async function logoutUser() {
  return await signOut(auth);
}