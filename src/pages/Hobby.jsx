import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Hobby() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hobbyName: "",
    category: "Coding",
    skillLevel: "Beginner",
    goal: "",
    milestone: "",
    practiceMinutes: "",
    notes: "",
    progress: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      if (!formData.hobbyName || !formData.goal) {
        alert("Please enter Hobby Name and Goal.");
        return;
      }

      await addDoc(
        collection(db, "users", user.uid, "hobbies"),
        {
          ...formData,
          progress: Number(formData.progress),
          practiceMinutes: Number(formData.practiceMinutes),
          createdAt: new Date()
        }
      );

      alert("Hobby and all details saved successfully!");

      setFormData({
        hobbyName: "",
        category: "Coding",
        skillLevel: "Beginner",
        goal: "",
        milestone: "",
        practiceMinutes: "",
        notes: "",
        progress: 0
      });

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Add Hobby & Skills</h1>

      <input
        type="text"
        name="hobbyName"
        placeholder="Hobby / Skill Name"
        value={formData.hobbyName}
        onChange={handleChange}
      />

      <br />
      <br />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option>Coding</option>
        <option>Music</option>
        <option>Art</option>
        <option>Fitness</option>
        <option>Language</option>
        <option>Reading</option>
        <option>Other</option>
      </select>

      <br />
      <br />

      <select
        name="skillLevel"
        value={formData.skillLevel}
        onChange={handleChange}
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

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

      <input
        type="number"
        name="practiceMinutes"
        placeholder="Practice Minutes"
        value={formData.practiceMinutes}
        onChange={handleChange}
      />

      <br />
      <br />

      <label>Progress: {formData.progress}%</label>

      <br />

      <input
        type="range"
        name="progress"
        min="0"
        max="100"
        value={formData.progress}
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

      <button onClick={handleSave}>
        Save All Details
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Hobby;