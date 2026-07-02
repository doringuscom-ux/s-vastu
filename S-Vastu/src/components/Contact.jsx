import { useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { CONTACT_API } from '../utils/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    problem: '',
    date: '',
    time: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post(CONTACT_API, formData);
      setSuccess(true);
      setFormData({
        name: '', email: '', phone: '', state: '', problem: '', date: '', time: ''
      });
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="py-12 lg:py-16 relative bg-white overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-900/5 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#f0eae1] overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side: Info & Text */}
          <div className="w-full lg:w-5/12 bg-[#0f172a] p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-center">
            {/* Dark background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="#D4AF37" strokeWidth="0.5">
                <circle cx="0" cy="100" r="80" />
                <circle cx="0" cy="100" r="60" />
                <circle cx="0" cy="100" r="40" />
              </svg>
            </div>

            <div className="relative z-10">
              <span className="text-[#D4AF37] font-serif italic tracking-wider text-xl mb-3 block">Get in Touch</span>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-white">
                Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] to-[#D4AF37]">Consultation</span> Today
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] rounded-full mb-8"></div>
              
              <p className="text-gray-300 text-[15px] leading-relaxed mb-12">
                Whether you are looking for Vastu for home, Vastu for office, or need guidance on effective Vastu products, S Vastu Solution is your one-stop destination. With our result-driven approach and commitment to client satisfaction, we are proud to be recognized as a trusted Vastu consultant in Zirakpur, Chandigarh, and Panchkula.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Call Us</p>
                    <p className="font-semibold text-white tracking-wide">+91 98177 55699</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email Us</p>
                    <p className="font-semibold text-white tracking-wide">info@svastusolution.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-7/12 p-10 md:p-14 bg-white relative">
            <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Fill the form to book an appointment</h3>
            
            {success && (
              <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl flex items-start gap-3 border border-green-100">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Request Submitted!</h4>
                  <p className="text-sm">Thank you for reaching out. Our team will contact you shortly to confirm your consultation.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-xl flex items-start gap-3 border border-red-100">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    required
                    className="w-full bg-[#FCFBF8] border border-[#e5dfd5] rounded-xl px-5 py-3.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-gray-800 placeholder-gray-400" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    required
                    className="w-full bg-[#FCFBF8] border border-[#e5dfd5] rounded-xl px-5 py-3.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-gray-800 placeholder-gray-400" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Phone *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91" 
                    required
                    className="w-full bg-[#FCFBF8] border border-[#e5dfd5] rounded-xl px-5 py-3.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-gray-800 placeholder-gray-400" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">State</label>
                  <input 
                    type="text" 
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Chandigarh" 
                    className="w-full bg-[#FCFBF8] border border-[#e5dfd5] rounded-xl px-5 py-3.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-gray-800 placeholder-gray-400" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Type of Problem you are facing *</label>
                <input 
                  type="text" 
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  placeholder="e.g. Health issues, business growth..." 
                  required
                  className="w-full bg-[#FCFBF8] border border-[#e5dfd5] rounded-xl px-5 py-3.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-gray-800 placeholder-gray-400" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Preferred Date</label>
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-[#FCFBF8] border border-[#e5dfd5] rounded-xl px-5 py-3.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-gray-800" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Preferred Time</label>
                  <input 
                    type="time" 
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-[#FCFBF8] border border-[#e5dfd5] rounded-xl px-5 py-3.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-gray-800" 
                  />
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending Request...' : 'Book Now'}
                  {!loading && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
