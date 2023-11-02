import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setNotification(`Le produit : ${product.name} est déjà dans le panier`);
      setIsInCart(true);
      setTimeout(() => setNotification(null), 5000);
    } else {
      setCart([...cart, product]);
      setNotification(`Le produit : ${product.name} a été ajouté au panier`);
      setIsInCart(false);
      setTimeout(() => setNotification(null), 5000);
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
      value={{ cart, addToCart, removeFromCart, notification, isInCart, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </CartContext.Provider>
  );
};
