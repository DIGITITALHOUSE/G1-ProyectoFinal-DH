import { Navigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <Navigate to="/auth/login" />;
    }

    // if (!allowedRoles.includes(user.role)) {
    //     return <Navigate to="/" />;
    // }

    return children;
};

export default ProtectedRoute;
