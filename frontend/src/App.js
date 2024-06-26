import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Auth/LandingPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Private/Dashboard";
import MyActivities from "./pages/Private/MyActivities";
import Tasks from "./pages/Private/Tasks";
import Progress from "./pages/Private/Progress";
import Favorites from "./pages/Private/Favorites";
import Profile from "./pages/Private/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExamDuty from "./pages/Private/DashboardPages/ExamDuty";
import Notifications from "./pages/Private/Notifications";
import ExamDutyById from "../src/Components/forms/exam_duty/ExamDutyById";
import PaperMarking from "./pages/Private/DashboardPages/PaperMarking";
import PaperMarkingById from "./Components/forms/paper_marking/PaperMarkingById";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/dashboard/exam" element={<ExamDuty />} />
          <Route
            path="/dashboard/exam/:examFormId"
            element={<ExamDutyById />}
          />
          <Route path="/dashboard/paper" element={<PaperMarking />} />
          <Route
            path="/dashboard/paper-marking/:PaperMarkingById"
            element={<PaperMarkingById />}
          />
        </Routes>

        <ToastContainer />
      </div>
    </>
  );
}

export default App;
