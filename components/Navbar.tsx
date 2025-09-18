// components/Navbar.tsx

"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
} from "@heroui/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { menuItems } from "@/lib/config/navbarConfig";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [atTop, setAtTop] = React.useState(true);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      isBlurred
      className="md:px-2 lg:px-6 font-medium bg-white"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="A1 Education main logo"
              width={146}
              height={48}
              className="w-[88px] h-[30px] lg:w-[128px] lg:h-[40px]"
              priority
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-6 lg:gap-8" justify="center">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.to;
          return (
            <NavbarItem key={index}>
              <Link
                href={item.to}
                color="foreground"
                className={`relative transition-all duration-300 hover:text-primary hover:opacity-100 group ${
                  isActive
                    ? "font-semibold underline decoration-2 underline-offset-5 text-primary"
                    : "hover:scale-105"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {!isActive && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/contact-us">
            <Button className="bg-primary w-32 rounded-sm text-white font-medium">
              Enrol Now
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/*
        IMPORTANT: Only render <NavbarMenuItem> as direct children of <NavbarMenu> for accessibility.
        Do NOT put <div>, <Button>, or any other element directly inside <NavbarMenu>.
      */}
      <NavbarMenu
        className={`font-medium bg-white ${atTop ? "mt-[54px] sm:mt-12" : "mt-0"} md:mt-0`}
      >
        {menuItems.map((item, index) => {
          const isActive = pathname === item.to;
          return (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                className={`relative transition-all duration-300 hover:text-primary hover:opacity-100 group ${
                  isActive
                    ? "font-semibold underline decoration-2 underline-offset-5 text-primary"
                    : "hover:scale-105"
                }`}
                color="foreground"
                href={item.to}
              >
                <span className="relative z-10">{item.name}</span>
                {!isActive && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
            </NavbarMenuItem>
          );
        })}
        {/*
          // Uncomment below to enforce at runtime (optional):
          // if (React.Children.toArray(children).some(child => child.type !== NavbarMenuItem)) {
          //   throw new Error('Only <NavbarMenuItem> allowed as children of <NavbarMenu>');
          // }
        */}
      </NavbarMenu>
    </Navbar>
  );
}
