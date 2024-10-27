import NavbarComponent from "../components/Navbar";
import Footer from "../components/public_page/Footer";
import Explore from "../pages/Explore/Explore";

function PublicLayout() {
  const links = [
    { label: "Explore🔎", href: "#", isActive: true, color: "warning" },
    { label: "Resources📚", href: "#", color: "foreground" },
    { label: "Playground 🛠🛝", href: "#" },
    { label: "Practice Mode🧑‍💻", href: "#" },
  ];

  const avatarDetails = {
    name: "Jason Hughes",
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey@example.com",
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
    <div>
      <NavbarComponent
        shouldHideOnScroll={true}
        links={links}
        avatarDetails={avatarDetails}
        dropdownItems={dropdownItems}
      />
      <Explore />
      <Footer />
    </div>
  );
}

export default PublicLayout;
