import { motion } from 'framer-motion';
import heroVideo from '../assets/A_cinematic_slow_panning_K_v.mp4';
import { Globe, Droplets, Flame, Wind, Sparkles } from 'lucide-react';

export default function Hero() {
  const elements = [
    {
      icon: (
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
          <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-[#DCC197]" strokeWidth={1.5} />
        </motion.div>
      ),
      title: "Earth (Prithvi)",
      desc: "The foundation of stability and strength in your environment."
    },
    {
      icon: (
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <Droplets className="w-8 h-8 sm:w-10 sm:h-10 text-[#DCC197]" strokeWidth={1.5} />
        </motion.div>
      ),
      title: "Water (Jal)",
      desc: "Represents fluidity, emotions, and the flow of prosperity."
    },
    {
      icon: (
        <motion.div animate={{ scale: [1, 1.15, 1], rotate: [-3, 3, -3] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}>
          <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-[#DCC197]" strokeWidth={1.5} />
        </motion.div>
      ),
      title: "Fire (Agni)",
      desc: "The energy of transformation, passion, and illumination."
    },
    {
      icon: (
        <motion.div animate={{ x: [-3, 3, -3], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <Wind className="w-8 h-8 sm:w-10 sm:h-10 text-[#DCC197]" strokeWidth={1.5} />
        </motion.div>
      ),
      title: "Air (Vayu)",
      desc: "The breath of life, movement, and communication."
    },
    {
      icon: (
        <motion.div animate={{ rotate: [0, 180, 360], scale: [0.9, 1.1, 0.9] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#DCC197]" strokeWidth={1.5} />
        </motion.div>
      ),
      title: "Space (Akasha)",
      desc: "The container of all elements, representing expansion and connection."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 overflow-hidden gap-8">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          src={heroVideo}
        />
        {/* Simple dark overlay to make text readable */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex-grow flex flex-col items-center justify-center py-10 flex-shrink-0"
      >
        <motion.p 
          variants={itemVariants}
          className="text-[#DCC197] font-medium text-xs sm:text-sm md:text-base mt-4 mb-2 sm:mb-3 drop-shadow-md uppercase tracking-[0.15em] sm:tracking-[0.2em]"
        >
          Trusted Vastu Consultant
        </motion.p>

        <motion.h1 
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 sm:mb-8 leading-tight drop-shadow-2xl"
        >
          Welcome to <br className="block sm:hidden" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCC197] to-[#FCEABB] italic font-semibold">S Vastu Solution</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 font-light drop-shadow-md tracking-wide leading-relaxed px-2"
        >
          Align your space with natural forces to attract peace, prosperity, and positive vibrations.
        </motion.p>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#DCC197] text-[#1E242C] font-semibold text-xs sm:text-sm tracking-[0.25em] uppercase px-8 py-4 sm:px-12 sm:py-5 hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_30px_rgba(220,193,151,0.3)] rounded-sm"
        >
          Discover More
        </motion.button>
      </motion.div>

      {/* Bottom 5 Elements Flip Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className="relative z-20 w-full px-4 pb-8 sm:pb-12 mt-auto flex-shrink-0"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4 sm:gap-6">
          {elements.map((item, i) => (
            <div 
              key={i} 
              className="group h-48 sm:h-56 w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.2rem)] max-w-[260px] [perspective:1000px] cursor-pointer"
            >
              <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Front Side (Glassmorphism) */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
                  <div className="w-16 h-16 rounded-full border border-dashed border-gray-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <div className="transform scale-90">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.15em] text-center mb-3">
                    {item.title}
                  </h3>
                  <div className="w-6 h-px bg-[#DCC197] mb-3"></div>
                  <p className="text-[#DCC197] text-[8px] sm:text-[9px] tracking-[0.2em] uppercase opacity-80">
                    Hover for Info
                  </p>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center bg-[#1E242C]/95 backdrop-blur-lg border border-[#DCC197]/30 rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_30px_rgba(220,193,151,0.15)]">
                  <div className="transform scale-75 mb-2 opacity-80">
                    {item.icon}
                  </div>
                  <h3 className="text-[#DCC197] font-bold text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.15em] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-[10px] sm:text-[11px] md:text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
    </div>
  );
}