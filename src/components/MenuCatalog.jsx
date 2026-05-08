import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Store, Package, Search, X } from 'lucide-react';
import ProductCard from './ProductCard';

// Stagger variants for product grid
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

// Animated grid section
const AnimatedSection = ({ cat, items, orderMode, isItemSelected, handleItemClick, getCartQty }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <div ref={ref}>
      {/* Section title */}
      <motion.div
        className="flex items-baseline gap-4 mb-6 md:mb-8"
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="font-['Cormorant_Garamond'] text-[28px] md:text-[38px] font-semibold italic text-[#1C1A17] leading-tight">
          {cat.name}
        </h3>
        <span className="font-['DM_Sans'] text-[11px] text-[#8A8278] font-medium">
          {items.length} produk
        </span>
      </motion.div>

      {/* Product grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6"
        variants={gridVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {items.map(item => (
          <motion.div key={item.id} variants={cardVariants}>
            <ProductCard
              item={item}
              orderMode={orderMode}
              isSelected={isItemSelected(item)}
              onClick={() => handleItemClick(item)}
              cartQty={getCartQty(item.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const MenuCatalog = ({
  menuRef,
  orderMode,
  setOrderMode,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  visibleCategories,
  getFilteredItems,
  isItemSelected,
  handleItemClick,
  getCartQty,
}) => {

  const hasResults = visibleCategories
    .filter(cat => selectedCategory === 'all' || cat.id === selectedCategory)
    .some(cat => getFilteredItems(cat.id).length > 0);

  return (
    <section ref={menuRef} className="max-w-7xl mx-auto px-5 md:px-10 pt-12 md:pt-20 pb-12 md:pb-20">

      {/* Section label */}
      <div className="flex items-center gap-3 mb-8 md:mb-12">
        <div className="divider-accent" />
        <span className="text-[#ad2a2a] text-[10px] font-bold uppercase tracking-[0.2em] font-['DM_Sans']">
          Katalog Menu
        </span>
      </div>

      {/* Top bar — mode toggle + search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 md:mb-8">

        {/* Order Mode Toggle */}
        <div className="bg-[#1C1A17]/5 rounded-2xl p-1 flex gap-1 shrink-0">
          <button
            id="mode-regular"
            onClick={() => setOrderMode('regular')}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-[12px] transition-all duration-200
              ${orderMode === 'regular' ? 'mode-tab-active' : 'mode-tab-inactive hover:text-[#3D3A35]'}`}
          >
            <Store className="w-3.5 h-3.5" strokeWidth={orderMode === 'regular' ? 2.5 : 1.8} />
            <span className="font-['DM_Sans']">Beli Satuan</span>
          </button>
          <button
            id="mode-snackbox"
            onClick={() => setOrderMode('snackbox')}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-[12px] transition-all duration-200
              ${orderMode === 'snackbox' ? 'mode-tab-active' : 'mode-tab-inactive hover:text-[#3D3A35]'}`}
          >
            <Package className="w-3.5 h-3.5" strokeWidth={orderMode === 'snackbox' ? 2.5 : 1.8} />
            <span className="font-['DM_Sans']">Snack Box</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#8A8278]" strokeWidth={1.8} />
          <input
            id="search-menu"
            type="text"
            placeholder="Cari menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-3 bg-white/70 border border-[#1C1A17]/10 rounded-xl text-[13px] font-['DM_Sans'] font-medium text-[#1C1A17] placeholder:text-[#8A8278] focus:border-[#ad2a2a]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ad2a2a]/10 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-[#8A8278] hover:text-[#ad2a2a] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Snack Box hint */}
      {orderMode === 'snackbox' && (
        <p className="text-[#ad2a2a] text-[11px] font-['DM_Sans'] font-medium animate-fade-in tracking-wide mb-6">
          ↳ Pilih minimal 3 jenis kue · Klik produk untuk memilih
        </p>
      )}

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-10 md:mb-14 justify-start">
        <button
          id="cat-all"
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-1.5 rounded-full text-[11px] font-['DM_Sans'] font-semibold whitespace-nowrap transition-all shrink-0
            ${selectedCategory === 'all'
              ? 'bg-[#1C1A17] text-white shadow-sm'
              : 'bg-white/80 text-[#8A8278] border border-[#1C1A17]/10 hover:text-[#1C1A17] hover:border-[#1C1A17]/25'
            }`}
        >
          Semua
        </button>
        {visibleCategories.map(cat => (
          <button
            key={cat.id}
            id={`cat-${cat.id}`}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-[11px] font-['DM_Sans'] font-semibold whitespace-nowrap transition-all shrink-0
              ${selectedCategory === cat.id
                ? 'bg-[#ad2a2a] text-white shadow-sm'
                : 'bg-white/80 text-[#8A8278] border border-[#1C1A17]/10 hover:text-[#ad2a2a] hover:border-[#ad2a2a]/30'
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Product sections with scroll animation */}
      <div className="space-y-14 md:space-y-20">
        {visibleCategories
          .filter(cat => selectedCategory === 'all' || cat.id === selectedCategory)
          .map(cat => {
            const items = getFilteredItems(cat.id);
            if (items.length === 0 && searchQuery) return null;
            return (
              <AnimatedSection
                key={cat.id}
                cat={cat}
                items={items}
                orderMode={orderMode}
                isItemSelected={isItemSelected}
                handleItemClick={handleItemClick}
                getCartQty={getCartQty}
              />
            );
          })}
      </div>

      {/* ── Improved Empty State ── */}
      {!hasResults && (
        <motion.div
          className="flex flex-col items-center justify-center py-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-20 h-20 rounded-full bg-[#ad2a2a]/8 flex items-center justify-center mb-5">
            <Search className="w-8 h-8 text-[#ad2a2a]/40" strokeWidth={1.5} />
          </div>
          <h3 className="font-['Cormorant_Garamond'] text-[26px] font-semibold text-[#1C1A17] mb-2">
            Menu tidak ditemukan
          </h3>
          <p className="font-['DM_Sans'] text-[#8A8278] text-[13px] leading-relaxed mb-7 max-w-[240px]">
            Tidak ada menu yang cocok dengan pencarian <span className="font-semibold text-[#3D3A35]">"{searchQuery}"</span>
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="px-7 py-2.5 bg-[#1C1A17] text-white font-['DM_Sans'] font-semibold text-[12px] rounded-full tracking-wide hover:bg-[#2D2A26] active:scale-95 transition-all shadow-md"
          >
            Lihat Semua Menu
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default MenuCatalog;
