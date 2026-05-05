import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto px-5 pt-16 md:pt-24 pb-10">
      {/* Thin separator */}
      <div className="w-12 h-[2px] bg-orange-300 mx-auto mb-10 md:mb-16" />

      <div className="text-center mb-10">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4 md:mb-5">
          <span className="text-white font-black text-sm md:text-xl">DK</span>
        </div>
        <p className="font-display text-xl md:text-3xl font-bold italic text-[#1C1A17]">Dapur Kembar</p>
        <p className="text-slate-400 text-xs md:text-sm mt-1">Katering & Snack Box</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mb-10">
        <a href="https://wa.me/628111773319" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 group">
          <Phone className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
          <span className="text-sm md:text-base text-slate-600 group-hover:text-orange-600 transition-colors">+62 811-1773-319</span>
        </a>
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
          <span className="text-sm md:text-base text-slate-600">Cipinang, Jakarta Timur</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
          <span className="text-sm md:text-base text-slate-600">06:00 – 17:00 (Sen – Sab)</span>
        </div>
      </div>

      <p className="text-center text-slate-300 text-[10px] md:text-xs">
        &copy; {new Date().getFullYear()} Dapur Kembar
      </p>
    </footer>
  );
};

export default Footer;
