import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Search, Globe, Navigation2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PAGES_API } from '../utils/api';
import SeoMeta from '../components/SeoMeta';

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await axios.get(PAGES_API);
        setLocations(data);
      } catch (err) {
        console.error('Error fetching locations:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLocations();
    window.scrollTo(0, 0);
  }, []);

  const filteredLocations = useMemo(() => {
    if (!searchQuery) return locations;
    return locations.filter(loc => {
      const cityName = loc.city || loc.slug || '';
      return cityName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [locations, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 pb-12 pt-20 lg:pt-24">
      <SeoMeta pageName="locations" />
      
      {/* Hero Section */}
      <section className="relative bg-[#0B152A] pt-16 pb-10 sm:pt-20 sm:pb-12 overflow-hidden text-center">
        {/* Animated glowing blobs */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -25, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 -left-40 w-[500px] h-[500px] bg-[#D4AF37] rounded-full mix-blend-screen filter blur-[120px] opacity-15 pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 25, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-[#38bdf8] rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none"
        />
        {/* Dot grid pattern */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-white mb-5 leading-tight tracking-tight"
          >
            Our Locations{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#f8e8a0] to-[#D4AF37]">
                Worldwide
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37] to-[#D4AF37]/0 rounded-full" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            We provide expert{' '}
            <span className="text-[#D4AF37]/80 font-medium">Vastu and Astrology</span>{' '}
            services across the globe. Search and select your city below.
          </motion.p>

          {/* Divider */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/50 rounded-full" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/50 rounded-full" />
          </div>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#D4AF37] transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for your city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent focus:bg-white/15 backdrop-blur-md shadow-2xl transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                Clear
              </button>
            )}
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
      </section>

      {/* Locations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">
        {loading ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center text-lg text-gray-500 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin"></div>
            <p className="font-medium animate-pulse text-gray-400">Loading global locations...</p>
          </div>
        ) : filteredLocations.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl shadow-xl p-16 text-center text-gray-500 border border-gray-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
              <Navigation2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No locations found</h3>
            <p>We couldn't find any city matching "{searchQuery}". Try a different name.</p>
            <button onClick={() => setSearchQuery('')} className="mt-6 text-orange-500 font-semibold hover:text-orange-600 transition-colors">
              Clear Search
            </button>
          </motion.div>
        ) : (
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6"
          >
            {filteredLocations.map((loc, index) => {
              const cityName = loc.city || loc.slug || '';
              if (!cityName) return null;
              
              const formattedName = cityName
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
              
              // Cycle through gradient palettes
              const palettes = [
                { card: 'from-orange-50 to-amber-50', icon: 'from-orange-400 to-orange-500', shadow: 'rgba(251,146,60,0.35)', text: 'text-orange-600', border: 'border-orange-100 group-hover:border-orange-300' },
                { card: 'from-rose-50 to-pink-50', icon: 'from-rose-400 to-pink-500', shadow: 'rgba(244,63,94,0.3)', text: 'text-rose-600', border: 'border-rose-100 group-hover:border-rose-300' },
                { card: 'from-violet-50 to-purple-50', icon: 'from-violet-400 to-purple-500', shadow: 'rgba(139,92,246,0.3)', text: 'text-violet-600', border: 'border-violet-100 group-hover:border-violet-300' },
                { card: 'from-blue-50 to-sky-50', icon: 'from-blue-400 to-sky-500', shadow: 'rgba(59,130,246,0.3)', text: 'text-blue-600', border: 'border-blue-100 group-hover:border-blue-300' },
                { card: 'from-emerald-50 to-green-50', icon: 'from-emerald-400 to-green-500', shadow: 'rgba(16,185,129,0.3)', text: 'text-emerald-600', border: 'border-emerald-100 group-hover:border-emerald-300' },
              ];
              const palette = palettes[index % palettes.length];

              return (
                <motion.div key={loc._id} variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.96 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
                }}>
                  <Link 
                    to={`/city/${cityName}`}
                    className={`group relative bg-gradient-to-br ${palette.card} rounded-3xl p-5 border ${palette.border} transition-all duration-300 flex flex-col items-center justify-center text-center h-48 overflow-hidden transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_${palette.shadow}] block`}
                  >
                    {/* Decorative Rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></div>

                    {/* Icon with Pulse */}
                    <div className="relative z-10 mb-3">
                      {/* Pulse Ring */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${palette.icon} opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-700 ease-out`}></div>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${palette.icon} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-[0_8px_25px_${palette.shadow}] transition-all duration-300 relative`}>
                        <MapPin size={26} className="stroke-[2]" />
                      </div>
                    </div>
                    
                    {/* City Name */}
                    <span className={`font-bold text-gray-800 text-base sm:text-lg group-hover:${palette.text} transition-all duration-300 z-10 relative`}>
                      {formattedName}
                    </span>

                    {/* View Services pill */}
                    <div className={`mt-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm text-xs font-semibold ${palette.text} opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 z-10 relative shadow-sm`}>
                      View Services →
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
