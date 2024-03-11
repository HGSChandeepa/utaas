import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Dashboard from "./pages/private/Dashboard";
import MyActivities from "./pages/private/MyActivities";
import Tasks from "./pages/private/Tasks";
import Progress from "./pages/private/Progress";
import Favorites from "./pages/private/Favorites";
import Profile from "./pages/private/Profile";


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
