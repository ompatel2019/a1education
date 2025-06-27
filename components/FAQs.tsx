// components/FAQs.tsx

"use client";

import React, { useState } from "react";
import {
  sectionClass,
  sectionNameClass,
  sectionSubheadingClass,
} from "@/lib/config/sharedclassesConfig";
import {
  faqsCategories,
  faqsSectionTitle,
  faqsSectionSubheading,
} from "@/lib/config/faqsConfig";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="mb-3">
    <button
      className="w-full flex justify-between items-center text-left py-4 px-6 rounded-lg transition bg-gray-50 hover:bg-blue-50 shadow-sm border border-gray-200"
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <span className="font-medium text-base">{question}</span>
      {isOpen ? (
        <ChevronUp className="ml-3 text-blue-600" />
      ) : (
        <ChevronDown className="ml-3 text-gray-400" />
      )}
    </button>
    {isOpen && (
      <div className="px-7 pb-4 pt-2 text-gray-700 text-sm bg-white rounded-b-lg border border-t-0 border-gray-200 shadow-inner">
        {answer}
      </div>
    )}
  </div>
);

const FAQs = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className={`${sectionClass} bg-white text-black`}>
      <BlurFade delay={0.1} inView>
        <div className="text-center mb-8">
          <h3 className={sectionNameClass}>{faqsSectionTitle.toUpperCase()}</h3>
          <h4 className={sectionSubheadingClass}>{faqsSectionSubheading}</h4>
        </div>
      </BlurFade>
      <BlurFade delay={0.25} inView>
        <div className="flex flex-col gap-12 mx-auto">
          {faqsCategories.map((cat, catIdx) => (
            <div key={cat.categoryTitle}>
              <h5 className="h5 font-semibold mb-4 text-blue-700">
                {cat.categoryTitle}
              </h5>
              <div>
                {cat.items.map((faq, faqIdx) => {
                  const uniqueKey = `${cat.categoryTitle}-${faqIdx}`;
                  return (
                    <FAQItem
                      key={uniqueKey}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={open === uniqueKey}
                      onClick={() =>
                        setOpen(open === uniqueKey ? null : uniqueKey)
                      }
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </BlurFade>
    </section>
  );
};

export default FAQs;
