import React from 'react';
import { TextAnimate } from "@/components/magicui/text-animate";

interface TextAnimateDemoProps {
  text: string;
  by: any;
}

export function TextAnimateDemo({ text, by }: TextAnimateDemoProps) {
  return (
    <TextAnimate animation="blurInUp" by={by} once>
      {text}
    </TextAnimate>
  );
}
