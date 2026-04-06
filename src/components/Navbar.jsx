import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="glass"
            style={{
                position: 'fixed', top: '20px', left: '5%', width: '90%',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '15px 30px', zIndex: 1000
            }}
        >
            <Link to="/" style={{ textDecoration: 'none', color: '#fb6f92', fontSize: '1.5rem', fontWeight: '800' }}>
                CrochetByBani ✨
            </Link>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Link to="/login"><User color="#fb6f92" size={24} /></Link>
                <Link to="/cart"><ShoppingBag color="#fb6f92" size={24} /></Link>
            </div>
        </motion.nav>
    );
};

export default Navbar;