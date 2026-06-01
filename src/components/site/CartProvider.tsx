"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (item) => item.productId === newItem.productId && item.variantId === newItem.variantId
      );

      if (existingIndex >= 0) {
        const updated = [...current];
        updated[existingIndex].quantity += newItem.quantity || 1;
        return updated;
      }

      return [...current, { ...newItem, quantity: newItem.quantity || 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setItems((current) =>
      current.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      )
    );
  }, []);

  const updateQuantity = useCallback((productId: string, variantId: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}