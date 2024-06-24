import { useContext } from "react"
import { AuthGoogleContext } from "../context/AuthGoogleContext"
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoutes(){
    const {signed} = useContext(AuthGoogleContext);
    return signed ? <Outlet/> : <Navigate to={"/login"}/>
}