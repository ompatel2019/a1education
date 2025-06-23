// app/page.tsx
import React from "react";

export default function page() {
  return (
    <>
      <div className="responsivePad">
        <h1 className="text-4xl font-bold h1">Header</h1>
        <h1 className="text-4xl font-bold">Header</h1>
        <p className="font-light italic">Subtext</p>
        <div className="bg-primary text-white">Primary button</div>
        <p className="text-black">Black text</p>
        <div className="bg-[var(--primary)] text-[var(--white)]">
          This works. No config.
        </div>
        <p className="text-[var(--black)]">Black text</p>
      </div>
    </>
  );
}
