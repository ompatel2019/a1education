// components/ContactForm.tsx

"use client";
import React, { useState, useRef } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { contacts, contactFormHeadings } from "@/lib/config/contactFormConfig";
import {
  sectionClass,
  sectionNameClass,
  sectionSubheadingClass,
} from "@/lib/config/sharedclassesConfig";

const ContactForm: React.FC = () => {
  const [result, setResult] = useState("");
  const [howDidYouFindUs, setHowDidYouFindUs] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.currentTarget);

    const formObject = {
      access_key: "1feabdc6-8f23-4db0-9697-f16d9c4de0ae",
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      school: formData.get("school"),
      year: formData.get("year"),
      howDidYouFindUs: formData.get("howDidYouFindUs"),
      otherSource: formData.get("otherSource"),
      whoReferredYou: formData.get("whoReferredYou"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formObject),
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form submitted successfully!");
        if (formRef.current) {
          formRef.current.reset();
        }
        setHowDidYouFindUs("");
      } else {
        setResult(`Error: ${data.message || "Unknown error occurred"}`);
      }
    } catch (error) {
      setResult(
        `Error submitting form: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <section id="contact" className={sectionClass}>
      <BlurFade delay={0.2} inView>
        <div className="grid grid-cols-3 max-md:flex max-md:flex-col 2xl:gap-20 lg:gap-14 md:gap-10 gap-6">
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
          <div className="col-span-2 max-md:col-span-2 bg-primary/80 backdrop-blur-xl rounded-2xl text-white 2xl:p-16 lg:p-12 md:p-10 p-8 shadow-2xl border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/20 rounded-2xl pointer-events-none" />
            <div className="relative z-10 text-left mb-7 space-y-1">
              <h2 className={sectionNameClass}>
                {contactFormHeadings.name.toUpperCase()}
              </h2>
              <h3 className={sectionSubheadingClass}>
                {contactFormHeadings.subheading}
              </h3>
            </div>
            <form
              onSubmit={onSubmit}
              className="space-y-4 text-base relative z-10"
              method="POST"
              aria-label="Contact Form"
              ref={formRef}
            >
              <div className="lg:flex gap-4 max-lg:space-y-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="name" className="mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white/10 border border-white/30 rounded-md py-3 px-4 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-200"
                    required
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="email" className="mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="johndoe@gmail.com"
                    className="w-full bg-white/10 border border-white/30 rounded-md py-3 px-4 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-200"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="mb-1">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="0412345678"
                  className="w-full bg-white/10 border border-white/30 rounded-md py-3 px-4 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-200"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="school" className="mb-1">
                  School
                </label>
                <input
                  id="school"
                  name="school"
                  type="text"
                  placeholder="Penrith High School"
                  className="w-full bg-white/10 border border-white/30 rounded-md py-3 px-4 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-200"
                />
              </div>
              <div className="lg:flex gap-4 max-lg:space-y-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="year" className="mb-1">
                    Year
                  </label>
                  <select
                    id="year"
                    name="year"
                    className="w-full bg-white/10 border border-white/30 rounded-md py-3 px-4 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                    required
                  >
                    <option value="" disabled className="text-gray-800">
                      Select Year
                    </option>
                    <option value="10" className="text-gray-800">
                      Year 10
                    </option>
                    <option value="11" className="text-gray-800">
                      Year 11
                    </option>
                    <option value="12" className="text-gray-800">
                      Year 12
                    </option>
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="howDidYouFindUs" className="mb-1">
                    How did you find us?
                  </label>
                  <select
                    id="howDidYouFindUs"
                    name="howDidYouFindUs"
                    value={howDidYouFindUs}
                    onChange={(e) => setHowDidYouFindUs(e.target.value)}
                    className="w-full bg-white/10 border border-white/30 rounded-md py-3 px-4 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                    required
                  >
                    <option value="" disabled className="text-gray-800">
                      Select option
                    </option>
                    <option value="Social Media" className="text-gray-800">
                      Social Media
                    </option>
                    <option value="Website" className="text-gray-800">
                      Website
                    </option>
                    <option value="Referral" className="text-gray-800">
                      Referral
                    </option>
                    <option value="Seminar" className="text-gray-800">
                      Seminar
                    </option>
                    <option value="Other" className="text-gray-800">
                      Other
                    </option>
                  </select>
                </div>
              </div>
              {howDidYouFindUs === "Referral" && (
                <div className="flex flex-col">
                  <label htmlFor="whoReferredYou" className="mb-1">
                    Who referred you?
                  </label>
                  <input
                    id="whoReferredYou"
                    name="whoReferredYou"
                    type="text"
                    placeholder="Name of person who referred you"
                    className="w-full bg-white/10 border border-white/30 rounded-md py-3 px-4 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-200"
                    required
                  />
                </div>
              )}
              {howDidYouFindUs === "Other" && (
                <div className="flex flex-col">
                  <label htmlFor="otherSource" className="mb-1">
                    Please specify
                  </label>
                  <input
                    id="otherSource"
                    name="otherSource"
                    type="text"
                    placeholder="How did you hear about us?"
                    className="w-full bg-white/10 border border-white/30 rounded-md py-3 px-4 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-200"
                    required
                  />
                </div>
              )}
              <div className="flex flex-col">
                <label htmlFor="message" className="mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  placeholder="I'd love to get a free trial for Year 12 Economics!"
                  className="bg-white/10 border border-white/30 rounded-md py-3 px-4 w-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center w-full py-3 px-8 rounded-md bg-white text-primary font-semibold transition-all hover:scale-[1.02] hover:bg-purple-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Send Inquiry
              </button>
              {result && <p className="mt-2 text-sm text-white/80">{result}</p>}
            </form>
          </div>
        </div>
      </BlurFade>
    </section>
  );
};

export default ContactForm;
