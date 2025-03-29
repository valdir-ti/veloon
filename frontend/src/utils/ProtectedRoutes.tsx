import { Navigate, Outlet } from "react-router"

function ProtectedRoutes() {
    const user = true
    return user ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes
