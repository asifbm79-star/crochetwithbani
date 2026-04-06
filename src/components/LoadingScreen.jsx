import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 9999, background: '#fff0f3' }}>
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                style={{ textAlign: 'center' }}
            >
                <h1 style={{ color: '#ff8fab', fontSize: '3rem' }}>🧶</h1>
                <h2 style={{ color: '#ff8fab', marginTop: '1rem' }}>Stitching your experience...</h2>
            </motion.div>
        </div>
    );
};

export default LoadingScreen;