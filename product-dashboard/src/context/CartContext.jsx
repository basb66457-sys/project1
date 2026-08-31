// Shared shopping cart state for the application pages
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Increase the quantity of an existing product, or add it with quantity one
  function addToCart(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) => item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item);
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  function toggleCart() {
    setIsCartOpen((isOpen) => !isOpen);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalItems, isCartOpen, toggleCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// This file exports the state provider and its related hook
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
}