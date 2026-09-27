import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { saveProfile } from "../services/profileService";

function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [bio, setBio] = useState("");

  const handleSave = async () => {
    try {
        alert("Save button is working!");
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        return;
      }

      await saveProfile(user.uid, {
        name,
        age,
        skillLevel,
        bio
      });

      alert("Profile saved successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>My Profile</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Enter your age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br />
      <br />

      <select
        value={skillLevel}
        onChange={(e) => setSkillLevel(e.target.value)}
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <br />
      <br />

      <textarea
        placeholder="Tell us about yourself"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSave}>
        Save Profile
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Profile;