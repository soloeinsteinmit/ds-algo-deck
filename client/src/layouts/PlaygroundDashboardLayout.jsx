import React from "react";
import NavbarComponent from "../components/public_page/Navbar";
import { Outlet } from "react-router-dom";

function PlaygroundDashboardLayout() {
  const links = [
    { label: "Home🏠", href: "#", isActive: true, color: "warning" },
    { label: "Playground 🛠🛝", href: "#" },
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
    <div className="flex flex-col">
      <NavbarComponent
        links={links}
        avatarDetails={avatarDetails}
        dropdownItems={dropdownItems}
        isBlurred={true}
        shouldHideOnScroll={false}
        height="80px"
        classNames={{ wrapper: "bg-content1" }}
      />
      <Outlet />
    </div>
  );
}

export default PlaygroundDashboardLayout;
