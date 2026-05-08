import React from 'react';
import { ShoppingBag, Plus } from 'lucide-react';

const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');

const ProductCard = ({ item, orderMode, isSelected, onClick, cartQty }) => {
  return (
    <div
      className={`product-card rounded-2xl overflow-hidden border transition-all
        ${isSelected
          ? 'border-[#ad2a2a]/40 ring-2 ring-[#ad2a2a]/25 ring-offset-2 ring-offset-[#F7EFE2]'
          : 'border-[#1C1A17]/6 hover:border-[#ad2a2a]/20'
        }`}
    >
      {/* ── Image container — consistent 4:3 ratio ── */}
      <div
        className="relative overflow-hidden cursor-pointer bg-[#EFE3CE]/60"
        style={{ aspectRatio: '4/3' }}
        onClick={onClick}
      >
        <img
          src={item.image}
          alt={item.name}
          className="product-img w-full h-full object-cover"
          loading="lazy"
        />

        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

        {/* Badge — top-left, never overlaps text */}
        {item.tag && (
          <span className={`tag-badge absolute top-2.5 left-2.5 px-2 py-[5px] rounded-md text-white tracking-wider shadow-sm
            ${item.tag === 'Best Seller'
              ? 'bg-[#ad2a2a]'
              : 'bg-[#1C1A17]/80'
            }`}
          >
            {item.tag}
          </span>
        )}

        {/* Quantity badge — top-right for regular mode */}
        {orderMode === 'regular' && cartQty > 0 && (
          <div className="absolute top-2.5 right-2.5 min-w-[26px] h-[26px] bg-[#ad2a2a] rounded-full flex items-center justify-center animate-scale-in shadow-md px-1">
            <span className="text-white text-[10px] font-bold font-['DM_Sans']">{cartQty}</span>
          </div>
        )}

        {/* Snack box selection checkmark */}
        {isSelected && orderMode === 'snackbox' && (
          <div className="absolute top-2.5 right-2.5 w-[26px] h-[26px] bg-[#ad2a2a] rounded-full flex items-center justify-center animate-scale-in shadow-md">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* ── Text area ── */}
      <div className="px-3 pt-3 pb-3 space-y-1">
        <h4 className="font-['DM_Sans'] font-semibold text-[13px] md:text-[14px] text-[#1C1A17] leading-tight line-clamp-2">
          {item.name}
        </h4>
        <p className="text-[11px] text-[#8A8278] leading-snug line-clamp-2 font-['DM_Sans']">
          {item.description}
        </p>
        <p className="font-bold text-[#ad2a2a] text-[13px] md:text-[14px] pt-0.5 font-['DM_Sans']">
          {rupiah(item.price)}
          <span className="text-[10px] font-normal text-[#8A8278] ml-0.5">{item.unit}</span>
        </p>

        {/* ── CTA button — subtle outline style ── */}
        <button
          id={`add-${item.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className={`w-full mt-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-[11px] font-semibold tracking-wide transition-all active:scale-95 font-['DM_Sans'] border
            ${orderMode === 'regular'
              ? cartQty > 0
                ? 'bg-[#ad2a2a] text-white border-transparent shadow-sm'
                : 'bg-transparent border-[#ad2a2a]/30 text-[#ad2a2a] hover:bg-[#ad2a2a]/6 hover:border-[#ad2a2a]/50'
              : isSelected
                ? 'bg-[#ad2a2a] text-white border-transparent'
                : 'bg-transparent border-[#1C1A17]/15 text-[#3D3A35] hover:bg-[#1C1A17]/4 hover:border-[#ad2a2a]/30'
            }`}
        >
          {orderMode === 'regular' ? (
            <>
              <Plus className="w-3 h-3" strokeWidth={2.5} />
              {cartQty > 0 ? 'Tambah Lagi' : 'Keranjang'}
            </>
          ) : (
            <>
              {isSelected
                ? <><span>✓</span> Dipilih</>
                : <><Plus className="w-3 h-3" strokeWidth={2.5} /> Pilih</>
              }
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
