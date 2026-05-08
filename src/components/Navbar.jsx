import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, User } from 'lucide-react';

const Navbar = ({ cartCount, onCartClick, onLoginClick, user }) => {
  const [scrolled, setScrolled]     = useState(false);
  const [scrollDir, setScrollDir]   = useState('up');
  const [isOverHero, setIsOverHero] = useState(true); // assume hero on first render
  const lastY = useRef(0);

  // Scroll direction + depth tracker
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setScrollDir(y > lastY.current ? 'down' : 'up');
      lastY.current = y;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // IntersectionObserver watches the sentinel at the bottom of HeroBanner.
  // While sentinel is visible  → isOverHero = true  (white text, no bg)
  // Once sentinel leaves view  → isOverHero = false (dark text, bg appears)
  useEffect(() => {
    const attach = () => {
      const sentinel = document.getElementById('hero-sentinel');
      if (!sentinel) return false;

      const observer = new IntersectionObserver(
        ([entry]) => setIsOverHero(entry.isIntersecting),
        { threshold: 0, rootMargin: '0px 0px 0px 0px' }
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    };

    // Try immediately, retry after a tick if DOM isn't ready yet
    const cleanup = attach();
    if (cleanup) return cleanup;
    const id = setTimeout(() => attach(), 100);
    return () => clearTimeout(id);
  }, []);

  // Derived state
  const light   = isOverHero;                            // white mode
  const showBg  = !isOverHero && scrolled;              // frosted bg only outside hero
  const hideNav = scrollDir === 'down' && !isOverHero && scrolled; // hide on scroll-down outside hero

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        y: hideNav ? -80 : 0,
        backdropFilter: showBg ? 'blur(24px) saturate(180%)' : 'blur(0px)',
        backgroundColor: showBg ? 'rgba(247,239,226,0.88)' : 'rgba(0,0,0,0)',
        boxShadow: showBg
          ? '0 1px 0 rgba(173,42,42,0.08), 0 4px 24px rgba(28,26,23,0.06)'
          : 'none',
      }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 py-3.5 md:py-4">

        {/* ── Brand ── */}
        <motion.div
          className="flex items-center gap-2.5 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        >
          <motion.div
            className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#ad2a2a] flex items-center justify-center shadow-sm"
            whileHover={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white font-bold text-[10px] md:text-[11px] tracking-wide font-['DM_Sans']">DK</span>
          </motion.div>
          <motion.span
            className="font-['Cormorant_Garamond'] font-semibold text-[18px] md:text-[22px] italic leading-none tracking-wide"
            animate={{ color: light ? '#ffffff' : '#1C1A17' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Dapur Kembar
          </motion.span>
        </motion.div>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-1.5 md:gap-3">

          {/* Login / Profile — desktop */}
          <motion.button
            onClick={onLoginClick}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full font-['DM_Sans'] font-semibold text-[13px] relative overflow-hidden"
            animate={{
              color: light
                ? 'rgba(255,255,255,0.88)'
                : (user ? '#ad2a2a' : '#1C1A17'),
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              backgroundColor: light ? 'rgba(255,255,255,0.12)' : 'rgba(28,26,23,0.05)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            {user ? (
              <>
                <motion.div
                  className="w-5 h-5 rounded-full bg-[#ad2a2a] text-white flex items-center justify-center text-[10px] font-bold"
                  whileHover={{ scale: 1.15 }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </motion.div>
                Profil
              </>
            ) : (
              <>
                <User className="w-[18px] h-[18px]" strokeWidth={1.8} />
                Masuk
              </>
            )}
          </motion.button>

          {/* Login — mobile */}
          <motion.button
            onClick={onLoginClick}
            className="md:hidden p-2 rounded-full"
            animate={{
              color: light
                ? 'rgba(255,255,255,0.88)'
                : (user ? '#ad2a2a' : '#1C1A17'),
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.9 }}
            whileHover={{
              backgroundColor: light ? 'rgba(255,255,255,0.12)' : 'rgba(28,26,23,0.05)',
            }}
          >
            {user ? (
              <div className="w-5 h-5 rounded-full bg-[#ad2a2a] text-white flex items-center justify-center text-[10px] font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <User className="w-[20px] h-[20px]" strokeWidth={1.8} />
            )}
          </motion.button>

          {/* Divider */}
          <motion.div
            className="w-[1px] h-4 hidden md:block"
            animate={{ backgroundColor: light ? 'rgba(255,255,255,0.22)' : 'rgba(28,26,23,0.1)' }}
            transition={{ duration: 0.4 }}
          />

          {/* Cart */}
          <motion.button
            id="cart-btn"
            onClick={onCartClick}
            className="relative p-2 rounded-full cursor-pointer"
            animate={{ color: light ? 'rgba(255,255,255,0.88)' : '#1C1A17' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              backgroundColor: light ? 'rgba(255,255,255,0.12)' : 'rgba(173,42,42,0.08)',
            }}
            whileTap={{ scale: 0.88 }}
            aria-label="Buka keranjang belanja"
          >
            <ShoppingBag className="w-[22px] h-[22px] md:w-5 md:h-5" strokeWidth={1.8} />
            {cartCount > 0 && (
              <motion.span
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#ad2a2a] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm font-['DM_Sans']"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={cartCount}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              >
                {cartCount > 99 ? '99+' : cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
