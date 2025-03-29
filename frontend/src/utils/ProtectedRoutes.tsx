import { Navigate, Outlet } from "react-router"

function ProtectedRoutes() {
    const token = localStorage.getItem('authToken');
    return token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes
