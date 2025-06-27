// lib/config/footerConfig.tsx

import { FaInstagram, FaGoogle } from "react-icons/fa";

export const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Why Choose Us", href: "/whychooseus" },
  { label: "About Us", href: "/aboutus" },
  { label: "Contact Us", href: "/contact" },
  {
    label: "Leave a Review",
    href: "https://g.page/r/CUphtEkfNIs9EBI/review",
    external: true,
  },
  { label: "Sitemap", href: "/sitemap.xml", external: true },
  {
    label: "Terms & Conditions",
    href: "https://drive.google.com/file/d/14it9qMWyvAu8MiKZpY-nI_Y6kIBVucoZ/view",
    external: true,
  },
  {
    label: "Privacy Policy",
    href: "https://drive.google.com/file/d/1BF1z-fMGrbdK6iQQulVW4Xug31L-xkTj/view",
    external: true,
  },
];

export const footerSocials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/a1educationaustralia/",
    icon: FaInstagram,
    size: 20,
  },
  {
    label: "Google Maps",
    href: "https://www.google.com/maps?sca_esv=0d523a7910ac4013&rlz=1C5CHFA_enAU1102AU1102&output=search&q=a1+education",
    icon: FaGoogle,
    size: 18,
  },
];

export const footerAttribution = {
  text: "Powered by bytesitedigital.",
  href: "https://bytesitedigital.com.au/",
};
