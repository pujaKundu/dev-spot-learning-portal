import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
    const {isLoggedIn,user} = useAuth();
    if (isLoggedIn && user.role == 'student') {
        return isLoggedIn ? children : <Navigate to="/" />;
    }
    else if (isLoggedIn && user.role == 'admin') {
        return isLoggedIn ? children : <Navigate to="/admin" />;
    }
    
}
