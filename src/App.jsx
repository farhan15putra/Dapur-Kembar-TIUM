import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES, MENU_ITEMS } from './data/menu';
import { ShoppingBag } from 'lucide-react';

import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MenuShowcase from './components/MenuShowcase';
import AboutStrip from './components/AboutStrip';
import MenuCatalog from './components/MenuCatalog';
import CartSheet from './components/CartSheet';
import Footer from './components/Footer';
import Login from './components/Login';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';

const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');

export default function App() {
  const [orderMode, setOrderMode] = useState('regular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'login', 'profile'
  const [currentUser, setCurrentUser] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
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

  const regularCount = regularCart.reduce((sum, item) => sum + item.qty, 0);
  const sbCount = sbConfig.items.length;
  const cartCount = regularCount + sbCount;

  // ── Order Handler ─────────────────────────────
  const handleOrder = () => {
    if (!userName.trim()) return alert('Mohon masukkan nama pemesan.');
    if (deliveryMethod === 'delivery' && !address.trim()) return alert('Mohon masukkan alamat pengantaran.');

    const phone = '628111772219';
    let msg = `Halo *Dapur Kembar* \n\nSaya ingin memesan dari Web Katalog:\n`;
    msg += `*Atas Nama:* ${userName}\n`;
    msg += `*Metode:* ${deliveryMethod === 'pickup' ? 'Ambil Sendiri (Self Pickup)' : 'Di Antar Ke Alamat'}\n`;
    if (deliveryMethod === 'delivery') msg += `*Alamat:* ${address}\n`;
    msg += `\n`;
    let grandTotal = 0;

    if (orderMode === 'regular') {
      if (regularCart.length === 0) return alert('Keranjang Satuan kosong.');
      msg += `*=== PESANAN SATUAN ===*\n`;
      regularCart.forEach(c => msg += `- ${c.name} (${c.qty} pcs) = ${rupiah(c.price * c.qty)}\n`);
      msg += `> Subtotal Satuan: ${rupiah(regularTotal)}\n\n`;
      grandTotal += regularTotal;
    } else {
      if (sbConfig.items.length === 0) return alert('Keranjang Snack Box kosong.');
      if (sbTypes < 3) return alert('Snack Box belum valid (min 3 kue).');
      msg += `*=== RAKITAN SNACK BOX ===*\n`;
      msg += `Ukuran: ${sbTypes <= 4 ? 'Box M' : 'Box L'}\nIsi per box:\n`;
      sbConfig.items.forEach(c => msg += `  - 1x ${c.name}\n`);
      if (sbConfig.water) msg += `  - 1x Air Mineral Gelas\n`;
      msg += `Harga per box: ${rupiah(sbUnitCost)}\nKuantitas: ${sbConfig.boxes} Box\n`;
      msg += `> Subtotal Snack Box: ${rupiah(sbTotal)}\n\n`;
      grandTotal += sbTotal;
    }

    msg += `*=================*\n*TOTAL: ${rupiah(grandTotal)}*\n*=================*\nMohon konfirmasi ketersediaan ya.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // ── Helpers ───────────────────────────────────
  const getVisibleCategories = () => {
    return CATEGORIES.filter(c => c.id === 'kue-asin' || c.id === 'kue-manis' || c.id === 'minuman');
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
  if (currentView === 'login') {
    return <Login
      onBack={() => setCurrentView('home')}
      onLoginSuccess={(userData) => {
        setCurrentUser(userData);
        setCurrentView(userData.role === 'admin' ? 'admin' : 'profile');
      }}
    />;
  }

  if (currentView === 'admin' && currentUser?.role === 'admin') {
    return <AdminDashboard 
      user={currentUser} 
      onLogout={() => {
        setCurrentUser(null);
        setCurrentView('home');
      }} 
    />;
  }

  if (currentView === 'profile' && currentUser) {
    return <Profile
      user={currentUser}
      savedAddresses={savedAddresses}
      setSavedAddresses={setSavedAddresses}
      onBack={() => setCurrentView('home')}
      onLogout={() => {
        setCurrentUser(null);
        setCurrentView('home');
      }}
    />;
  }

  return (
    <div className="min-h-screen bg-[#F7EFE2]">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onLoginClick={() => setCurrentView(currentUser ? (currentUser.role === 'admin' ? 'admin' : 'profile') : 'login')}
        user={currentUser}
      />

      {/* Seamless flow — no section backgrounds */}
      <HeroBanner onExplore={() => menuRef.current?.scrollIntoView({ behavior: 'smooth' })} />

      {/* Menu Showcase */}
      <MenuShowcase onCategoryClick={handleCategoryClick} />

      {/* About Strip — compact brand tagline, non-disruptive */}
      <AboutStrip />

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
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            id="floating-cart-btn"
            onClick={() => setCartOpen(true)}
            className="fixed bottom-6 right-5 md:right-10 z-50 bg-[#1C1A17] text-white pl-4 pr-2.5 py-2.5 rounded-full shadow-2xl shadow-black/25 flex items-center gap-2 cursor-pointer"
            initial={{ y: 80, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05, backgroundColor: '#2D2A26' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          >
            <ShoppingBag className="w-[18px] h-[18px] md:w-5 md:h-5" strokeWidth={1.8} />
            <span className="font-['DM_Sans'] font-semibold text-[13px] md:text-[14px] tracking-wide">Keranjang</span>
            <motion.span
              className="bg-[#ad2a2a] text-white font-['DM_Sans'] font-bold text-[10px] md:text-[11px] min-w-[22px] h-[22px] md:min-w-[24px] md:h-[24px] rounded-full flex items-center justify-center px-1 ml-0.5"
              key={cartCount}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
            >
              {cartCount}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <CartSheet
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        orderMode={orderMode}
        setOrderMode={setOrderMode}
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
        savedAddresses={savedAddresses}
      />
    </div>
  );
}
