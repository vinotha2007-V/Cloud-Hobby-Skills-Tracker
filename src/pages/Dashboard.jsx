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
      <h1>Dashboard</h1>

      <p>Welcome to Hobby & Skills Tracker!</p>

      <h2>My Hobbies & Skills</h2>

      <button onClick={() => navigate("/profile")}>
        My Profile
      </button>

      <button>Add Hobby</button>

      <button>Practice</button>

      <button>Community</button>

      <br />
      <br />

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;