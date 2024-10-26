import React from "react";
import Logo from "../../components/Logo";
import { Button } from "@nextui-org/react";
import { HeroSection } from "../../components/public_page/HeroSection";

function Explore() {
  return (
    <div className="flex flex-col  items-center justify-center h-screen overflow-hidden w-full">
      {/* <Logo />
      <Button color="warning">Get Started</Button> */}

      <HeroSection />
      <div className="relative w-full h-screen">
        {/* Overlay */}
        <div className="absolute inset-0 bg-default-50/30" />{" "}
        {/* Use /50 for 50% opacity */}
        {/* Content */}
        <div className="relative z-10 w-full flex flex-col gap-10 items-center justify-center h-full">
          <h1 className="text-8xl font-bold flex flex-col text-center cursor-default">
            <span>Data Structure</span> &amp;<span> Algorithm Visualizer</span>
          </h1>
          <p className="text-xl cursor-default">
            Learn and explore data structures and algorithms through
            visualizations
          </p>
          <Button color="warning">Get Started</Button>
        </div>
      </div>
    </div>
  );
}

export default Explore;
