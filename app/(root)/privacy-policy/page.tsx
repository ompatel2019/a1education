import type { Metadata } from "next";
import PageTitle from "@/components/PageTitle";

const sections = [
  {
    title: "About Our Services",
    paragraphs: [
      "A1 Education provides structured group tutoring programs for secondary school students. Lessons may be delivered in person or online and follow a term-based structure aligned with school curricula. A1 Education does not offer one-on-one private tutoring.",
      "Class sizes are capped to maintain teaching quality, and lesson formats, tutors, or schedules may be adjusted where reasonably required.",
    ],
  },
  {
    title: "Enrolment & Participation",
    paragraphs: [
      "Enrolment is confirmed once a student:",
      "All enrolments are personal to the student and may not be transferred. Continued attendance in classes indicates ongoing acceptance of these Terms.",
      "A1 Education reserves the right to refuse or discontinue enrolment where these Terms are breached or where conduct disrupts the learning environment.",
    ],
    items: [
      "Attends a free trial lesson; or",
      "Commences a paid term with an issued invoice.",
    ],
  },
  {
    title: "Fees, Invoices & Payment Obligations",
    paragraphs: [
      "Tutoring fees are charged per school term and cover all scheduled lessons within that term.",
      "Invoices are issued prior to the start of term and must be settled by the stated due date. If payment is not received on time, A1 Education may temporarily suspend access to classes and resources until payment is finalised.",
      "Any discounts or promotional pricing apply only to the specific term stated and do not create an entitlement for future terms.",
    ],
  },
  {
    title: "Missed Lessons & Refunds",
    paragraphs: [
      "Tutoring fees are payable for the full term regardless of attendance.",
      "Refunds are not provided once a term has commenced, except where required under Australian Consumer Law. Requests relating to exceptional circumstances, such as serious illness, may be reviewed at A1 Education's discretion.",
      "Lesson notes, recordings, and supplementary materials are not refundable once issued.",
      "Students wishing to discontinue classes must provide at least one week's written notice. Administrative fees may apply depending on timing.",
    ],
  },
  {
    title: "Free Trial Lessons",
    paragraphs: [
      "A1 Education offers a complimentary trial lesson to help students experience our teaching style and classroom environment.",
      "Once a student continues into paid lessons, a change of mind regarding tutor preference does not entitle the student to a refund.",
    ],
  },
  {
    title: "Learning Environment & Behaviour",
    paragraphs: [
      "Students are expected to participate respectfully and constructively in all classes, whether in person or online.",
      "Disruptive behaviour, inappropriate language, or conduct that affects tutors or other students may result in suspension or removal from classes without refund.",
      "A1 Education upholds academic honesty and does not assist with or condone academic misconduct.",
    ],
  },
  {
    title: "Learning Materials & Recordings",
    paragraphs: [
      "All lesson materials, notes, worksheets, and recordings provided by A1 Education are for personal educational use only.",
      "These materials must not be copied, shared, distributed, or used for commercial purposes without written permission. Unauthorised use may result in termination of access and further action.",
    ],
  },
  {
    title: "Results & Liability",
    paragraphs: [
      "While A1 Education is committed to delivering high-quality tutoring, academic outcomes vary between students and no specific results are guaranteed.",
      "To the extent permitted by law, A1 Education is not responsible for indirect or consequential losses arising from participation in tutoring services.",
    ],
  },
  {
    title: "Changes & Updates",
    paragraphs: [
      "A1 Education may update these Terms from time to time. Continued use of services after updates constitutes acceptance of the revised Terms.",
    ],
  },
  {
    title: "Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of New South Wales, Australia.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Terms of Service | A1 Education",
  description:
    "Read A1 Education's Terms of Service for enrolment, fees, refunds, class participation, materials, and contact details.",
  alternates: {
    canonical: "https://a1education.com.au/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageTitle
        heading="Terms of Service"
        subheading="Important information about enrolment, payments, participation, learning materials, and your use of A1 Education services."
        route="Home / Privacy Policy"
      />

      <section className="responsivePad 2xl:py-24 lg:py-16 md:py-12 py-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="overflow-hidden rounded-[32px] border border-[#4668f7]/10 bg-white shadow-[0_30px_90px_-45px_rgba(70,104,247,0.45)]">
            <div className="bg-[linear-gradient(135deg,_#4569F7_0%,_#5296E3_55%,_#7A8BD1_100%)] px-6 py-8 text-white md:px-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                A1 Education Pty Ltd
              </p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                Service Agreement Overview
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/85 md:text-base">
                These Terms of Service govern the use of tutoring services
                provided by A1 Education Pty Ltd. By enrolling a student,
                attending classes, or accessing any A1 Education materials, you
                agree to the terms set out below.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 px-6 py-5 md:px-10">
              <span className="inline-flex items-center rounded-full bg-[#4668f7]/10 px-4 py-2 text-sm font-semibold text-[#4668f7]">
                Effective Date: 01 January 2026
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                NSW, Australia
              </span>
            </div>
          </div>

          <div className="grid gap-6">
            {sections.map((section, index) => (
              <article
                key={section.title}
                className="rounded-[28px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.45)] md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#4668f7]/10 text-sm font-semibold text-[#4668f7]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl font-semibold text-slate-900">
                      {section.title}
                    </h3>
                    <div className="mt-4 space-y-4 text-[15px] leading-7 text-slate-600 md:text-base">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}

                      {section.items && (
                        <ul className="space-y-3 rounded-3xl bg-slate-50 px-5 py-5 text-slate-700">
                          {section.items.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#4668f7]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="rounded-[32px] border border-[#4668f7]/15 bg-[linear-gradient(135deg,_rgba(69,105,247,0.06)_0%,_rgba(82,150,227,0.12)_100%)] p-6 shadow-[0_24px_60px_-50px_rgba(70,104,247,0.5)] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4668f7]">
              Contact Details
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">
              For enquiries regarding these Terms
            </h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <a
                href="mailto:admin@a1education.com.au"
                className="rounded-3xl border border-white/80 bg-white/90 px-5 py-5 shadow-sm transition hover:-translate-y-[1px]"
              >
                <p className="text-sm font-semibold text-slate-500">Email</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  admin@a1education.com.au
                </p>
              </a>
              <a
                href="tel:0296214508"
                className="rounded-3xl border border-white/80 bg-white/90 px-5 py-5 shadow-sm transition hover:-translate-y-[1px]"
              >
                <p className="text-sm font-semibold text-slate-500">Phone</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  02 9621 4508
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
