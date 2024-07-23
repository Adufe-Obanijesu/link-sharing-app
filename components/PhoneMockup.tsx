import React from 'react';

const PhoneMockup = () => {
  return (
    <div className='relative'>
        <object
        type="image/svg+xml"
        data="/svgs/mobile.svg"
        title="phone mockup"
        className={`w-full h-auto`}
        >
        Your browser does not support SVG
        </object>

        <div className="absolute top-0 left-0 w-full px-3">
            <div className="mt-20 h-center w-full">
                <div className="flex flex-col w-full items-center gap-2">
                    <div className="h-32 w-32 bg-lightgrey rounded-full"></div>
                    <div className="h-5 w-2/3 mt-2 bg-lightgrey rounded-lg"></div>
                    <div className="h-3 w-1/4 bg-lightgrey rounded-lg"></div>
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-5 px-6">
                <div className="w-full h-10 rounded-lg bg-lightgrey"></div>
                <div className="w-full h-10 rounded-lg bg-lightgrey"></div>
                <div className="w-full h-10 rounded-lg bg-lightgrey"></div>
                <div className="w-full h-10 rounded-lg bg-lightgrey"></div>
                <div className="w-full h-10 rounded-lg bg-lightgrey"></div>
            </div>
        </div>
    </div>
  );
};

export default PhoneMockup;
