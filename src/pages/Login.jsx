import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Cute Google SVG Icon
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px" style={{ marginRight: '10px' }}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
);

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Bring in the new loginWithGoogle function
    const { login, signup, currentUser, logout, loginWithGoogle } = useAuth();
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

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            setError("Failed to log in with Google.");
        }
    };

    // If already logged in
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
                <h2 style={{ color: '#d81b60', textAlign: 'center', marginBottom: '20px' }}>
                    {isLogin ? 'Welcome Back ✨' : 'Join the Club 🧶'}
                </h2>

                {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem', marginBottom: '10px' }}>{error}</p>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(216, 27, 96, 0.2)', outline: 'none' }}
                    />
                    <input
                        type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(216, 27, 96, 0.2)', outline: 'none' }}
                    />
                    <button type="submit" className="btn-cute" style={{ marginTop: '10px' }}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(216, 27, 96, 0.2)' }}></div>
                    <p style={{ margin: '0 10px', color: '#888', fontSize: '0.9rem' }}>or</p>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(216, 27, 96, 0.2)' }}></div>
                </div>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    style={{
                        width: '100%', padding: '12px', borderRadius: '50px', border: '1px solid #ddd',
                        background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center',
                        cursor: 'pointer', fontWeight: 'bold', color: '#333', transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f5f5f5'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                >
                    <GoogleIcon /> Continue with Google
                </button>

                <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '0.9rem' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#d81b60', cursor: 'pointer', fontWeight: 'bold' }}>
            {isLogin ? 'Sign up' : 'Log in'}
          </span>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;