import React, { useState, useRef } from 'react';
import {
  LogOut, ChefHat, Search, Edit2,
  Plus, Trash2, ToggleLeft, ToggleRight, X, Save, ImagePlus, AlertTriangle, LayoutGrid, Sparkles
} from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { CATEGORIES, MENU_ITEMS as INITIAL_DATA } from '../data/menu';
import { supabase } from '../lib/supabaseClient';

const rupiah = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');

const EMPTY_FORM = { name: '', category: 'kue-asin', price: '', unit: '/ pcs', description: '', image: '', tag: '' };

// ── Delete Confirm Dialog ────────────────────────────────────────────────────
function DeleteConfirmDialog({ itemName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="font-bold text-lg text-[#1C1A17] mb-1">Hapus Menu?</h3>
        <p className="text-sm text-[#8A8278] mb-6">
          <span className="font-semibold text-[#1C1A17]">"{itemName}"</span> akan dihapus secara permanen dari katalog.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Menu Form Modal ──────────────────────────────────────────────────────────
function MenuFormModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return alert('File harus berupa gambar.');
    if (file.size > 5 * 1024 * 1024) return alert('Ukuran gambar maksimal 5MB.');

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`; // Straight into bucket

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      set('image', data.publicUrl);
    } catch (err) {
      alert('Gagal upload gambar: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.price) return alert('Nama dan harga wajib diisi.');
    await onSave({ ...form, price: Number(form.price) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="font-bold text-lg text-[#1C1A17]">{initial ? 'Edit Menu' : 'Tambah Menu Baru'}</h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: 'Nama Menu', key: 'name', type: 'text', placeholder: 'cth: Risol Mayo' },
            { label: 'Harga (Rp)', key: 'price', type: 'number', placeholder: 'cth: 3500' },
            { label: 'Satuan', key: 'unit', type: 'text', placeholder: 'cth: / pcs' },
            { label: 'Tag (opsional)', key: 'tag', type: 'text', placeholder: 'cth: Best Seller' },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="block text-[11px] font-bold text-[#8A8278] uppercase tracking-wider mb-1.5">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={e => set(key, e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-[#ad2a2a] focus:ring-2 focus:ring-[#ad2a2a]/10 outline-none transition-all"
              />
            </div>
          ))}

          {/* Upload Gambar */}
          <div>
            <label className="block text-[11px] font-bold text-[#8A8278] uppercase tracking-wider mb-1.5">Foto Menu</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          {/* Upload Gambar */}
          <div>
            <label className="block text-[11px] font-bold text-[#8A8278] uppercase tracking-wider mb-1.5">Foto Menu</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {form.image || uploading ? (
              <div className="relative group w-full h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                {uploading && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center gap-2">
                    <div className="w-6 h-6 border-2 border-[#ad2a2a]/20 border-t-[#ad2a2a] rounded-full animate-spin" />
                    <span className="text-[9px] font-bold text-[#ad2a2a] uppercase tracking-widest animate-pulse">Mengunggah</span>
                  </div>
                )}
                
                {form.image ? (
                  <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImagePlus className="w-8 h-8 text-slate-300" />
                  </div>
                )}

                {!uploading && form.image && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="px-3 py-2 bg-white text-[#1C1A17] text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      Ganti Foto
                    </button>
                    <button
                      type="button"
                      onClick={() => { set('image', ''); fileInputRef.current.value = ''; }}
                      className="px-3 py-2 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                disabled={uploading}
                className="w-full h-32 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 text-[#8A8278] hover:border-[#ad2a2a] hover:text-[#ad2a2a] hover:bg-[#ad2a2a]/5 transition-all disabled:opacity-50"
              >
                <ImagePlus className="w-7 h-7" />
                <span className="text-xs font-semibold">Klik untuk upload foto</span>
                <span className="text-[10px]">PNG, JPG, WEBP · Maks. 5MB</span>
              </button>
            )}
          </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#8A8278] uppercase tracking-wider mb-1.5">Kategori</label>
            <select
              value={form.category}
              onChange={e => set('category', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-[#ad2a2a] focus:ring-2 focus:ring-[#ad2a2a]/10 outline-none transition-all"
            >
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#8A8278] uppercase tracking-wider mb-1.5">Deskripsi</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Deskripsi singkat menu..."
              rows={3}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-[#ad2a2a] focus:ring-2 focus:ring-[#ad2a2a]/10 outline-none transition-all resize-none"
            />
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Batal</button>
          <button onClick={handleSave} className="flex-1 py-3 bg-[#ad2a2a] text-white rounded-xl text-sm font-bold hover:bg-[#8a2222] transition-colors flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Menu Card (Mobile) ───────────────────────────────────────────────────────
function MenuCard({ item, onEdit, onDelete, onToggleStock }) {
  const cat = CATEGORIES.find(c => c.id === item.category);
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#1C1A17]/5 shadow-sm flex gap-3">
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
          onError={e => { e.target.style.display = 'none'; }}
        />
      ) : (
        <div className="w-16 h-16 rounded-xl bg-slate-100 flex-shrink-0 flex items-center justify-center">
          <ChefHat className="w-6 h-6 text-slate-300" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0">
            <p className="font-bold text-sm text-[#1C1A17] truncate">{item.name}</p>
            {item.tag && (
              <span className="text-[10px] font-bold text-[#ad2a2a] bg-[#ad2a2a]/10 px-1.5 py-0.5 rounded-md">{item.tag}</span>
            )}
          </div>
          <div className="flex gap-1.5 flex-shrink-0">
            <button
              onClick={() => onEdit(item)}
              className="p-1.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(item)}
              className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <p className="font-bold text-sm text-[#ad2a2a]">{rupiah(item.price)} <span className="font-normal text-[10px] text-[#8A8278]">{item.unit}</span></p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">{cat?.name || item.category}</span>
          <button
            onClick={() => onToggleStock(item.id)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${item.stock === 'Tersedia' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}
          >
            {item.stock === 'Tersedia' ? <ToggleRight className="w-3 h-3" /> : <ToggleLeft className="w-3 h-3" />}
            {item.stock}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const AdminDashboard = ({ user, onLogout, onViewMenu }) => {
  const { menuItems, loading, addMenuItem, updateMenuItem, deleteMenuItem, toggleStock } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalState, setModalState] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null); // item to delete

  const filteredMenu = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveMenu = async (formData) => {
    if (modalState.mode === 'add') await addMenuItem(formData);
    else await updateMenuItem(modalState.item.id, formData);
    setModalState(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTarget) {
      await deleteMenuItem(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const [seeding, setSeeding] = useState(false);
  const handleSeed = async () => {
    if (!window.confirm('Isi database dengan data awal dari menu.js?')) return;
    setSeeding(true);
    try {
      for (const item of INITIAL_DATA) {
        // Prepare item for Supabase (remove local ID to let DB generate UUID)
        const { id, ...itemData } = item;
        await addMenuItem(itemData);
      }
      alert('Seeding berhasil! Database sekarang terisi.');
    } catch (err) {
      alert('Gagal seeding: ' + err.message);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F4] font-['DM_Sans'] text-[#1C1A17]">
      {/* Navbar */}
      <nav className="bg-white border-b border-[#ad2a2a]/10 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-[#ad2a2a] to-[#7a1d1d] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-['Cormorant_Garamond'] text-lg sm:text-xl font-bold italic text-[#ad2a2a] leading-none">Admin Panel</h1>
              <p className="text-[9px] sm:text-[10px] font-bold text-[#8A8278] uppercase tracking-wider">Dapur Kembar</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold">{user.name}</p>
              <p className="text-[10px] text-[#8A8278] uppercase tracking-wider">Administrator</p>
            </div>
            <button
              onClick={onViewMenu}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[#ad2a2a] hover:bg-[#ad2a2a]/10 active:scale-95 transition-all text-xs font-bold border border-[#ad2a2a]/20"
              title="Lihat Menu Digital"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Menu Digital</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 active:scale-95 transition-all text-xs font-bold border border-red-100"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-5 pb-20">
        {/* Header & Controls */}
        <div className="flex flex-col gap-3 mb-5 mt-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1C1A17]">Katalog Menu</h2>
              <p className="text-xs text-[#8A8278]">{menuItems.length} item terdaftar</p>
            </div>
            <button
              onClick={() => setModalState({ mode: 'add' })}
              className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-[#ad2a2a] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#8a2222] transition-colors shadow-md shadow-[#ad2a2a]/20 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Menu</span>
            </button>
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8278]" />
            <input
              type="text"
              placeholder="Cari nama menu..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:border-[#ad2a2a] focus:ring-2 focus:ring-[#ad2a2a]/10 outline-none transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#ad2a2a]/20 border-t-[#ad2a2a] rounded-full animate-spin mb-4" />
            <p className="text-sm font-bold text-[#8A8278] animate-pulse">Menghubungkan ke database...</p>
          </div>
        ) : filteredMenu.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <ChefHat className="w-12 h-12 mx-auto mb-4 text-[#8A8278] opacity-30" />
            <h3 className="font-bold text-[#1C1A17] mb-1">Database Kosong</h3>
            <p className="text-sm text-[#8A8278] mb-6 max-w-xs mx-auto">
              Belum ada menu di database lu. Mau isi otomatis pakai data awal?
            </p>
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="px-6 py-3 bg-[#1C1A17] text-white rounded-xl text-sm font-bold hover:bg-[#2D2A26] transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              {seeding ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sedang Mengisi...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Inisialisasi Data Awal
                </>
              )}
            </button>
          </div>
        ) : null}

        {/* Mobile: Card Layout */}
        <div className="flex flex-col gap-3 md:hidden">
          {filteredMenu.map(item => (
            <MenuCard
              key={item.id}
              item={item}
              onEdit={(item) => setModalState({ mode: 'edit', item })}
              onDelete={(item) => setDeleteTarget(item)}
              onToggleStock={toggleStock}
            />
          ))}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-[#1C1A17]/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-wider text-[#8A8278]">
                  <th className="p-4 font-bold">Menu</th>
                  <th className="p-4 font-bold">Kategori</th>
                  <th className="p-4 font-bold">Harga</th>
                  <th className="p-4 font-bold">Stok</th>
                  <th className="p-4 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMenu.map(item => {
                  const cat = CATEGORIES.find(c => c.id === item.category);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" onError={e => { e.target.style.display = 'none'; }} />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex-shrink-0 flex items-center justify-center">
                              <ChefHat className="w-5 h-5 text-slate-300" />
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-sm">{item.name}</p>
                            {item.tag && <span className="text-[10px] font-bold text-[#ad2a2a] bg-[#ad2a2a]/10 px-1.5 py-0.5 rounded-md">{item.tag}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">{cat?.name || item.category}</span>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-sm text-[#ad2a2a]">{rupiah(item.price)}</p>
                        <p className="text-[10px] text-[#8A8278]">{item.unit}</p>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleStock(item.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${item.stock === 'Tersedia' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
                        >
                          {item.stock === 'Tersedia'
                            ? <ToggleRight className="w-3.5 h-3.5" />
                            : <ToggleLeft className="w-3.5 h-3.5" />}
                          {item.stock}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setModalState({ mode: 'edit', item })}
                            className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(item)}
                            className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Form Modal */}
      {modalState && (
        <MenuFormModal
          initial={modalState.mode === 'edit' ? modalState.item : null}
          onSave={handleSaveMenu}
          onClose={() => setModalState(null)}
        />
      )}

      {/* Delete Confirm Dialog */}
      {deleteTarget && (
        <DeleteConfirmDialog
          itemName={deleteTarget.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
