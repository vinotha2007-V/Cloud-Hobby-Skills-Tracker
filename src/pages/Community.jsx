import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
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

function Community() {
  const navigate = useNavigate();

  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "posts")
      );

      const postList = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data()
      }));

      setPosts(postList);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const createPost = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      if (!postText.trim()) {
        alert("Please enter something to post.");
        return;
      }

      await addDoc(collection(db, "posts"), {
        text: postText,
        userId: user.uid,
        email: user.email,
        likes: [],
        comments: [],
        createdAt: new Date()
      });

      alert("Post created successfully!");

      setPostText("");
      loadPosts();

    } catch (error) {
      alert(error.message);
    }
  };

  const likePost = async (postId, likes = []) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      const postRef = doc(db, "posts", postId);

      if (likes.includes(user.uid)) {
        await updateDoc(postRef, {
          likes: arrayRemove(user.uid)
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(user.uid)
        });
      }

      loadPosts();

    } catch (error) {
      alert(error.message);
    }
  };

  const deletePost = async (postId, userId) => {
    try {
      const user = auth.currentUser;

      if (!user || user.uid !== userId) {
        alert("You can delete only your own post.");
        return;
      }

      await deleteDoc(doc(db, "posts", postId));

      alert("Post deleted!");

      loadPosts();

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Community</h1>

      <h2>Create Post</h2>

      <textarea
        placeholder="Share your hobby progress..."
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />

      <br />
      <br />

      <button onClick={createPost}>
        Create Post
      </button>

      <hr />

      <h2>Community Feed</h2>

      {posts.length === 0 ? (
        <p>No posts yet. Be the first to share!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h3>{post.email}</h3>

            <p>{post.text}</p>

            <button
              onClick={() =>
                likePost(post.id, post.likes || [])
              }
            >
              ❤️ {post.likes?.length || 0}
            </button>

            <button
              onClick={() =>
                deletePost(post.id, post.userId)
              }
            >
              Delete
            </button>

            <hr />
          </div>
        ))
      )}

      <br />

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Community;