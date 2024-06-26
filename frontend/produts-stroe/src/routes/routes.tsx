import { createBrowserRouter } from "react-router-dom";
import Board from "../components/login-and-register/Board";
import Login from "../components/login-and-register/Login";
import Register from "../components/login-and-register/Register";
import NavBar from "../components/navbar/NavBar";
import AddProduct from "../forms/products/AddProduct";
import Products from "../components/products/Products";
import ProfileImageUpdate from "../forms/user.profile/ProfileImageUpdate";
import ProductDetail from "../components/products/ProductDetail";
import CreateCustomer from "../forms/customers/CreateCustomer";

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
        path: '/user/profile/updateImage',
        element:
            <div>
                <NavBar />
                <ProfileImageUpdate />
            </div>
    },
    {
        path: '/products',
        element:
            <div>
                <NavBar />
                <Products />
            </div>
    },
    {
        path: '/product/:id',
        element:
            <div>
                <NavBar />
                <ProductDetail />
            </div>
    },
    {
        path: '/products/AddProduct',
        element:
            <div>
                <NavBar />
                <AddProduct />
            </div>
    },
    {
        path: '/customers/createCustomer',
        element:
            <div>
                <NavBar />
                <CreateCustomer/>
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