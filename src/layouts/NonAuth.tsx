import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store"

const NonAuth = () => {
    const { user } = useAuthStore()
    if (user) {
        return <Navigate to='/' replace={true} />
    }
    return (
        <div>
            <h1>Non Auth</h1>
            <Outlet />
        </div>
    )
}

export default NonAuth