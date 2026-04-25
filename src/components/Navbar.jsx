import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext'; // Import cart context

const Navbar = () => {
    const { cart } = useCart();

    // Calculate total number of items in the cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{
                position: 'fixed',
                top: '15px',
                left: '5%',
                width: '90%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 30px',
                zIndex: 1000,
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(216, 27, 96, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
                borderRadius: '50px'
            }}
        >
            <Link to="/" style={{ textDecoration: 'none', color: '#d81b60', fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
                CrochetWithBani ✨
            </Link>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Link to="/login" style={{ transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform='scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform='scale(1)'}>
                    <User color="#d81b60" size={24} />
                </Link>

                <Link to="/cart" style={{ position: 'relative', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform='scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform='scale(1)'}>
                    <ShoppingBag color="#d81b60" size={24} />

                    {/* The Cute Notification Badge */}
                    {totalItems > 0 && (
                        <motion.span
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            style={{
                                position: 'absolute', top: '-8px', right: '-8px',
                                background: '#d81b60', color: 'white',
                                borderRadius: '50%', width: '20px', height: '20px',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                fontSize: '0.75rem', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(216, 27, 96, 0.4)'
                            }}
                        >
                            {totalItems}
                        </motion.span>
                    )}
                </Link>
            </div>
        </motion.nav>
    );
};

export default Navbar;