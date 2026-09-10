import React from 'react';

export default function CitySections({ pageData }) {
  if (!pageData) return null;

  const sections = [
    { data: pageData.section1, reverse: true },
    { data: pageData.section2, reverse: false },
    { data: pageData.section3, reverse: true },
    { data: pageData.section4, reverse: false },
    { data: pageData.section5, reverse: true },
    { data: pageData.section6, reverse: false }
  ];

  // Filter only sections that have actual content
  const activeSections = sections.filter(section => {
    const { topHeading, topSubHeading, heading, text, image } = section.data || {};
    return !!(topHeading || topSubHeading || heading || text || image);
  });

  if (activeSections.length === 0) return null;

  return (
    <div className="bg-white py-10 md:py-16 overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob -z-10"></div>
      <div className="absolute bottom-40 right-0 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-10 md:space-y-12">
          {activeSections.map((section, index) => {
            const { topHeading, topSubHeading, heading, text, image } = section.data || {};

            return (
              <div key={index} className="flex flex-col">
                
                {/* Optional Center Header */}
                {/* Optional Center Header */}
                {(topHeading || topSubHeading) && (
                  <div className="text-center max-w-3xl mx-auto px-4 mb-8 md:mb-10">
                    {topHeading && (
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3 tracking-normal">
                        {topHeading}
                      </h2>
                    )}
                    {topSubHeading && (
                      <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {topSubHeading}
                      </p>
                    )}
                  </div>
                )}

                <div 
                  className={`group flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 ${
                    section.reverse ? 'md:flex-row-reverse' : ''
                  }`}
                >
                {/* Image Side */}
                {image && (
                  <div className="w-full md:w-1/2 flex justify-center items-center relative">
                    <img 
                      src={image} 
                      alt={heading || `Section ${index + 1}`} 
                      className="rounded-2xl object-cover aspect-[4/3] w-full ring-4 ring-white shadow-sm transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                
                {/* Text Side */}
                <div className={`w-full ${image ? 'md:w-1/2' : 'md:w-full'} break-words flex flex-col justify-center my-auto`}>
                  {heading && (
                    <div className="mb-4 relative inline-block">
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-snug">
                        {heading}
                      </h2>
                      <div className="h-1 w-16 bg-[#D4AF37] rounded-full mt-2"></div>
                    </div>
                  )}
                  {text && (
                    <div 
                      className="city-user-content max-w-none break-words whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
