import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userSelector } from "../../store/user"

export default function PrivateRoute() {
    const user = useSelector(userSelector)

    if (!user) {
        return <Navigate to="/auth/signin" replace />
    }

    return <Outlet />
}