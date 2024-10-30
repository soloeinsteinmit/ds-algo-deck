// PlaygroundDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/Navbar";

/**
 * A layout component that renders a navbar with a logo and a set of links, and
 * an outlet for the main content area.
 *
 * The navbar is fixed height and has a blurred background.
 *
 * The main content area is a flex container that fills the remaining space and
 * has an outlet for the actual content.
 *
 * @returns {JSX.Element} The rendered layout component.
 */
function PlaygroundDashboardLayout() {
  const links = [
    { label: "Home🏠", href: "/dashboard", isActive: true, color: "warning" },
    { label: "Playground 🛠🛝", href: "playground" },
    { label: "Practice Mode🧑‍💻", href: "#" },
    { label: "Resources📚", href: "#", color: "foreground" },
  ];

  const avatarDetails = {
    name: "Jason Hughes",
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey@example.com",
    size: "md",
  };

  const dropdownItems = [
    { key: "settings", label: "My Settings" },
    { key: "team_settings", label: "Team Settings" },
    { key: "analytics", label: "Analytics" },
    { key: "system", label: "System" },
    { key: "configurations", label: "Configurations" },
    { key: "help_and_feedback", label: "Help & Feedback" },
    { key: "logout", label: "Logout" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar - fixed height */}
      {/* <div className="flex-none border-b-2 border-divider"> */}
      <NavbarComponent
        links={links}
        avatarDetails={avatarDetails}
        dropdownItems={dropdownItems}
        isBlurred={true}
        shouldHideOnScroll={false}
        height="4rem"
        classNames={{ wrapper: "bg-content1" }}
        isBordered
      />
      {/* </div> */}

      {/* Main content area - fills remaining space */}
      <div className="flex-1 relative">
        <Outlet />
      </div>
    </div>
  );
}

export default PlaygroundDashboardLayout;
