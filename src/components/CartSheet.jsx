import React, { useState, useEffect } from 'react';
import {
  X, Minus, Plus, Trash2,
  Droplet, MessageCircle, MapPin, User,
  Package, Store, CheckCircle2, AlertTriangle,
  ChevronUp, ShoppingBag
} from 'lucide-react';

const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');

const CartSheet = ({
  open,
  onClose,
  // Regular cart
  regularCart,
  updateRegularQty,
  removeRegular,
  regularTotal,
  // Snack box
  sbConfig,
  toggleSbItem,
  setSbConfig,
  sbRec,
  sbTotal,
  sbUnitCost,
  // Checkout
  userName,
  setUserName,
  deliveryMethod,
  setDeliveryMethod,
  address,
  setAddress,
  handleOrder,
}) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 280);
  };

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const isEmpty = regularCart.length === 0 && sbConfig.items.length === 0;
  const grandTotal =
    (regularCart.length > 0 ? regularTotal : 0) +
    (sbConfig.items.length > 0 && sbRec.ok ? sbTotal : 0);

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 ${closing ? 'animate-fade-in opacity-0' : 'sheet-backdrop'}`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div className={`absolute bottom-0 left-0 right-0 max-w-lg mx-auto bg-[#F5EBD9] rounded-t-3xl overflow-hidden
        ${closing ? 'animate-slide-down' : 'sheet-panel'}`}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-slate-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-[#ad2a2a]/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ad2a2a]" />
            <h2 className="font-extrabold text-lg text-[#1C1A17]">Keranjang</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl hover:bg-black/5 active:scale-90 transition-all"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-5 py-4 space-y-5" style={{ maxHeight: 'calc(92dvh - 80px)' }}>

          {/* Empty State */}
          {isEmpty && (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-[#ad2a2a]/30 mx-auto mb-3" />
              <p className="text-slate-400 font-semibold text-sm">Keranjang masih kosong</p>
              <p className="text-slate-300 text-xs mt-1">Pilih menu dari katalog untuk mulai</p>
            </div>
          )}

          {/* ── REGULAR CART ───────────────────────── */}
          {regularCart.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-[#ad2a2a]" />
                <h3 className="font-bold text-sm text-[#1C1A17]">Pesanan Satuan</h3>
              </div>
              {regularCart.map(item => (
                <div key={item.id} className="bg-white rounded-xl p-3 flex items-center gap-3 border border-slate-100">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[#1C1A17] truncate">{item.name}</p>
                    <p className="text-[#ad2a2a] text-xs font-semibold">{rupiah(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => updateRegularQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center active:scale-90">
                      <Minus className="w-3 h-3 text-slate-600" />
                    </button>
                    <span className="w-6 text-center font-bold text-xs">{item.qty}</span>
                    <button onClick={() => updateRegularQty(item.id, 1)} className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center active:scale-90">
                      <Plus className="w-3 h-3 text-slate-600" />
                    </button>
                    <button onClick={() => removeRegular(item.id)} className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center ml-1 active:scale-90">
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t border-dashed border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subtotal</span>
                <span className="font-extrabold text-[#ad2a2a]">{rupiah(regularTotal)}</span>
              </div>
            </div>
          )}

          {/* ── SNACK BOX ─────────────────────────── */}
          {sbConfig.items.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#ad2a2a]" />
                <h3 className="font-bold text-sm text-[#1C1A17]">Snack Box ({sbConfig.items.length} Kue)</h3>
              </div>

              {/* Selected Items */}
              <div className="flex flex-wrap gap-1.5">
                {sbConfig.items.map(i => (
                  <span key={i.id} className="bg-[#ad2a2a]/10 text-[#8a2222] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    {i.name}
                    <button onClick={() => toggleSbItem(i)} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Status */}
              <div className={`flex items-start gap-2 p-3 rounded-xl text-xs
                ${sbRec.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}
              >
                {sbRec.ok
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  : <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                }
                <div>
                  <p className="font-bold">{sbRec.label}</p>
                  <p className="text-[11px] opacity-80">{sbRec.hint}</p>
                </div>
              </div>

              {/* Box Config (only if valid) */}
              {sbRec.ok && (
                <div className="bg-white rounded-xl p-3 border border-slate-100 space-y-3">
                  {/* Water toggle */}
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sbConfig.water}
                      onChange={(e) => setSbConfig({ ...sbConfig, water: e.target.checked })}
                      className="w-4 h-4 accent-[#ad2a2a] rounded"
                    />
                    <span className="text-xs font-semibold flex items-center gap-1.5">
                      <Droplet className="w-3 h-3 text-blue-500" />
                      Air Mineral (+Rp 1.000/box)
                    </span>
                  </label>

                  {/* Price + Qty */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Per Box</p>
                      <p className="font-extrabold text-sm">{rupiah(sbUnitCost)}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-50 border rounded-lg p-0.5">
                      <button onClick={() => setSbConfig(p => ({ ...p, boxes: Math.max(10, p.boxes - 5) }))} className="w-7 h-7 rounded-md hover:bg-slate-200 flex items-center justify-center">
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        value={sbConfig.boxes}
                        onChange={(e) => setSbConfig(p => ({ ...p, boxes: Math.max(10, Number(e.target.value)) }))}
                        className="w-10 text-center font-bold text-sm no-arrows bg-transparent"
                        min="10"
                      />
                      <button onClick={() => setSbConfig(p => ({ ...p, boxes: p.boxes + 5 }))} className="w-7 h-7 rounded-md hover:bg-slate-200 flex items-center justify-center">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between items-center bg-[#ad2a2a]/5 rounded-lg p-2.5 border border-[#ad2a2a]/20">
                    <span className="text-xs font-bold text-[#8a2222]">Subtotal</span>
                    <span className="font-extrabold text-[#ad2a2a]">{rupiah(sbTotal)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── CHECKOUT FORM ─────────────────────── */}
          {!isEmpty && (
            <div className="space-y-4 pt-4 border-t border-[#ad2a2a]/10">
              {/* Grand Total */}
              <div className="bg-[#1C1A17] rounded-2xl p-4 text-center">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total Pesanan</p>
                <p className="text-3xl font-black text-[#ad2a2a]">{rupiah(grandTotal)}</p>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <User className="w-3 h-3" /> Nama Pemesan
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Masukkan nama Anda..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-[#ad2a2a] focus:outline-none focus:ring-2 focus:ring-[#ad2a2a]/10 transition-all"
                />
              </div>

              {/* Delivery Method */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Metode Pengambilan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-95
                      ${deliveryMethod === 'pickup'
                        ? 'border-[#ad2a2a] bg-[#ad2a2a]/5 text-[#ad2a2a]'
                        : 'border-slate-200 bg-white text-slate-500'}`}
                  >
                    Self Pickup
                  </button>
                  <button
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`py-3 rounded-xl border-2 text-sm font-bold transition-all active:scale-95
                      ${deliveryMethod === 'delivery'
                        ? 'border-[#ad2a2a] bg-[#ad2a2a]/5 text-[#ad2a2a]'
                        : 'border-slate-200 bg-white text-slate-500'}`}
                  >
                    Di Antar
                  </button>
                </div>
              </div>

              {/* Address (conditional) */}
              {deliveryMethod === 'delivery' && (
                <div className="space-y-1.5 animate-fade-in">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Alamat Lengkap</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Masukkan alamat pengantaran..."
                    rows="3"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-[#ad2a2a] focus:outline-none focus:ring-2 focus:ring-[#ad2a2a]/10 transition-all resize-none"
                  />
                </div>
              )}

              {/* WhatsApp Button */}
              <button
                onClick={handleOrder}
                className="w-full py-4 bg-[#ad2a2a] hover:bg-[#8a2222] text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-[#ad2a2a]/20"
              >
                <MessageCircle className="w-5 h-5" />
                Kirim Pesanan via WhatsApp
              </button>

              {/* Safe bottom padding */}
              <div className="pb-safe" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSheet;
