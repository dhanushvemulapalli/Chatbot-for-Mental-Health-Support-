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
import AnonymousLayout from "./components/layouts/AnonymousLayout";

function App() {
  const { setTheme } = useTheme();
  const [loggedIn, setLoggedIn] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [Preferences, setPreferences] = useState(false); // Add state to hold user preferences
  const [name, setName] = useState(""); // Add state to hold user name
  const [loading, setLoading] = useState(true); // Add loading state

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/check-user-type/",
        {
          withCredentials: true,
        }
      );

      if (response.data.type === "logged-in") {
        setLoggedIn(true);
        setAnonymous(false);
        setName(response.data.user);
      } else if (response.data.type === "anonymous") {
        setLoggedIn(false);
        setAnonymous(true);
        setName("Anonymous");
      } else {
        setLoggedIn(false);
        setAnonymous(false);
      }
    } catch (error) {
      console.log(error);
      setLoggedIn(false);
      setAnonymous(false);
    } finally {
      setLoading(false); // Done checking
    }
  };

  const checkPreferncesStatus = async () => {
    console.log("Attempting to check Preferences status...");
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/check-user-preference/",
        {
          withCredentials: true,
        }
      );
      console.log(
        "Preferences status response:",
        response.data.has_emergency_contacts
      );
      if (
        response.data.has_emergency_contacts === true &&
        response.data.has_emergency_contacts !== null
      ) {
        setPreferences(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setTheme("light");
    checkLoginStatus();
  }, [setTheme]);

  useEffect(() => {
    if (loggedIn) {
      checkPreferncesStatus();
    }
  }, [loggedIn]);

  if (loading) return <div>Loading...</div>; // or a spinner
  return (
    <BrowserRouter>
      <Routes>
        {/* Anonymous User Pages (similar to logged-in but limited access) */}
        {anonymous === true && (
          <>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                <AnonymousLayout checkLoginStatus={checkLoginStatus}>
                  <Dashboard Preferences={true} name={name} />
                </AnonymousLayout>
              }
            />
            <Route
              path="/resources"
              element={
                <AnonymousLayout checkLoginStatus={checkLoginStatus}>
                  <ResourcesSection />
                </AnonymousLayout>
              }
            />
            <Route
              path="/Chats"
              element={
                <AnonymousLayout checkLoginStatus={checkLoginStatus}>
                  <Chat />
                </AnonymousLayout>
              }
            />
          </>
        )}

        {/* Public Pages */}
        {loggedIn === false && (
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
                  <ChatModeDialog checkLoginStatus={checkLoginStatus} />
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
                  <Dashboard Preferences={Preferences} name={name} />
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
