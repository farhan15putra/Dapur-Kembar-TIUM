import React from 'react';
import { CATEGORIES, MENU_ITEMS } from '../data/menu';

const CATEGORY_DATA = [
  {
    ...CATEGORIES.find(c => c.id === 'kue-asin'),
    image: MENU_ITEMS.find(i => i.id === 1)?.image,
    copy: 'Risol mayo, lemper, pastel, dan sosis solo — cemilan asin gurih untuk setiap acara.',
  },
  {
    ...CATEGORIES.find(c => c.id === 'kue-manis'),
    image: MENU_ITEMS.find(i => i.id === 6)?.image,
    copy: 'Brownies, kue lumpur, sus buah, dan dadar gulung — manis yang bikin ketagihan.',
  }
];

const MenuShowcase = ({ onCategoryClick }) => {
  return (
    <section className="max-w-7xl mx-auto px-5 py-12 md:py-24">
      {/* Section header */}
      <div className="text-center mb-12 md:mb-20">
        <p className="text-[#ad2a2a] text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">Pilihan Terbaik</p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1A17]">
          Menu<br className="md:hidden" />
          <span className="italic md:ml-3">Kami</span>
        </h2>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed mt-4 max-w-[300px] md:max-w-md mx-auto">
          Temukan ragam kue dan masakan khas Dapur Kembar yang dibuat dengan cinta dan bahan pilihan.
        </p>
      </div>

      {/* Grid for desktop, stack for mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-16 md:gap-y-20 max-w-5xl mx-auto">
        {CATEGORY_DATA.map((cat, idx) => {
          // On mobile, alternate left-right. On desktop, they just flow in the grid.
          const isOdd = idx % 2 === 0; 
          return (
            <div
              key={cat.id}
              onClick={() => onCategoryClick(cat.id)}
              className="flex items-center gap-6 cursor-pointer group md:flex-row"
              style={{ flexDirection: isOdd ? 'row' : 'row-reverse' }}
            >
              {/* Circle Image */}
              <div className="shrink-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="food-circle w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] md:w-[160px] md:h-[160px] group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              {/* Text */}
              <div className={isOdd ? 'text-left md:text-left' : 'text-right md:text-left'}>
                <h3 className="font-display text-xl md:text-3xl font-bold text-[#1C1A17] italic mb-1 md:mb-2">{cat.name}</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{cat.copy}</p>
                <span className="inline-block mt-2 md:mt-4 text-[#ad2a2a] text-[11px] md:text-xs font-bold uppercase tracking-wider group-hover:underline">
                  Explore →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MenuShowcase;
