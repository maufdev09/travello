import React from 'react'
import imgImage from "../../../asset/images/ourStory1.jpg";
import imgImage1 from "../../../asset/images/ourStory2.jpg";
import imgImage2 from "../../../asset/images/ourStory3.jpg";
import imgImage3 from "../../../asset/images/ourStory4.jpg";

import Image from 'next/image';


function OurStorySection() {
  return (
    <section className="w-full px-6 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Tag */}
            <span className="text-[#d4745f] text-5xl uppercase tracking-wide">
              Our Philosophy
            </span>
            
            {/* Heading */}
            <h2 className="text-[#1a4d6f] text-3xl">
              Travel is not just about going places, it's about{" "}
              <span className="text-[#d4745f] italic">feeling</span> them.
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              We believe in slow travel, deep connections, and unforgettable moments. 
              Travello moves beyond standard booking to curate journeys that touch your 
              soul and expand your horizons.
            </p>
            
            {/* Button */}
            <button className="border border-[#d4745f] text-[#1a4d6f] px-6 py-2 rounded hover:bg-[#d4745f] hover:text-white transition-colors duration-300">
              Read Our Story
            </button>
          </div>
          
          {/* Right Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="rounded-lg shadow-lg overflow-hidden">
                <Image 
                  src={imgImage} 
                  alt="Venice canal with gondola" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="rounded-lg shadow-lg overflow-hidden">
                <Image 
                  src={imgImage1} 
                  alt="Cinque Terre colorful village" 
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
            
            {/* Right Column */}
            <div className="pt-8 space-y-4">
            
              <div className="rounded-lg shadow-lg overflow-hidden">
                <Image 
                  src={imgImage2} 
                  alt="Crystal clear lake with boat" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="rounded-lg shadow-lg overflow-hidden">
                <Image 
                  src={imgImage3} 
                  alt="Crystal clear lake with boat" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStorySection
