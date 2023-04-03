import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import "./App.css";
import AdminLogin from "./components/admin/AdminLogin";
import {
  Portal,
  StudentRegistration,
  QuizModal,
  StudentLogin,
} from "./components/student/index";
import {
  Dashboard,
  Assignments,
  AssignmentMark,
  Videos,
  Quiz,
  AddVideo,
  EditVideo,
  AddAssignment,
  EditAssignment,
  AddQuiz,
  EditQuiz,
} from "./components/admin/index";
import Leaderboard from "./components/student/leaderboard/Leaderboard";
import NotFound from './components/NotFound'

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
          path="*"
          element={
            <PublicRoute>
              <NotFound />
            </PublicRoute>
          }
        />
        {/* student routes */}
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
          path="/leaderboard/:id"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        {/* student routes ends */}
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
        {/* admin routes for videos */}
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
        {/* admin routes for assignments */}
        <Route
          path="/admin/assignment"
          element={
            <PrivateRoute>
              <Assignments />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/assignment/add"
          element={
            <PrivateRoute>
              <AddAssignment />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/assignment/edit/:id"
          element={
            <PrivateRoute>
              <EditAssignment />
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
          path="/admin/quiz/add"
          element={
            <PrivateRoute>
              <AddQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/quiz/edit/:id"
          element={
            <PrivateRoute>
              <EditQuiz />
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
