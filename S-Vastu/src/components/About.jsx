import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Star, Eye, Shield, Target } from 'lucide-react';

import consultationImg from '../assets/consultation.png';

export default function About() {
  return (
    <div id="about" className="bg-white">
      {/* Mission & Vision Section */}
      <section className="pb-24 pt-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-[#D4AF37] font-semibold tracking-widest uppercase mb-2">Our Philosophy</h3>
                <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Transforming Spaces, Elevating Lives</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  At S-Vastu Solution, we believe that the environment you surround yourself with profoundly impacts your destiny. Our expert consultations diagnose energetic imbalances and provide simple, non-destructive remedies to invite positive cosmic energy.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FFF9EB] p-6 rounded-2xl border border-[#D4AF37]/20 shadow-lg shadow-[#D4AF37]/10 hover:shadow-2xl hover:shadow-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all cursor-pointer"
                >
                  <Eye className="w-8 h-8 text-[#B8860B] mb-4" />
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h4>
                  <p className="text-gray-700">To create a world where every home and workplace is a sanctuary of peace and success.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FFF9EB] p-6 rounded-2xl border border-[#D4AF37]/20 shadow-lg shadow-[#D4AF37]/10 hover:shadow-2xl hover:shadow-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all cursor-pointer"
                >
                  <Target className="w-8 h-8 text-[#B8860B] mb-4" />
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h4>
                  <p className="text-gray-700">Delivering authentic, scientific, and practical Vastu solutions tailored to modern lifestyles.</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8860B]/20 rounded-3xl transform rotate-3 scale-105"
              ></motion.div>
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                src={consultationImg} 
                alt="Vastu Consultation" 
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px]" 
              />
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
}
