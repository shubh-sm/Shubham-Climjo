import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  signup: (userData: { email: string; name: string; username: string; address: string }) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("climjo_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("climjo_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("climjo_user");
    }
  }, [user]);

  const login = (email: string, name: string) => {
    // Simple mock login
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      isAdmin: email.toLowerCase() === "admin@climjo.com", // Simple admin check
    });
  };

  const signup = (userData: { email: string; name: string; username: string; address: string }) => {
    // Simple mock signup
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      name: userData.name,
      username: userData.username,
      address: userData.address,
      isAdmin: userData.email.toLowerCase() === "admin@climjo.com",
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
