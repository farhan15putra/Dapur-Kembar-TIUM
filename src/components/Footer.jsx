import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, MapPin, Clock, ExternalLink } from 'lucide-react';

const Footer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-[#1C1A17]/8">

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">

        {/* ── 3-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Col 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#ad2a2a] flex items-center justify-center shadow-md shadow-[#ad2a2a]/20 shrink-0">
                <span className="text-white font-bold text-[10px] font-['DM_Sans'] tracking-wide">DK</span>
              </div>
              <p className="font-['Cormorant_Garamond'] text-[20px] font-semibold italic text-[#1C1A17]">
                Dapur Kembar
              </p>
            </div>
            <p className="font-['DM_Sans'] text-[#8A8278] text-[12px] md:text-[13px] leading-relaxed max-w-[220px]">
              Kue tradisional dan snack box berkualitas untuk setiap momen spesial Anda.
            </p>
          </motion.div>

          {/* Col 2 — Kontak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-['DM_Sans'] text-[10px] font-bold uppercase tracking-[0.25em] text-[#8A8278] mb-5">
              Kontak
            </p>
            <div className="space-y-3.5">
              <a
                href="https://wa.me/628111773319"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#ad2a2a]/8 flex items-center justify-center shrink-0 group-hover:bg-[#ad2a2a]/18 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#ad2a2a]" strokeWidth={1.8} />
                </div>
                <span className="font-['DM_Sans'] text-[13px] text-[#3D3A35] group-hover:text-[#ad2a2a] transition-colors">
                  +62 811-1773-319
                </span>
              </a>

              {/* Google Maps link */}
              <a
                href="https://share.google/rpirF6l6KttvGWl4q"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#ad2a2a]/8 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#ad2a2a]/18 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-[#ad2a2a]" strokeWidth={1.8} />
                </div>
                <div>
                  <span className="font-['DM_Sans'] text-[13px] text-[#3D3A35] group-hover:text-[#ad2a2a] transition-colors flex items-center gap-1">
                    Cipinang, Jakarta Timur
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="font-['DM_Sans'] text-[11px] text-[#8A8278] group-hover:text-[#ad2a2a]/70 transition-colors">
                    Lihat di Google Maps ↗
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#ad2a2a]/8 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#ad2a2a]" strokeWidth={1.8} />
                </div>
                <span className="font-['DM_Sans'] text-[13px] text-[#3D3A35]">
                  06:00 – 17:00 · Sen – Sab
                </span>
              </div>
            </div>
          </motion.div>

          {/* Col 3 — Layanan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-['DM_Sans'] text-[10px] font-bold uppercase tracking-[0.25em] text-[#8A8278] mb-5">
              Layanan
            </p>
            <div className="space-y-2.5">
              {['Kue Asin & Gurih', 'Kue Manis', 'Snack Box Custom', 'Katering Acara'].map((item) => (
                <p key={item} className="font-['DM_Sans'] text-[13px] text-[#3D3A35]">
                  {item}
                </p>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-12 md:mt-14 pt-6 border-t border-[#1C1A17]/6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="font-['DM_Sans'] text-[#8A8278] text-[11px] tracking-wide">
            © {new Date().getFullYear()} Dapur Kembar. All rights reserved.
          </p>
          <p className="font-['DM_Sans'] text-[#8A8278]/60 text-[11px] uppercase tracking-[0.2em]">
            Katering &amp; Snack Box · Jakarta Timur
          </p>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
