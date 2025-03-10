import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LodingSipnner";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/useThemeStore";
import EmailVerification from '././AuthPages/EmailVerification.jsx';
import ForgetPassword from "././AuthPages/ForgetPassword.jsx";
import LoginPage from "././AuthPages/LoginPage.jsx";
import ResetPassword from "././AuthPages/ResetPassword.jsx";
import SignUpPage from "././AuthPages/SignUpPage.jsx";
import Home from "./HomePage/Home";
import Navbar from "./pages/NavBar";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";




const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <>
    <div data-theme={theme}>
     <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage/>
            </ProtectedRoute>
          }
        />
          <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route
          path="/forget-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgetPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>
      <Toaster />
      </div>
    </>
  );
}

export default App;
