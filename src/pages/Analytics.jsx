import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs
} from "firebase/firestore";

function Analytics() {
  const navigate = useNavigate();

  const [totalHobbies, setTotalHobbies] = useState(0);
  const [totalPractice, setTotalPractice] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadAnalytics = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      // Hobbies
      const hobbiesSnapshot = await getDocs(
        collection(db, "users", user.uid, "hobbies")
      );

      setTotalHobbies(hobbiesSnapshot.size);

      // Practice logs
      const logsSnapshot = await getDocs(
        collection(db, "users", user.uid, "logs")
      );

      let minutes = 0;

      logsSnapshot.forEach((item) => {
        const data = item.data();
        minutes += Number(data.practiceMinutes || 0);
      });

      setTotalPractice(minutes);

      // Community posts
      const postsSnapshot = await getDocs(
        collection(db, "posts")
      );

      let myPosts = 0;

      postsSnapshot.forEach((item) => {
        const data = item.data();

        if (data.userId === user.uid) {
          myPosts++;
        }
      });

      setTotalPosts(myPosts);

      // Simple progress calculation
      const calculatedProgress =
        minutes >= 300
          ? 100
          : Math.min(Math.round((minutes / 300) * 100), 100);

      setProgress(calculatedProgress);

    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <div>
      <h1>My Analytics</h1>

      <button onClick={loadAnalytics}>
        Refresh Analytics
      </button>

      <hr />

      <h2>📚 Total Hobbies</h2>
      <p>{totalHobbies}</p>

      <h2>⏱️ Total Practice</h2>
      <p>{totalPractice} minutes</p>

      <h2>📢 My Community Posts</h2>
      <p>{totalPosts}</p>

      <h2>📈 Overall Progress</h2>
      <p>{progress}%</p>

      <progress
        value={progress}
        max="100"
      />

      <br />
      <br />

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Analytics;