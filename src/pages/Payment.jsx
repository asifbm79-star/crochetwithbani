import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { MapPin, CreditCard, Smartphone, Banknote } from 'lucide-react';

const InstagramIcon = ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
);

const Payment = () => {
    const { cart, clearCart } = useCart();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [address, setAddress] = useState({ name: '', phone: '', street: '', city: '', state: '', pin: '' });
    const [errors, setErrors] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Set COD as default for now
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInputChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
    };

    const validateForm = () => {
        let newErrors = {};
        if (address.name.trim().length < 3) newErrors.name = "Please enter your full name.";
        if (!/^[6-9]\d{9}$/.test(address.phone)) newErrors.phone = "Enter a valid 10-digit Indian phone number.";
        if (address.street.trim().length < 10) newErrors.street = "Please enter your complete address.";
        if (address.city.trim().length < 2) newErrors.city = "Enter a valid city.";
        if (address.state.trim().length < 2) newErrors.state = "Enter a valid state.";
        if (!/^[1-9][0-9]{5}$/.test(address.pin)) newErrors.pin = "Enter a valid 6-digit PIN code.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return alert("Your cart is empty!");
        if (!validateForm()) return;

        // --- CASH ON DELIVERY LOGIC ---
        if (paymentMethod === 'cod') {
            setIsProcessing(true);
            try {
                // 1. Save to Firestore Database
                const orderData = {
                    userId: currentUser.uid,
                    userEmail: currentUser.email,
                    address: address,
                    items: cart,
                    totalAmount: total,
                    paymentMethod: 'COD',
                    status: 'Placed', // Initial status
                    createdAt: serverTimestamp()
                };
                await addDoc(collection(db, 'orders'), orderData);

                // 2. Send Email to Admin via FormSubmit API
                const emailContent = `
                    New COD Order from: ${currentUser.email} (UID: ${currentUser.uid})
                    Name: ${address.name}
                    Phone: ${address.phone}
                    Address: ${address.street}, ${address.city}, ${address.state} - ${address.pin}
                    Total: ₹${total}
                    Items: ${cart.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                `;

                await fetch('https://formsubmit.co/ajax/asifmiddya800@gmail.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        _subject: `New COD Order - ₹${total}`,
                        message: emailContent
                    })
                });

                // 3. Cleanup and Redirect
                clearCart();
                setIsProcessing(false);
                alert("🎉 Order placed successfully!");
                navigate('/orders'); // Send them to the new Order History page

            } catch {
                setIsProcessing(false);
                alert("Something went wrong. Please try again.");
            }
            return;
        }

        // --- INSTAGRAM DM LOGIC ---
        if (paymentMethod === 'instagram') {
            const orderText = `Hi CrochetWithBani! 🌸 I want to place an order.\n\n🛒 ORDER DETAILS:\n${cart.map(item => `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})`).join('\n')}\nTotal: ₹${total}\n\n📍 SHIPPING ADDRESS:\nName: ${address.name}\nPhone: ${address.phone}\nAddress: ${address.street}, ${address.city}, ${address.state} - ${address.pin}\n\nI am ready to pay!`;
            navigator.clipboard.writeText(orderText).then(() => {
                alert("✅ Order details copied!\nRedirecting to Instagram to complete payment...");
                window.open("https://ig.me/m/crochetwithbani", "_blank");
            });
            return;
        }

        alert(`"${paymentMethod}" is Coming Soon!`);
    };

    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%', paddingTop: '120px', paddingBottom: '80px' }}>
            <div style={{ width: '90%', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ color: '#d81b60', marginBottom: '30px', textAlign: 'center', fontSize: '2.2rem' }}>Checkout 🛍️</h2>

                <form onSubmit={handlePlaceOrder}>
                    <div style={{ padding: '30px', borderRadius: '30px', background: '#ebebeb', border: '1px solid #e0e0e0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '30px' }}>
                        <h3 style={{ color: '#333', fontSize: '1.4rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin color="#d81b60" /> Delivery Address</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                            <div style={inputWrapper}><input required type="text" name="name" placeholder="Full Name" onChange={handleInputChange} style={{ ...inputStyle, borderColor: errors.name ? '#ff4d4d' : '#ddd' }} />{errors.name && <span style={errorTextStyle}>{errors.name}</span>}</div>
                            <div style={inputWrapper}><input required type="tel" name="phone" placeholder="Phone Number (10 digits)" onChange={handleInputChange} style={{ ...inputStyle, borderColor: errors.phone ? '#ff4d4d' : '#ddd' }} />{errors.phone && <span style={errorTextStyle}>{errors.phone}</span>}</div>
                            <div style={{ ...inputWrapper, gridColumn: '1 / -1' }}><input required type="text" name="street" placeholder="Flat, House no., Building, Area" onChange={handleInputChange} style={{ ...inputStyle, borderColor: errors.street ? '#ff4d4d' : '#ddd' }} />{errors.street && <span style={errorTextStyle}>{errors.street}</span>}</div>
                            <div style={inputWrapper}><input required type="text" name="city" placeholder="Town/City" onChange={handleInputChange} style={{ ...inputStyle, borderColor: errors.city ? '#ff4d4d' : '#ddd' }} />{errors.city && <span style={errorTextStyle}>{errors.city}</span>}</div>
                            <div style={inputWrapper}><input required type="text" name="state" placeholder="State" onChange={handleInputChange} style={{ ...inputStyle, borderColor: errors.state ? '#ff4d4d' : '#ddd' }} />{errors.state && <span style={errorTextStyle}>{errors.state}</span>}</div>
                            <div style={inputWrapper}><input required type="text" name="pin" placeholder="6-Digit PIN Code" onChange={handleInputChange} style={{ ...inputStyle, borderColor: errors.pin ? '#ff4d4d' : '#ddd' }} />{errors.pin && <span style={errorTextStyle}>{errors.pin}</span>}</div>
                        </div>
                    </div>

                    <div style={{ padding: '30px', borderRadius: '30px', background: '#ebebeb', border: '1px solid #e0e0e0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '30px' }}>
                        <h3 style={{ color: '#333', fontSize: '1.4rem', marginBottom: '20px' }}>Payment Method</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                            <label style={{ ...radioCardStyle, border: paymentMethod === 'cod' ? '2px solid #d81b60' : '2px solid transparent' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#d81b60', width: '18px', height: '18px' }} />
                                    <Banknote color={paymentMethod === 'cod' ? '#d81b60' : '#888'} />
                                    <span style={{ fontWeight: 'bold', color: '#333', fontSize: '1.1rem' }}>Cash on Delivery</span>
                                </div>
                            </label>

                            <label style={{ ...radioCardStyle, border: paymentMethod === 'instagram' ? '2px solid #d81b60' : '2px solid transparent' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <input type="radio" name="payment" value="instagram" checked={paymentMethod === 'instagram'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#d81b60', width: '18px', height: '18px' }} />
                                    <InstagramIcon color={paymentMethod === 'instagram' ? '#d81b60' : '#888'} />
                                    <span style={{ fontWeight: 'bold', color: '#333', fontSize: '1.1rem' }}>Prepaid (Instagram DM)</span>
                                </div>
                            </label>

                            {/* Disabled Options for styling */}
                            <label style={{ ...radioCardStyle, opacity: 0.5, cursor: 'not-allowed' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><Smartphone color="#888" /><span style={{ fontWeight: 'bold', color: '#888', fontSize: '1.1rem' }}>UPI / Payment Apps (Coming Soon)</span></div>
                            </label>
                            <label style={{ ...radioCardStyle, opacity: 0.5, cursor: 'not-allowed' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><CreditCard color="#888" /><span style={{ fontWeight: 'bold', color: '#888', fontSize: '1.1rem' }}>Credit / Debit Card (Coming Soon)</span></div>
                            </label>

                        </div>
                    </div>

                    <button disabled={isProcessing} type="submit" className="btn-cute" style={{ width: '100%', padding: '20px', fontSize: '1.3rem', borderRadius: '15px', letterSpacing: '1px', opacity: isProcessing ? 0.7 : 1 }}>
                        {isProcessing ? "Processing..." : `Place Order • ₹${total}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

const inputWrapper = { display: 'flex', flexDirection: 'column', gap: '5px' };
const inputStyle = { padding: '16px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', fontSize: '1rem', background: 'white' };
const errorTextStyle = { color: '#ff4d4d', fontSize: '0.85rem', fontWeight: 'bold', marginLeft: '5px' };
const radioCardStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', background: 'white', borderRadius: '15px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' };

export default Payment;