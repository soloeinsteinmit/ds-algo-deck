import React from "react";
import Logo from "../../components/Logo";
import { Button } from "@nextui-org/react";
import { HeroSection } from "../../components/public_page/HeroSection";
import {
  CustomButton,
  CustomButton1,
} from "../../components/public_page/CustomButtons";

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
            <span>
              Master <span className="text-warning">Data Structures</span>
            </span>{" "}
            <span>&amp;</span>
            <span>
              <span className="text-warning">Algorithms</span> Visually!
            </span>
          </h1>
          <p className="text-xl cursor-default">
            An interactive tool for learning and visualizing data structures and
            algorithms in real-time.
          </p>
          <div className="flex space-x-10">
            <CustomButton />
            <CustomButton1 text="Learn More" />
          </div>
          {/* <Button color="warning">Get Started</Button> */}
        </div>
      </div>
    </div>
  );
}

export default Explore;
