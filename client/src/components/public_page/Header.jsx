import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import Logo from "../Logo.jsx";
import { ThemeSwitcher } from "../ThemeSwitcher.jsx";

export default function Header() {
  return (
    <Navbar
      shouldHideOnScroll
      maxWidth="full"
      height={"100px"}
      classNames={{ base: "bg-transparent, p-0 m-0" }}
      isBlurred
    >
      <NavbarBrand>
        <Logo />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        <NavbarItem isActive>
          <Link color="warning" href="#">
            Explore🔎
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" aria-current="page" color="foreground">
            Resources📚
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Playground 🛠🛝
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Practice Mode🧑‍💻
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <ThemeSwitcher color="warning" />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="warning"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
