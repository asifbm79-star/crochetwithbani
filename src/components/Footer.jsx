import React from 'react';

const InstaIcon = ({ size, color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
);

const TwitterIcon = ({ size, color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
);

const FacebookIcon = ({ size, color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
);

const Footer = () => {
    return (
        <footer className="glass" style={{ margin: '20px 5%', padding: '40px', textAlign: 'center', borderRadius: '30px 30px 0 0', borderBottom: 'none' }}>
            <h2 style={{ color: '#d81b60', marginBottom: '10px' }}>CrochetWithBani</h2>
            <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>"Turning simple yarn into magical moments." ✨</p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                <a href="https://instagram.com/crochetwithbani" target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <InstaIcon size={28} color="#d81b60" />
                </a>
                <a href="https://twitter.com/crochetwithbani" target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <TwitterIcon size={28} color="#d81b60" />
                </a>
                <a href="https://facebook.com/crochetwithbani" target="_blank" rel="noopener noreferrer" style={{ transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <FacebookIcon size={28} color="#d81b60" />
                </a>
            </div>
            <p style={{ marginTop: '30px', fontSize: '0.9rem', opacity: 0.7 }}>© 2026 CrochetWithBani. All rights reserved.</p>
        </footer>
    );
};

export default Footer;