// lib/config/navbarConfig.tsx

export type MenuItem = {
    name: string;
    to: string;
  };
  
  export const menuItems: MenuItem[] = [
    { name: "Home", to: "/" },
    { name: "Specialty", to: "/specialty" },
    { name: "Why Choose Us", to: "/why-choose-us" },
    { name: "About Us", to: "/about-us" },
    { name: "Pricing", to: "/pricing" },
    { name: "Blogs", to: "/blogs" },
  ];
  
  export const fullNavbarLinks: MenuItem[] = [
    ...menuItems,
    { name: "Enrol Now", to: "/contact-us" },
  ];
  