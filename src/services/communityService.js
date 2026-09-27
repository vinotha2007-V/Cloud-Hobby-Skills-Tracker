import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";

import { db } from "../firebase";

export async function createPost(postData) {
  return await addDoc(
    collection(db, "posts"),
    {
      ...postData,
      likes: [],
      comments: [],
      createdAt: new Date()
    }
  );
}

export async function getPosts() {
  const snapshot = await getDocs(
    collection(db, "posts")
  );

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data()
  }));
}

export async function likePost(postId, userId, likes) {
  const postRef = doc(db, "posts", postId);

  if (likes.includes(userId)) {
    await updateDoc(postRef, {
      likes: arrayRemove(userId)
    });
  } else {
    await updateDoc(postRef, {
      likes: arrayUnion(userId)
    });
  }
}

export async function deletePost(postId) {
  await deleteDoc(
    doc(db, "posts", postId)
  );
}