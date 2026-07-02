import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GALLERY_API } from '../utils/api';

const defaultCategories = ["All", "Residential", "Commercial", "Vastu Compliant"];

export default function Gallery({ hideHeader = false, limit }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await axios.get(GALLERY_API);
        setImages(data);
      } catch (err) {
        console.error("Error fetching gallery", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = ["All", ...new Set(images.map(img => img.category))];
  const displayCategories = categories.length > 1 ? categories : defaultCategories;

  const filteredImages = images.filter(img =>
    activeCategory === "All" ? true : img.category === activeCategory
  );

  const displayedImages = limit ? filteredImages.slice(0, limit) : filteredImages;
  const hasMore = limit && filteredImages.length > limit;

  return (
    <section id="gallery" className={`relative overflow-hidden ${hideHeader ? 'bg-transparent py-10' : 'bg-[#050A15] py-24'}`}>
      {/* Abstract Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#D4AF37]/5 to-transparent rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#38bdf8]/5 to-transparent rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {!hideHeader && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[#D4AF37] text-xs sm:text-sm font-medium tracking-wider uppercase">Portfolio</span>
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Project <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-200 to-[#D4AF37]">Gallery</span>
            </h2>
            <p className="text-slate-400 text-lg sm:text-xl font-light">
              A visual journey through spaces transformed by authentic Vastu principles, where energy meets elegance.
            </p>
          </motion.div>
        )}

        {/* Filters */}
        {!loading && displayCategories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {displayCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md ${activeCategory === category
                  ? "bg-[#D4AF37] text-[#050A15] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105"
                  : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-[250px] lg:auto-rows-[300px] grid-flow-dense"
          >
          <AnimatePresence mode='popLayout'>
            {displayedImages.map((image, index) => {
              // Create a perfect gap-free bento layout when all images are shown
              const isAll = displayedImages.length === 6;
              const bentoClasses = [
                'md:col-span-2 md:row-span-2', // 1 (Large square)
                'md:col-span-1 md:row-span-1', // 2 (Small square)
                'md:col-span-1 md:row-span-1', // 3 (Small square)
                'md:col-span-1 md:row-span-2', // 4 (Tall rectangle)
                'md:col-span-1 lg:col-span-2 md:row-span-1', // 5 (Wide rectangle on LG, small on MD)
                'md:col-span-1 lg:col-span-2 md:row-span-1', // 6 (Wide rectangle on LG, small on MD)
              ];

              const gridClass = isAll ? bentoClasses[index] : 'md:col-span-1 md:row-span-1';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                  key={image._id || image.id || index}
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#D4AF37]/50 shadow-lg ${gridClass}`}
                >
                  <div className="absolute inset-0 bg-[#050A15]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050A15] via-[#050A15]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                    >
                      <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3 backdrop-blur-md">
                        {image.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                        {image.alt}
                      </h3>
                    </motion.div>

                    {/* View Icon */}
                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 delay-100 hover:bg-[#D4AF37] hover:border-[#D4AF37] group/icon">
                      <Maximize2 className="w-5 h-5 text-white group-hover/icon:text-[#050A15] transition-colors" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        )}

        {/* View All Button */}
        {hasMore && (
          <div className="mt-16 text-center relative z-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#0B152A] border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-lg shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all hover:bg-[#D4AF37] hover:text-[#050A15] hover:scale-105 group"
            >
              View Full Gallery
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
