import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, signup, currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
            }
            navigate('/');
        } catch (err) {
            setError("Failed to authenticate. Check your details.");
        }
    };

    // If already logged in, show profile overview
    if (currentUser) {
        return (
            <div style={{ paddingTop: '150px', textAlign: 'center', minHeight: '80vh' }}>
                <div className="glass" style={{ display: 'inline-block', padding: '50px' }}>
                    <h2>Welcome back! 🌸</h2>
                    <p style={{ margin: '20px 0' }}>Logged in as: {currentUser.email}</p>
                    <button className="btn-cute" onClick={() => logout()}>Log Out</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ color: '#fb6f92', textAlign: 'center', marginBottom: '20px' }}>
                    {isLogin ? 'Welcome Back ✨' : 'Join the Club 🧶'}
                </h2>

                {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem', marginBottom: '10px' }}>{error}</p>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.5)', outline: 'none' }}
                    />
                    <input
                        type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.5)', outline: 'none' }}
                    />
                    <button type="submit" className="btn-cute" style={{ marginTop: '10px' }}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#fb6f92', cursor: 'pointer', fontWeight: 'bold' }}>
            {isLogin ? 'Sign up' : 'Log in'}
          </span>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;