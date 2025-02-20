import React from 'react';
import { TextAnimate } from "@/components/magicui/text-animate";

interface TextAnimateDemoProps {
  text: string;
  by: any;
}

export function TextAnimateDemo({ text, by }: TextAnimateDemoProps) {
  return (
    <TextAnimate className='h1 font-generalSans-bold' animation="blurInDown" by={by} >
      {text}
    </TextAnimate>
  );
}
