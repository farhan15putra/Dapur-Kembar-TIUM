import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS } from '../data/menu';

// Pick hero backgrounds for slideshow
const HERO_BGS = [
  MENU_ITEMS.find(i => i.id === 1)?.image,
  MENU_ITEMS.find(i => i.id === 12)?.image, // Kue Manis (Bolu Surabaya)
  MENU_ITEMS.find(i => i.id === 11)?.image, // Dimsum Mentai
].filter(Boolean);

/* ── Staggered word reveal ── */
function SplitReveal({ text, className, delay = 0, color }) {
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className={`inline-block ${color || ''}`}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: delay + wi * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const HeroBanner = ({ onExplore }) => {
  const sectionRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (HERO_BGS.length <= 1) return;
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BGS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Sentinel — Navbar watches this to switch text color */}
      <div id="hero-sentinel" className="absolute bottom-0 left-0 w-full h-1 pointer-events-none" />
      {/* ── Background image slideshow ── */}
      <div className="absolute inset-0 z-0 bg-[#14100c]">
        <AnimatePresence>
          <motion.img
            key={bgIndex}
            src={HERO_BGS[bgIndex]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* ── Dark warm overlay ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(20,16,12,0.55) 0%,
              rgba(20,16,12,0.42) 40%,
              rgba(20,16,12,0.65) 100%
            )
          `,
        }}
      />

      {/* ── Vignette edges ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,8,6,0.45) 100%)',
        }}
      />

      {/* ── Centered content ── */}
      <div className="relative z-20 text-center px-5 max-w-2xl mx-auto flex flex-col items-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-7"
        >
          <motion.span
            className="block h-px bg-white/40"
            initial={{ width: 0 }}
            animate={{ width: 28 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <p className="text-white/70 text-[10px] font-['DM_Sans'] font-bold uppercase tracking-[0.35em]">
            Katering &amp; Snack Box
          </p>
          <motion.span
            className="block h-px bg-white/40"
            initial={{ width: 0 }}
            animate={{ width: 28 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Headline */}
        <h1 className="font-['Cormorant_Garamond'] text-[50px] sm:text-[64px] md:text-[78px] font-semibold leading-[1.0] text-white mb-6">
          <SplitReveal text="Cita Rasa" delay={0.2} />
          <br />
          <SplitReveal text="Rumahan," delay={0.38} color="italic text-[#f5b8b8]" />
          <br />
          <SplitReveal text="Kualitas Premium" delay={0.56} />
        </h1>

        {/* Decorative line */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mb-7"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 56, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Subtext */}
        <motion.p
          className="text-white/65 font-['DM_Sans'] text-[13px] md:text-[15px] leading-relaxed mb-10 max-w-[340px]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          Kue tradisional, snack box, dan katering berkualitas untuk setiap momen spesial Anda.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Primary button */}
          <motion.button
            id="explore-menu-btn"
            onClick={onExplore}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden bg-white text-[#1C1A17] font-['DM_Sans'] font-semibold text-[13px] px-8 py-3.5 rounded-full shadow-xl shadow-black/30 cursor-pointer"
            whileHover={{ scale: 1.04, backgroundColor: '#f5ede0' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <motion.span
              className="absolute inset-0 bg-[#ad2a2a]/10 skew-x-12 -translate-x-full"
              whileHover={{ translateX: '200%' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <span className="relative">Lihat Menu</span>
            <motion.svg
              className="relative w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </motion.button>

          {/* Ghost button */}
          <motion.a
            href="https://wa.me/628111773319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/35 text-white font-['DM_Sans'] font-semibold text-[13px] px-6 py-3.5 rounded-full hover:bg-white/10 hover:border-white/60 transition-all cursor-pointer"
            whileTap={{ scale: 0.97 }}
          >
            Hubungi Kami
          </motion.a>
        </motion.div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-['DM_Sans']">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

    </section>
  );
};

export default HeroBanner;
