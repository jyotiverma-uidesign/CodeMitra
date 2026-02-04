import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";  // ✅ Added for API calls

export interface User {
  id: any;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role?: "admin" | "user";
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;  // ✅ Updated to async API call
  logout: () => void;
  signOut: () => void;
  updateUser: (userData: Partial<User>) => void;  // ✅ Add updateUser function
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ LOAD USER FROM BACKEND ON APP START (using JWT token)
  useEffect(() => {
    const token = localStorage.getItem("token");  // ✅ New: Store token separately
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch user profile from backend
      axios.get('http://localhost:5000/api/users/profile')
        .then(res => {
          setUser(res.data);  // ✅ Set user from API
          localStorage.setItem("user", JSON.stringify(res.data));  // ✅ Keep your localStorage for UI
        })
        .catch(() => {
          // Token invalid, logout
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ LOGIN (now calls backend API for JWT)
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, user: loginUser } = res.data;

      // Store token and set axios header
      localStorage.setItem("token", token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // If server returned user in login response, use it (avoids an extra profile fetch and possible 404)
      if (loginUser && loginUser.id) {
        localStorage.setItem("user", JSON.stringify(loginUser));
        setUser(loginUser);
        return;
      }

      // Fallback: fetch complete profile (includes role, avatar, etc.)
      try {
        const profileRes = await axios.get('http://localhost:5000/api/users/profile');
        const profile = profileRes.data;
        localStorage.setItem("user", JSON.stringify(profile));
        setUser(profile);
      } catch (profileErr: any) {
        // If profile fetch fails, log and still proceed with loginUser if available
        console.warn('Profile fetch failed after login:', profileErr?.response?.data || profileErr.message);
        if (loginUser) {
          localStorage.setItem("user", JSON.stringify(loginUser));
          setUser(loginUser);
        } else {
          throw new Error('User not found');
        }
      }
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  // ✅ LOGOUT (unchanged, but now clears token too)
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");  // ✅ New: Clear JWT
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];  // ✅ Clear axios header
  };

  const signOut = () => {
    logout();
  };

  // ✅ UPDATE USER (for profile updates)
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const isAdmin = user?.role === "admin";
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        isAuthenticated,
        login,
        logout,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};