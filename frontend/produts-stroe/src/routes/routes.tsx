import { createBrowserRouter, Outlet } from "react-router-dom";
import Board from "../components/login-and-register/Board";
import Login from "../components/login-and-register/Login";
import Register from "../components/login-and-register/Register";
import AddAndEditProduct from "../forms/products/AddAndEditProduct";
import Products from "../components/products/Products";
import ProfileImageUpdate from "../forms/user.profile/ProfileImageUpdate";
import ProductDetail from "../components/products/ProductDetail";
import CreateCustomer from "../forms/customers/CreateCustomer";
import SuccessOrder from "../components/perchases/SuccessOrder";
import DisplayCustomers from "../components/customers/displayCustomers"
import Layout from "../components/Layout";
import ErrorPage from "../components/ErrorPage";

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
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'user/profile/updateImage',
                element:
                    <ProfileImageUpdate />
            },
            {
                path: 'products',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <Products />
                    },
                    {
                        path: ':id',
                        element: <ProductDetail />
                    },
                    {
                        path: 'create',
                        element: <AddAndEditProduct title="Add Product" />
                    },
                    {
                        path: 'edit/:id',
                        element: <AddAndEditProduct title="Edit Product" />
                    },
                ]
            },
            {
                path: 'customers',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <DisplayCustomers />
                    },
                    {
                        path: 'create',
                        element: <CreateCustomer />
                    },
                ]
            },
            // {
            //     path: '/purchases',
            //     element:

            // },
            {
                path: 'purchases/successOrder',
                element:
                    <SuccessOrder />
            },
        ]
    },
]);

export default router