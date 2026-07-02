import { Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebookF, FaYoutube, FaInstagram, FaPinterestP } from 'react-icons/fa';
import logo from '../assets/S.Vastu-logo.webp';

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] text-gray-300 pt-16 pb-8 border-t border-[#0A192F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="flex flex-col items-start lg:items-center text-center lg:text-left space-y-6">
            <div className="bg-white p-6 rounded-full shadow-sm inline-block mb-2">
              <img src={logo} alt="S Vastu Solution Logo" className="h-24 w-auto object-contain" />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white font-medium mb-3">Follow Us On :</p>
              <div className="flex gap-4 text-[#D4AF37]">
                <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                  <FaFacebookF className="w-[18px] h-[18px]" />
                </a>
                <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
                  <FaYoutube className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors" aria-label="Pinterest">
                  <FaPinterestP className="w-[18px] h-[18px]" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 uppercase tracking-wide">Contact Info</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <a href="mailto:svastunumerology@gmail.com" className="text-gray-300 text-sm hover:text-white transition-colors uppercase">SVASTUNUMEROLOGY@GMAIL.COM</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] mt-1" />
                <div className="flex flex-col gap-1 text-gray-300 text-sm">
                  <a href="tel:+919817755699" className="hover:text-white transition-colors">+91 98177 55699</a>
                  <a href="tel:+919878657299" className="hover:text-white transition-colors">+91 98786 57299</a>
                </div>
              </li>
            </ul>

            <h4 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">Address</h4>
            <ul className="space-y-3 border border-white/20 rounded-md">

              <li className="flex items-start gap-3 p-3">
                <MapPin className="w-4 h-4 text-gray-300 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Shop No. 55, 1st Floor, Main Market, Panchkula Road, Baltana</span>
              </li>
            </ul>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Locations', 'Blog'].map((link) => {
                let linkPath = link.toLowerCase().replace(' ', '-');
                if (link === 'Home') linkPath = '';
                if (link === 'About Us') linkPath = 'about';
                
                return (
                <li key={link}>
                  <a href={`/${linkPath}`} className="text-gray-300 hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-sm">
                    <span className="text-[#D4AF37] font-bold">›</span> {link}
                  </a>
                </li>
                );
              })}
            </ul>
          </div>

          {/* Vastu Services Col */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 uppercase tracking-wide">Vastu Services</h4>
            <ul className="space-y-4">
              {['Vastu Solution', 'Vastu For House', 'Vastu For Office'].map((service) => (
                <li key={service}>
                  <a href={`/services`} className="text-gray-300 hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-sm">
                    <span className="text-[#D4AF37] font-bold">›</span> {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} S Vastu Solution. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
