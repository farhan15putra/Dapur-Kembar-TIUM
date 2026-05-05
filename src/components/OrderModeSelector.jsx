import React from 'react';
import { Store, Package, Package2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OrderModeSelector = ({ orderMode, setOrderMode, catalogRef }) => {
  const modes = [
    { id: 'regular', icon: Store, text: 'Beli Satuan' },
    { id: 'snackbox', icon: Package, text: 'Rakit Snack Box' },
  ];

  return (
    <section ref={catalogRef} className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-[2rem] shadow-xl p-3 flex flex-col md:flex-row gap-2 max-w-lg mx-auto border border-orange-100">
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setOrderMode(m.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-extrabold text-sm transition-all
              ${orderMode === m.id 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md' 
                : 'text-slate-500 hover:bg-orange-50'}`}
          >
            <m.icon className="w-5 h-5" />
            {m.text}
          </button>
        ))}
      </div>

      {/* Dynamic Headers based on Mode */}
      <div className="text-center mt-12 mb-10 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {orderMode === 'snackbox' && (
            <motion.div 
              key="sb"
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-3xl font-black text-orange-600 mb-2">Rakit Isi Snack Box Anda</h2>
              <p className="text-slate-500 font-medium">Bebas pilih varian kue manis & asin. Minimal pilih 3 macam untuk konfigurasi 1 kemasan box. Klik untuk memilih varian.</p>
            </motion.div>
          )}
          {orderMode === 'regular' && (
            <motion.div 
              key="reg"
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-3xl font-black text-orange-600 mb-2">Beli Terpisah (Ala Carte)</h2>
              <p className="text-slate-500 font-medium">Mau beli per potong? Semua menu tersedia untuk Anda beli secara prasmanan/satuan tanpa dibungkus per box paket.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default OrderModeSelector;
