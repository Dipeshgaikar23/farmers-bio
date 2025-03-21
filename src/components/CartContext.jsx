import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 🔹 Load cart from localStorage on app startup
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // 🔹 Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔹 Add product to cart (only updates localStorage)
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === product._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { productId: product._id, name: product.name, price: product.price, quantity }];
    });
  };

  // 🔹 Remove product from cart (only updates localStorage)
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  // 🔹 Sync cart to backend when user logs out
  const syncCartToBackend = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || cart.length === 0) return;

      await axios.post("http://localhost:5000/consumer/cart/save", { cart }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Cart synced to backend!");
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  // 🔹 Clear cart when logging out (after syncing)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

//  fetch cart when login

    useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/consumer/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const backendCart = response.data;
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Merge backend and local cart
        const mergedCart = [...backendCart, ...localCart].reduce((acc, item) => {
          const existing = acc.find((i) => i.productId === item.productId);
          if (existing) {
            existing.quantity += item.quantity;
          } else {
            acc.push(item);
          }
          return acc;
        }, []);

        setCart(mergedCart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, syncCartToBackend, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


