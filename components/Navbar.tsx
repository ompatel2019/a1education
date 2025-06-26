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
import { BlurFade } from "./magicui/blur-fade";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

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
          <Image
            src="/logo.png"
            alt="A1 Education main logo"
            width={146}
            height={48}
            className="w-[88px] h-[30px] lg:w-[128px] lg:h-[40px]"
            priority
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.to;
          return (
            <NavbarItem key={index}>
              <Link
                href={item.to}
                color="foreground"
                className={`transition-colors duration-200 hover:text-primary ${
                  isActive
                    ? "font-semibold underline decoration-2 underline-offset-5 text-primary"
                    : ""
                }`}
              >
                {item.name}
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

      <NavbarMenu className="font-medium bg-white">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.to;
          return (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link
                className={`transition-colors duration-200 hover:text-primary ${
                  isActive
                    ? "font-semibold underline decoration-2 underline-offset-5 text-primary"
                    : ""
                }`}
                color="foreground"
                href={item.to}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}
