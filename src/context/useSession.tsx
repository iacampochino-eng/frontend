// src/context/useSession.ts
import { useContext } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";

export function useSession(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return context;
}
