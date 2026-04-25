import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../services/firebase';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Settings, Lock, Package, LifeBuoy, Mail } from 'lucide-react';

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

    const { login, signup, currentUser, logout, loginWithGoogle, resetPassword } = useAuth();
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
        } catch {
            setError("Failed to authenticate. Check your details.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate('/');
        } catch {
            setError("Failed to log in with Google.");
        }
    };

    const handlePasswordReset = async () => {
        try {
            await resetPassword(currentUser.email);
            alert("✨ A password reset link has been sent to your email!");
        } catch {
            alert("Oops! Couldn't send the reset email. Please try again later.");
        }
    };

    const checkVerificationStatus = async () => {
        if (auth.currentUser) {
            await auth.currentUser.reload();
            if (auth.currentUser.emailVerified) {
                window.location.href = "/"; // Instantly redirects to storefront
            } else {
                alert("We haven't detected verification yet. Make sure you clicked the link in your email!");
            }
        }
    };

    const handleResendVerification = async () => {
        try {
            if (auth.currentUser) {
                await sendEmailVerification(auth.currentUser);
                alert("✨ A new verification email has been sent! Don't forget to check your spam folder.");
            }
        } catch {
            alert("Please wait a moment before requesting another email.");
        }
    };

    // --- LOGGED IN USER LOGIC ---
    if (currentUser) {

        // 1. UNVERIFIED EMAIL VIEW
        if (!currentUser.emailVerified) {
            return (
                <div style={{ paddingTop: '150px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', minHeight: '80vh', backgroundColor: '#f5f5f5' }}>
                    <div style={{ width: '90%', maxWidth: '500px' }}>
                        <div className="glass" style={{ padding: '40px 30px', textAlign: 'center', background: '#ebebeb', borderRadius: '30px', border: '1px solid #e0e0e0', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                            <div style={{ background: '#ffe5ec', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px', color: '#d81b60' }}>
                                <Mail size={40} />
                            </div>
                            <h2 style={{ color: '#d81b60', fontSize: '2rem', marginBottom: '15px' }}>Verify Your Email 💌</h2>
                            <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '10px' }}>
                                We've sent a magic link to <br/><strong>{currentUser.email}</strong>
                            </p>

                            {/* Clean Spam Warning Box */}
                            <div style={{ background: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', color: '#d81b60', padding: '15px', borderRadius: '15px', margin: '20px 0', fontWeight: 'bold' }}>
                                🚨 Don't forget to check your spam list too! 🕵️‍♀️
                            </div>

                            <button className="btn-cute" onClick={checkVerificationStatus} style={{ width: '100%', padding: '15px', fontSize: '1.1rem', marginBottom: '15px' }}>
                                I've Verified It!
                            </button>

                            <button
                                onClick={handleResendVerification}
                                style={{ width: '100%', padding: '15px', fontSize: '1rem', marginBottom: '20px', background: 'transparent', color: '#d81b60', border: '2px solid rgba(216, 27, 96, 0.3)', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s' }}
                                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(216, 27, 96, 0.05)'}
                                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                Resend Email
                            </button>

                            <button onClick={() => logout()} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>
                                Sign out & try another account
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        // 2. VERIFIED USER DASHBOARD VIEW
        return (
            <div style={{ paddingTop: '120px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', minHeight: '80vh', backgroundColor: '#f5f5f5' }}>
                <div style={{ width: '90%', maxWidth: '600px' }}>
                    <div className="glass" style={{ padding: '40px', textAlign: 'center', background: '#ebebeb', borderRadius: '30px', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ color: '#d81b60', fontSize: '2rem', marginBottom: '10px' }}>Welcome back! 🌸</h2>
                        <p style={{ color: '#555', marginBottom: '25px', fontSize: '1.1rem' }}>Logged in as: <strong>{currentUser.email}</strong></p>
                        <button className="btn-cute" onClick={() => logout()} style={{ padding: '10px 30px' }}>Log Out</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>

                        {/* Account Settings */}
                        <div className="glass" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', background: 'white', borderRadius: '20px', transition: 'transform 0.2s, box-shadow 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(216, 27, 96, 0.1)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ background: 'rgba(216, 27, 96, 0.1)', padding: '12px', borderRadius: '50%', color: '#d81b60' }}><Settings size={24} /></div>
                            <h3 style={{ fontSize: '1.2rem', color: '#333' }}>Account Settings</h3>
                        </div>

                        {/* Change Password */}
                        <div onClick={handlePasswordReset} className="glass" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', background: 'white', borderRadius: '20px', transition: 'transform 0.2s, box-shadow 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(216, 27, 96, 0.1)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ background: 'rgba(216, 27, 96, 0.1)', padding: '12px', borderRadius: '50%', color: '#d81b60' }}><Lock size={24} /></div>
                            <h3 style={{ fontSize: '1.2rem', color: '#333' }}>Change Password</h3>
                        </div>

                        {/* Order History (Navigates to /orders) */}
                        <div onClick={() => navigate('/orders')} className="glass" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', background: 'white', borderRadius: '20px', transition: 'transform 0.2s, box-shadow 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(216, 27, 96, 0.1)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ background: 'rgba(216, 27, 96, 0.1)', padding: '12px', borderRadius: '50%', color: '#d81b60' }}><Package size={24} /></div>
                            <h3 style={{ fontSize: '1.2rem', color: '#333' }}>Order History</h3>
                        </div>

                        {/* Support (Opens Instagram DM) */}
                        <div onClick={() => window.open("https://ig.me/m/crochetwithbani?text=Hi! I need some help regarding my account or an order.", "_blank")} className="glass" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', background: 'white', borderRadius: '20px', transition: 'transform 0.2s, box-shadow 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(216, 27, 96, 0.1)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ background: 'rgba(216, 27, 96, 0.1)', padding: '12px', borderRadius: '50%', color: '#d81b60' }}><LifeBuoy size={24} /></div>
                            <h3 style={{ fontSize: '1.2rem', color: '#333' }}>Support</h3>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    // --- LOGGED OUT / LOGIN FORM VIEW ---
    return (
        <div style={{ paddingTop: '120px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f5f5f5' }}>
            <div className="glass" style={{ padding: '40px', width: '90%', maxWidth: '400px', background: '#ebebeb', borderRadius: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <h2 style={{ color: '#d81b60', textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>
                    {isLogin ? 'Welcome Back ✨' : 'Join the Club 🧶'}
                </h2>

                {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem', marginBottom: '10px' }}>{error}</p>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '15px', borderRadius: '15px', border: '1px solid #ddd', outline: 'none', fontSize: '1rem' }}
                    />
                    <input
                        type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '15px', borderRadius: '15px', border: '1px solid #ddd', outline: 'none', fontSize: '1rem' }}
                    />
                    <button type="submit" className="btn-cute" style={{ marginTop: '10px', padding: '15px', fontSize: '1.1rem' }}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', margin: '25px 0' }}>
                    <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
                    <p style={{ margin: '0 15px', color: '#888', fontSize: '0.9rem', fontWeight: 'bold' }}>OR</p>
                    <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    style={{
                        width: '100%', padding: '15px', borderRadius: '50px', border: '1px solid #ddd',
                        background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center',
                        cursor: 'pointer', fontWeight: 'bold', color: '#333', transition: 'all 0.3s', fontSize: '1rem'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f9f9f9'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                >
                    <GoogleIcon /> Continue with Google
                </button>

                <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '1rem', color: '#555' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#d81b60', cursor: 'pointer', fontWeight: '800' }}>
                        {isLogin ? 'Sign up' : 'Log in'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;