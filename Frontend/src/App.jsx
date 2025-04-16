import { useTheme } from "next-themes";
import { useEffect } from "react";
import Login from "./components/Pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Pages/Signup";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./components/Pages/Landing";
import ChatModeDialog from "./components/ChatModeDialog";
import ResourcesSection from "./components/ResourcesSection";
import Dashboard from "./components/Pages/Dashboard";
import ChatHistory from "./components/Dashboard/ChatHistory";
import PublicLayout from "./components/layouts/PublicLayout";
import PrivateLayout from "./components/layouts/PrivateLayout";

function App() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light"); // ✅ Safe to call here
  }, [setTheme]);

  const isLoggedIn = () => {
    // return localStorage.getItem('token') !== null;
    return true; // Placeholder for actual authentication check
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}
          {!isLoggedIn() && (
            <>
              <Route
                path="/"
                element={
                  <PublicLayout>
                    <Landing />
                  </PublicLayout>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicLayout>
                    <Login />
                  </PublicLayout>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicLayout>
                    <Signup />
                  </PublicLayout>
                }
              />
              <Route
                path="/Companion"
                element={
                  <PublicLayout>
                    <ChatModeDialog />
                  </PublicLayout>
                }
              />
              <Route
                path="/resources"
                element={
                  <PublicLayout>
                    <ResourcesSection />
                  </PublicLayout>
                }
              />
            </>
          )}

          {/* Private (Logged In) Pages */}
          {isLoggedIn() && (
            <>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateLayout>
                    <Dashboard />
                  </PrivateLayout>
                }
              />
              <Route
                path="/resources"
                element={
                  <PrivateLayout>
                    <ResourcesSection />
                  </PrivateLayout>
                }
              />
              <Route
                path="/history"
                element={
                  <PrivateLayout>
                    <ChatHistory />
                  </PrivateLayout>
                }
              />
            </>
          )}

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
