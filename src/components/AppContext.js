'use client';
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure code only runs on the client side to avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const storedCart = window.localStorage.getItem('cart');
      if (storedCart) {
        setCartProducts(JSON.parse(storedCart));
      }
    }
  }, []);

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove) {
    setCartProducts(prevCartProducts => {
      const newCartProducts = prevCartProducts.filter((_, index) => index !== indexToRemove);
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success('Product removed');
  }

  function saveCartProductsToLocalStorage(products) {
    if (isMounted && typeof window !== 'undefined') {
      window.localStorage.setItem('cart', JSON.stringify(products));
    }
  }

  function addToCart(product, size = null, extras = []) {
    setCartProducts(prevProducts => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  return (
    <SessionProvider>
      <CartContext.Provider value={{
        cartProducts,
        setCartProducts,
        addToCart,
        removeCartProduct,
        clearCart,
      }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
