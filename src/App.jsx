import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import SlotBooking from "./pages/SlotBooking/SlotBooking";
import CurriculumTracker from "./pages/CurriculumTracker/CurriculumTracker";
import MockTestCenter from "./pages/MockTestCenter/MockTestCenter";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";
import "./App.css";

/*
 * ── ProtectedRoute ────────────────────────────────────────────────────────
 * Wraps any page that requires a registered student.
 * If studentData is null (no one has signed up yet), redirect to /sign-up.
 * ─────────────────────────────────────────────────────────────────────────
 */
function ProtectedRoute({ studentData, children }) {
  if (!studentData) {
    return <Navigate to="/sign-up" replace />;
  }
  return children;
}

function App() {
  /*
   * studentData holds the form values submitted in SignUp.
   * null  → not registered yet  (gates protected routes)
   * object → registered student  (passed as props to Dashboard & Profile)
   *
   * Shape: { fullName, city, mobile, licenseType }
   * (password is intentionally excluded — never store plaintext passwords
   *  in application state beyond what is strictly necessary)
   */
  const [studentData, setStudentData] = useState(null);

  // Derive initials for the Navbar avatar (e.g. "Aryan Mehta" → "AM")
  function getInitials(name) {
    if (!name) return "?";
    return name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");
  }

  return (
    <BrowserRouter>
      {/*
       * Pass studentData + initials to Navbar so the avatar and
       * dropdown always reflect the currently registered student.
       */}
      <Navbar
        studentData={studentData}
        initials={studentData ? getInitials(studentData.fullName) : "?"}
      />

      <main className="app__main">
        <Routes>
          {/*
           * Root "/" → Sign-Up page.
           * Once registered, the user is sent to /dashboard by SignUp.jsx.
           */}
          <Route
            path="/"
            element={<SignUp onRegister={setStudentData} />}
          />

          {/* Public routes — accessible without being registered */}
          <Route path="/sign-up" element={<SignUp onRegister={setStudentData} />} />
          <Route path="/about"   element={<About />} />

          {/* Protected routes — redirect to /sign-up if not registered */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute studentData={studentData}>
                <Dashboard studentData={studentData} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute studentData={studentData}>
                <Profile studentData={studentData} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-slot"
            element={
              <ProtectedRoute studentData={studentData}>
                <SlotBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/curriculum"
            element={
              <ProtectedRoute studentData={studentData}>
                <CurriculumTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mock-test"
            element={
              <ProtectedRoute studentData={studentData}>
                <MockTestCenter />
              </ProtectedRoute>
            }
          />

          {/* Catch-all: anything unknown goes back to sign-up */}
          <Route path="*" element={<Navigate to="/sign-up" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
