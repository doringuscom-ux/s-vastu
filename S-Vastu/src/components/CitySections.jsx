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
                {(topHeading || topSubHeading) && (
                  <div className="text-center max-w-4xl mx-auto px-4 mb-10 md:mb-14 -mt-2">
                    {topHeading && (
                      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        {/* We can style the first word differently if we want, but simple text is fine */}
                        {topHeading}
                      </h2>
                    )}
                    {topSubHeading && (
                      <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
                        {topSubHeading}
                      </p>
                    )}
                  </div>
                )}

                <div 
                  className={`group flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                    section.reverse ? 'md:flex-row-reverse' : ''
                  }`}
                >
                {/* Image Side */}
                {image && (
                  <div className="w-full md:w-1/2 flex justify-center relative">
                    <img 
                      src={image} 
                      alt={heading || `Section ${index + 1}`} 
                      className="rounded-2xl object-cover aspect-[4/3] w-full ring-4 ring-white transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                
                {/* Text Side */}
                <div className={`w-full ${image ? 'md:w-1/2' : 'md:w-full'} break-words`}>
                  {heading && (
                    <div className="mb-6 relative inline-block">
                      <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        {heading}
                      </h2>
                      <div className="h-1.5 w-20 bg-orange-500 rounded-full mt-4"></div>
                    </div>
                  )}
                  {text && (
                    <div 
                      className="prose prose-lg text-gray-600 max-w-none break-words whitespace-pre-wrap
                                 [&>p]:mb-6 [&>p:last-child]:mb-0 [&>p]:leading-relaxed
                                 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:mt-8 [&>h1]:text-gray-900 
                                 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-3 [&>h2]:mt-8 [&>h2]:text-gray-900 
                                 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-3 [&>h3]:mt-6 [&>h3]:text-gray-900 
                                 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>ul>li]:mb-3 marker:[&>ul]:text-orange-500 marker:[&>ul]:text-xl
                                 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6 [&>ol>li]:mb-3 [&>ol>li::marker]:text-orange-600 [&>ol>li::marker]:font-bold
                                 [&>strong]:font-bold [&>strong]:text-gray-900"
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
