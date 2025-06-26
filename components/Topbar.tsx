// components/Topbar.tsx
import { MapPin, Phone } from "lucide-react";
import React from "react";

const Topbar = () => {
  const leftText =
    "A1 Education – Specialists in Year 11 & 12 Economics Tutoring in Sydney";
  const number = "0402 097 284";
  const location = "207/30 Campbell Street, Blacktown NSW 2148";

  return (
    <header className="bg-primary text-white w-full">
      <div
        className="flex flex-col md:flex-row items-center justify-between
        px-4 sm:px-6 lg:px-12 2xl:px-24 py-4 md:py-6 2xl:py-8
        gap-2 md:gap-4 text-sm md:text-base max-lg:justify-center font-semibold"
      >
        <p>{leftText}</p>

        <div className="max-lg:hidden flex flex-col sm:flex-row sm:items-center sm:gap-6 text-center md:text-left">
          <a
            target="_blank"
            rel="noreferrer"
            href="tel:0402097284"
            className="flex items-center gap-2 hover:underline"
            aria-label="Call A1 Education"
          >
            <Phone className="size-5 md:size-6" />
            <span>{number}</span>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://g.co/kgs/vpV449u"
            className="flex items-center gap-2 hover:underline"
            aria-label="View location on Google Maps"
          >
            <MapPin className="size-5 md:size-6" />
            <span>{location}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
