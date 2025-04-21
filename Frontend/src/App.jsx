import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
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
import ForgotPassword from "./components/Pages/ForgotPassword";
import Chat from "./components/Dashboard/Chat";
import axios from "axios"; // Import axios

function App() {
  const { setTheme } = useTheme();
  const [loggedIn, setLoggedIn] = useState(false); // Add state to hold login status

  const checkLoginStatus = async () => {
    console.log("Attempting to check login status...");
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/check-session/",
        {
          withCredentials: true,
        }
      );
      console.log("Login status response:", response);
      setLoggedIn(response.data.loggedIn === true);
    } catch (error) {
      console.log(error);
      setLoggedIn(false);
    }
  };
  useEffect(() => {
    setTheme("light");

    checkLoginStatus();
  }, [setTheme]);
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        {loggedIn === false && (
          <>
            <Route
              path="/"
              element={
                <PublicLayout >
                  <Landing />
                </PublicLayout>
              }
            />
            <Route
              path="/login"
              element={
                <PublicLayout>
                  <Login checkLoginStatus={checkLoginStatus} />
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
              path="/forgot-password"
              element={
                <PublicLayout>
                  <ForgotPassword />
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
        {loggedIn === true && (
          <>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                <PrivateLayout checkLoginStatus={checkLoginStatus}>
                  <Dashboard />
                </PrivateLayout>
              }
            />
            <Route
              path="/resources"
              element={
                <PrivateLayout checkLoginStatus={checkLoginStatus}>
                  <ResourcesSection />
                </PrivateLayout>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateLayout checkLoginStatus={checkLoginStatus}>
                  <ChatHistory />
                </PrivateLayout>
              }
            />
            <Route
              path="/Chats"
              element={
                <PrivateLayout checkLoginStatus={checkLoginStatus}>
                  <Chat />
                </PrivateLayout>
              }
            />
          </>
        )}

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
