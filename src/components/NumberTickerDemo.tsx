import { NumberTicker } from "@/components/magicui/number-ticker";
import React from 'react';

interface NumberTickerDemoProps {
    value: number;
    className: any;
  }

export function NumberTickerDemo({ value, className }: NumberTickerDemoProps) {
  return (
    <NumberTicker
      value={value}
      className={className}
    />
  );
}
