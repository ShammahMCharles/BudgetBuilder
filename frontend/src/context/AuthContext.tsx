
import { createContext } from "react";

export type User = {
  _id?: string;
  id?: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);