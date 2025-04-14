import { useTheme } from "next-themes";
import { useEffect } from "react";
import Login from "./components/Authentication/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Authentication/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
