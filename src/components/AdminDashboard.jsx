import React, { useState } from 'react';
import { LogOut, PackageSearch, ChefHat, Search, Edit2, CheckCircle2, Clock } from 'lucide-react';

const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for incoming orders
  const [orders, setOrders] = useState([
    { id: '#DK-2041', name: 'Budi Santoso', items: '3x Risol Mayo, 1x Nasi Bakar', total: 65000, status: 'Baru', date: 'Hari ini, 10:30' },
    { id: '#DK-2040', name: 'Siti Aminah', items: '20x Snack Box M', total: 400000, status: 'Diproses', date: 'Hari ini, 08:15' },
    { id: '#DK-2038', name: 'Kantor Dirjen', items: '50x Snack Box L', total: 1250000, status: 'Selesai', date: 'Kemarin, 14:00' },
  ]);

  // Dummy data for menu management
  const [menuItems, setMenuItems] = useState([
    { id: '1', name: 'Risol Mayo Beef', price: 5000, stock: 'Tersedia' },
    { id: '2', name: 'Nasi Bakar Cumi', price: 15000, stock: 'Tersedia' },
    { id: '3', name: 'Kue Ku', price: 3500, stock: 'Habis' },
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="min-h-screen bg-[#FDF9F4] font-['DM_Sans'] text-[#1C1A17]">
      {/* Navbar Admin */}
      <nav className="bg-white border-b border-[#ad2a2a]/10 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ad2a2a] rounded-lg flex items-center justify-center shadow-md">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-['Cormorant_Garamond'] text-xl font-bold italic text-[#ad2a2a] leading-none">Admin Panel</h1>
              <p className="text-[10px] font-bold text-[#8A8278] uppercase tracking-wider">Dapur Kembar</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold">{user.name}</p>
              <p className="text-[10px] text-[#8A8278] uppercase tracking-wider">{user.role}</p>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 rounded-xl text-red-600 hover:bg-red-50 active:scale-95 transition-all"
              title="Keluar"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-5 pb-20">
        
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-white p-1 rounded-xl shadow-sm border border-[#1C1A17]/5">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'orders' ? 'bg-[#ad2a2a] text-white shadow-md' : 'text-[#8A8278] hover:bg-slate-50'}`}
          >
            <PackageSearch className="w-4 h-4" />
            Pesanan Masuk
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'menu' ? 'bg-[#1C1A17] text-white shadow-md' : 'text-[#8A8278] hover:bg-slate-50'}`}
          >
            <Edit2 className="w-4 h-4" />
            Kelola Menu
          </button>
        </div>

        {/* --- TAB: PESANAN MASUK --- */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h2 className="text-lg font-bold">Daftar Pesanan</h2>
                <p className="text-xs text-[#8A8278]">Pantau dan update status pesanan pelanggan.</p>
              </div>
            </div>

            <div className="grid gap-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl p-5 border border-[#1C1A17]/5 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-lg">{order.id}</span>
                        <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full 
                          ${order.status === 'Baru' ? 'bg-blue-100 text-blue-700' : 
                            order.status === 'Diproses' ? 'bg-amber-100 text-amber-700' : 
                            'bg-emerald-100 text-emerald-700'}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[#1C1A17]">{order.name}</p>
                      <p className="text-xs text-[#8A8278] flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-[#8A8278] uppercase">Total Bayar</p>
                      <p className="font-black text-[#ad2a2a] text-lg">{rupiah(order.total)}</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#F7EFE2]/50 rounded-xl p-3 mb-4 border border-[#ad2a2a]/10">
                    <p className="text-xs font-semibold leading-relaxed text-[#1C1A17]">{order.items}</p>
                  </div>

                  <div className="flex gap-2 justify-end pt-3 border-t border-dashed border-slate-200">
                    {order.status === 'Baru' && (
                      <button 
                        onClick={() => handleUpdateStatus(order.id, 'Diproses')}
                        className="px-4 py-2 bg-amber-500 text-white text-xs font-bold rounded-lg hover:bg-amber-600 transition-colors"
                      >
                        Mulai Proses
                      </button>
                    )}
                    {order.status === 'Diproses' && (
                      <button 
                        onClick={() => handleUpdateStatus(order.id, 'Selesai')}
                        className="px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-emerald-600 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Tandai Selesai
                      </button>
                    )}
                    {order.status === 'Selesai' && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 px-2 py-1">
                        <CheckCircle2 className="w-4 h-4" /> Pesanan Selesai
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB: KELOLA MENU --- */}
        {activeTab === 'menu' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
              <div>
                <h2 className="text-lg font-bold">Katalog Menu</h2>
                <p className="text-xs text-[#8A8278]">Ubah harga atau status stok secara instan.</p>
              </div>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8278]" />
                <input 
                  type="text" 
                  placeholder="Cari menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-[#ad2a2a] focus:ring-2 focus:ring-[#ad2a2a]/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#1C1A17]/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-wider text-[#8A8278]">
                      <th className="p-4 font-bold">Nama Menu</th>
                      <th className="p-4 font-bold">Harga</th>
                      <th className="p-4 font-bold">Stok</th>
                      <th className="p-4 font-bold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {menuItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-sm text-[#1C1A17]">{item.name}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold text-sm text-[#ad2a2a]">{rupiah(item.price)}</p>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-[10px] font-bold rounded-md ${item.stock === 'Tersedia' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                            {item.stock}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors px-3 py-1.5 border border-blue-200 rounded-lg hover:bg-blue-50">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
