// lib/config/testimonialsConfig.tsx

import { cn } from "@/lib/utils";
import React from "react";

// Function to convert names to proper case
const toProperCase = (name: string) => {
  return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

// reviews array (exported for use)
export const reviews = [
  {
    name: "JET LOISELLE",
    sig: "Rank 1 Economics - Hawkesbury High School",
    body: "Karan's engaging teaching style has significantly improved my HSC Economics understanding. He methodically guides us through syllabus topics and reinforces learning with challenging past paper questions. His approach clarifies complex concepts and builds confidence, substantially boosting my economic knowledge and exam performance. This proven method consistently inspires my academic progress and success.",
  },
  {
    name: "SRUJANA YERRAMSETTY",
    sig: "Band 6 Achievement - Penrith High School",
    body: "Karan excels at explaining complex economic concepts in a clear, concise manner. His genuine care for students' progress is evident as he goes to great lengths to offer support. Always responsive and approachable, he promptly assists with queries, ensuring each lesson is comprehensive and engaging. This commitment enhances my understanding and results.",
  },
  {
    name: "ANTHONY SU",
    sig: "Over 40% Improvement from Year 11 to Year 12",
    body: "A1 education's tutoring services are among the most valued sessions I've attended. Karan provided quality instruction with fast, detailed responses during and outside sessions. Karan also offers numerous band 6 exemplar essays and resources that maximised my results.",
  },
  {
    name: "JAY PATEL",
    sig: "Improvement of Over 30% in HSC - Cherrybrook Technology High School",
    body: "From the first lesson with A1 Education, Karan demonstrated exceptional organisation in his materials and lesson structure. His clear explanations of complex economic topics have deepened my understanding and notably boosted my confidence. His effective teaching has transformed my study habits and academic performance, leaving a lasting, positive impact on my results.",
  },
  {
    name: "SUHAS DARA",
    sig: "92.55 ATAR - Cherrybrook Technology High School",
    body: "I attended A1 Education's economics tutoring for nine months with Karan. Initially struggling with syllabus gaps and essay skills, I soon developed a keen interest in economics. Karan's targeted guidance helped me master key concepts, improve short answers and essay writing, and significantly boost my exam results. I recommend his tutoring services.",
  },
  {
    name: "VISMAY VIMAL",
    sig: "30% Improvement in Marks - Macquarie Fields High School",
    body: "Before joining A1 Education, my essay writing averaged 12-13 marks and I struggled with multiple-choice questions and calculations. Under Karan's guidance, I improved my writing through detailed feedback and effective teaching strategies. His resources and prompt support transformed my revision process, significantly boosting my confidence and results. I strongly recommend his tutoring.",
  },
  {
    name: "CHINTAN PATEL",
    sig: "20% Improvement in Marks - Macquarie Fields High School",
    body: "Starting Year 11 with a basic understanding of economics, I advanced my knowledge after joining A1 Education. Karan's detailed feedback and round-the-clock support via various channels significantly improved my short answer and essay writing. Their resources and guidance transformed my exam performance and boosted my confidence. I highly recommend their tutoring services.",
  },
  {
    name: "ARYAN ADLAKHA",
    sig: "Hills Adventist College - Class of '25",
    body: "Before A1 Education, my economics experience was depressing with poor writing and understanding. After a few lessons with Karan, my grasp of economic concepts improved, and my marks rose. Karan's engaging, supportive approach makes learning enjoyable. He's always available for help and guidance, making a real difference in my studies.",
  },
  {
    name: "SMAYAN GURU",
    sig: "Hills Adventist College - Class of '25",
    body: "Before A1 Education, I struggled with economic terminology and detailed exam responses. Karan's comprehensive resources—past papers, recordings, and homework—transformed my approach. His unique teaching style prioritizes understanding over note-taking, significantly boosting my grasp of HSC Economics. I highly recommend A1 Education for improved academic performance.",
  },
  {
    name: "AARAV PATEL",
    sig: "St Marys Senior High School - Class of '25",
    body: "Before A1 Education, my essay writing was dismal—I even scored 8/20 on a preliminary essay. Karan's prompt support, detailed feedback, and valuable resources transformed my writing, with my scores rising to 90%. His guidance clarified key concepts, making a huge difference. I highly recommend A1 Education.",
  },
  {
    name: "PRATEEK MANDALAPU",
    sig: "William Clarke College - Class of '25",
    body: "Before tutoring with Karan, I struggled to grasp deep economic concepts and apply them in essays and short answers. After joining A1 Education, Karan's engaging lessons kept me ahead of school content and reduced my revision time. His teaching significantly improved my understanding. I highly recommend his tutoring.",
  },
  {
    name: "VRAJ BHATT",
    sig: "St Marys Senior High School - Class of '25",
    body: "Karan's holistic approach at A1 Education transformed my academic path in Economics. His clear explanations, detailed feedback, and well-organized lessons improved my essay writing and overall results. With a variety of resources and prompt support, Karan ensures every student succeeds. I truly appreciate his commitment.",
  },
  {
    name: "SIDDHARTH CHINNANELLI",
    sig: "St Marys Senior High School - Class of '25",
    body: "Starting Year 12 with A1 Education was a game-changer. Karan's consistent feedback and key essay tips helped me secure my first 'A' after struggling in Year 11. His mentorship improved my marks and writing skills, making a real impact on my HSC journey. I highly recommend his tutoring.",
  },
  {
    name: "VIVAAN BRAHMBHATT",
    sig: "Hills Adventis College - Class of '25",
    body: "Joining A1 Education drastically improved my grasp of Economics. With Karan's prompt support, I quickly ranked 2nd in my first assessment. His fast responses and engaging classes made learning enjoyable and effective. I now have a solid understanding and look forward to every lesson.",
  },
  {
    name: "SHUBAN PERMALLA",
    sig: "The Ponds High School - Class of '25",
    body: "A1 Education has deepened my understanding of Economics. Karan's detailed explanations and engaging storytelling clarify each topic. His quick responses, excellent resources, and strong support network have streamlined my revision process. I highly recommend his tutoring for anyone seeking improved academic performance.",
  },
  {
    name: "ARNAV LAMBA",
    sig: "55% Y11 Prelim → 96% Y12 Trial",
    body: "Joined Karan recently and loving it. He simplifies concepts in an intriguing manner. Can't go wrong with his fast replies to any question.",
  },
  {
    name: "ARIA",
    sig: "Student - 2 Reviews",
    body: "Since joining A1 Education, not only have my marks in Economics improved significantly, but my confidence in the subject has grown immensely. Our tutor, Karan, consistently delivers engaging and well-structured lessons that make even the complex topics accessible.",
  },
  {
    name: "AMAAN KURESHI",
    sig: "Student - 2 Reviews",
    body: "A1 Education is an excellent tutoring centre located in Blacktown, with convenient access for students in the Western Sydney area. Karan is not only highly knowledgeable but also an exceptional teacher. His ability to explain complex economic concepts clearly makes learning enjoyable.",
  },
  {
    name: "JESSICA XI",
    body: "Karan's careful and detailed explanations coupled with relevant real-life scenarios make the content easy to digest and implement in our understanding of economics and written responses. His classes are fun and engaging, and he dedicates time to ensure we understand everything.",
  },
  {
    name: "AZKA MUSTANSAR",
    body: "Karan is an absolutely amazing tutor. He explains economic concepts clearly and is more than willing to answer questions outside of class hours which I've never found others be willing to offer. We recently had our assessment and he provided excellent support.",
  },
  {
    name: "PARTH PATEL",
    body: "The services provided by A1 Education are top notch and meet high standards as well as accounting for the working environment. Karan teaches all of his students in a great way and is by far the best tutor I've experienced in terms of resources, teaching method and ability to respond to questions at any time.",
  },
  {
    name: "NAV DHATT",
    body: "I highly recommend A1 Education, especially with Karan as an Economics tutor. His ability to simplify complex economic concepts and tailor his teaching style to suit individual learning needs has made a world of difference for me. Karan's dedication and expertise are unmatched.",
  },
  {
    name: "GISELE FERNANDO",
    body: "Karan is the BEST economics tutor in all of Sydney. He makes the content easily digestible to all his students and diligently works to make sure his classes understand all content before moving on. He gives us practice questions and provides excellent support.",
  },
  {
    name: "SIWON LEE",
    body: "A1's resources have honestly been a game-changer for my HSC prep. The way Karan breaks down tricky concepts help me understand them, and I've found the up-to-date examples super helpful for essays. The summaries save me so much time during revision.",
  },
  {
    name: "RAHI PATEL",
    body: "Karan explains key concepts so easily in a way that makes sense to all students. He offers a variety of resources that help achieve outstanding results, like videos on content that he goes through in class, homework, essay and short answer practice.",
  },
  {
    name: "KAVYA PATEL",
    body: "Karan's guidance at A1 Education has been incredible in making me feel more confident in Economics. His style of teaching, his detailed booklets and dedication to helping us understand content and give useful feedback is exceptional. I would certainly recommend A1 education for anyone studying Preliminary and HSC economics.",
  },
  {
    name: "BONNIE WU",
    body: "A1 Education is an incredible tutoring center that has truly exceeded my expectations! The tutors are highly knowledgeable, patient and provide extensive insightful feedback to my written responses. I highly recommend A1 Education to anyone looking for high-quality tutoring. Their commitment to student success is unmatched!",
  },
  {
    name: "MAHI BHAVSAR",
    body: "A1 is the best place for economics help. Karan makes content so simply and provides plenty of resources so that everyone understands. Classrooms and engaging and it's really nice to learn from someone who's so down to earth and patient.",
  },
  {
    name: "ANUSHKA SAMY",
    body: "Karan always consistently makes an effort with every single one of his students and never fails to go above and beyond just to explain a concept that I'm confused about. His tutoring style is honestly one of the best I've experienced and his dedication towards his student's success is unmatched.",
  },
  {
    name: "DHAIRYA BHATT",
    body: "Amazing teacher who's always available and willing to help. Easy to understand, but in depth content and material. Love everything about A1 Education and what Karan stands for.",
  },
  {
    name: "STACEY GONGUPALLI",
    body: "Karan's goated and so is A1. Coming here for eco tutoring made the subject much more enjoyable for me, as we work ahead of class and can familiarise ourselves with difficult concepts in a chill environment. Karan provides us with good resources and support.",
  },
  {
    name: "AGAMPREET KAUR",
    body: "If you're looking for an economics tuition teacher who actually makes the subject click, Karan is the one. He doesn't just throw theories and formulas at you but actually breaks everything down in a way that actually makes sense. He's also very responsive and helpful.",
  },
  {
    name: "SYDNEY T",
    body: "Karan's concise explanations of core and basic year 11 economics concepts have helped to build my confidence through the first term of the preliminary HSC. He provides extensive resources to reinforce our skills. Moreover, his classes are very inclusive and engaging. Highly recommend.",
  },
  {
    name: "SIYA PANCHAL",
    body: "Karan expands his teaching beyond the basics taught at school and allows us to gain a more extensive understanding of each concept and consistently practice application skills of the content. I highly recommend joining A1 education if you want a band 6 in economics.",
  },
  {
    name: "AMANYA VALIVETI",
    body: "Karan is my goat! Makes lessons very fun and educational and because of him I've improved tremendously in economics. Explains content in a way that's easy to understand and gives us an ample amount of resources. Highly recommend.",
  },
  {
    name: "SANSITA VERMA",
    body: "Karan is a knowledgeable and approachable tutor with clear expertise in economics. He explains complex concepts logically and with ease, showing genuine interest in student performance. His detailed marking and comprehensive resources make learning effective.",
  },
  {
    name: "NEEL PATEL",
    body: "A1 has really helped me understand content and it has helped me do way better in economics. I would highly recommend trying out a class. Karan is also a very helpful and friendly teacher which replies instantly. It's really enjoyable attending his classes.",
  },
  {
    name: "JASON PAATHI",
    body: "Before joining A1 Education, I struggled with structuring my essays effectively and found it difficult to break down complex economic concepts. My multiple-choice was inconsistent and I often made mistakes in my calculations. However, after joining A1 Education, Karan's guidance transformed my approach completely.",
  },
  {
    name: "MAANIA VIRMANI",
    body: "Karan is really good at what he does, he is able to explain concepts in such depth and detail to where understanding becomes really easy. If you're looking for a good economics tutor definitely consider A1!",
  },
  {
    name: "SHLOK KHAKHAR",
    body: "Karan has been hands down the most helpful tutor I have had. He makes learning economic concepts easy and extremely entertaining. He engages with the class and makes everyone involved and comfortable to ask questions.",
  },
  {
    name: "SWASTIK JASROTIA",
    body: "Karan is very knowledgeable and his way of teaching challenging concepts with ease shows his expertise. He offers high quality tutoring and notes at an affordable price. He also got the most insanely quick tutor reply game. Highly recommend!",
  },
  {
    name: "SAHIL ARYA",
    body: "Karan is an amazing tutor that knows how to teach as well as making class enjoyable. He shows dedication to his students with the amount of amazing resources he provides us with as well as always replying. He has helped me a lot since I've started.",
  },
  {
    name: "SHLOK PATEL",
    body: "Karan is the goat! Best economics tutor ever.",
  },
  {
    name: "SVAR",
    body: "Karan is the goat! Good tutor and very helpful.",
  },
  {
    name: "KRUSHAN SISODIYA",
    body: "Karan is the goat! Amazing tutor who explains everything clearly.",
  },
  {
    name: "YOGI JOSHI",
    body: "Karan my goat! Best economics tutor.",
  },
  {
    name: "HUSSAIN",
    body: "A1 Education provided excellent Economics support with clear explanations, engaging lessons, and effective exam strategies. The tutors made complex topics easy to understand and always encouraged critical thinking. Thanks to Karan's guidance, I improved significantly.",
  },
  {
    name: "ADHIRAJ SODHI",
    body: "I can't recommend A1 Education enough! The tutors here are incredibly knowledgeable, patient, and dedicated to helping students succeed. They take the time to explain concepts clearly and make sure you feel confident before moving on. The resources and support are exceptional.",
  },
  {
    name: "RITWIK MATHUR",
    body: "Absolutely carried me for prelims. Helped me with essay structure and also helped to break down short answers. Also super friendly and actually able to teach well and makes sure other students are disciplined.",
  },
  {
    name: "ZAID ABUGHAZALEH",
    body: "Very good quality tutoring helped me enjoy and understand economics more. Karan's teaching methods are excellent and he provides great support.",
  },
  {
    name: "SHAHM C",
    body: "A1 is literally the best economics tutor! Karan, my tutor makes sure we are comfortable each lesson and puts in so much effort to make sure we get the most out of each class. Karan makes sure each class is fun and engaging and makes me more confident in economics.",
  },
  {
    name: "INAYAT KAUR",
    body: "I highly recommend A1 Education Economic Tutoring to any yr 11 or 12 student!! Karan's lessons are always clear, well structured, and made sure to be tailored to the syllabus, which has made many complex concepts much easier to understand.",
  },
];

// 👇 Derived slices for double marquee
export const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
export const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

// review card
export const ReviewCard = ({
  name,
  sig,
  body,
}: {
  name: string;
  sig?: string;
  body: string;
}) => (
  <figure
    className={cn(
      "relative h-full 2xl:w-[412px] lg:w-96 md:w-80 w-72 cursor-pointer overflow-hidden rounded-2xl border border-gray-900/10 bg-white shadow-md p-6 py-8 text-left font-medium text-black hover:shadow-xl transition-shadow duration-200"
    )}
  >
    <div className="flex flex-row items-center gap-2">
      <div className="flex flex-col">
        <figcaption className="font-semibold text-base">
          {toProperCase(name)}
        </figcaption>
        <p className="font-medium text-gray-500 text-xs">{sig}</p>
      </div>
    </div>
    <blockquote className="mt-3 text-sm leading-relaxed text-gray-700">
      {body}
    </blockquote>
  </figure>
);

export const sectionHeading = "Testimonials";
export const sectionSubheading = "Hear what our students say about us!";
