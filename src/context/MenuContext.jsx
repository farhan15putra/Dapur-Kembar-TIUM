import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch menu on mount
  useEffect(() => {
    fetchMenu();

    // Setup real-time subscription
    const channel = supabase
      .channel('menu_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menu' }, () => {
        fetchMenu();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMenu = async () => {
    try {
      const { data, error } = await supabase
        .from('menu')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setMenuItems(data || []);
    } catch (err) {
      console.error('Error fetching menu:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = async (item) => {
    try {
      const { data, error } = await supabase
        .from('menu')
        .insert([{ ...item, stock: 'Tersedia' }])
        .select();
      
      if (error) throw error;
      return { success: true, data: data[0] };
    } catch (err) {
      console.error('Error adding item:', err.message);
      return { success: false, error: err.message };
    }
  };

  const updateMenuItem = async (id, updatedFields) => {
    try {
      const { error } = await supabase
        .from('menu')
        .update(updatedFields)
        .eq('id', id);
      
      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error('Error updating item:', err.message);
      return { success: false, error: err.message };
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      const { error } = await supabase
        .from('menu')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error('Error deleting item:', err.message);
      return { success: false, error: err.message };
    }
  };

  const toggleStock = async (id) => {
    const item = menuItems.find(i => i.id === id);
    if (!item) return;

    const newStock = item.stock === 'Tersedia' ? 'Habis' : 'Tersedia';
    return updateMenuItem(id, { stock: newStock });
  };

  return (
    <MenuContext.Provider value={{ menuItems, loading, addMenuItem, updateMenuItem, deleteMenuItem, toggleStock }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used inside MenuProvider');
  return ctx;
}
