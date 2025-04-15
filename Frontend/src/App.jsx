import { useTheme } from "next-themes";
import { useEffect } from "react";
import Login from "./components/Authentication/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Authentication/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import ChatModeDialog from "./components/ChatModeDialog";
import ResourcesSection from "./components/ResourcesSection";
import Dashboard from "./components/Dashboard/Dashboard";
import ChatHistory from "./components/Dashboard/ChatHistory";

function App() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light"); // ✅ Safe to call here
  }, [setTheme]);
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Companion" element={<ChatModeDialog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resources" element={<ResourcesSection />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/History" element={<ChatHistory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
