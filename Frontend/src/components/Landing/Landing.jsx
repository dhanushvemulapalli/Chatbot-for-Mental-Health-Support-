import React from "react";
import Hero from "./Hero";
import About from "./About";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import ChatModeDialog from "./ChatModeDialog";

const Landing = () => {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <FeaturesSection />
    </>
  );
};

export default Landing;
