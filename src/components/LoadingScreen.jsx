import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            backgroundColor: '#f5f5f5' // Matches your new sleek theme perfectly
        }}>
            {/* Fade-in Text */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center', marginBottom: '30px' }}
            >
                <h2 style={{ color: '#d81b60', fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '8px' }}>
                    CrochetWithBani ✨
                </h2>
                <p style={{ color: '#888', fontSize: '1rem', fontWeight: '500' }}>
                    Stitching your experience...
                </p>
            </motion.div>

            {/* Pill-shaped Progress Track */}
            <div style={{
                width: '250px',
                height: '6px',
                backgroundColor: '#e0e0e0',
                borderRadius: '50px',
                overflow: 'hidden',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
            }}>
                {/* Animated Pink Progress Fill */}
                <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.8, ease: "easeInOut" }} // Timed to finish just before your 2s App loading timer!
                    style={{
                        height: '100%',
                        backgroundColor: '#d81b60',
                        borderRadius: '50px',
                        boxShadow: '0 0 10px rgba(216, 27, 96, 0.4)' // Adds a tiny premium glow to the bar
                    }}
                />
            </div>
        </div>
    );
};

export default LoadingScreen;