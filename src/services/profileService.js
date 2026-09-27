import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function saveProfile(uid, profileData) {
  await setDoc(
    doc(db, "users", uid, "profile", "data"),
    profileData
  );
}