import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setNotification(`Le produit : ${product.name} est déjà dans le panier`);
      setTimeout(() => setNotification(null), 2000);
    } else {
      setCart([...cart, product]);
      setNotification(`Le produit : ${product.name} a été ajouté au panier`);
      setTimeout(() => setNotification(null), 2000);
    }
  };
  const removeFromCart = (productToRemove) => {
    const updatedCart = cart.filter(
      (product) => product.id !== productToRemove.id
    );
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, notification }}
    >
      {children}
    </CartContext.Provider>
  );
};
