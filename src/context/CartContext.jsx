import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../services/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { currentUser } = useAuth(); // Get the logged-in user

    // 1. Listen to Firebase when a user logs in
    useEffect(() => {
        if (currentUser) {
            const cartRef = doc(db, 'carts', currentUser.uid);

            // onSnapshot listens for LIVE updates. If they add an item on their phone,
            // their laptop screen will update instantly without refreshing!
            const unsubscribe = onSnapshot(cartRef, (docSnap) => {
                if (docSnap.exists()) {
                    setCart(docSnap.data().items || []);
                } else {
                    setCart([]);
                }
            });

            return () => unsubscribe(); // Cleanup listener when they log out
        } else {
            // If no user is logged in, clear the cart (or keep it local as a guest cart)
            setCart([]);
        }
    }, [currentUser]);

    // 2. Helper function to push updates to Firebase
    const updateFirebaseCart = async (newCart) => {
        if (currentUser) {
            const cartRef = doc(db, 'carts', currentUser.uid);
            await setDoc(cartRef, { items: newCart });
        }
    };

    // 3. Add to Cart Logic
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            let newCart;

            if (existingItem) {
                newCart = prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                newCart = [...prevCart, { ...product, quantity: 1 }];
            }

            updateFirebaseCart(newCart); // Send to Cloud
            return newCart;
        });
    };

    // 4. Remove from Cart Logic
    const removeFromCart = (id) => {
        setCart((prevCart) => {
            const newCart = prevCart.filter(item => item.id !== id);
            updateFirebaseCart(newCart); // Send to Cloud
            return newCart;
        });
    };

    // 5. Clear Cart Logic
    const clearCart = () => {
        setCart([]);
        updateFirebaseCart([]); // Clear from Cloud
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};