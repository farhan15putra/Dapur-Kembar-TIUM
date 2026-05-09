import React, { createContext, useContext, useState } from 'react';
import { MENU_ITEMS as INITIAL_MENU } from '../data/menu';

const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState(
    INITIAL_MENU.map(item => ({ ...item, stock: 'Tersedia' }))
  );

  const addMenuItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      stock: 'Tersedia',
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const updateMenuItem = (id, updatedFields) => {
    setMenuItems(prev =>
      prev.map(item => item.id === id ? { ...item, ...updatedFields } : item)
    );
  };

  const deleteMenuItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleStock = (id) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, stock: item.stock === 'Tersedia' ? 'Habis' : 'Tersedia' }
          : item
      )
    );
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, updateMenuItem, deleteMenuItem, toggleStock }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used inside MenuProvider');
  return ctx;
}
