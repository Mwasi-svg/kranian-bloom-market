
import React, { createContext, useState, useContext, useEffect } from "react";
import { Product } from "../data/products";
import { useToast } from "@/components/ui/use-toast";

type CartItem = {
  product: Product;
  quantity: number;
  stemLength?: number;
  headSize?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, stemLength?: number, headSize?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateStemLength: (productId: number, stemLength: number) => void;
  updateHeadSize: (productId: number, headSize: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("kranianCart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("kranianCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number, stemLength?: number, headSize?: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Item already exists in cart, update quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        
        // Update stem length and head size if provided
        if (stemLength) newCart[existingItemIndex].stemLength = stemLength;
        if (headSize) newCart[existingItemIndex].headSize = headSize;
        
        toast({
          title: "Quote updated",
          description: `Updated quantity of ${product.name} in your quotation.`,
        });
        return newCart;
      } else {
        // Item doesn't exist, add new item
        toast({
          title: "Added to Quote",
          description: `${product.name} has been added to your quote.`,
        });
        return [...prevCart, { 
          product, 
          quantity, 
          stemLength: stemLength || 60, 
          headSize: headSize || 'Medium'
        }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.product.name} has been removed from your cart.`,
        });
      }
      return prevCart.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const updateStemLength = (productId: number, stemLength: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, stemLength }
          : item
      )
    );
  };

  const updateHeadSize = (productId: number, headSize: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, headSize }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getCartItemCount = () => {
    return cart.length;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateStemLength,
        updateHeadSize,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
