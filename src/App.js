import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import "./App.css";
import Portal from "./components/student/portal/Portal";
import StudentRegistration from "./components/student/StudentRegistration";
import StudentLogin from "./components/student/StudentLogin";
import CoursePlayer from "./components/student/portal/CoursePlayer";
import VideoToPlay from "./components/student/portal/VideoToPlay";
import QuizModal from "./components/student/portal/quiz/QuizModal";
import AdminLogin from "./components/admin/AdminLogin";

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <StudentRegistration />
            </PublicRoute>
          }
        />
        <Route
          path="/portal/:videoId"
          element={
            <PrivateRoute>
              <Portal />
            </PrivateRoute>
          }
        />

        <Route
          path="/quiz/:videoId"
          element={
            <PrivateRoute>
              <QuizModal />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLogin />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
