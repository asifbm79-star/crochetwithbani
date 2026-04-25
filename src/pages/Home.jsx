import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ChevronDown, ShoppingBag } from 'lucide-react';

const products = [
    {
        id: 1,
        name: "Mikasa Scarf",
        price: 699,
        instaLink: "https://www.instagram.com/p/DWRu3bwk9Rn/embed"
    },
    {
        id: 2,
        name: "Handemade Phone Cover",
        price: 199,
        instaLink: "https://www.instagram.com/p/DXABeIHiWwK/embed"
    },
    {
        id: 3,
        name: "Luffy hat keychain",
        price: 99,
        instaLink: "https://www.instagram.com/p/DXT5pd0ibGZ/embed"
    },
    {
        id: 4,
        name: "Sunflower Keychain",
        price: 139,
        instaLink: "https://www.instagram.com/p/DXT51UwCYWo/embed"
    }
];

const Home = () => {
    const { addToCart } = useCart();
    const shopRef = useRef(null);

    const scrollToShop = () => {
        shopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div style={{ paddingBottom: '80px', width: '100%', overflowX: 'hidden', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>

            {/* --- IMMERSIVE HERO SECTION (Sleek Grey Gradient) --- */}
            <div style={{ position: 'relative', width: '100%', height: '75vh', minHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #e5e5e5 0%, #f2f2f2 100%)', borderRadius: '0 0 50px 50px', borderBottom: '1px solid #ddd', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)' }}>

                {/* Hero Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{ textAlign: 'center', padding: '0 20px', maxWidth: '800px', zIndex: 1, marginTop: '50px' }}
                >
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#d81b60', fontWeight: '800', letterSpacing: '-1px', marginBottom: '15px' }}>
                        Handmade with Love <span style={{ color: '#ff8fab' }}>& Yarn</span>
                    </h1>
                    <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: '#555', opacity: 0.9, marginBottom: '40px', fontWeight: '600', lineHeight: '1.6' }}>
                        Discover the cutest premium crochet apparel, plushies, and accessories directly from our studio to your wardrobe.
                    </p>

                    <button
                        onClick={scrollToShop}
                        style={{ background: '#d81b60', color: 'white', border: 'none', padding: '16px 36px', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease', boxShadow: '0 8px 25px rgba(216, 27, 96, 0.3)' }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <ShoppingBag size={20} /> Shop the Collection
                    </button>
                </motion.div>

                {/* Bouncing Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    style={{ position: 'absolute', bottom: '30px', color: '#d81b60', cursor: 'pointer', opacity: 0.8 }}
                    onClick={scrollToShop}
                >
                    <ChevronDown size={40} />
                </motion.div>
            </div>

            {/* --- CATALOGUE SECTION --- */}
            <div ref={shopRef} style={{ width: '90%', maxWidth: '1200px', margin: '0 auto', paddingTop: '80px' }}>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ color: '#333', fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px' }}>Latest Drops 🌸</h2>
                    <div style={{ height: '4px', width: '60px', background: '#d81b60', margin: '0 auto', borderRadius: '2px' }}></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', justifyItems: 'center' }}>
                    {products.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            style={{
                                padding: '25px', textAlign: 'center', width: '100%', maxWidth: '420px',
                                display: 'flex', flexDirection: 'column',
                                background: '#ebebeb', /* Grey theme card background */
                                borderRadius: '20px',
                                border: '1px solid #e0e0e0',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                            }}
                        >
                            {/* Instagram Embed iFrame */}
                            <div style={{ width: '100%', borderRadius: '15px', overflow: 'hidden', marginBottom: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', background: '#f5f5f5' }}>
                                <iframe
                                    src={item.instaLink}
                                    width="100%"
                                    height="450"
                                    frameBorder="0"
                                    scrolling="no"
                                    allowtransparency="true"
                                    style={{ display: 'block' }}
                                    title={item.name}
                                ></iframe>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 5px', flexGrow: 1 }}>
                                <h3 style={{ fontSize: '1.3rem', color: '#333', fontWeight: '700', margin: 0 }}>{item.name}</h3>
                                <p style={{ fontWeight: '800', color: '#d81b60', fontSize: '1.4rem', margin: 0 }}>₹{item.price}</p>
                            </div>

                            <button
                                className="btn-cute"
                                style={{ width: '100%', padding: '14px', fontSize: '1.1rem', marginTop: 'auto' }}
                                onClick={() => addToCart(item)}
                            >
                                Add to Cart
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Home;