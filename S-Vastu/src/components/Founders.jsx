import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import nareshImage from '../assets/ER. Naresh Kumar.webp';
import supriyaImage from '../assets/ER. Supriya.webp';

export default function Founders() {
  return (
    <section className="py-24 bg-[#0B152A] relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#38bdf8]/10 to-transparent rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-[#D4AF37] font-serif italic tracking-wider text-xl mb-3 block">Our Visionaries</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Meet the Experts
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
        </motion.div>

        <div className="space-y-16">
          
          {/* Founder 1: ER. Naresh Kumar */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-[#131F3B]/80 backdrop-blur-sm rounded-[2rem] p-8 md:p-12 lg:p-16 border border-[#1E3050] shadow-2xl relative overflow-hidden group"
          >
            {/* Subtle Compass Background Pattern */}
            <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none text-[#D4AF37] group-hover:scale-110 transition-transform duration-1000">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="50" cy="50" r="45" />
                <circle cx="50" cy="50" r="35" />
                <line x1="50" y1="0" x2="50" y2="100" />
                <line x1="0" y1="50" x2="100" y2="50" />
                <line x1="15" y1="15" x2="85" y2="85" />
                <line x1="15" y1="85" x2="85" y2="15" />
              </svg>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center relative z-10">
              
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A2A47] border border-[#2A3E63] shadow-sm mb-6"
                >
                  <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  <span className="text-[11px] font-bold text-slate-200 uppercase tracking-widest">36+ Years of Experience</span>
                </motion.div>
                
                <h4 className="text-[#D4AF37] font-serif italic text-2xl mb-2">Expert Vastu Consultant</h4>
                <h3 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                  ER. <span className="text-[#94A3B8]">Naresh Kumar</span>
                </h3>
                
                {/* Custom Divider */}
                <div className="flex items-center gap-3 mb-8 w-3/4">
                  <div className="h-[1px] flex-1 bg-[#D4AF37]/50"></div>
                  <div className="w-2 h-2 rotate-45 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                  <div className="h-[1px] flex-1 bg-[#D4AF37]/50"></div>
                </div>

                <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                  <p>
                    A highly experienced <strong className="text-white font-bold">Vastu Shastra expert</strong> and qualified <strong className="text-white font-bold">Civil Engineer</strong>. With a profound understanding of <strong className="text-white font-bold">architectural science</strong> and <strong className="text-white font-bold">traditional Vastu principles</strong>, he has transformed countless living and working spaces.
                  </p>
                  <p>
                    His practical approach ensures that every structure aligns with <strong className="text-[#D4AF37] font-bold">positive cosmic energy</strong>—bringing <strong className="text-white font-bold">prosperity, peace, and success</strong> without compromising on modern architectural aesthetics.
                  </p>
                </div>
              </motion.div>

              {/* Image Section */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                {/* Golden thick border wrap */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative p-2 rounded-tl-[6rem] rounded-tr-[12rem] rounded-bl-[2rem] rounded-br-[12rem] bg-gradient-to-br from-[#D4AF37] via-[#f8f0dd] to-[#e6c888] shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-[350px]"
                >
                  {/* Inner dark border padding */}
                  <div className="p-3 bg-[#0B152A] rounded-tl-[5.5rem] rounded-tr-[11.5rem] rounded-bl-[1.5rem] rounded-br-[11.5rem] h-full w-full">
                    <div className="relative w-full aspect-[4/5] rounded-tl-[5rem] rounded-tr-[11rem] rounded-bl-[1rem] rounded-br-[11rem] overflow-hidden bg-[#1A2A47]">
                      <img 
                        src={nareshImage} 
                        alt="Er. Naresh Kumar" 
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>

          {/* Founder 2: ER. Supriya */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-[#131F3B]/80 backdrop-blur-sm rounded-[2rem] p-8 md:p-12 lg:p-16 border border-[#1E3050] shadow-2xl relative overflow-hidden group"
          >
            {/* Subtle Compass Background Pattern */}
            <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none text-[#D4AF37] group-hover:scale-110 transition-transform duration-1000">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="50" cy="50" r="45" />
                <circle cx="50" cy="50" r="35" />
                <line x1="50" y1="0" x2="50" y2="100" />
                <line x1="0" y1="50" x2="100" y2="50" />
                <line x1="15" y1="15" x2="85" y2="85" />
                <line x1="15" y1="85" x2="85" y2="15" />
              </svg>
            </div>

            <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-center relative z-10">
              
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A2A47] border border-[#2A3E63] shadow-sm mb-6"
                >
                  <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  <span className="text-[11px] font-bold text-slate-200 uppercase tracking-widest">Vedic Vastu & Nutrology</span>
                </motion.div>
                
                <h4 className="text-[#D4AF37] font-serif italic text-2xl mb-2">Advanced Wellness Expert</h4>
                <h3 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                  ER. <span className="text-[#94A3B8]">Supriya</span>
                </h3>
                
                {/* Custom Divider */}
                <div className="flex items-center gap-3 mb-8 w-3/4">
                  <div className="h-[1px] flex-1 bg-[#D4AF37]/50"></div>
                  <div className="w-2 h-2 rotate-45 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                  <div className="h-[1px] flex-1 bg-[#D4AF37]/50"></div>
                </div>

                <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                  <p>
                    Holding an <strong className="text-white font-bold">M.Tech degree</strong> alongside a <strong className="text-[#D4AF37] font-bold">PG Diploma in Vedic Vastu</strong> and a specialized qualification in <strong className="text-white font-bold">Nutrology</strong>.
                  </p>
                  <p>
                    With over <strong className="text-white font-bold">5 years of dedicated experience</strong>, she masterfully blends the <strong className="text-[#D4AF37] font-bold">ancient wisdom of Vedic Vastu</strong> with modern lifestyle and nutrology, guiding individuals to achieve <strong className="text-white font-bold">perfectly balanced living spaces</strong> and <strong className="text-white font-bold">holistic well-being</strong>.
                  </p>
                </div>
              </motion.div>

              {/* Image Section */}
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                {/* Golden thick border wrap */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative p-2 rounded-tr-[6rem] rounded-tl-[12rem] rounded-br-[2rem] rounded-bl-[12rem] bg-gradient-to-bl from-[#D4AF37] via-[#f8f0dd] to-[#e6c888] shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-[350px]"
                >
                  {/* Inner dark border padding */}
                  <div className="p-3 bg-[#0B152A] rounded-tr-[5.5rem] rounded-tl-[11.5rem] rounded-br-[1.5rem] rounded-bl-[11.5rem] h-full w-full">
                    <div className="relative w-full aspect-[4/5] rounded-tr-[5rem] rounded-tl-[11rem] rounded-br-[1rem] rounded-bl-[11rem] overflow-hidden bg-[#1A2A47]">
                      <img 
                        src={supriyaImage} 
                        alt="Er. Supriya" 
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
