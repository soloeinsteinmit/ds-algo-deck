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

export default function NavbarComponent({
  logoComponent = <Logo />,
  links = [],
  avatarDetails = {
    name: "User",
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "user@example.com",
    size: "sm",
  },
  dropdownItems = [],
  showThemeSwitcher = true,
  shouldHideOnScroll = false,

  isBlurred = true,
  height = "100px",
  props,
}) {
  return (
    <Navbar
      shouldHideOnScroll={shouldHideOnScroll}
      maxWidth="full"
      height={height}
      classNames={{ base: "bg-transparent, p-0 m-0" }}
      isBlurred={isBlurred}
      {...props}
    >
      <NavbarBrand>{logoComponent}</NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-7 " justify="center">
        {links.map((link, index) => (
          <NavbarItem key={index} isActive={link.isActive}>
            <Link color={link.color || "foreground"} href={link.href}>
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {showThemeSwitcher && <ThemeSwitcher size="md" color="warning" />}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="warning"
              name={avatarDetails.name}
              size={avatarDetails.size}
              src={avatarDetails.src}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{avatarDetails.email}</p>
            </DropdownItem>
            {dropdownItems.map((item, index) => (
              <DropdownItem
                key={item.key || index}
                color={item.color || "default"}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
