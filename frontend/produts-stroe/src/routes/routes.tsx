import { createBrowserRouter } from "react-router-dom";
import Board from "../components/login-and-register/Board";
import Login from "../components/login-and-register/Login";
import Register from "../components/login-and-register/Register";

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
]);

export default router