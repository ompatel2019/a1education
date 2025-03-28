import React, { useState } from 'react';
import { BlurFade } from "@/components/magicui/blur-fade";

const ContactForm = ({ section, sectionName, sectionSubheading }) => {
  const contacts = [
    {
      icon: <i className="bi bi-envelope"></i>,
      contactType: 'Email',
      contactDesc: 'Send us an email and we will get back to you.',
      contactInformation: 'admin@a1education.com.au',
      contactRedirect: 'mailto:admin@a1education.com.au'
    },
    {
      icon: <i className="bi bi-geo"></i>,
      contactType: 'Location',
      contactDesc: 'Our in-person classes are in Blacktown.',
      contactInformation: '207/30 Campbell Street, Blacktown NSW 2148',
      contactRedirect: 'https://g.co/kgs/vpV449u'
    },
    {
      icon: <i className="bi bi-telephone"></i>,
      contactType: 'Phone',
      contactDesc: 'Mon - Fri 8am to 5pm',
      contactInformation: '0402 097 284',
      contactRedirect: 'tel:0402 097 284'
    },
  ];

  const [result, setResult] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult('Sending...');
    const formData = new FormData(event.target);
    formData.append('access_key', '1feabdc6-8f23-4db0-9697-f16d9c4de0ae');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setResult('Form Submitted Successfully');
        event.target.reset();
      } else {
        console.error('Error submitting form:', data);
        setResult(data.message);
      }
    } catch (error) {
      console.error('Network Error:', error);
      setResult('Error submitting form. Please try again later.');
    }
  };

  const name = 'Contact Form';
  const subheading = 'Get in Touch / Start Your Free Trial.';
  const formSubheading =
    'Ready to join A1 Education or have questions about HSC Economics tutoring in Sydney? Reach out to us—our friendly team is here to help';

  return (
    <section id='contact' className={section}>
      <BlurFade delay={0.2} inView>
        <div className="grid grid-cols-3 max-md:flex max-md:flex-col 2xl:gap-24 lg:gap-16 md:gap-12 gap-8">
          <div className="flex flex-col justify-between max-md:order-2">
            <div className="space-y-8">
              {contacts.map((i, k) => (
                <div key={k} className="flex space-x-4 items-start p">
                  <div className="h5 rounded-sm border-gray-500">{i.icon}</div>
                  <div className="space-y-2">
                    <p className='font-generalSans-semibold'>{i.contactType}</p>
                    <p className="font-generalSans-medium">{i.contactDesc}</p>
                    <a target="_blank" rel="noreferrer" href={i.contactRedirect}>
                      <p className="mt-2 font-generalSans-bold">
                        {i.contactInformation}
                      </p>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 max-md:col-span-2 bg-primary rounded-xl text-white 2xl:p-20 lg:p-16 md:p-12 p-10">
            <div className="text-left mb-8 space-y-2">
              <div className="space-y-1">
                <h3 className={sectionName}>{name}</h3>
                <h4 className={sectionSubheading}>{subheading}</h4>
              </div>
              <p>{formSubheading}</p>
            </div>
            <form
              onSubmit={onSubmit}
              className="space-y-4 text-base"
              method="POST"
              aria-label="Contact Form"
            >
              {/* NAME + EMAIL */}
              <div className="lg:flex gap-4 max-lg:space-y-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="name" className="mb-1">
                    Full Name <span className="sr-only">(required)</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-transparent border-c4 border-2 rounded-md py-2 px-4 transition-all hover:pl-8"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="email" className="mb-1">
                    Email <span className="sr-only">(required)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="johndoe@gmail.com"
                    className="w-full bg-transparent border-c4 border-2 rounded-md py-2 px-4 transition-all hover:pl-8"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              {/* PHONE */}
              <div className="flex flex-col">
                <label htmlFor="phone" className="mb-1">
                  Phone <span className="sr-only">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="123456789"
                  className="w-full bg-transparent border-c4 border-2 rounded-md px-4 py-2 transition-all hover:pl-8"
                  autoComplete="tel"
                />
              </div>
              {/* School */}
              <div className="flex flex-col">
                <label htmlFor="school" className="mb-1">
                  School <span className="sr-only">(required)</span>
                </label>
                <input
                  id="school"
                  name="school"
                  type="text"
                  placeholder="Penrith High School"
                  className="w-full bg-transparent border-c4 border-2 rounded-md px-4 py-2 transition-all hover:pl-8"
                  autoComplete="text"
                />
              </div>
              {/* MESSAGE */}
              <div className="flex flex-col">
                <label htmlFor="message" className="mb-1">
                  Message <span className="sr-only">(required)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="2xl:p-3 bg-transparent rounded-md border-2 border-c4 py-2 px-4 w-full text-c4 text-base transition-all hover:pl-8"
                  placeholder="I'd love to get a free trial for Year 12 Economics!"
                  rows={8}
                  required
                  autoComplete="off"
                />
              </div>
              {/* SUBMIT BUTTON */}
              <button type="submit" aria-label="Submit contact form" className="focus:outline-none p flex p-3 rounded-md text-black bg-white px-8 w-full items-center space-x-1 text-base
                hover:bg-c3 hover:px-12 justify-center hover:bg-purple-400 hover:text-white transition-all">
                Send Inquiry
              </button>
              {result && <p className="mt-2">{result}</p>}
            </form>
          </div>
        </div>
      </BlurFade>
    </section>
  );
};

export default ContactForm;
