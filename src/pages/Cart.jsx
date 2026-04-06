import React from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '80px', width: '90%', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
            <h2 style={{ color: '#fb6f92', marginBottom: '30px', textAlign: 'center' }}>Your Cart 🛒</h2>

            {cart.length === 0 ? (
                <div className="glass" style={{ padding: '50px', textAlign: 'center' }}>
                    <h3>Your cart is empty and lonely!</h3>
                </div>
            ) : (
                <div className="glass" style={{ padding: '30px' }}>
                    {cart.map((item) => (
                        <motion.div
                            key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.3)' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <img src={item.img} alt={item.name} style={{ width: '60px', borderRadius: '10px' }} />
                                <div>
                                    <h4>{item.name}</h4>
                                    <p style={{ fontSize: '0.9rem', color: '#fb6f92' }}>${item.price} x {item.quantity}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ff4d4d' }}
                            >
                                <Trash2 />
                            </button>
                        </motion.div>
                    ))}

                    <div style={{ marginTop: '30px', textAlign: 'right' }}>
                        <h3 style={{ marginBottom: '15px' }}>Total: <span style={{ color: '#fb6f92' }}>${total}</span></h3>
                        <button className="btn-cute">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;