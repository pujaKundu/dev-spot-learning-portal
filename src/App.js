import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import "./App.css";
import Portal from "./components/student/portal/Portal";
import StudentRegistration from "./components/student/StudentRegistration";
import StudentLogin from "./components/student/StudentLogin";
import CoursePlayer from './components/student/portal/CoursePlayer'
import VideoToPlay from "./components/student/portal/VideoToPlay";

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
          path="/portal"
          element={
            <PrivateRoute>
              <Portal />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/coursevideo/:id"
          element={
            <PrivateRoute>
              <VideoToPlay/>
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;