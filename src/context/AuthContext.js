import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // ✅ LOAD USER FROM localStorage ON APP START
    useEffect(() => {
        const storedUser = localStorage.getItem("user"); // ✅ SAME KEY EVERYWHERE
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);
    // ✅ LOGIN
    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData)); // ✅ SAME KEY
        setUser(userData);
    };
    // ✅ LOGOUT
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };
    const signOut = () => {
        logout();
    };
    const isAdmin = user?.role === "admin";
    const isAuthenticated = !!user;
    return (_jsx(AuthContext.Provider, { value: {
            user,
            loading,
            isAdmin,
            isAuthenticated,
            login,
            logout,
            signOut,
        }, children: children }));
};
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
};
