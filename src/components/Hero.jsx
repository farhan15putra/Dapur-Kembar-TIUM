import React from 'react';
import { ChevronRight } from 'lucide-react';

const Deco = ({ className, delay = 0 }) => (
  <div
    className={`absolute rounded-full opacity-20 animate-float-slow pointer-events-none ${className}`}
    style={{ animationDelay: `${delay}s` }}
  />
);

const Hero = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16" style={{ background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 40%, #FEF3C7 100%)' }}>
      <Deco className="bg-orange-300 w-72 h-72 -top-20 -left-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 text-center lg:text-left z-10">
          <h1 className="text-5xl sm:text-7xl font-black text-[#1C1A17] leading-[1.05] mb-6">
            Katering <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Korporat</span> Terpadu.
          </h1>
          <p className="text-slate-600 text-lg max-w-xl mx-auto lg:mx-0 mb-10">
            Solusi tuntas penyediaan Snack Box, Nasi Box spesial, kemasan praktis, dan pembelian satuan langsung rapi di satu pintu via WhatsApp.
          </p>
          <button
            onClick={onExploreClick}
            className="px-8 py-4 bg-orange-600 text-white font-extrabold rounded-2xl shadow-xl hover:scale-105 transition-all text-base flex items-center gap-2 mx-auto lg:mx-0"
          >
            Mulai Memilih Menu
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 relative w-full z-10 hidden md:block">
           <div className="relative animate-float scale-90 origin-right">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-amber-400 rounded-[3rem] blur-3xl opacity-40 scale-110" />
            <img src="/hero.png" alt="Dapur Kembar" className="relative w-full rounded-[3rem] shadow-2xl border-4 border-white/80" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
