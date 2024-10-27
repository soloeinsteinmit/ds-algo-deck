import React from "react";

import { HeroSection } from "../../components/public_page/HeroSection";
import {
  CustomButton,
  CustomButton1,
} from "../../components/public_page/CustomButtons";
import FeaturesCard from "../../components/public_page/FeaturesCard";

import {
  PiCodeDuotone,
  PiGraphDuotone,
  PiDatabaseDuotone,
  PiBooksDuotone,
  PiChartLineUpDuotone,
  PiUsersFourDuotone,
} from "react-icons/pi";

function Explore() {
  return (
    <div className="flex flex-col  items-center justify-center overflow-hidden w-full">
      {/* <Logo />
      <Button color="warning">Get Started</Button> */}

      <HeroSection />
      <div className="relative w-full h-screen">
        {/* Overlay */}
        <div className="absolute inset-0 bg-default-50/30" /> {/* Content */}
        <div className="relative z-10 w-full flex flex-col gap-10 items-center justify-center h-full">
          <h1 className="text-8xl font-bold flex flex-col text-center cursor-default">
            <span>
              Master💪 <span className="text-warning">Data Structures</span>
            </span>{" "}
            <span>&amp;</span>
            <span>
              <span className="text-warning">Algorithms</span> Visually👁️!
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
      <div className="relative h-fit my-10 w-full flex flex-col gap-10 items-center justify-center">
        <h2 className="text-8xl font-bold mb-10">
          Key <span className="text-warning">Features✨💡</span>{" "}
        </h2>
        <div className="flex gap-5 flex-wrap items-start justify-center h-96">
          <FeaturesCard
            icon={<PiDatabaseDuotone />}
            title="Data Structures Visualizer🔓"
            description="Dive into various data structures with interactive and dynamic visualizations, helping you understand how they work under the hood."
          />
          <FeaturesCard
            icon={<PiGraphDuotone />}
            title="Algorithm Visualizer🔒"
            description="Watch algorithms in action with step-by-step animations, making complex concepts easy to grasp and master."
          />
          <FeaturesCard
            icon={<PiCodeDuotone />}
            title="Interactive Code Editor🔒"
            description="Write and test your code with real-time syntax highlighting, auto-completion, and error detection to enhance your coding experience."
          />
        </div>
        <div className="flex gap-5 flex-wrap items-start justify-center h-96">
          <FeaturesCard
            icon={<PiBooksDuotone />}
            title="Educational Resources🔒"
            description="Access a library of tutorials, articles, and guides to deepen your understanding of data structures and algorithms."
          />
          <FeaturesCard
            icon={<PiChartLineUpDuotone />}
            title="Progress Tracking🔒"
            description="Track your learning journey and monitor your progress through interactive quizzes and challenges."
          />
          <FeaturesCard
            icon={<PiUsersFourDuotone />}
            title="Community Support🔒"
            description="Connect with a community of learners and experts, ask questions, and share your knowledge."
          />
        </div>
      </div>
    </div>
  );
}

export default Explore;
