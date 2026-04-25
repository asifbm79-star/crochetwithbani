import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
// Notice we removed 'Instagram' from this import!
import { MapPin, CreditCard, Smartphone, Banknote } from 'lucide-react';

// Custom Instagram SVG Icon to replace the missing Lucide one
const InstagramIcon = ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
);

const Payment = () => {
    const { cart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [address, setAddress] = useState({
        name: '', phone: '', street: '', city: '', state: '', pin: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('instagram');

    const handleInputChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        if (paymentMethod !== 'instagram') {
            alert(`"${paymentMethod}" is Coming Soon! Please select Instagram DM for now.`);
            return;
        }

        // Format the order details for Instagram DM
        const orderText = `Hi CrochetWithBani! 🌸 I want to place an order.\n\n🛒 ORDER DETAILS:\n${cart.map(item => `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})`).join('\n')}\nTotal: ₹${total}\n\n📍 SHIPPING ADDRESS:\nName: ${address.name}\nPhone: ${address.phone}\nAddress: ${address.street}, ${address.city}, ${address.state} - ${address.pin}\n\nI am ready to pay!`;

        // Copy to clipboard
        navigator.clipboard.writeText(orderText).then(() => {
            alert("✅ Order details copied to clipboard!\n\nRedirecting to Instagram... Just paste the message in our chat to confirm your order!");
            // Redirect to Instagram DM (ig.me link)
            window.open("https://ig.me/m/crochetwithbani", "_blank");
        }).catch(() => {
            alert("Could not copy text. Please try again.");
        });
    };

    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%', paddingTop: '120px', paddingBottom: '80px' }}>
            <div style={{ width: '90%', maxWidth: '800px', margin: '0 auto' }}>

                <h2 style={{ color: '#d81b60', marginBottom: '30px', textAlign: 'center', fontSize: '2.2rem' }}>
                    Checkout 🛍️
                </h2>

                <form onSubmit={handlePlaceOrder}>

                    {/* --- ADDRESS SECTION --- */}
                    <div style={{ padding: '30px', borderRadius: '30px', background: '#ebebeb', border: '1px solid #e0e0e0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '30px', animation: 'fadeIn 0.5s ease-out' }}>
                        <h3 style={{ color: '#333', fontSize: '1.4rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MapPin color="#d81b60" /> Delivery Address
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <input required type="text" name="name" placeholder="Full Name" onChange={handleInputChange} style={inputStyle} />
                            <input required type="tel" name="phone" placeholder="Phone Number (+91)" onChange={handleInputChange} style={inputStyle} />
                            <input required type="text" name="street" placeholder="Flat, House no., Building, Area" onChange={handleInputChange} style={{ ...inputStyle, gridColumn: '1 / -1' }} />
                            <input required type="text" name="city" placeholder="Town/City" onChange={handleInputChange} style={inputStyle} />
                            <input required type="text" name="state" placeholder="State" onChange={handleInputChange} style={inputStyle} />
                            <input required type="text" name="pin" placeholder="PIN Code" onChange={handleInputChange} style={inputStyle} />
                        </div>
                    </div>

                    {/* --- PAYMENT METHOD SECTION --- */}
                    <div style={{ padding: '30px', borderRadius: '30px', background: '#ebebeb', border: '1px solid #e0e0e0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '30px', animation: 'fadeIn 0.7s ease-out' }}>
                        <h3 style={{ color: '#333', fontSize: '1.4rem', marginBottom: '20px' }}>Payment Method</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                            {/* Instagram DM Option */}
                            <label style={{ ...radioCardStyle, border: paymentMethod === 'instagram' ? '2px solid #d81b60' : '2px solid transparent' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <input type="radio" name="payment" value="instagram" checked={paymentMethod === 'instagram'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#d81b60', width: '18px', height: '18px' }} />
                                    {/* Using our custom SVG icon here */}
                                    <InstagramIcon color={paymentMethod === 'instagram' ? '#d81b60' : '#888'} />
                                    <span style={{ fontWeight: 'bold', color: '#333', fontSize: '1.1rem' }}>Order via Instagram DM</span>
                                </div>
                                <span style={{ color: '#d81b60', fontSize: '0.9rem', fontWeight: 'bold', background: '#ffe5ec', padding: '4px 10px', borderRadius: '10px' }}>Recommended</span>
                            </label>

                            {/* UPI Option */}
                            <label style={{ ...radioCardStyle, border: paymentMethod === 'upi' ? '2px solid #d81b60' : '2px solid transparent' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#d81b60', width: '18px', height: '18px' }} />
                                    <Smartphone color={paymentMethod === 'upi' ? '#d81b60' : '#888'} />
                                    <span style={{ fontWeight: 'bold', color: '#333', fontSize: '1.1rem' }}>UPI / Payment Apps</span>
                                </div>
                            </label>

                            {/* Card Option */}
                            <label style={{ ...radioCardStyle, border: paymentMethod === 'card' ? '2px solid #d81b60' : '2px solid transparent' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#d81b60', width: '18px', height: '18px' }} />
                                    <CreditCard color={paymentMethod === 'card' ? '#d81b60' : '#888'} />
                                    <span style={{ fontWeight: 'bold', color: '#333', fontSize: '1.1rem' }}>Credit / Debit Card</span>
                                </div>
                            </label>

                            {/* COD Option */}
                            <label style={{ ...radioCardStyle, border: paymentMethod === 'cod' ? '2px solid #d81b60' : '2px solid transparent' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: '#d81b60', width: '18px', height: '18px' }} />
                                    <Banknote color={paymentMethod === 'cod' ? '#d81b60' : '#888'} />
                                    <span style={{ fontWeight: 'bold', color: '#333', fontSize: '1.1rem' }}>Cash on Delivery</span>
                                </div>
                            </label>

                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn-cute" style={{ width: '100%', padding: '20px', fontSize: '1.3rem', borderRadius: '15px', letterSpacing: '1px' }}>
                        Place Order • ₹{total}
                    </button>

                </form>
            </div>
        </div>
    );
};

// Reusable styles for the form
const inputStyle = {
    padding: '16px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', fontSize: '1rem', background: 'white'
};

const radioCardStyle = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px',
    background: 'white', borderRadius: '15px', cursor: 'pointer', transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
};

export default Payment;