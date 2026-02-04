// context/AuthProvider.tsx
import { ReactNode, useState, useEffect } from "react";
import { AuthContext, User } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function checkAuth() {
    try {
      const res = await fetch(`${import.meta.env.VITE_FRONTEND_URL}/users/private`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("No autorizado");
      const data = await res.json();

      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  async function register(
    username: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch(`${import.meta.env.VITE_FRONTEND_URL}/users/create_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      console.log("res", res);

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.detail || "Error al registrarse",
        };
      }

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Error inesperado al registrarse",
      };
    }
  }

  async function login(email: string, password: string): Promise<void> {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_FRONTEND_URL}/users/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username: email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "No autorizado");
      }

      setUser(data.user);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_FRONTEND_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
