import React from 'react';
import SectionHeaders from './SectionHeaders';
import Image from 'next/image';
import './rateus.css'
const RateUs = () => {
  return (
    <>
   <section className='mt-20 mx-auto max-w-4xl'>
  <div className="text-center">
    <SectionHeaders subHeader="Rate Your Experience" mainHeader="See What People Think" />
  </div>
  
  <div className="flex gap-32 mt-20 items-center  volump-text col-lg-6 mx-auto">
    <div className="flex-shrink-0">
      <Image src="/card1.jpg" className='rounded-lg ' alt="About us image" width={300} height={300} />
    </div>
    <div className="flex-grow">
      <div className="progress-bar">
        <div className="hundred-percent mt-12">
          <p className=" pb-2 d-flex justify-content-between progress-para fw-medium m-0">
          <span className="  text-gray-600">
  Pizza Buffet is the best...
    <span className="inline-flex mx-2 align-middle items-center">
      <Image width={20} height={20} src="/thumbsup.jpeg" alt="heart emoji" />
    </span> <span className='text-gray-600'>100%</span>
  </span> 
          </p>
          <div className="progress rounded-0 mb-2 rounded-r-lg bg-white">
            <div
              className="progress-bar volump-progress"
              role="progressbar"
              style={{ width: '99%', height: '12px' }}
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="hundred-percent">


          
          <p className="pb-2 d-flex justify-content-between progress-para fw-medium m-0">
            <span className="text-gray-600">Pasta is my favroite here...</span > <span className='text-gray-600'>95%</span> 
          </p>

          
          <div className="progress rounded-0 mb-2 rounded-r-lg bg-white">
            <div
              className="progress-bar volump-progress"
              role="progressbar"
              style={{ width: '90%', height: '12px' }}
              aria-valuenow="90"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="hundred-percent ">
        <p className="pb-2 d-flex text-slate-400 justify-content-between progress-para fw-medium m-0">
  <span className=" text-gray-600 ">
    Brownie Fudge is the best 
    <span className="inline-flex mx-2 align-middle items-center">
      <Image width={20} height={20} src="/emogie-heart.jpeg" alt="heart emoji" />
    </span>
  </span> 
  <span className="text-gray-600">99%</span>
</p>

          <div className="progress pb-2 rounded-0 rounded-r-lg mb-2 bg-white">
            <div
              className="progress-bar pb-2 volump-progress"
              role="progressbar"
              style={{ width: '99%', height: '12px' }}
              aria-valuenow="10"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default RateUs;
