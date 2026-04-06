import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

// Using the /embed endpoint for Instagram links
const products = [
    { id: 1, name: "Mikasa Muffler", price: 450, instaLink: "https://www.instagram.com/p/DWRu3bwk9Rn/embed" },
    { id: 2, name: "Faceswap Octo", price: 375, instaLink: "https://www.instagram.com/p/DWraCbPCent/embed" },
];

const Home = () => {
    const { addToCart } = useCart();

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '80px', width: '90%', margin: '0 auto', maxWidth: '1200px' }}>

            {/* Video Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                style={{ width: '100%', height: '500px', borderRadius: '20px', overflow: 'hidden', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            >
                <video
                    src="/video/video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </motion.div>

            {/* Intro Text */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="glass" style={{ padding: '40px', textAlign: 'center', marginBottom: '50px' }}
            >
                <h1 style={{ fontSize: '2.5rem', color: '#d81b60', marginBottom: '10px' }}>Handmade with Love & Yarn</h1>
                <p style={{ fontSize: '1.1rem' }}>Discover the cutest crochet apparel and accessories directly from our feed.</p>
            </motion.div>

            {/* Catalogue Section with Instagram Embeds */}
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#d81b60', fontSize: '2rem' }}>Latest Drops 🌸</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', justifyItems: 'center' }}>
                {products.map((item, index) => (
                    <motion.div
                        key={item.id} className="glass"
                        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        style={{ padding: '20px', textAlign: 'center', width: '100%', maxWidth: '400px' }}
                    >
                        {/* Instagram Embed iFrame */}
                        <iframe
                            src={item.instaLink}
                            width="100%"
                            height="450"
                            frameBorder="0"
                            scrolling="no"
                            allowtransparency="true"
                            style={{ borderRadius: '15px', marginBottom: '15px', background: 'white' }}
                            title={item.name}
                        ></iframe>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', padding: '0 10px' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#333' }}>{item.name}</h3>
                            <p style={{ fontWeight: 'bold', color: '#d81b60', fontSize: '1.2rem' }}>₹{item.price}</p>
                        </div>

                        <button className="btn-cute" style={{ width: '100%' }} onClick={() => addToCart(item)}>
                            Add to Cart
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Home;