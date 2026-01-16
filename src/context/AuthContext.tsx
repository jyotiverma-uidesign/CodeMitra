import { createContext, useContext, useEffect, useState, ReactNode } from "react";

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
  login: (userData: User) => void;
  logout: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
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
  const login = (userData: User) => {
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
