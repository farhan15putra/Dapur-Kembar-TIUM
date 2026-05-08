import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: '100%', label: 'Homemade' },
  { value: '10+', label: 'Jenis Menu' },
  { value: 'Fresh', label: 'Setiap Hari' },
];

const AboutStrip = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-5 md:px-10">
      <motion.div
        className="border-t border-b border-[#1C1A17]/8 py-10 md:py-12 flex flex-col md:flex-row items-center md:items-center justify-between gap-8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Tagline */}
        <motion.p
          className="font-['Cormorant_Garamond'] text-[20px] sm:text-[24px] md:text-[26px] font-semibold italic text-[#1C1A17] text-center md:text-left max-w-[380px] leading-snug"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          "Dibuat dengan cinta,{' '}
          <span className="text-[#ad2a2a]">disajikan dengan bangga</span>{' '}
          — dari dapur kami untuk momen spesial Anda."
        </motion.p>

        {/* Stats */}
        <div className="flex items-center gap-8 md:gap-12 shrink-0">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-['Cormorant_Garamond'] text-[32px] md:text-[38px] font-semibold text-[#ad2a2a] leading-none">
                {stat.value}
              </p>
              <p className="font-['DM_Sans'] text-[10px] uppercase tracking-widest text-[#8A8278] mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutStrip;
