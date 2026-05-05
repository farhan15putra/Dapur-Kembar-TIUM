import React from 'react';
import { MENU_ITEMS } from '../data/menu';

const COLLAGE_IMAGES = [
  MENU_ITEMS.find(i => i.id === 1)?.image,   // Risol Mayo
  MENU_ITEMS.find(i => i.id === 6)?.image,   // Brownies
  MENU_ITEMS.find(i => i.id === 2)?.image,   // Lemper
  MENU_ITEMS.find(i => i.id === 8)?.image,   // Donat
  MENU_ITEMS.find(i => i.id === 5)?.image,   // Kue Lumpur
  MENU_ITEMS.find(i => i.id === 3)?.image,   // Pastel Sayur
  MENU_ITEMS.find(i => i.id === 7)?.image,   // Sus Buah
].filter(Boolean);

const HeroBanner = ({ onExplore }) => {
  return (
    <section className="relative pt-24 pb-12 overflow-hidden md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-5 relative min-h-[520px] md:min-h-[700px] flex items-center justify-center">

        {/* ── Scattered food circles ─────────────── */}

        {/* Top-left */}
        <img
          src={COLLAGE_IMAGES[0]}
          alt=""
          className="food-circle absolute animate-float w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[180px] md:h-[180px]"
          style={{ top: '5%', left: '5%' }}
        />
        {/* Top-right */}
        <img
          src={COLLAGE_IMAGES[1]}
          alt=""
          className="food-circle absolute animate-float-slow w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[160px] md:h-[160px] delay-200"
          style={{ top: '0%', right: '10%' }}
        />
        {/* Mid-left */}
        <img
          src={COLLAGE_IMAGES[2]}
          alt=""
          className="food-circle absolute animate-float w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] md:w-[140px] md:h-[140px] delay-400"
          style={{ top: '35%', left: '2%' }}
        />
        {/* Mid-right */}
        <img
          src={COLLAGE_IMAGES[3]}
          alt=""
          className="food-circle absolute animate-float-slow w-[75px] h-[75px] sm:w-[95px] sm:h-[95px] md:w-[150px] md:h-[150px] delay-300"
          style={{ top: '30%', right: '2%' }}
        />

        {/* ── Center text ───────────────────────── */}
        <div className="relative z-10 text-center px-4 max-w-xl mx-auto">
          <p className="text-[#ad2a2a] text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-4 animate-fade-in-up">
            Katering & Snack Box
          </p>
          <h1 className="font-display text-[36px] sm:text-[44px] md:text-[64px] font-bold leading-[1.1] text-[#1C1A17] animate-fade-in-up delay-100">
            Cita Rasa<br />
            <span className="italic text-[#ad2a2a]">Rumahan,</span><br />
            Kualitas Premium!
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed mt-6 mb-8 max-w-[280px] md:max-w-sm mx-auto animate-fade-in-up delay-200">
            Kue tradisional, snack box, dan katering berkualitas untuk berbagai acara spesial Anda.
          </p>
          <button
            onClick={onExplore}
            className="inline-flex items-center gap-2 bg-[#ad2a2a] text-white font-bold text-sm md:text-base px-8 py-3 md:py-4 rounded-full hover:bg-[#8a2222] active:scale-95 transition-all shadow-lg shadow-[#ad2a2a]/20 animate-fade-in-up delay-300 cursor-pointer"
          >
            Explore the Menu
          </button>
        </div>

        {/* ── Bottom scattered circles ──────────── */}

        {/* Bottom-left */}
        <img
          src={COLLAGE_IMAGES[4]}
          alt=""
          className="food-circle absolute animate-float-slow w-[85px] h-[85px] sm:w-[105px] sm:h-[105px] md:w-[170px] md:h-[170px] delay-500"
          style={{ bottom: '10%', left: '8%' }}
        />
        {/* Bottom-center */}
        <img
          src={COLLAGE_IMAGES[5]}
          alt=""
          className="food-circle absolute animate-float w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[130px] md:h-[130px] delay-600"
          style={{ bottom: '2%', left: '40%' }}
        />
        {/* Bottom-right */}
        <img
          src={COLLAGE_IMAGES[6]}
          alt=""
          className="food-circle absolute animate-float-slow w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[160px] md:h-[160px] delay-400"
          style={{ bottom: '15%', right: '8%' }}
        />
      </div>
    </section>
  );
};

export default HeroBanner;
