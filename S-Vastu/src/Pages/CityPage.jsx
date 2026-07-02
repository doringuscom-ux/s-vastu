import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { PAGES_API } from '../utils/api';
import About from '../components/About';
import Services from '../components/Services';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import AirflowVastuChakra from '../components/AirflowVastuChakra';

function CityHero({ city, customText }) {
  const formattedCity = city ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase() : 'Your City';

  return (
    <section className="relative pt-36 pb-16 md:pt-48 md:pb-24 bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h4 className="text-orange-600 font-bold tracking-widest mb-4 text-sm uppercase">
            S-Vastu Services in {formattedCity}
          </h4>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Expert Vastu & Astrology in <span className="text-orange-500">{formattedCity}</span>
          </h1>
          {customText ? (
            <div 
              className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-4xl mx-auto text-center
                         [&>p]:mb-4 [&>p:last-child]:mb-0 
                         [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:mt-6 [&>h1]:text-gray-900 
                         [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-3 [&>h2]:mt-6 [&>h2]:text-gray-900 
                         [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-3 [&>h3]:mt-5 [&>h3]:text-gray-900 
                         [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ul]:text-left [&>ul]:inline-block
                         [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2 [&>ol]:text-left [&>ol]:inline-block
                         [&>strong]:font-bold [&>strong]:text-gray-900
                         [&>a]:text-orange-600 [&>a]:underline hover:[&>a]:text-orange-700"
              dangerouslySetInnerHTML={{ __html: customText }}
            />
          ) : (
            <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed text-center">
              Transform your life and space with our specialized Vastu and Astrology services tailored for clients in {formattedCity}. Experience harmony, success, and peace.
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-orange-500/30">
              Book a Consultation in {formattedCity}
            </a>
            <a href="#services" className="bg-white text-orange-500 border border-orange-500 hover:bg-orange-50 px-8 py-3 rounded-full font-bold transition-all">
              Explore Our Services
            </a>
          </div>
        </div>
      </div>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
    </section>
  );
}

export default function CityPage() {
  const { cityName } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const { data } = await axios.get(`${PAGES_API}/${cityName}`);
        setPageData(data);
      } catch (err) {
        console.error('Page SEO data not found for this city.');
        // We don't set error to true here to allow rendering a default city page even if backend data is missing
        // setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPageData();
    window.scrollTo(0, 0);
  }, [cityName]);

  if (loading) {
    return <div className="min-h-screen pt-32 text-center text-xl font-bold">Loading {cityName}...</div>;
  }

  const formattedCity = cityName ? cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase() : 'Your City';

  const metaTitle = pageData?.metaTitle || `Best Vastu Consultant & Astrologer in ${formattedCity} | S-Vastu`;
  const metaDescription = pageData?.metaDescription || `Looking for expert Vastu and Astrology services in ${formattedCity}? S-Vastu offers personalized consultations for home, business, and numerology.`;
  const metaKeywords = pageData?.metaKeywords || `vastu consultant ${formattedCity}, best astrologer ${formattedCity}, numerology ${formattedCity}`;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://s-vastu.com';
  const metaCanonical = pageData?.metaCanonical || `${baseUrl}/city/${cityName}`;
  const metaRobots = pageData?.metaRobots || 'index, follow';

  return (
    <div className="city-landing-page">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}
        <link rel="canonical" href={metaCanonical} />
        <meta name="robots" content={metaRobots} />
      </Helmet>

      <CityHero city={cityName} customText={pageData?.customText} />
      
      <div id="services">
        <Services />
      </div>
      
      <AirflowVastuChakra />
      <About />
      <Process />
      <Testimonials />
      
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}
