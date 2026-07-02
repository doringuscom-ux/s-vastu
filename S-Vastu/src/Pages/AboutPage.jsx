import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Star, Eye, Shield, Target } from 'lucide-react';
import Founders from '../components/Founders';
import consultationImg from '../assets/consultation.png';
import SeoMeta from '../components/SeoMeta';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      <SeoMeta pageName="about" />
      {/* Hero Section */}
      <section className="relative bg-[#0B152A] pt-16 pb-10 sm:pt-20 sm:pb-12 overflow-hidden">
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-white mb-5 leading-tight tracking-tight">
              About{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#f8e8a0] to-[#D4AF37]">
                  Us
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37] to-[#D4AF37]/0 rounded-full" />
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Bridging{' '}
              <span className="text-[#D4AF37]/80 font-medium">ancient cosmic wisdom</span>{' '}
              with modern living to create spaces of profound harmony, prosperity, and joy.
            </p>
            {/* Divider */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/50 rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/50 rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-white">
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

      {/* Core Values */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Core Values</h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Shield, title: "Integrity", desc: "Honest and transparent guidance without fear-mongering." },
              { icon: Star, title: "Excellence", desc: "Highest standards of service and profound expertise." },
              { icon: Compass, title: "Authenticity", desc: "Rooted in classical texts, adapted for modern architecture." }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl cursor-pointer"
              >
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-[#B8860B]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <Founders />

      {/* Call to Action */}
      <section className="py-16 bg-white border-t border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Ready to Transform Your Space?</h2>
          <p className="text-lg text-gray-500 mb-8">Connect with our experts today and embark on a journey towards harmony and prosperity.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(184, 134, 11, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              href="/#contact"
              className="inline-block bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold text-lg px-10 py-3.5 rounded-full shadow-lg transition-all"
            >
              Book a Consultation
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/services"
              className="inline-block border-2 border-[#D4AF37] text-[#B8860B] font-semibold text-lg px-10 py-3.5 rounded-full hover:bg-[#D4AF37]/5 transition-all"
            >
              Explore Services
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
