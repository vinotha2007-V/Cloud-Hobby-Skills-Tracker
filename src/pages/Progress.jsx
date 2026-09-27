import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

function Progress() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hobbyName: "",
    practiceMinutes: "",
    goal: "",
    milestone: "",
    notes: ""
  });

  const [totalMinutes, setTotalMinutes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badge, setBadge] = useState("No Badge Yet");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const savePractice = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      if (!formData.hobbyName || !formData.practiceMinutes) {
        alert("Please enter Hobby Name and Practice Minutes.");
        return;
      }

      await addDoc(
        collection(db, "users", user.uid, "logs"),
        {
          ...formData,
          practiceMinutes: Number(formData.practiceMinutes),
          date: new Date()
        }
      );

      alert("Practice session saved successfully!");

      setFormData({
        hobbyName: "",
        practiceMinutes: "",
        goal: "",
        milestone: "",
        notes: ""
      });

      calculateProgress();

    } catch (error) {
      alert(error.message);
    }
  };

  const calculateProgress = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      const logsRef = collection(
        db,
        "users",
        user.uid,
        "logs"
      );

      const snapshot = await getDocs(logsRef);

      let minutes = 0;
      const practiceDates = [];

      snapshot.forEach((doc) => {
        const data = doc.data();

        minutes += Number(data.practiceMinutes || 0);

        if (data.date) {
          const date = data.date.toDate();
          practiceDates.push(date.toDateString());
        }
      });

      setTotalMinutes(minutes);

      // Simple streak calculation
      const today = new Date().toDateString();

      if (practiceDates.includes(today)) {
        setStreak(1);
      } else {
        setStreak(0);
      }

      // Badge system
      if (minutes >= 300) {
        setBadge("🏆 Master");
      } else if (minutes >= 120) {
        setBadge("🥇 Dedicated Learner");
      } else if (minutes >= 60) {
        setBadge("🥈 Consistent Learner");
      } else if (minutes >= 30) {
        setBadge("🥉 Beginner Achiever");
      } else {
        setBadge("No Badge Yet");
      }

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Practice & Progress</h1>

      <h2>Practice Session</h2>

      <input
        type="text"
        name="hobbyName"
        placeholder="Hobby / Skill Name"
        value={formData.hobbyName}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="number"
        name="practiceMinutes"
        placeholder="Practice Minutes"
        value={formData.practiceMinutes}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="text"
        name="goal"
        placeholder="Your Goal"
        value={formData.goal}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        type="text"
        name="milestone"
        placeholder="Milestone"
        value={formData.milestone}
        onChange={handleChange}
      />

      <br />
      <br />

      <textarea
        name="notes"
        placeholder="Practice Notes"
        value={formData.notes}
        onChange={handleChange}
      />

      <br />
      <br />

      <button onClick={savePractice}>
        Save Practice Session
      </button>

      <hr />

      <h2>My Progress</h2>

      <button onClick={calculateProgress}>
        Calculate Progress
      </button>

      <h3>Total Practice</h3>
      <p>{totalMinutes} minutes</p>

      <h3>Current Streak</h3>
      <p>🔥 {streak} day</p>

      <h3>Badge</h3>
      <p>{badge}</p>

      <br />

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Progress;