import React, { createContext, useContext, useState } from "react";

// Create the Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(new Set());

  const addToCart = (id) => {
    setCart((prevCart) => new Set([...prevCart, id])); // Convert to array and back to Set
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const newCart = new Set([...prevCart]);
      newCart.delete(id);
      return newCart;
    });
  };

  const checkInCart = (id) => {
    return cart.has(id);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, checkInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default useCart;
