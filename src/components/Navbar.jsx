import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Navbar = ({ cartCount, onCartClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass bg-[#F5EBD9]/85">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 py-3 md:py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#ad2a2a] flex items-center justify-center">
            <span className="text-white font-black text-[10px] md:text-xs">DK</span>
          </div>
          <span className="font-display font-bold text-base md:text-xl text-[#1C1A17] italic">Dapur Kembar</span>
        </div>
        <button
          onClick={onCartClick}
          className="relative p-2 rounded-full hover:bg-[#ad2a2a]/10 active:scale-90 transition-all cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-[#1C1A17]" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 md:w-5 md:h-5 min-w-[18px] bg-[#ad2a2a] text-white text-[9px] md:text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
