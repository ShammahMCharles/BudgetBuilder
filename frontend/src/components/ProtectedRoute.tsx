import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
    const { token } = useAuth();

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};


export default ProtectedRoute;

// This component protects routes that require authentication.
// If the user is not authenticated (no token), they are redirected to the login page.
// If the user is authenticated, they can access the protected routes.