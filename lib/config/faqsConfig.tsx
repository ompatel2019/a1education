// lib/config/faqsConfig.tsx

export const termUrl =
  "https://drive.google.com/file/d/14it9qMWyvAu8MiKZpY-nI_Y6kIBVucoZ/view?ts=67b00b7b";
export const privacyUrl =
  "https://drive.google.com/file/d/1BF1z-fMGrbdK6iQQulVW4Xug31L-xkTj/view?ts=67b00c59";

export const faqsCategories = [
  {
    categoryTitle: "Fees & Payment",
    items: [
      {
        question: "How does your payment work?",
        answer:
          "Our classes operate on a pre-paid, per-term basis. You can complete your payment securely online.",
      },
    ],
  },
  {
    categoryTitle: "Free Trial & Enrollment",
    items: [
      {
        question: "Is there a free trial?",
        answer:
          "Yes! We offer a free trial lesson for new students, no commitment required.",
      },
      {
        question: "What happens during the free trial?",
        answer:
          "During the trial, you attend a full lesson, experience our teaching style, and get access to materials.",
      },
      {
        question: "How do I enrol?",
        answer: (
          <>
            You can enrol by filling out the form on our{" "}
            <a href="/contact" className="text-blue-600 underline">
              contact
            </a>{" "}
            page, calling{" "}
            <a href="tel:+61 402 097 284" className="text-blue-600 underline">
              +61 402 097 284
            </a>{" "}
            or emailing{" "}
            <a
              href="mailto:contact@a1education.com.au"
              className="text-blue-600 underline"
            >
              contact@a1education.com.au
            </a>
            .
          </>
        ),
      },
      {
        question: "Where can I find the Terms and Conditions?",
        answer: (
          <>
            You can access our Terms and Conditions{" "}
            <a
              href={termUrl}
              target="_blank"
              className="text-blue-600 underline"
            >
              here
            </a>{" "}
            and our Privacy Policy{" "}
            <a
              href={privacyUrl}
              target="_blank"
              className="text-blue-600 underline"
            >
              here
            </a>
            .
          </>
        ),
      },
    ],
  },
  {
    categoryTitle: "Resources & Support",
    items: [
      {
        question: "Do you provide resources?",
        answer:
          "Absolutely. We have notes, practice questions, and exam tips that helped many students score 90+ in HSC.",
      },
      {
        question: "Do you provide marking and feedback?",
        answer:
          "Yes! We offer free marking and personalised feedback on assignments, essays, and practice exams.",
      },
      {
        question: "Do you provide homework?",
        answer: "Yes. We provide weekly homework to reinforce key concepts.",
      },
    ],
  },
  {
    categoryTitle: "Classes & Scheduling",
    items: [
      {
        question: "How long are the lessons?",
        answer:
          "Each lesson is 2 hours, allowing time to cover content, reinforce understanding, and tackle exam questions.",
      },
      {
        question: "What subjects do you offer tutoring for?",
        answer: "Currently, we focus on Year 11 and 12 Economics in Sydney.",
      },
      {
        question: "Do you offer one-on-one tutoring?",
        answer:
          "Right now, we primarily offer group classes to maintain a collaborative learning environment.",
      },
      {
        question: "Where are the classes held?",
        answer:
          "We hold in-person classes at 207/30 Campbell St, Blacktown NSW 2148, plus online sessions.",
      },
      {
        question: "How do I access online classes?",
        answer:
          "You'll receive a Google Meet link. All online lessons are live, interactive, and recorded.",
      },
      {
        question: "What if I miss a class?",
        answer:
          "You can watch the recorded session or arrange a makeup class if available.",
      },
      {
        question: "Can I switch between in-person and online?",
        answer: "Yes, just let us know in advance.",
      },
    ],
  },
  {
    categoryTitle: "Tutors & Expertise",
    items: [
      {
        question: "Who are the tutors?",
        answer:
          "Our tutors are high-achieving graduates with top HSC and ATAR results.",
      },
    ],
  },
];

export const faqsSectionTitle = "FAQs";
export const faqsSectionSubheading =
  "Commonly asked questions students ask time to time.";
