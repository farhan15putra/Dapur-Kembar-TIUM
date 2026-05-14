import React, { useState, useEffect } from 'react';
import {
  X, Minus, Plus, Trash2,
  Droplet, MessageCircle, MapPin, User,
  Package, Store, CheckCircle2, AlertTriangle,
  ShoppingBag
} from 'lucide-react';

const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');

const CartSheet = ({
  open, onClose, orderMode, setOrderMode,
  regularCart, updateRegularQty, removeRegular, regularTotal,
  sbConfig, toggleSbItem, setSbConfig, sbRec, sbTotal, sbUnitCost,
  userName, setUserName, deliveryMethod, setDeliveryMethod,
  address, setAddress, handleOrder, savedAddresses = [],
}) => {
  const [closing, setClosing] = useState(false);
  const [errors, setErrors] = useState({});

  const onOrderClick = () => {
    const newErrors = {};
    if (!userName.trim()) newErrors.userName = true;
    if (deliveryMethod === 'delivery' && !address.trim()) newErrors.address = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleOrder();
    }
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => { setClosing(false); onClose(); }, 280);
  };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const isEmpty = orderMode === 'regular' ? regularCart.length === 0 : sbConfig.items.length === 0;
  const grandTotal = orderMode === 'regular'
    ? (regularCart.length > 0 ? regularTotal : 0)
    : (sbConfig.items.length > 0 && sbRec.ok ? sbTotal : 0);

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm ${closing ? 'animate-fade-in opacity-0' : 'sheet-backdrop'}`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div className={`absolute bottom-0 left-0 right-0 max-w-lg mx-auto bg-[#FDF9F4] rounded-t-3xl overflow-hidden shadow-2xl
        ${closing ? 'animate-slide-down' : 'sheet-panel'}`}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#1C1A17]/15 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-[#1C1A17]/8">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ad2a2a]" strokeWidth={1.8} />
            <h2 className="font-['Cormorant_Garamond'] font-semibold text-[20px] italic text-[#1C1A17]">Keranjang</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl hover:bg-[#1C1A17]/5 active:scale-90 transition-all"
          >
            <X className="w-5 h-5 text-[#3D3A35]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 pt-3 pb-1 border-b border-[#1C1A17]/8">
          <div className="bg-[#1C1A17]/5 rounded-xl p-1 flex gap-1 w-full">
            <button
              onClick={() => setOrderMode('regular')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-['DM_Sans'] font-semibold transition-all
                ${orderMode === 'regular' ? 'bg-white shadow-sm text-[#1C1A17]' : 'text-[#8A8278] hover:text-[#3D3A35]'}`}
            >
              Satuan {regularCart.length > 0 && `(${regularCart.reduce((s, i) => s + i.qty, 0)})`}
            </button>
            <button
              onClick={() => setOrderMode('snackbox')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-['DM_Sans'] font-semibold transition-all
                ${orderMode === 'snackbox' ? 'bg-white shadow-sm text-[#1C1A17]' : 'text-[#8A8278] hover:text-[#3D3A35]'}`}
            >
              Snack Box {sbConfig.items.length > 0 && `(${sbConfig.items.length})`}
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-5 py-4 space-y-5" style={{ maxHeight: 'calc(92dvh - 80px)' }}>

          {/* ── Empty State ── */}
          {isEmpty && (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="w-16 h-16 rounded-full bg-[#ad2a2a]/8 flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-[#ad2a2a]/40" strokeWidth={1.5} />
              </div>
              <p className="font-['Cormorant_Garamond'] text-[22px] font-semibold italic text-[#1C1A17] mb-1.5">
                Keranjang masih kosong
              </p>
              <p className="font-['DM_Sans'] text-[#8A8278] text-[12px] leading-relaxed max-w-[200px]">
                Pilih menu dari katalog untuk mulai memesan
              </p>
            </div>
          )}

          {/* ── Regular Cart ── */}
          {orderMode === 'regular' && regularCart.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-[#ad2a2a]" />
                <h3 className="font-['DM_Sans'] font-bold text-sm text-[#1C1A17]">Pesanan Satuan</h3>
              </div>
              {regularCart.map(item => (
                <div key={item.id} className="bg-white rounded-xl p-3 flex items-center gap-3 border border-[#1C1A17]/8 shadow-sm">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-['DM_Sans'] font-bold text-sm text-[#1C1A17] truncate">{item.name}</p>
                    <p className="text-[#ad2a2a] text-xs font-semibold font-['DM_Sans']">{rupiah(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => updateRegularQty(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-[#EFE3CE] hover:bg-[#E5D5B8] flex items-center justify-center active:scale-90 transition-colors"
                    >
                      <Minus className="w-3 h-3 text-[#3D3A35]" />
                    </button>
                    <span className="w-6 text-center font-bold text-xs font-['DM_Sans'] text-[#1C1A17]">{item.qty}</span>
                    <button
                      onClick={() => updateRegularQty(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-[#EFE3CE] hover:bg-[#E5D5B8] flex items-center justify-center active:scale-90 transition-colors"
                    >
                      <Plus className="w-3 h-3 text-[#3D3A35]" />
                    </button>
                    <button
                      onClick={() => removeRegular(item.id)}
                      className="w-7 h-7 rounded-lg bg-[#ad2a2a]/8 hover:bg-[#ad2a2a]/18 flex items-center justify-center ml-1 active:scale-90 transition-colors"
                    >
                      <Trash2 className="w-3 h-3 text-[#ad2a2a]" />
                    </button>
                  </div>
                </div>
              ))}

            </div>
          )}

          {/* ── Snack Box ── */}
          {orderMode === 'snackbox' && sbConfig.items.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#ad2a2a]" />
                <h3 className="font-['DM_Sans'] font-bold text-sm text-[#1C1A17]">Snack Box ({sbConfig.items.length} Kue)</h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {sbConfig.items.map(i => (
                  <span key={i.id} className="bg-[#ad2a2a]/10 text-[#8a2222] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 font-['DM_Sans']">
                    {i.name}
                    <button onClick={() => toggleSbItem(i)} className="hover:text-[#ad2a2a] transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className={`flex items-start gap-2 p-3 rounded-xl text-xs
                ${sbRec.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}
              >
                {sbRec.ok
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  : <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                }
                <div>
                  <p className="font-bold font-['DM_Sans']">{sbRec.label}</p>
                  <p className="text-[11px] opacity-80 font-['DM_Sans']">{sbRec.hint}</p>
                </div>
              </div>

              {sbRec.ok && (
                <div className="bg-white rounded-xl p-3 border border-[#1C1A17]/8 space-y-3 shadow-sm">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sbConfig.water}
                      onChange={(e) => setSbConfig({ ...sbConfig, water: e.target.checked })}
                      className="w-4 h-4 accent-[#ad2a2a] rounded"
                    />
                    <span className="text-xs font-semibold flex items-center gap-1.5 font-['DM_Sans'] text-[#3D3A35]">
                      <Droplet className="w-3 h-3 text-blue-500" />
                      Air Mineral Gelas (+Rp 1.000/box)
                    </span>
                  </label>

                  <div className="flex items-center justify-between pt-2 border-t border-[#1C1A17]/8">
                    <div>
                      <p className="text-[10px] text-[#8A8278] font-bold uppercase font-['DM_Sans']">Per Box</p>
                      <p className="font-extrabold text-sm font-['DM_Sans'] text-[#1C1A17]">{rupiah(sbUnitCost)}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#F7EFE2] border border-[#1C1A17]/10 rounded-lg p-0.5">
                      <button
                        onClick={() => setSbConfig(p => ({ ...p, boxes: Math.max(10, p.boxes - 5) }))}
                        className="w-7 h-7 rounded-md hover:bg-[#EFE3CE] flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3 text-[#3D3A35]" />
                      </button>
                      <input
                        type="number"
                        value={sbConfig.boxes}
                        onChange={(e) => setSbConfig(p => ({ ...p, boxes: Math.max(10, Number(e.target.value)) }))}
                        className="w-10 text-center font-bold text-sm no-arrows bg-transparent font-['DM_Sans'] text-[#1C1A17]"
                        min="10"
                      />
                      <button
                        onClick={() => setSbConfig(p => ({ ...p, boxes: p.boxes + 5 }))}
                        className="w-7 h-7 rounded-md hover:bg-[#EFE3CE] flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3 text-[#3D3A35]" />
                      </button>
                    </div>
                  </div>


                </div>
              )}
            </div>
          )}

          {/* ── Checkout Form ── */}
          {!isEmpty && (
            <div className="space-y-4 pt-4 border-t border-[#1C1A17]/8">
              {/* Grand Total */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#8A8278] uppercase tracking-wider font-['DM_Sans']">Total Pesanan</span>
                <span className="font-extrabold text-[#ad2a2a] text-lg font-['DM_Sans']">{rupiah(grandTotal)}</span>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#8A8278] uppercase tracking-wider flex items-center gap-1 font-['DM_Sans']">
                  <User className="w-3 h-3" /> Nama Pemesan
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    if (errors.userName) setErrors(p => ({ ...p, userName: false }));
                  }}
                  placeholder="Masukkan nama Anda..."
                  className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-medium font-['DM_Sans'] text-[#1C1A17] placeholder:text-[#8A8278] focus:outline-none transition-all
                    ${errors.userName
                      ? 'border-[#ad2a2a] ring-2 ring-[#ad2a2a]/10'
                      : 'border-[#1C1A17]/10 focus:border-[#ad2a2a]/50 focus:ring-2 focus:ring-[#ad2a2a]/10'
                    }`}
                />
                {errors.userName && (
                  <p className="text-[10px] text-[#ad2a2a] font-bold mt-0.5 ml-1 font-['DM_Sans']">Nama wajib diisi</p>
                )}
              </div>

              {/* Delivery Method */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#8A8278] uppercase tracking-wider flex items-center gap-1 font-['DM_Sans']">
                  <MapPin className="w-3 h-3" /> Metode Pengambilan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: 'pickup', label: 'Self Pickup' },
                    { val: 'delivery', label: 'Di Antar' },
                  ].map(({ val, label }) => (
                    <button
                      key={val}
                      onClick={() => setDeliveryMethod(val)}
                      className={`py-3 rounded-xl border-2 text-sm font-bold font-['DM_Sans'] transition-all active:scale-95
                        ${deliveryMethod === val
                          ? 'border-[#ad2a2a] bg-[#ad2a2a]/6 text-[#ad2a2a]'
                          : 'border-[#1C1A17]/10 bg-white text-[#8A8278] hover:border-[#1C1A17]/25'
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Address */}
              {deliveryMethod === 'delivery' && (
                <div className="space-y-3 animate-fade-in">
                  <label className="text-[11px] font-bold text-[#8A8278] uppercase tracking-wider font-['DM_Sans']">Alamat Lengkap</label>
                  {savedAddresses.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {savedAddresses.map((addr, idx) => (
                        <button
                          key={idx}
                          onClick={() => setAddress(addr.text)}
                          className={`text-left p-3 rounded-xl border-2 transition-all active:scale-[0.98]
                            ${address === addr.text
                              ? 'border-[#ad2a2a] bg-[#ad2a2a]/5'
                              : 'border-[#1C1A17]/10 bg-white hover:border-[#ad2a2a]/40'
                            }`}
                        >
                          <p className={`font-bold text-sm mb-0.5 font-['DM_Sans'] ${address === addr.text ? 'text-[#ad2a2a]' : 'text-[#1C1A17]'}`}>{addr.title}</p>
                          <p className="text-xs text-[#8A8278] leading-relaxed font-['DM_Sans']">{addr.text}</p>
                        </button>
                      ))}
                      <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-[#1C1A17]/10" />
                        <span className="flex-shrink-0 mx-4 text-[#8A8278] text-[10px] uppercase font-bold tracking-wider font-['DM_Sans']">Atau ketik alamat lain</span>
                        <div className="flex-grow border-t border-[#1C1A17]/10" />
                      </div>
                    </div>
                  )}
                  <textarea
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errors.address) setErrors(p => ({ ...p, address: false }));
                    }}
                    placeholder={savedAddresses.length > 0 ? 'Ketik alamat manual di sini...' : 'Masukkan alamat pengantaran...'}
                    rows="3"
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-medium font-['DM_Sans'] text-[#1C1A17] placeholder:text-[#8A8278] focus:outline-none transition-all resize-none
                      ${errors.address
                        ? 'border-[#ad2a2a] ring-2 ring-[#ad2a2a]/10'
                        : 'border-[#1C1A17]/10 focus:border-[#ad2a2a]/50 focus:ring-2 focus:ring-[#ad2a2a]/10'
                      }`}
                  />
                  {errors.address && (
                    <p className="text-[10px] text-[#ad2a2a] font-bold mt-0.5 ml-1 font-['DM_Sans']">Alamat wajib diisi untuk pengantaran</p>
                  )}
                  <p className="text-[10px] text-[#8A8278] italic mt-1 ml-1 font-['DM_Sans']">*Ongkos kirim akan diinformasikan lebih lanjut via WhatsApp.</p>
                </div>
              )}

              {/* WhatsApp Button */}
              <button
                onClick={onOrderClick}
                className="w-full py-4 bg-[#ad2a2a] hover:bg-[#8a2020] text-white font-['DM_Sans'] font-semibold text-[13px] rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-[#ad2a2a]/25 tracking-wide"
              >
                <MessageCircle className="w-5 h-5" />
                Kirim Pesanan via WhatsApp
              </button>

              <div className="pb-safe" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSheet;
