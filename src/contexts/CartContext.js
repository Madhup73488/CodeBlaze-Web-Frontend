import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem("cart");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse cart data from localStorage", error);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutInitiated, setCheckoutInitiated] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find((cartItem) => cartItem.id === item.id);
      if (isItemInCart) {
        return prevItems;
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    openCart();
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return acc;
          return [...acc, { ...item, quantity: item.quantity - 1 }];
        }
        return [...acc, item];
      }, [])
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const value = {
    cart: cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
    checkoutInitiated,
    setCheckoutInitiated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
