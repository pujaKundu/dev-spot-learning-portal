import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import "./App.css";
import Portal from "./components/student/portal/Portal";
import StudentRegistration from "./components/student/StudentRegistration";
import StudentLogin from "./components/student/StudentLogin";
import QuizModal from "./components/student/portal/quiz/QuizModal";
import AdminLogin from "./components/admin/AdminLogin";
import {
  Dashboard,
  Assignment,
  AssignmentMark,
  Videos,
  Quiz,AddVideo, EditVideo
} from "./components/admin/index";

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
        {/* admin routes start */}
        <Route
          path="/admin"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <PrivateRoute>
              <Videos />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/videos/add"
          element={
            <PrivateRoute>
              <AddVideo />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/videos/edit/:id"
          element={
            <PrivateRoute>
              <EditVideo />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/assignment"
          element={
            <PrivateRoute>
              <Assignment />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/quiz"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/assignmentMark"
          element={
            <PrivateRoute>
              <AssignmentMark />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
