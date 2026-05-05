import React from 'react';
import { Store, Package, Search } from 'lucide-react';
import ProductCard from './ProductCard';

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
  return (
    <section ref={menuRef} className="max-w-7xl mx-auto px-5 pt-12 md:pt-24 pb-8 md:pb-16">
      {/* Thin separator */}
      <div className="w-12 h-[2px] bg-[#ad2a2a]/30 mx-auto mb-10 md:mb-16" />

      {/* Controls Container for Desktop */}
      <div className="max-w-3xl mx-auto mb-10 md:mb-16">
        {/* Order Mode Toggle */}
        <div className="flex gap-1 bg-[#F5F0EB] rounded-full p-1 max-w-xs mx-auto mb-8">
          <button
            onClick={() => setOrderMode('regular')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-bold transition-all
              ${orderMode === 'regular'
                ? 'bg-white text-[#1C1A17] shadow-sm'
                : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Store className="w-3.5 h-3.5" />
            Beli Satuan
          </button>
          <button
            onClick={() => setOrderMode('snackbox')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-bold transition-all
              ${orderMode === 'snackbox'
                ? 'bg-white text-[#1C1A17] shadow-sm'
                : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Package className="w-3.5 h-3.5" />
            Snack Box
          </button>
        </div>

        {/* Snack Box info */}
        {orderMode === 'snackbox' && (
          <p className="text-center text-[#ad2a2a] text-[11px] md:text-sm font-semibold mb-6 animate-fade-in">
            Pilih min. 3 jenis kue • Klik untuk memilih/batal
          </p>
        )}

        {/* Search */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input
            type="text"
            placeholder="Cari menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-transparent border-b-2 border-slate-200 text-sm font-medium focus:border-[#ad2a2a] focus:outline-none transition-all placeholder:text-slate-300"
          />
        </div>

        {/* Category Pills */}
        <div className="flex justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar pb-5 -mx-1 px-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2 rounded-full text-[11px] md:text-sm font-bold whitespace-nowrap transition-all
              ${selectedCategory === 'all'
                ? 'bg-[#1C1A17] text-white'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
          >
            Semua
          </button>
          {visibleCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-[11px] md:text-sm font-bold whitespace-nowrap transition-all
                ${selectedCategory === cat.id
                  ? 'bg-[#1C1A17] text-white'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="space-y-12 md:space-y-20">
        {visibleCategories
          .filter(cat => selectedCategory === 'all' || cat.id === selectedCategory)
          .map(cat => {
            const items = getFilteredItems(cat.id);
            if (items.length === 0 && searchQuery) return null;
            return (
              <div key={cat.id}>
                <h3 className="font-display text-2xl md:text-4xl font-bold italic text-[#1C1A17] mb-6 md:mb-10 text-center md:text-left">{cat.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
                  {items.map(item => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      orderMode={orderMode}
                      isSelected={isItemSelected(item)}
                      onClick={() => handleItemClick(item)}
                      cartQty={getCartQty(item.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </div>

      {/* Empty */}
      {selectedCategory !== 'all' && getFilteredItems(selectedCategory).length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-300 font-semibold text-lg">Tidak ditemukan.</p>
          <button onClick={() => setSearchQuery('')} className="mt-2 text-[#ad2a2a] font-bold text-sm underline">Reset</button>
        </div>
      )}
    </section>
  );
};

export default MenuCatalog;
