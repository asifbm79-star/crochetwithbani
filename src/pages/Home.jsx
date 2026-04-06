import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const products = [
    { id: 1, name: "Daisy Bucket Hat", price: 25, img: "https://via.placeholder.com/300x300/ffe5ec/fb6f92?text=Hat" },
    { id: 2, name: "Chunky Cloud Cardigan", price: 65, img: "https://via.placeholder.com/300x300/ffe5ec/fb6f92?text=Cardigan" },
    { id: 3, name: "Strawberry Tote Bag", price: 35, img: "https://via.placeholder.com/300x300/ffe5ec/fb6f92?text=Tote" },
    { id: 4, name: "Amigurumi Bunny", price: 15, img: "https://via.placeholder.com/300x300/ffe5ec/fb6f92?text=Bunny" },
];

const Home = () => {
    const { addToCart } = useCart();

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '80px', width: '90%', margin: '0 auto' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                className="glass" style={{ padding: '60px', textAlign: 'center', marginBottom: '50px' }}
            >
                <h1 style={{ fontSize: '3rem', color: '#fb6f92', marginBottom: '15px' }}>Handmade with Love & Yarn</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Discover the cutest crochet apparel, accessories, and plushies.</p>
            </motion.div>

            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#fb6f92' }}>Our Bestsellers 🌸</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                {products.map((item, index) => (
                    <motion.div
                        key={item.id} className="glass"
                        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05 }}
                        style={{ padding: '20px', textAlign: 'center' }}
                    >
                        <img src={item.img} alt={item.name} style={{ width: '100%', borderRadius: '15px', marginBottom: '15px' }} />
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{item.name}</h3>
                        <p style={{ fontWeight: 'bold', color: '#fb6f92', marginBottom: '15px' }}>${item.price}</p>
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