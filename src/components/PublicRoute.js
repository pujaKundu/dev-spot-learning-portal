import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
    const { isLoggedIn, user } = useAuth();
    if (!isLoggedIn) { return children }
    else if (isLoggedIn && user.role == 'student') {
        return <Navigate to="/portal/1" />;
    }
    else if (isLoggedIn && user.role == 'admin') {
        return <Navigate to="/admin/dashboard" />;
    }
    // return !isLoggedIn ? children : <Navigate to="/portal/1" />;
}
