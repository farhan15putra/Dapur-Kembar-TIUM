import React from 'react';
import { ShoppingBag, PackagePlus } from 'lucide-react';

const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');

const ProductCard = ({ item, orderMode, isSelected, onClick, cartQty }) => {
  return (
    <div
      className={`product-card rounded-2xl overflow-hidden
        ${isSelected ? 'ring-2 ring-[#ad2a2a] ring-offset-2 ring-offset-[#F5E6D3]' : ''}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#ad2a2a]/5 cursor-pointer" onClick={onClick}>
        <img
          src={item.image}
          alt={item.name}
          className="product-img w-full h-full object-cover"
          loading="lazy"
        />
        {/* Tag */}
        {item.tag && (
          <span className={`tag-badge absolute top-2 left-2 px-2 py-1 rounded-md font-bold text-white
            ${item.tag === 'Best Seller' ? 'bg-[#ad2a2a]/90' : 'bg-[#ad2a2a]/80'}`}>
            {item.tag}
          </span>
        )}
        {/* Selection indicator */}
        {isSelected && orderMode === 'snackbox' && (
          <div className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 bg-[#ad2a2a] rounded-full flex items-center justify-center animate-scale-in shadow-md">
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        {orderMode === 'regular' && cartQty > 0 && (
          <div className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 bg-[#ad2a2a] rounded-full flex items-center justify-center animate-scale-in shadow-md">
            <span className="text-white text-[10px] md:text-sm font-black">{cartQty}</span>
          </div>
        )}
      </div>

      {/* Text — no background, sits directly on page background */}
      <div className="pt-2.5 md:pt-4 pb-2">
        <h4 className="font-bold text-[13px] md:text-base text-[#1C1A17] truncate">{item.name}</h4>
        <p className="text-[10px] md:text-xs text-slate-500 leading-snug mt-0.5 line-clamp-2">{item.description}</p>
        <p className="font-extrabold text-[#ad2a2a] text-[13px] md:text-base mt-1.5 md:mt-2">{rupiah(item.price)}
          <span className="text-[9px] md:text-[11px] font-medium text-slate-500 ml-0.5">{item.unit}</span>
        </p>

        {/* Clear Add to Cart Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className={`w-full mt-3 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm
            ${orderMode === 'regular' 
              ? 'bg-[#ad2a2a] text-white hover:bg-[#8a2222]' 
              : isSelected 
                ? 'bg-[#ad2a2a] text-white' 
                : 'bg-white border border-[#ad2a2a]/20 text-[#ad2a2a] hover:bg-[#ad2a2a]/5'
            }`}
        >
          {orderMode === 'regular' ? (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              Masukan Keranjang
            </>
          ) : (
            <>
              <PackagePlus className="w-3.5 h-3.5" />
              {isSelected ? '✓ Dipilih (Snack Box)' : '+ Pilih (Snack Box)'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
