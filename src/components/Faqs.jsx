import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';

const Faqs = ({ section, sectionName, sectionSubheading }) => {
  const term = "https://drive.google.com/file/d/14it9qMWyvAu8MiKZpY-nI_Y6kIBVucoZ/view?ts=67b00b7b";
  const privacy = "https://drive.google.com/file/d/1BF1z-fMGrbdK6iQQulVW4Xug31L-xkTj/view?ts=67b00c59";
  const faqCategories = [
    {
      categoryTitle: 'Fees & Payment',
      items: [
        {
          questionNumber: 'Q1',
          question: 'How does your payment work?',
          answer:
            'Our classes operate on a pre-paid, per-term basis. You can complete your payment securely online.'
        }
      ]
    },
    {
      categoryTitle: 'Free Trial & Enrollment',
      items: [
        {
          questionNumber: 'Q2',
          question: 'Is there a free trial?',
          answer:
            'Yes! We offer a free trial lesson for new students, no commitment required.'
        },
        {
          questionNumber: 'Q3',
          question: 'What happens during the free trial?',
          answer:
            'During the trial, you attend a full lesson, experience our teaching style, and get access to materials.'
        },
        {
          questionNumber: 'Q4',
          question: 'How do I enrol?',
          answer:<p> You can enrol by filling out the form on our <HashLink smooth to='/contact' className='text-blue-500 cursor-pointer'>contact</HashLink> page, calling <a className='text-blue-500 cursor-pointer' href="tel:+61 402 097 284">+61 402 097 284</a> or emailing <a className='text-blue-500 cursor-pointer' href="mailto:contact@a1education.com.au.">contact@a1education.com.au</a></p>
        },
        {
          questionNumber: 'Q5',
          question: 'Where can I find the Terms and Conditions?',
          answer: <p> You can access our Terms and Conditions <a target='_blank' href={term} className='text-blue-500 cursor-pointer'>Here</a> and our Privacy Policy <a target='_blank' href={privacy} className='text-blue-500'>Here.</a> </p>
        }
      ]
    },
    {
      categoryTitle: 'Resources & Support',
      items: [
        {
          questionNumber: 'Q6',
          question: 'Do you provide resources?',
          answer:
            'Absolutely. We have notes, practice questions, and exam tips that helped many students score 90+ in HSC.'
        },
        {
          questionNumber: 'Q7',
          question: 'Do you provide marking and feedback?',
          answer:
            'Yes! We offer free marking and personalised feedback on assignments, essays, and practice exams.'
        },
        {
          questionNumber: 'Q8',
          question: 'Do you provide homework?',
          answer: 'Yes. We provide weekly homework to reinforce key concepts.'
        }
      ]
    },
    {
      categoryTitle: 'Classes & Scheduling',
      items: [
        {
          questionNumber: 'Q9',
          question: 'How long are the lessons?',
          answer:
            'Each lesson is 2 hours, allowing time to cover content, reinforce understanding, and tackle exam questions.'
        },
        {
          questionNumber: 'Q10',
          question: 'What subjects do you offer tutoring for?',
          answer: 'Currently, we focus on Year 11 and 12 Economics in Sydney.'
        },
        {
          questionNumber: 'Q11',
          question: 'Do you offer one-on-one tutoring?',
          answer:
            'Right now, we primarily offer group classes to maintain a collaborative learning environment.'
        },
        {
          questionNumber: 'Q12',
          question: 'Where are the classes held?',
          answer:
            'We hold in-person classes at 207/30 Campbell St, Blacktown NSW 2148, plus online sessions.'
        },
        {
          questionNumber: 'Q13',
          question: 'How do I access online classes?',
          answer: "You'll receive a Google Meet link. All online lessons are live, interactive, and recorded."
        },
        {
          questionNumber: 'Q14',
          question: 'What if I miss a class?',
          answer:
            'You can watch the recorded session or arrange a makeup class if available.'
        },
        {
          questionNumber: 'Q15',
          question: 'Can I switch between in-person and online?',
          answer: 'Yes, just let us know in advance.'
        }
      ]
    },
    {
      categoryTitle: 'Tutors & Expertise',
      items: [
        {
          questionNumber: 'Q16',
          question: 'Who are the tutors?',
          answer:
            'Our tutors are high-achieving graduates with top HSC and ATAR results.'
        }
      ]
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const handleToggle = (uniqueKey) => {
    if (openFaq === uniqueKey) {
      setOpenFaq(null);
    } else {
      setOpenFaq(uniqueKey);
    }
  };

  return (
    <section className={section}>
      <div className="text-center mb-8">
        <h3 className={sectionName}>FAQs</h3>
        <h4 className={sectionSubheading}>
          Commonly asked questions students ask time to time.
        </h4>
      </div>

      <div className="flex flex-col space-y-12">
        {faqCategories.map((cat, catIndex) => (
          <div key={`category-${catIndex}`} className="responsivePad">
            <h5 className="h5 font-generalSans-semibold text-lg mb-4">
              {cat.categoryTitle}
            </h5>
            {cat.items.map((faqItem, itemIndex) => {
              const uniqueKey = `${catIndex}-${itemIndex}`;
              const isOpen = openFaq === uniqueKey;
              return (
                <div key={uniqueKey} className="mb-4 border-b pb-2">
                  <div
                    className="flex justify-between items-center cursor-pointer p"
                    onClick={() => handleToggle(uniqueKey)}
                  >
                    <p className="font-medium">
                      {faqItem.questionNumber}. {faqItem.question}
                    </p>
                    {isOpen ? (
                      <i className="bi bi-dash-circle text-xl"></i>
                    ) : (
                      <i className="bi bi-plus-circle text-xl"></i>
                    )}
                  </div>

                  {isOpen && (
                    <div className="mt-2 text-gray-700">{faqItem.answer}</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faqs;
