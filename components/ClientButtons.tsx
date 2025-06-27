// components/ClientButtons.tsx

"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { heroButtons } from "@/lib/config/heroConfig";

const ClientButtons = () => {
  return (
    <div className="flex gap-2 justify-center">
      {heroButtons.map((button, index) => (
        <Link href={button.to} key={index}>
          <Button
            className="bg-white hover:bg-primary hover:text-white transition-colors rounded-sm font-medium lg:h-14 sm:h-12 h-10 lg:w-50 sm:w-40 w-30 md:text-lg text-sm"
          >
            {button.name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default ClientButtons;
