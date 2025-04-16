import React from "react";
import Hero from "../Landing/Hero";
import About from "../Landing/About";
import FeaturesSection from "../Landing/FeaturesSection";
import HowItWorks from "../Landing/HowItWorks";
import ChatModeDialog from "../ChatModeDialog";
import ResourcesSection from "../ResourcesSection";

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
