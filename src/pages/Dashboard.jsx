import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();

      alert("Logged out successfully!");

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Hobby & Skills Tracker</h1>

      <p>
        Welcome to your personal hobby and skills dashboard!
      </p>

      <hr />

      <h2>My Hobbies & Skills</h2>

      <button onClick={() => navigate("/profile")}>
        👤 My Profile
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/hobby")}>
        ➕ Add Hobby & Skill
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/progress")}>
        📈 Practice & Progress
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/community")}>
        🌐 Community
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/analytics")}>
        📊 Analytics
      </button>

      <br />
      <br />

      <button onClick={() => navigate("/cloud-files")}>
        ☁️ Cloud Files
      </button>

      <hr />

      <button onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
}

export default Dashboard;