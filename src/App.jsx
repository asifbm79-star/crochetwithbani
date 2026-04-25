import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Payment from './pages/Payment';
import Orders from './pages/Orders'; // <-- Import the new file
import LoadingScreen from './components/LoadingScreen';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <LoadingScreen />;

    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/checkout" element={<Payment />} />
                        <Route path="/orders" element={<Orders />} /> {/* <-- Add the route here */}
                    </Routes>
                    <Footer />
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;