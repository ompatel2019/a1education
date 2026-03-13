// components/ContactForm.tsx

"use client";
import React from "react";
import Script from "next/script";
import { BlurFade } from "@/components/magicui/blur-fade";
import { contacts } from "@/lib/config/contactFormConfig";
import {
  sectionClass,
} from "@/lib/config/sharedclassesConfig";

const ContactForm: React.FC = () => {
  return (
    <section id="contact" className={sectionClass}>
      <BlurFade delay={0.2} inView>
        <div className="grid grid-cols-2 max-md:flex max-md:flex-col gap-6">
          {/* CONTACT CARDS */}
          <div className="flex flex-col justify-between max-md:order-2">
            <div className="space-y-8">
              {contacts.map((item, idx) => (
                <div key={idx} className="flex space-x-4 items-start">
                  <div className="h5 text-primary">{item.icon}</div>
                  <div className="space-y-1">
                    <div className="font-generalSans-semibold">
                      {item.contactType}
                    </div>
                    <div className="font-generalSans-medium text-sm text-gray-600 dark:text-gray-300">
                      {item.contactDesc}
                    </div>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={item.contactRedirect}
                      className="font-generalSans-bold text-blue-600 hover:underline"
                    >
                      {item.contactInformation}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="p-2 border rounded-md bg-[#6a7dfa]">
            <Script
              src="https://js-ap1.hsforms.net/forms/embed/442828550.js"
              strategy="afterInteractive"
              defer
            />
            <div
              className="hs-form-frame space-y-4 text-base relative z-10"
              data-region="ap1"
              data-form-id="0beba757-8d30-4cc0-a3df-f7e497bbb847"
              data-portal-id="442828550"
            />
          </div>
        </div>
      </BlurFade>
    </section>
  );
};

export default ContactForm;
