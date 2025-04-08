import { useTheme } from "next-themes";
import { useEffect } from "react";
import Login from "./components/Landing/Login/Login";
import Hero from "./components/Landing/Home/Hero";
import About from "./components/Landing/About/About";
import HowItWorksSection from "./components/HowItWorksSection";

function App() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light"); // ✅ Safe to call here
  }, [setTheme]);
  return (
    <>
      {/* <Login />  */}
      <Hero/>
      <About/>
      {/* <HowItWorksSection/> */}
    </>
  );
}

export default App;
