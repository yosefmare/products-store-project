import { createBrowserRouter } from "react-router-dom";
import Board from "../components/login-and-register/Board";
import Login from "../components/login-and-register/Login";
import Register from "../components/login-and-register/Register";

const router = createBrowserRouter([
    {
        path: "/login",
        element:
            <Board>
                <Login />
            </Board>
    },
    {
        path: "/register",
        element:
            <Board>
                <Register />
            </Board>
    },
]);

export default router