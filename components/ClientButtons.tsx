// components/ClientButtons.tsx

"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { heroButtons } from "@/lib/config/heroConfig";

const ClientButtons = () => {
  return (
    <div className="flex justify-center">
      {heroButtons.map((button, index) => (
        <Link href={button.to} key={index}>
          <Button className="bg-gradient-to-br from-white via-gray-50 to-white hover:from-primary hover:via-primary/90 hover:to-primary hover:text-white transition-all duration-500 rounded-2xl font-semibold px-12 py-6 text-lg shadow-2xl hover:shadow-primary/30 hover:scale-110 transform border-2 border-white/30 hover:border-primary/40 backdrop-blur-sm relative overflow-hidden group">
            <span className="relative z-10 tracking-wide">{button.name}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default ClientButtons;
