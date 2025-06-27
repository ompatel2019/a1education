// lib/config/contactFormConfig.tsx

export interface ContactCard {
  icon: React.ReactNode;
  contactType: string;
  contactDesc: string;
  contactInformation: string;
  contactRedirect: string;
}

import { Mail, MapPin, Phone } from "lucide-react";

export const contacts: ContactCard[] = [
  {
    icon: <Mail size={24} />,
    contactType: "Email",
    contactDesc: "Send us an email and we will get back to you.",
    contactInformation: "admin@a1education.com.au",
    contactRedirect: "mailto:admin@a1education.com.au",
  },
  {
    icon: <MapPin size={24} />,
    contactType: "Location",
    contactDesc: "Our in-person classes are in Blacktown.",
    contactInformation: "207/30 Campbell Street, Blacktown NSW 2148",
    contactRedirect: "https://g.co/kgs/vpV449u",
  },
  {
    icon: <Phone size={24} />,
    contactType: "Phone",
    contactDesc: "Mon - Fri 8am to 5pm",
    contactInformation: "0402 097 284",
    contactRedirect: "tel:0402 097 284",
  },
];

export const contactFormHeadings = {
  name: "Contact Form",
  subheading: "Get in Touch / Start Your Free Trial",
  formSubheading:
    "Ready to join A1 Education or have questions about HSC Economics tutoring in Sydney? Reach out to us—our friendly team is here to help.",
};
