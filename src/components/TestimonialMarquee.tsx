import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import React from 'react';

const reviews = [
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
];



const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  name,
  sig,
  body,
}: {
  name: string;
  sig: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full 2xl:w-[412px] lg:w-96 md:w-80 w-72 cursor-pointer overflow-hidden rounded-lg border p-6 py-8 text-left font-generalSans-medium text-black",
        // light styles
        "border-gray-950/[.1] bg-white ",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col">
          <figcaption className="p font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="font-medium dark:text-white/40 text-grey text-sm">{sig}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-base">{body}</blockquote>
    </figure>
  );
};

export default function TestimonialMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.sig} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.sig} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4"></div>
    </div>
  );
}
