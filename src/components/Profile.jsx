import React, { useState } from 'react';
import { ArrowLeft, LogOut, Package, Settings, Clock, MapPin, ChevronRight } from 'lucide-react';

const Profile = ({ user, savedAddresses, setSavedAddresses, onBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddressTitle, setNewAddressTitle] = useState('Rumah');
  const [newAddressData, setNewAddressData] = useState({
    jalan: '',
    nomor: '',
    rtrw: '',
    kelurahan: '',
    kecamatan: '',
    kota: '',
    patokan: ''
  });

  const handleSaveAddress = () => {
    if (!newAddressData.jalan.trim() || !newAddressData.kota.trim()) return;
    
    // Format the components into a single readable string
    const nomorText = newAddressData.nomor.trim() ? `No. ${newAddressData.nomor}` : '';
    const rtrwText = newAddressData.rtrw.trim() ? `RT/RW ${newAddressData.rtrw}` : '';
    const kelurahanText = newAddressData.kelurahan.trim() ? `Kel. ${newAddressData.kelurahan}` : '';
    const kecamatanText = newAddressData.kecamatan.trim() ? `Kec. ${newAddressData.kecamatan}` : '';
    const patokanText = newAddressData.patokan.trim() ? `(Patokan: ${newAddressData.patokan})` : '';
    
    const parts = [
      newAddressData.jalan,
      nomorText,
      rtrwText,
      kelurahanText,
      kecamatanText,
      newAddressData.kota,
      patokanText
    ].filter(Boolean).join(', ');

    setSavedAddresses([...savedAddresses, { title: newAddressTitle, text: parts }]);
    setIsAddingAddress(false);
    setNewAddressData({ jalan: '', nomor: '', rtrw: '', kelurahan: '', kecamatan: '', kota: '', patokan: '' });
    setNewAddressTitle('Rumah');
  };

  const dummyOrders = []; // Empty default state

  return (
    <div className="min-h-screen bg-[#F7EFE2]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#ad2a2a]/10">
        <div className="max-w-3xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#1C1A17] hover:bg-black/5 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-['Cormorant_Garamond'] text-2xl font-semibold italic text-[#1C1A17]">
              Profil Saya
            </h1>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-red-600 hover:bg-red-50 active:scale-95 transition-all font-['DM_Sans'] text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-5 pb-20">
        {/* User Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#1C1A17]/5 mb-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#ad2a2a] text-white flex items-center justify-center font-['Cormorant_Garamond'] text-3xl font-bold italic shadow-lg shadow-[#ad2a2a]/20 shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold text-[#1C1A17] capitalize">{user.name}</h2>
            <p className="font-['DM_Sans'] text-sm text-[#8A8278]">{user.email}</p>
            {user.role === 'admin' && (
              <span className="inline-block mt-2 px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded-md">
                Admin Akun
              </span>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[#ad2a2a]/10 pb-px">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 font-['DM_Sans'] text-sm font-semibold relative transition-colors ${activeTab === 'orders' ? 'text-[#ad2a2a]' : 'text-[#8A8278] hover:text-[#1C1A17]'}`}
          >
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Pesanan Saya
            </div>
            {activeTab === 'orders' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ad2a2a] rounded-t-full" />}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-3 font-['DM_Sans'] text-sm font-semibold relative transition-colors ${activeTab === 'settings' ? 'text-[#ad2a2a]' : 'text-[#8A8278] hover:text-[#1C1A17]'}`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Pengaturan
            </div>
            {activeTab === 'settings' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ad2a2a] rounded-t-full" />}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-fade-in">
            {dummyOrders.length > 0 ? (
              dummyOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[#1C1A17]/5 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-['DM_Sans'] font-bold text-[#1C1A17]">{order.id}</h3>
                      <p className="text-xs text-[#8A8278] flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {order.date}</p>
                    </div>
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${order.bg} ${order.color}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="py-3 border-t border-b border-dashed border-slate-100 mb-3">
                    <p className="text-sm text-slate-600 line-clamp-2">{order.items}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-['DM_Sans'] font-extrabold text-[#ad2a2a]">{order.total}</span>
                    <div className="flex items-center gap-1 text-sm text-[#ad2a2a] font-semibold group-hover:translate-x-1 transition-transform">
                      Detail <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#1C1A17]/5 text-center">
                <div className="w-16 h-16 bg-[#F7EFE2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-[#8A8278]" />
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-xl font-bold text-[#1C1A17] mb-2">Belum Ada Pesanan</h3>
                <p className="font-['DM_Sans'] text-sm text-[#8A8278] mb-6">Anda belum pernah melakukan pemesanan. Yuk, lihat menu lezat kami!</p>
                <button 
                  onClick={onBack}
                  className="px-6 py-2.5 bg-[#1C1A17] text-white font-['DM_Sans'] font-semibold text-sm rounded-xl hover:bg-[#3D3A35] transition-colors"
                >
                  Mulai Belanja
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#1C1A17]/5">
              <h3 className="font-['DM_Sans'] font-bold text-[#1C1A17] mb-4">Informasi Pribadi</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-[#8A8278] uppercase tracking-wider">Nama Lengkap</label>
                  <p className="text-sm font-medium text-[#1C1A17] mt-0.5">{user.name}</p>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#8A8278] uppercase tracking-wider">Email / No. HP</label>
                  <p className="text-sm font-medium text-[#1C1A17] mt-0.5">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#1C1A17]/5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-['DM_Sans'] font-bold text-[#1C1A17]">Alamat Tersimpan</h3>
                {!isAddingAddress && savedAddresses.length > 0 && (
                  <button onClick={() => setIsAddingAddress(true)} className="text-xs font-bold text-[#ad2a2a] hover:underline">+ Tambah</button>
                )}
              </div>

              {isAddingAddress ? (
                <div className="p-4 border border-[#ad2a2a]/20 bg-[#F7EFE2]/30 rounded-xl space-y-3 animate-fade-in">
                  <div>
                    <label className="text-[10px] font-bold text-[#8A8278] uppercase tracking-wider mb-1 block">Label Alamat (Mis: Rumah, Kantor)</label>
                    <input 
                      type="text" 
                      value={newAddressTitle}
                      onChange={(e) => setNewAddressTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-[#ad2a2a] focus:outline-none focus:ring-2 focus:ring-[#ad2a2a]/10 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="text-[10px] font-bold text-[#8A8278] uppercase tracking-wider mb-1 block">Nama Jalan / Perumahan</label>
                      <input 
                        type="text" 
                        value={newAddressData.jalan}
                        onChange={(e) => setNewAddressData({...newAddressData, jalan: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-[#ad2a2a] focus:outline-none focus:ring-2 focus:ring-[#ad2a2a]/10 transition-all"
                        placeholder="Mis: Jl. Melati Raya"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#8A8278] uppercase tracking-wider mb-1 block">No. Rumah</label>
                      <input 
                        type="text" 
                        value={newAddressData.nomor}
                        onChange={(e) => setNewAddressData({...newAddressData, nomor: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-[#ad2a2a] focus:outline-none focus:ring-2 focus:ring-[#ad2a2a]/10 transition-all"
                        placeholder="Mis: 15A"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-[#8A8278] uppercase tracking-wider mb-1 block">RT / RW</label>
                      <input 
                        type="text" 
                        value={newAddressData.rtrw}
                        onChange={(e) => setNewAddressData({...newAddressData, rtrw: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-[#ad2a2a] focus:outline-none focus:ring-2 focus:ring-[#ad2a2a]/10 transition-all"
                        placeholder="001/002"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#8A8278] uppercase tracking-wider mb-1 block">Kelurahan / Desa</label>
                      <input 
                        type="text" 
                        value={newAddressData.kelurahan}
                        onChange={(e) => setNewAddressData({...newAddressData, kelurahan: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-[#ad2a2a] focus:outline-none focus:ring-2 focus:ring-[#ad2a2a]/10 transition-all"
                        placeholder="Mis: Suka Maju"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#8A8278] uppercase tracking-wider mb-1 block">Kecamatan</label>
                      <input 
                        type="text" 
                        value={newAddressData.kecamatan}
                        onChange={(e) => setNewAddressData({...newAddressData, kecamatan: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-[#ad2a2a] focus:outline-none focus:ring-2 focus:ring-[#ad2a2a]/10 transition-all"
                        placeholder="Mis: Cilodong"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#8A8278] uppercase tracking-wider mb-1 block">Kota / Kabupaten</label>
                      <input 
                        type="text" 
                        value={newAddressData.kota}
                        onChange={(e) => setNewAddressData({...newAddressData, kota: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-[#ad2a2a] focus:outline-none focus:ring-2 focus:ring-[#ad2a2a]/10 transition-all"
                        placeholder="Mis: Depok"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-[#8A8278] uppercase tracking-wider mb-1 block">Detail / Patokan (Opsional)</label>
                    <input 
                      type="text" 
                      value={newAddressData.patokan}
                      onChange={(e) => setNewAddressData({...newAddressData, patokan: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:border-[#ad2a2a] focus:outline-none focus:ring-2 focus:ring-[#ad2a2a]/10 transition-all"
                      placeholder="Mis: Pagar hitam, depan masjid"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button 
                      onClick={() => setIsAddingAddress(false)}
                      className="px-4 py-2 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                      Batal
                    </button>
                    <button 
                      onClick={handleSaveAddress}
                      className="px-4 py-2 rounded-lg text-xs font-bold bg-[#ad2a2a] text-white hover:bg-[#8a2020] transition-colors shadow-md shadow-[#ad2a2a]/20"
                    >
                      Simpan Alamat
                    </button>
                  </div>
                </div>
              ) : savedAddresses.length > 0 ? (
                <div className="space-y-3 animate-fade-in">
                  {savedAddresses.map((addr, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-[#F7EFE2]/50 rounded-xl border border-[#ad2a2a]/10">
                      <MapPin className="w-5 h-5 text-[#ad2a2a] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-[#1C1A17] mb-0.5">{addr.title}</p>
                        <p className="text-xs text-[#8A8278] leading-relaxed">{addr.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-[#1C1A17]/10 rounded-xl animate-fade-in">
                  <MapPin className="w-6 h-6 text-[#8A8278] mx-auto mb-2 opacity-50" />
                  <p className="font-['DM_Sans'] text-xs text-[#8A8278] mb-3">Belum ada alamat yang tersimpan</p>
                  <button 
                    onClick={() => setIsAddingAddress(true)}
                    className="text-xs font-bold text-[#ad2a2a] hover:text-[#8a2020] px-4 py-2 border border-[#ad2a2a]/20 rounded-lg bg-[#ad2a2a]/5 transition-colors"
                  >
                    + Tambah Alamat Baru
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
