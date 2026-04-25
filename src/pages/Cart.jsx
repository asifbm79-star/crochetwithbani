import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Import Auth Context!
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, addToCart, decreaseQuantity } = useCart();
    const { currentUser } = useAuth(); // Get the logged-in status
    const navigate = useNavigate();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckoutClick = () => {
        if (currentUser) {
            navigate('/checkout');
        } else {
            alert("Please log in or sign up to place your order! 🧶");
            navigate('/login');
        }
    };

    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%', paddingTop: '120px', paddingBottom: '80px' }}>
            <div style={{ width: '90%', maxWidth: '800px', margin: '0 auto' }}>

                <h2 style={{ color: '#d81b60', marginBottom: '30px', textAlign: 'center', fontSize: '2.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                    Your Cart <ShoppingBag size={32} />
                </h2>

                {cart.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ padding: '60px', textAlign: 'center', background: '#ebebeb', borderRadius: '30px', border: '1px solid #e0e0e0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                    >
                        <h3 style={{ color: '#888', marginBottom: '25px', fontSize: '1.5rem' }}>Your cart is empty and lonely! 🧶</h3>
                        <Link to="/">
                            <button className="btn-cute" style={{ fontSize: '1.1rem', padding: '12px 30px' }}>Start Shopping</button>
                        </Link>
                    </motion.div>
                ) : (
                    <div style={{ padding: '40px', borderRadius: '30px', background: '#ebebeb', border: '1px solid #e0e0e0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px dashed rgba(216, 27, 96, 0.2)' }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <h4 style={{ fontSize: '1.3rem', color: '#333', margin: 0 }}>{item.name}</h4>
                                        <p style={{ fontSize: '1.2rem', color: '#d81b60', fontWeight: 'bold', margin: 0 }}>
                                            ₹{item.price}
                                        </p>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'white', padding: '6px 12px', borderRadius: '50px', border: '1px solid #ddd', width: 'fit-content', marginTop: '5px' }}>
                                            <button onClick={() => decreaseQuantity(item.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#888', display: 'flex', alignItems: 'center' }}>
                                                <Minus size={18} />
                                            </button>
                                            <span style={{ fontWeight: '800', color: '#333', fontSize: '1.1rem', width: '20px', textAlign: 'center' }}>
                                                {item.quantity}
                                            </span>
                                            <button onClick={() => addToCart(item)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#d81b60', display: 'flex', alignItems: 'center' }}>
                                                <Plus size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={{
                                            background: 'rgba(255, 77, 77, 0.1)', border: 'none', cursor: 'pointer', color: '#ff4d4d',
                                            padding: '12px', borderRadius: '50%', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 77, 77, 0.2)'}
                                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 77, 77, 0.1)'}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', color: '#555' }}>Total:</h3>
                            <h3 style={{ fontSize: '2.5rem', color: '#d81b60', fontWeight: '900' }}>₹{total}</h3>
                        </div>

                        {/* Updated button to check login status */}
                        <button
                            onClick={handleCheckoutClick}
                            className="btn-cute"
                            style={{ width: '100%', padding: '18px', fontSize: '1.2rem', marginTop: '30px', borderRadius: '15px', letterSpacing: '1px' }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;