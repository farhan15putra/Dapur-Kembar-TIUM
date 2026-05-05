import React from 'react';
import { 
  Calculator, Store, Trash2, Minus, Plus, 
  Package, Package2, CheckCircle2, AlertTriangle, 
  Droplet, MessageCircle 
} from 'lucide-react';

const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');

const OrderSummary = ({ 
  regularCart, 
  updateRegularQty, 
  removeRegular, 
  sbConfig, 
  toggleSbItem, 
  setSbConfig, 
  sbRec, 
  userName,
  setUserName,
  deliveryMethod,
  setDeliveryMethod,
  address,
  setAddress,
  handleOrder,
  regularTotal,
  sbTotal,
  sbUnitCost,
  cartRef
}) => {
  return (
    <section ref={cartRef} className="py-20 px-4 sm:px-8 bg-orange-50 border-t border-orange-100 mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <Calculator className="w-8 h-8 text-orange-600" />
          <h2 className="text-4xl font-black text-[#1C1A17]">Summary Pemesanan</h2>
        </div>

        <div className="space-y-8">
          
          {/* SATUAN SUMMARY */}
          {regularCart.length > 0 && (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
               <h3 className="text-lg font-extrabold flex items-center gap-2 mb-4"><Store className="text-orange-500"/> Keranjang Pembelian Satuan</h3>
               <div className="space-y-4">
                  {regularCart.map(item => (
                     <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p className="text-orange-600 text-sm">{rupiah(item.price)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <button onClick={()=>updateRegularQty(item.id, -1)} className="p-2 border rounded-xl hover:bg-slate-200"><Minus className="w-4 h-4"/></button>
                           <span className="w-8 text-center font-black">{item.qty}</span>
                           <button onClick={()=>updateRegularQty(item.id, 1)} className="p-2 border rounded-xl hover:bg-slate-200"><Plus className="w-4 h-4"/></button>
                           <button onClick={()=>removeRegular(item.id)} className="ml-4 text-red-500"><Trash2 className="w-5 h-5"/></button>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="mt-4 pt-4 border-t flex justify-between font-black">
                  <span>Subtotal Satuan</span>
                  <span className="text-orange-600">{rupiah(regularTotal)}</span>
               </div>
            </div>
          )}

          {/* SNACK BOX SUMMARY */}
          {sbConfig.items.length > 0 && (
             <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-orange-200 relative">
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-3xl">SNACK BOX</div>
                <h3 className="text-lg font-extrabold flex items-center gap-2 mb-4"><Package className="text-orange-600"/> Konfigurasi Snack Box ({sbConfig.items.length} Kue)</h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {sbConfig.items.map(i => (
                    <span key={i.id} className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      {i.name} <button onClick={()=>toggleSbItem(i)}><Minus className="w-3 h-3 text-red-500"/></button>
                    </span>
                  ))}
                </div>

                <div className={`p-4 rounded-xl mb-6 flex gap-3 ${sbRec.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
                   {sbRec.ok ? <CheckCircle2 className="shrink-0 text-emerald-600"/> : <AlertTriangle className="shrink-0 text-amber-600"/>}
                   <div>
                     <p className="font-bold">{sbRec.label}</p>
                     <p className="text-sm">{sbRec.hint}</p>
                   </div>
                </div>

                {sbRec.ok && (
                  <div className="bg-slate-50 p-5 rounded-2xl border flex flex-col gap-5">
                     <label className="flex items-center gap-3 cursor-pointer">
                       <input type="checkbox" checked={sbConfig.water} onChange={(e)=>setSbConfig({...sbConfig, water: e.target.checked})} className="w-5 h-5 accent-orange-600" />
                       <span className="font-bold flex items-center gap-2"><Droplet className="w-4 h-4 text-blue-500"/> Tambah Air Mineral Gelas (+Rp 1.000 / box)</span>
                     </label>
                     
                     <div className="flex items-center justify-between border-t pt-4">
                       <div>
                          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Harga Penjumlahan</p>
                          <p className="text-xl font-black text-[#1c1a17]">{rupiah(sbUnitCost)} <span className="text-sm font-medium">/ box</span></p>
                       </div>
                       <div className="flex flex-col items-end">
                          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Total Dipesan</p>
                          <div className="flex items-center gap-1 bg-white border p-1 rounded-lg">
                            <button onClick={()=>setSbConfig(p=>({...p, boxes: Math.max(10, p.boxes-5)}))} className="p-1 hover:bg-slate-100 rounded"><Minus className="w-4 h-4"/></button>
                            <input type="number" value={sbConfig.boxes} onChange={(e)=>setSbConfig(p=>({...p, boxes: Number(e.target.value)}))} className="w-14 text-center font-bold no-arrows" min="10" />
                            <button onClick={()=>setSbConfig(p=>({...p, boxes: p.boxes+5}))} className="p-1 hover:bg-slate-100 rounded"><Plus className="w-4 h-4"/></button>
                          </div>
                       </div>
                     </div>
                     
                     <div className="flex justify-between font-black text-xl bg-orange-100 p-4 rounded-xl text-orange-900 border border-orange-200">
                        <span>Subtotal Snack Box</span>
                        <span>{rupiah(sbTotal)}</span>
                     </div>
                  </div>
                )}
             </div>
          )}

          {regularCart.length === 0 && sbConfig.items.length === 0 && (
             <div className="bg-white/50 border-2 border-dashed border-orange-200 rounded-3xl p-10 text-center">
               <Package className="w-16 h-16 text-orange-200 mx-auto mb-4"/>
               <p className="font-bold text-slate-500 text-lg">Mulai merakit pesanan Anda di atas.</p>
             </div>
          )}

          {/* SEND ORDER FORM */}
          {(regularCart.length > 0 || (sbConfig.items.length > 0 && sbRec.ok)) && (
            <div className="bg-gradient-to-br from-[#1C1A17] to-slate-800 rounded-3xl p-8 text-white shadow-2xl mt-12">
               <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-6">
                  <div>
                    <p className="text-slate-400 font-bold tracking-widest text-sm mb-1 uppercase">Total Semua Pesanan</p>
                    <p className="text-5xl font-black text-orange-500">
                       {rupiah(
                         (regularCart.length > 0 ? regularTotal : 0) + 
                         (sbConfig.items.length > 0 && sbRec.ok ? sbTotal : 0)
                       )}
                    </p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div className="space-y-2">
                    <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider">Nama Lengkap / Instansi</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      placeholder="Masukkan nama Anda..."
                      className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-2xl px-5 py-4 text-white focus:border-orange-500 focus:outline-none transition-all"
                    />
                 </div>
                 
                 <div className="space-y-2">
                    <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider">Metode Pengambilan</label>
                    <div className="grid grid-cols-2 gap-2">
                       <button 
                         onClick={() => setDeliveryMethod('pickup')}
                         className={`py-4 rounded-2xl border-2 font-bold transition-all ${deliveryMethod === 'pickup' ? 'bg-orange-500 border-orange-500 text-white' : 'bg-slate-900/50 border-slate-700 text-slate-400'}`}
                       >
                         Self Pickup
                       </button>
                       <button 
                         onClick={() => setDeliveryMethod('delivery')}
                         className={`py-4 rounded-2xl border-2 font-bold transition-all ${deliveryMethod === 'delivery' ? 'bg-orange-500 border-orange-500 text-white' : 'bg-slate-900/50 border-slate-700 text-slate-400'}`}
                       >
                         Di Antar
                       </button>
                    </div>
                 </div>
               </div>

               {deliveryMethod === 'delivery' && (
                 <div className="mb-8 space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
                    <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider">Alamat Pengantaran Lengkap</label>
                    <textarea 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Masukkan alamat lengkap pengantaran..."
                      rows="3"
                      className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-2xl px-5 py-4 text-white focus:border-orange-500 focus:outline-none transition-all resize-none"
                    ></textarea>
                 </div>
               )}

               <button
                  onClick={handleOrder}
                  className="w-full py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-extrabold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-lg text-lg"
               >
                  <MessageCircle className="w-6 h-6 fill-current text-white/20"/>
                  Kirim Pesanan ke WhatsApp &rarr;
               </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default OrderSummary;
