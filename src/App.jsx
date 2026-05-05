import React, { useState, useMemo, useRef } from 'react';
import { CATEGORIES, MENU_ITEMS } from './data/menu';
import { ShoppingBag } from 'lucide-react';

import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MenuShowcase from './components/MenuShowcase';
import MenuCatalog from './components/MenuCatalog';
import CartSheet from './components/CartSheet';
import Footer from './components/Footer';

const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');

export default function App() {
  const [orderMode, setOrderMode] = useState('regular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const menuRef = useRef(null);

  const [userName, setUserName] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [address, setAddress] = useState('');

  // ── Regular Cart ──────────────────────────────
  const [regularCart, setRegularCart] = useState([]);
  const addRegular = (item) => {
    setRegularCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      return ex
        ? prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
        : [...prev, { ...item, qty: 1 }];
    });
  };
  const updateRegularQty = (id, delta) => {
    setRegularCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  };
  const removeRegular = (id) => setRegularCart(prev => prev.filter(c => c.id !== id));

  // ── Snack Box ─────────────────────────────────
  const [sbConfig, setSbConfig] = useState({ items: [], water: false, boxes: 10 });
  const toggleSbItem = (item) => {
    setSbConfig(prev => {
      const exists = prev.items.find(i => i.id === item.id);
      return {
        ...prev,
        items: exists ? prev.items.filter(i => i.id !== item.id) : [...prev.items, item],
      };
    });
  };

  // ── Computed Values ───────────────────────────
  const regularTotal = regularCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const sbUnitCost = sbConfig.items.reduce((sum, i) => sum + i.price, 0) + (sbConfig.water ? 1000 : 0);
  const sbTotal = sbUnitCost * sbConfig.boxes;
  const sbTypes = sbConfig.items.length;
  const sbRec = useMemo(() => {
    if (sbTypes < 3) return { ok: false, label: 'Kue Kurang Lengkap', hint: `Minimal pilih 3 jenis kue (+ ${3 - sbTypes} lagi)` };
    if (sbTypes <= 4) return { ok: true, label: 'Gunakan Box M', hint: 'Kapasitas standar 3-4 kue.' };
    return { ok: true, label: 'Gunakan Box L', hint: 'Ukuran ekstra untuk kue lebih banyak.' };
  }, [sbTypes]);

  const cartCount = orderMode === 'regular'
    ? regularCart.reduce((sum, item) => sum + item.qty, 0)
    : sbConfig.items.length;

  // ── Order Handler ─────────────────────────────
  const handleOrder = () => {
    if (!userName.trim()) return alert('Mohon masukkan nama pemesan.');
    if (deliveryMethod === 'delivery' && !address.trim()) return alert('Mohon masukkan alamat pengantaran.');

    const phone = '628111773319';
    let msg = `Halo *Dapur Kembar* 👋\n\nSaya ingin memesan dari Web Katalog:\n`;
    msg += `*Atas Nama:* ${userName}\n`;
    msg += `*Metode:* ${deliveryMethod === 'pickup' ? 'Ambil Sendiri (Self Pickup)' : 'Di Antar Ke Alamat'}\n`;
    if (deliveryMethod === 'delivery') msg += `*Alamat:* ${address}\n`;
    msg += `\n`;
    let grandTotal = 0;

    if (regularCart.length > 0) {
      msg += `*=== PESANAN SATUAN ===*\n`;
      regularCart.forEach(c => msg += `- ${c.name} (${c.qty} pcs) = ${rupiah(c.price * c.qty)}\n`);
      msg += `> Subtotal Satuan: ${rupiah(regularTotal)}\n\n`;
      grandTotal += regularTotal;
    }
    if (sbConfig.items.length > 0) {
      if (sbTypes < 3) return alert('Snack Box belum valid (min 3 kue).');
      msg += `*=== RAKITAN SNACK BOX ===*\n`;
      msg += `Ukuran: ${sbTypes <= 4 ? 'Box M' : 'Box L'}\nIsi per box:\n`;
      sbConfig.items.forEach(c => msg += `  - 1x ${c.name}\n`);
      if (sbConfig.water) msg += `  - 1x Air Mineral Gelas\n`;
      msg += `Harga per box: ${rupiah(sbUnitCost)}\nKuantitas: ${sbConfig.boxes} Box\n`;
      msg += `> Subtotal Snack Box: ${rupiah(sbTotal)}\n\n`;
      grandTotal += sbTotal;
    }
    if (grandTotal === 0) return alert('Keranjang kosong.');
    msg += `*=================*\n*TOTAL: ${rupiah(grandTotal)}*\n*=================*\nMohon konfirmasi ketersediaan ya.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // ── Helpers ───────────────────────────────────
  const getVisibleCategories = () => {
    return CATEGORIES.filter(c => c.id === 'kue-asin' || c.id === 'kue-manis');
  };
  const getFilteredItems = (catId) => {
    return MENU_ITEMS.filter(item =>
      item.category === catId &&
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };
  const isItemSelected = (item) => {
    if (orderMode === 'regular') return regularCart.some(i => i.id === item.id);
    return sbConfig.items.some(i => i.id === item.id);
  };
  const handleItemClick = (item) => {
    if (orderMode === 'regular') return addRegular(item);
    return toggleSbItem(item);
  };
  const getCartQty = (itemId) => {
    const found = regularCart.find(c => c.id === itemId);
    return found ? found.qty : 0;
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setOrderMode('regular');
    setTimeout(() => menuRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  // ── Render ────────────────────────────────────
  return (
    <div className="min-h-screen font-['Outfit'] bg-[#F5EBD9]">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      {/* Seamless flow — no section backgrounds */}
      <HeroBanner onExplore={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      
      {/* Menu Showcase (replaces Quality, Category Showcase, and Delivery Banner) */}
      <MenuShowcase onCategoryClick={handleCategoryClick} />
      
      {/* Product Catalog */}
      <MenuCatalog
        menuRef={menuRef}
        orderMode={orderMode}
        setOrderMode={setOrderMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        visibleCategories={getVisibleCategories()}
        getFilteredItems={getFilteredItems}
        isItemSelected={isItemSelected}
        handleItemClick={handleItemClick}
        getCartQty={getCartQty}
      />
      
      <Footer />

      {/* Floating Cart */}
      {cartCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-5 md:right-10 z-50 bg-[#1C1A17] text-white px-5 py-3 md:px-6 md:py-4 rounded-full shadow-xl flex items-center gap-2.5 active:scale-95 transition-all animate-scale-in cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-bold text-sm md:text-base">Keranjang</span>
          <span className="bg-[#ad2a2a] text-white font-black text-[10px] md:text-xs w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        </button>
      )}

      <CartSheet
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        regularCart={regularCart}
        updateRegularQty={updateRegularQty}
        removeRegular={removeRegular}
        regularTotal={regularTotal}
        sbConfig={sbConfig}
        toggleSbItem={toggleSbItem}
        setSbConfig={setSbConfig}
        sbRec={sbRec}
        sbTotal={sbTotal}
        sbUnitCost={sbUnitCost}
        userName={userName}
        setUserName={setUserName}
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={setDeliveryMethod}
        address={address}
        setAddress={setAddress}
        handleOrder={handleOrder}
      />
    </div>
  );
}
