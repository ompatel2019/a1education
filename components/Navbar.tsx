// components/Navbar.tsx
"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavbarLinkType = {
  name: string;
  to: string;
};

const NavbarLink = ({ name, to }: NavbarLinkType) => {
  const pathname = usePathname();
  const isActive = pathname === to || pathname === to.replace("#", "");

  const baseClass =
    "transition-colors duration-200 hover:text-primary font-medium";
  const activeClass = "text-primary underline underline-offset-4 decoration-2";

  return (
    <Link href={to} scroll={false}>
      <span className={`${baseClass} ${isActive ? activeClass : ""}`}>
        {name}
      </span>
    </Link>
  );
};

export default function NavbarComponent({
  navbarLinks,
}: {
  navbarLinks: NavbarLinkType[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      isBlurred
      maxWidth="full"
      className="sm:px-2 lg:px-4 2xl:px-16"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Mobile - Hamburger on the left */}
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Logo - right on mobile, left on desktop */}
      <NavbarContent
        className="flex flex-row-reverse md:flex-row w-full md:w-auto items-center"
        justify="start"
      >
        <NavbarBrand className="justify-end md:justify-start w-full md:w-auto">
          <Link href="/" scroll={false}>
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

      {/* Mobile menu */}
      <NavbarMenu className="mt-5">
        {navbarLinks.map((link, i) => (
          <NavbarMenuItem key={`${link.name}-${i}`}>
            <Link
              href={link.to}
              scroll={false}
              className="text-lg text-foreground hover:text-primary transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      {/* Center nav links - desktop only */}
      <NavbarContent className="hidden md:flex gap-4" justify="end">
        {navbarLinks.map(
          (link, i) =>
            link.name !== "Enrol Now" && (
              <NavbarItem key={i}>
                <NavbarLink name={link.name} to={link.to} />
              </NavbarItem>
            )
        )}
      </NavbarContent>

      {/* Enrol Now - desktop only */}
      <NavbarContent className="hidden md:flex" justify="end">
        {navbarLinks.map(
          (link, i) =>
            link.name === "Enrol Now" && (
              <NavbarItem key={i}>
                <Button
                  as={Link}
                  href={link.to}
                  color="primary"
                  variant="flat"
                  scroll={false}
                  className="text-white hover:opacity-90 bg-primary !rounded-sm font-medium w-24"
                >
                  {link.name}
                </Button>
              </NavbarItem>
            )
        )}
      </NavbarContent>
    </Navbar>
  );
}
