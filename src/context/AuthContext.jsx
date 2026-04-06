// Temporary AuthContext to view the UI without Firebase crashing
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Hardcoded to fake a logged-out state
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <AuthContext.Provider value={{ currentUser, signup: () => {}, login: () => {}, logout: () => {} }}>
            {children}
        </AuthContext.Provider>
    );
};