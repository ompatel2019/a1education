// lib/config/navbarConfig.tsx

export type MenuItem = {
  name: string;
  to: string;
};

export const menuItems: MenuItem[] = [
  { name: "Home", to: "/" },
  { name: "The A1 Formula", to: "/specialty" },
  { name: "The A1 Difference", to: "/why-choose-us" },
  { name: "About A1", to: "/about-us" },
  { name: "Pricing", to: "/pricing" },
  { name: "Blogs", to: "/blogs" },
];

export const fullNavbarLinks: MenuItem[] = [
  ...menuItems,
  { name: "Enrol Now", to: "/contact-us" },
];
