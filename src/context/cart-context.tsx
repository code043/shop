"use client";

import { createContext, useContext } from "react";
import { useGetCart } from "../hooks/use-get-cart";
import { Cart } from "../types/cart";

type CartContextType = {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
};
const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartData = useGetCart();

  return (
    <CartContext.Provider value={cartData}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("CartProvider missing");
  return context;
}
