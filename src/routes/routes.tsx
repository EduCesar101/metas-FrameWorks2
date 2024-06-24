import { createBrowserRouter } from "react-router-dom";
import { Main } from "../pages/Main"
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { PrivateRoutes } from ".";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        element: <PrivateRoutes/>,
        children: [
            {
                path: "/main",
                element: <Main/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>
    }
])

export { router }