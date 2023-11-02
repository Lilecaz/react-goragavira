import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState(null);

    const addToCart = (product) => {
        setCart([...cart, product]);
        setNotification(`Le produit : ${product.name} a été ajouté au panier`);
        setTimeout(() => setNotification(null), 2000); // Dismiss notification after 2 seconds
    };

    const removeFromCart = (productToRemove) => {
        setCart(cart.filter(product => product.id !== productToRemove.id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, notification }}>
            {children}
        </CartContext.Provider>
    );
};