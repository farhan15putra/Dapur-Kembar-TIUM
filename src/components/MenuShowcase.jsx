import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CATEGORIES, MENU_ITEMS } from '../data/menu';

const CATEGORY_DATA = [
  {
    ...CATEGORIES.find(c => c.id === 'kue-asin'),
    image: MENU_ITEMS.find(i => i.id === 1)?.image,
    copy: 'Risol mayo, lemper, pastel, dan sosis solo — cemilan asin gurih untuk setiap acara.',
    index: '01',
  },
  {
    ...CATEGORIES.find(c => c.id === 'kue-manis'),
    image: MENU_ITEMS.find(i => i.id === 12)?.image,
    copy: 'Lapis legit, dessert box, talam ubi, dan bolu surabaya — manis yang bikin ketagihan.',
    index: '02',
  },
  {
    ...CATEGORIES.find(c => c.id === 'minuman'),
    image: MENU_ITEMS.find(i => i.id === 301)?.image,
    copy: 'Air mineral cup dan botol — pelengkap sempurna untuk setiap sajian Snack Box.',
    index: '03',
  },
];

const CategoryStrip = ({ cat, idx, onCategoryClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  const isEven = idx % 2 === 0;

  return (
    <motion.div
      ref={ref}
      id={`showcase-${cat.id}`}
      onClick={() => onCategoryClick(cat.id)}
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Divider top */}
      <div className="h-px bg-[#1C1A17]/10 group-hover:bg-[#ad2a2a]/30 transition-colors duration-500" />

      <div className={`flex items-center gap-6 md:gap-12 py-7 md:py-10 px-0 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>

        {/* Index number */}
        <span className="font-['Cormorant_Garamond'] text-[48px] md:text-[64px] font-semibold text-[#1C1A17]/10 group-hover:text-[#ad2a2a]/20 leading-none shrink-0 w-[60px] md:w-[80px] text-center transition-colors duration-400 select-none">
          {cat.index}
        </span>

        {/* Image */}
        <div className="shrink-0 relative overflow-hidden rounded-xl w-[80px] h-[80px] md:w-[112px] md:h-[112px] shadow-md shadow-black/10">
          <motion.img
            src={cat.image}
            alt={cat.name}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
        </div>

        {/* Text block */}
        <div className="flex-1 min-w-0">
          <h3 className="font-['Cormorant_Garamond'] text-[24px] md:text-[32px] lg:text-[38px] font-semibold text-[#1C1A17] leading-tight group-hover:text-[#ad2a2a] transition-colors duration-300">
            {cat.name}
          </h3>
          <p className="font-['DM_Sans'] text-[#8A8278] text-[12px] md:text-[13px] leading-relaxed mt-1.5 max-w-[360px]">
            {cat.copy}
          </p>
        </div>

        {/* Explore arrow */}
        <div className="shrink-0 ml-auto flex items-center gap-2 text-[#1C1A17]/20 group-hover:text-[#ad2a2a] transition-colors duration-300">
          <span className="font-['DM_Sans'] text-[11px] font-bold uppercase tracking-widest hidden md:block">
            Jelajahi
          </span>
          <motion.svg
            className="w-5 h-5 md:w-6 md:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </motion.svg>
        </div>

      </div>
    </motion.div>
  );
};

const MenuShowcase = ({ onCategoryClick }) => {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-100px 0px' });

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-28">

      {/* Section header */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16 gap-6">
        <div>
          <motion.p
            className="text-[#ad2a2a] text-[10px] font-['DM_Sans'] font-bold uppercase tracking-[0.28em] mb-3"
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Pilihan Terbaik
          </motion.p>

          <motion.h2
            className="font-['Cormorant_Garamond'] text-[38px] sm:text-[48px] md:text-[58px] font-semibold text-[#1C1A17] leading-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Menu <span className="italic text-[#ad2a2a]">Kami</span>
          </motion.h2>
        </div>

        <motion.p
          className="font-['DM_Sans'] text-[#8A8278] text-[13px] md:text-[14px] leading-relaxed max-w-[280px] md:text-right"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Ragam kue dan jajanan khas Dapur Kembar, dibuat dengan cinta dan bahan pilihan.
        </motion.p>
      </div>

      {/* Category strips */}
      <div>
        {CATEGORY_DATA.map((cat, idx) => (
          <CategoryStrip key={cat.id} cat={cat} idx={idx} onCategoryClick={onCategoryClick} />
        ))}
        <div className="h-px bg-[#1C1A17]/10" />
      </div>

    </section>
  );
};

export default MenuShowcase;
