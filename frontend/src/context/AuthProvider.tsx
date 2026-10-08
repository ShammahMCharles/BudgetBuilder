import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext.tsx";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (user: string, token: string) => {
    localStorage.setItem("token", token);

    setUser(user);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};