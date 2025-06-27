// app/not-found.tsx

"use client";
import Link from "next/link";
import { TbMoodSadDizzy, TbArrowLeft, TbMapSearch } from "react-icons/tb";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="responsivePad flex flex-col items-center justify-center min-h-[70vh] text-center py-24 select-none">
      <motion.div
        initial={{ scale: 0.6, rotate: -10, opacity: 0.4 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
        className="mb-6"
      >
        <TbMoodSadDizzy className="mx-auto text-primary" size={90} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="font-extrabold text-primary drop-shadow mb-3 tracking-tight h1"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="text-lg md:text-xl text-primary/90 mb-5 h4 font-semibold"
      >
        Uh oh! We couldn’t find that page.
        <br />
        Maybe you took a wrong turn at Blacktown Station? 🚉
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-col gap-3 w-full items-center"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-hover transition"
        >
          <TbArrowLeft className="inline" size={22} />
          Go Back Home
        </Link>
        <Link
          href="/contact-us"
          className="inline-flex items-center gap-2 px-4 py-2 text-primary border border-primary font-medium rounded-lg hover:bg-primary/10 transition"
        >
          <TbMapSearch className="inline" size={20} />
          Lost? Contact Support
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
        className="mt-10 text-gray-500"
      >
        <span className="italic font-black p">
          “Not all who wander are lost… but this page sure is.” <br />— A1
          Education
        </span>
      </motion.div>
    </section>
  );
}
