import React, { useState, useEffect } from 'react';

const Sponsors = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const sponsors = [
    { name: "AMBOSS", logo: "AMBOSS logo.jpg", animation: "float" },
    { name: "Blackwells Scrubs", logo: "blackwells scrubs LOGO.png", animation: "bounce-slow" },
    { name: "ClinNova", logo: "ClinNova logo.jpeg", animation: "float-delayed" },
    { name: "Compendium Medicine", logo: "compendium medicine logo.jpeg", animation: "wiggle" },
    { name: "DFC", logo: "DFC logo.jpeg", animation: "float-slow" },
    { name: "GEOMEDI", logo: "GEOMEDI logo.jpeg", animation: "scale-pulse" },
    { name: "GRAE", logo: "GREA logo.jpeg", animation: "bounce-slow" },
    { name: "GSAOT", logo: "gsaot_logo.jpeg", animation: "float" },
    { name: "IMG Unity", logo: "IMG UNITY logo.jpeg", animation: "wiggle" },
    { name: "INAMS", logo: "INAMS logo.jpeg", animation: "float-delayed" },
    { name: "MEDVENTURES", logo: "MEDVENTURES logo.jpeg", animation: "scale-pulse" },
    { name: "SAS Geomedi", logo: "SAS geomedi.jpeg", animation: "bounce-slow" },
    { name: "Walter E Dandy", logo: "walter e dandy logo.jpeg", animation: "float-slow" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-purple-100/20"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full animate-float"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-purple-200/30 rounded-lg animate-float-delayed"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-indigo-200/30 rounded-full animate-float-slow"></div>
      <div className="absolute bottom-32 right-32 w-24 h-24 bg-blue-200/20 rounded-lg animate-bounce-slow"></div>
      
      {/* Rotating decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 border-2 border-blue-300/40 rounded-full animate-rotate-slow"></div>
      <div className="absolute top-3/4 right-1/4 w-6 h-6 border-2 border-purple-300/40 rounded-full animate-rotate-slow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with enhanced animations */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block animate-scale-pulse">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-pulse-glow">
              Our Sponsors
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are grateful to our valued sponsors who make MEDCON'25 possible. 
            Their support helps us bring together the medical community for this incredible event.
          </p>
        </div>

        {/* Multi-layered Animated Carousel */}
        <div className="relative space-y-8">
          {/* First row - Main carousel */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-20"></div>
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-20"></div>
            
            <div className="overflow-hidden">
              <div className="flex animate-scroll hover:animate-pause">
                {/* First set of logos */}
                {sponsors.map((sponsor, index) => (
                  <div key={`first-${index}`} className="flex-shrink-0 mx-6 flex items-center justify-center">
                    <div className="group relative">
                      <div className={`w-36 h-36 md:w-44 md:h-44 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center p-6 border-2 border-gray-100 hover:border-blue-300 hover:scale-110 animate-${sponsor.animation}`}>
                        <img
                          src={`/${sponsor.logo}`}
                          alt={sponsor.name}
                          className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:animate-wiggle"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden items-center justify-center text-gray-400 text-sm text-center">
                          {sponsor.name}
                        </div>
                      </div>
                      {/* Enhanced sponsor name tooltip */}
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-4 py-2 rounded-full whitespace-nowrap shadow-lg animate-bounce-slow">
                          {sponsor.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {sponsors.map((sponsor, index) => (
                  <div key={`second-${index}`} className="flex-shrink-0 mx-6 flex items-center justify-center">
                    <div className="group relative">
                      <div className={`w-36 h-36 md:w-44 md:h-44 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center p-6 border-2 border-gray-100 hover:border-blue-300 hover:scale-110 animate-${sponsor.animation}`}>
                        <img
                          src={`/${sponsor.logo}`}
                          alt={sponsor.name}
                          className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:animate-wiggle"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden items-center justify-center text-gray-400 text-sm text-center">
                          {sponsor.name}
                        </div>
                      </div>
                      {/* Enhanced sponsor name tooltip */}
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-4 py-2 rounded-full whitespace-nowrap shadow-lg animate-bounce-slow">
                          {sponsor.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second row - Reverse direction carousel */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-20"></div>
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-20"></div>
            
            <div className="overflow-hidden">
              <div className="flex animate-scroll-reverse hover:animate-pause">
                {/* First set of logos */}
                {sponsors.slice().reverse().map((sponsor, index) => (
                  <div key={`reverse-first-${index}`} className="flex-shrink-0 mx-4 flex items-center justify-center">
                    <div className="group relative">
                      <div className={`w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-400 flex items-center justify-center p-4 border border-gray-100 hover:border-purple-300 hover:scale-105 animate-${sponsor.animation}`}>
                        <img
                          src={`/${sponsor.logo}`}
                          alt={sponsor.name}
                          className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-400"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden items-center justify-center text-gray-400 text-xs text-center">
                          {sponsor.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {sponsors.slice().reverse().map((sponsor, index) => (
                  <div key={`reverse-second-${index}`} className="flex-shrink-0 mx-4 flex items-center justify-center">
                    <div className="group relative">
                      <div className={`w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-400 flex items-center justify-center p-4 border border-gray-100 hover:border-purple-300 hover:scale-105 animate-${sponsor.animation}`}>
                        <img
                          src={`/${sponsor.logo}`}
                          alt={sponsor.name}
                          className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-400"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden items-center justify-center text-gray-400 text-xs text-center">
                          {sponsor.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Call to action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-xl text-gray-600 mb-6 animate-pulse">
            Interested in becoming a sponsor?
          </p>
          <div className="inline-block animate-bounce-slow">
            <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-3xl animate-pulse-glow">
              <span className="flex items-center gap-2">
                Contact Us
                <svg className="w-5 h-5 animate-wiggle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Sponsors;
