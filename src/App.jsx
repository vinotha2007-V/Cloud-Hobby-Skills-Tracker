import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Hobby from "./pages/Hobby";
import Progress from "./pages/Progress";
import Community from "./pages/Community";
import Analytics from "./pages/Analytics";
import CloudFiles from "./pages/CloudFiles";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/hobby"
          element={<Hobby />}
        />

        <Route
          path="/progress"
          element={<Progress />}
        />

        <Route
          path="/community"
          element={<Community />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/cloud-files"
          element={<CloudFiles />}
        />
      </Routes>
    </>
  );
}

export default App;