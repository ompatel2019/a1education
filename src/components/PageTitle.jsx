import React from 'react';

const PageTitle = ({ heading, subheading, route }) => {
  return (
    <section className="2xl:px-[48px] lg:px-[32px] md:px-[16px] px-[4px] text-white-0 font-generalSans">
      <div
        className="bg-gradient-to-b 2xl:rounded-[32px] lg:rounded-[24px] md:rounded-[16px] rounded-[8px]
        flex flex-col space-y-10 2xl:py-[240px] lg:py-[160px] md:py-[96px] py-[64px]
        text-center items-center"
      >
        <div className="responsivePad flex flex-col 2xl:space-y-10 lg:space-y-8 space-y-6 text-center items-center font-generalSans-medium">
          <div>
            <h5 className="h5 font-generalSans-semibold">{route}</h5>
            <h1 className="h1 font-generalSans-bold 2xl:px-[200px]">{heading}</h1>
          </div>
          <p className="h6">{subheading}</p>
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
