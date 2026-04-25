import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Package, Clock, XCircle, CheckCircle, Truck, MapPin } from 'lucide-react';

const Orders = () => {
    const { currentUser } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const statuses = ['Placed', 'Shipped', 'Out for Delivery', 'Delivered'];

    useEffect(() => {
        const fetchOrders = async () => {
            if (!currentUser) return;
            try {
                const q = query(collection(db, 'orders'), where('userId', '==', currentUser.uid));
                const querySnapshot = await getDocs(q);
                let fetchedOrders = [];
                querySnapshot.forEach((doc) => {
                    fetchedOrders.push({ id: doc.id, ...doc.data() });
                });

                // Sort by newest first
                fetchedOrders.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [currentUser]);

    const handleCancelOrder = async (orderId) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            try {
                const orderRef = doc(db, 'orders', orderId);
                await updateDoc(orderRef, { status: 'Cancelled' });
                // Update UI instantly
                setOrders(orders.map(order => order.id === orderId ? { ...order, status: 'Cancelled' } : order));
            } catch (error) {
                alert("Could not cancel order. Please try again.");
            }
        }
    };

    if (loading) return <div style={{ paddingTop: '150px', textAlign: 'center' }}><h3>Loading your orders... 🧶</h3></div>;

    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%', paddingTop: '120px', paddingBottom: '80px' }}>
            <div style={{ width: '90%', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ color: '#d81b60', marginBottom: '30px', textAlign: 'center', fontSize: '2.2rem' }}>Order History 📦</h2>

                {orders.length === 0 ? (
                    <div className="glass" style={{ padding: '60px', textAlign: 'center', background: '#ebebeb', borderRadius: '30px' }}>
                        <h3 style={{ color: '#888', fontSize: '1.5rem' }}>You haven't placed any orders yet!</h3>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        {orders.map((order) => (
                            <div key={order.id} style={{ background: '#ebebeb', padding: '30px', borderRadius: '25px', border: '1px solid #e0e0e0', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px dashed #ccc', paddingBottom: '20px', marginBottom: '20px' }}>
                                    <div>
                                        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '5px' }}>Order ID: {order.id}</p>
                                        <h3 style={{ color: '#333', fontSize: '1.3rem' }}>₹{order.totalAmount} • {order.paymentMethod}</h3>
                                    </div>

                                    <span style={{
                                        padding: '8px 15px', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.9rem',
                                        background: order.status === 'Cancelled' ? '#ffe5e5' : (order.status === 'Delivered' ? '#e5ffe5' : '#ffe5ec'),
                                        color: order.status === 'Cancelled' ? '#ff4d4d' : (order.status === 'Delivered' ? '#00b300' : '#d81b60')
                                    }}>
                                        {order.status}
                                    </span>
                                </div>

                                {/* Items List */}
                                <div style={{ marginBottom: '25px' }}>
                                    {order.items.map((item, idx) => (
                                        <p key={idx} style={{ color: '#555', fontSize: '1.1rem', marginBottom: '5px' }}>
                                            <span style={{ fontWeight: 'bold', color: '#d81b60' }}>{item.quantity}x</span> {item.name}
                                        </p>
                                    ))}
                                </div>

                                {/* Tracking Timeline UI */}
                                {order.status !== 'Cancelled' && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', margin: '30px 0' }}>
                                        {/* Background line */}
                                        <div style={{ position: 'absolute', top: '50%', left: '0', width: '100%', height: '4px', background: '#ddd', transform: 'translateY(-50%)', zIndex: 0 }}></div>

                                        {statuses.map((status, index) => {
                                            const isCompleted = statuses.indexOf(order.status) >= index;
                                            return (
                                                <div key={status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '60px' }}>
                                                    <div style={{
                                                        width: '30px', height: '30px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                        background: isCompleted ? '#d81b60' : '#ddd', color: 'white', transition: 'all 0.3s'
                                                    }}>
                                                        {index === 0 ? <Clock size={16}/> : index === 1 ? <Package size={16}/> : index === 2 ? <Truck size={16}/> : <CheckCircle size={16}/>}
                                                    </div>
                                                    <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: isCompleted ? '#333' : '#aaa', marginTop: '8px', textAlign: 'center' }}>
                                                        {status}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Cancel Button (Only visible if status is strictly 'Placed') */}
                                {order.status === 'Placed' && (
                                    <button
                                        onClick={() => handleCancelOrder(order.id)}
                                        style={{ width: '100%', padding: '12px', borderRadius: '12px', background: '#ff4d4d', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '10px' }}
                                    >
                                        <XCircle size={18} /> Cancel Order
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;