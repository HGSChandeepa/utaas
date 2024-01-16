import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Public/LandingPage";
import Login from "./pages/Public/Login";
import Register from "./pages/Public/Register";
import Dashboard from "./pages/Private/Dashboard";
import MyActivities from "./pages/Private/MyActivities";
import Tasks from "./pages/Private/Tasks";
import Progress from "./pages/Private/Progress";
import Favorites from "./pages/Private/Favorites";
import Profile from "./pages/Private/Profile";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myactivity" element={<MyActivities />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
