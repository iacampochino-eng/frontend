// context/AuthContext.ts
import { createContext } from "react";

export interface User {
  id: string;
  email: string;
  username: string;
  created_at: Date;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => {},
  logout: () => {},
  register: async () => ({ success: false }),
});
