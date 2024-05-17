import { createBrowserRouter } from "react-router-dom";
import Board from "../components/login-and-register/Board";
import Login from "../components/login-and-register/Login";
import Register from "../components/login-and-register/Register";
import NavBar from "../components/navbar/NavBar";
import AddProduct from "../forms/products/AddProduct";
import Products from "../components/products/Products";

const router = createBrowserRouter([
    {
        path: "/login",
        element:
            <Board>
                <div className="flex flex-col items-center justify-center h-[100vh]">
                    <Login />
                </div>
            </Board>
    },
    {
        path: "/register",
        element:
            <Board>
                <div className="flex flex-col items-center justify-center h-[100vh]">
                    <Register />
                </div>
            </Board>
    },
    {
        path: '/products',
        element:
            <div>
                <NavBar />
                <Products/>
            </div>
    },
    {
        path: '/products/AddProduct',
        element:
            <div>
                <NavBar />
                <AddProduct/>
            </div>
    },
    {
        path: '/customers',
        element:
            <div>
                <NavBar />
            </div>
    },
    {
        path: '/purchases',
        element:
            <div>
                <NavBar />
            </div>
    },
]);

export default router