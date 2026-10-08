import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
//Note to self: This hook should only be used within components that are wrapped by the AuthProvider.
// Custom hook to access authentication context
// This hook provides a convenient way to access the authentication context
// throughout the application, ensuring that components have access to
// user information and authentication state.