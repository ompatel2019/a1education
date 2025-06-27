// lib/config/testimonialsConfig.tsx

import { cn } from "@/lib/utils";
import React from "react";

// reviews array (exported for use)
export const reviews = [
  {
    name: "Jet Loiselle",
    sig: "Rank 1 Economics - Hawkesbury High School",
    body: "Karan’s engaging teaching style has significantly improved my HSC Economics understanding. He methodically guides us through syllabus topics and reinforces learning with challenging past paper questions. His approach clarifies complex concepts and builds confidence, substantially boosting my economic knowledge and exam performance. This proven method consistently inspires my academic progress and success.",
  },
  {
    name: "Srujana Yerramsetty",
    sig: "Band 6 Achievement - Penrith High School",
    body: "Karan excels at explaining complex economic concepts in a clear, concise manner. His genuine care for students’ progress is evident as he goes to great lengths to offer support. Always responsive and approachable, he promptly assists with queries, ensuring each lesson is comprehensive and engaging. This commitment enhances my understanding and results.",
  },
  {
    name: "Anthony Su",
    sig: "Over 40% Improvement from Year 11 to Year 12",
    body: "A1 education’s tutoring services are among the most valued sessions I’ve attended. Karan provided quality instruction with fast, detailed responses during and outside sessions. Karan also offers numerous band 6 exemplar essays and resources that maximised my results.",
  },
  {
    name: "Jay Patel",
    sig: "Improvement of Over 30% in HSC - Cherrybrook Technology High School",
    body: "From the first lesson with A1 Education, Karan demonstrated exceptional organisation in his materials and lesson structure. His clear explanations of complex economic topics have deepened my understanding and notably boosted my confidence. His effective teaching has transformed my study habits and academic performance, leaving a lasting, positive impact on my results.",
  },
  {
    name: "Suhas Dara",
    sig: "92.55 ATAR - Cherrybrook Technology High School",
    body: "I attended A1 Education's economics tutoring for nine months with Karan. Initially struggling with syllabus gaps and essay skills, I soon developed a keen interest in economics. Karan’s targeted guidance helped me master key concepts, improve short answers and essay writing, and significantly boost my exam results. I recommend his tutoring services.",
  },
  {
    name: "Vismay Vimal",
    sig: "30% Improvement in Marks - Macquarie Fields High School",
    body: "Before joining A1 Education, my essay writing averaged 12-13 marks and I struggled with multiple-choice questions and calculations. Under Karan's guidance, I improved my writing through detailed feedback and effective teaching strategies. His resources and prompt support transformed my revision process, significantly boosting my confidence and results. I strongly recommend his tutoring.",
  },
  {
    name: "Chintan Patel",
    sig: "20% Improvement in Marks - Macquarie Fields High School",
    body: "Starting Year 11 with a basic understanding of economics, I advanced my knowledge after joining A1 Education. Karan’s detailed feedback and round-the-clock support via various channels significantly improved my short answer and essay writing. Their resources and guidance transformed my exam performance and boosted my confidence. I highly recommend their tutoring services.",
  },
  {
    name: "Aryan Adlakha",
    sig: "Hills Adventist College - Class of '25",
    body: "Before A1 Education, my economics experience was depressing with poor writing and understanding. After a few lessons with Karan, my grasp of economic concepts improved, and my marks rose. Karan’s engaging, supportive approach makes learning enjoyable. He’s always available for help and guidance, making a real difference in my studies.",
  },
  {
    name: "Smayan Guru",
    sig: "Hills Adventist College - Class of '25",
    body: "Before A1 Education, I struggled with economic terminology and detailed exam responses. Karan’s comprehensive resources—past papers, recordings, and homework—transformed my approach. His unique teaching style prioritizes understanding over note-taking, significantly boosting my grasp of HSC Economics. I highly recommend A1 Education for improved academic performance.",
  },
  {
    name: "Aarav Patel",
    sig: "St Marys Senior High School - Class of '25",
    body: "Before A1 Education, my essay writing was dismal—I even scored 8/20 on a preliminary essay. Karan’s prompt support, detailed feedback, and valuable resources transformed my writing, with my scores rising to 90%. His guidance clarified key concepts, making a huge difference. I highly recommend A1 Education.",
  },
  {
    name: "Prateek Mandalapu",
    sig: "William Clarke College - Class of '25",
    body: "Before tutoring with Karan, I struggled to grasp deep economic concepts and apply them in essays and short answers. After joining A1 Education, Karan’s engaging lessons kept me ahead of school content and reduced my revision time. His teaching significantly improved my understanding. I highly recommend his tutoring.",
  },
  {
    name: "Vraj Bhatt",
    sig: "St Marys Senior High School - Class of '25",
    body: "Karan’s holistic approach at A1 Education transformed my academic path in Economics. His clear explanations, detailed feedback, and well-organized lessons improved my essay writing and overall results. With a variety of resources and prompt support, Karan ensures every student succeeds. I truly appreciate his commitment.",
  },
  {
    name: "Siddharth Chinnanelli",
    sig: "St Marys Senior High School - Class of '25",
    body: "Starting Year 12 with A1 Education was a game-changer. Karan’s consistent feedback and key essay tips helped me secure my first ‘A’ after struggling in Year 11. His mentorship improved my marks and writing skills, making a real impact on my HSC journey. I highly recommend his tutoring.",
  },
  {
    name: "Vivaan Brahmbhatt",
    sig: "Hills Adventis College - Class of '25",
    body: "Joining A1 Education drastically improved my grasp of Economics. With Karan’s prompt support, I quickly ranked 2nd in my first assessment. His fast responses and engaging classes made learning enjoyable and effective. I now have a solid understanding and look forward to every lesson.",
  },
  {
    name: "Shuban Permalla",
    sig: "The Ponds High School - Class of '25",
    body: "A1 Education has deepened my understanding of Economics. Karan’s detailed explanations and engaging storytelling clarify each topic. His quick responses, excellent resources, and strong support network have streamlined my revision process. I highly recommend his tutoring for anyone seeking improved academic performance.",
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
  sig: string;
  body: string;
}) => (
  <figure
    className={cn(
      "relative h-full 2xl:w-[412px] lg:w-96 md:w-80 w-72 cursor-pointer overflow-hidden rounded-2xl border border-gray-900/10 bg-white shadow-md p-6 py-8 text-left font-medium text-black hover:shadow-xl transition-shadow duration-200"
    )}
  >
    <div className="flex flex-row items-center gap-2">
      <div className="flex flex-col">
        <figcaption className="font-semibold text-base">{name}</figcaption>
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