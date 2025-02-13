import React from 'react';

const Topbar = () => {
  const leftText = 'A1 Education – Specialists in Year 11 & 12 Economics Tutoring in Sydney';
  const number = '0402 097 284';
  const location = '207/30 Campbell Street, Blacktown NSW 2148';

  return (
    <header
      className="font-generalSans-medium 2xl:px-[48px] lg:px-[32px] md:px-[16px] px-[4px]
      bg-primary-0 text-white-0 flex justify-between 2xl:py-6 lg:py-4 py-2 max-lg:justify-center"
    >
      <p className="p text-center">{leftText}</p>

      <div className="max-lg:hidden flex space-x-4 p">
        <a
          target="_blank"
          rel="noreferrer"
          href="tel:0402 097 284"
          className="flex space-x-2 items-center"
        >
          <i className="bi bi-telephone-fill h7"></i>
          <p>{number}</p>
        </a>

        <a
          target="_blank"
          rel="noreferrer"
          href="https://g.co/kgs/vpV449u"
          className="flex space-x-2 items-center"
        >
          <i className="bi bi-geo-fill h7"></i>
          <p>{location}</p>
        </a>
      </div>
    </header>
  );
};

export default Topbar;
