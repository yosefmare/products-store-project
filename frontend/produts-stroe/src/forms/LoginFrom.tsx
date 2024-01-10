import { Link } from "react-router-dom";
import { errorChecker, handelSendLoginAndRegisterFormData } from "../handelers/handelers";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import ErrorModel from "../ui-models/ErrorModel";

const LoginAndRegisterForm = (): JSX.Element => {
    const navigates = useNavigate()
    const [formData, setFormData] = useState({ email: "", password: '' });
    const [isError, setIsError] = useState({ status: false, message: '' });



    return (
        <form className=" flex flex-col gap-6">
            <h1 className=" text-center font-medium text-xl">Login</h1>
            <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} className=" rounded-sm px-6 py-1" type="text" placeholder="Email " />
            <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} className=" rounded-sm px-6 py-1" type="password" placeholder="Password" />
            <ErrorModel display={isError.status} message={isError.message} />
            <button onClick={(e) => {
                e.preventDefault()
                errorChecker(
                    handelSendLoginAndRegisterFormData('http://localhost:8000/auth/login', formData, navigates),
                    setIsError

                )
            }} className=" p-2 bg-sky-600 text-white cursor-pointer active:bg-sky-700">Login</button>
            <div className=" text-center">
                <Link to={'/register'} className=" text-sky-600 underline font-medium">Register</Link>
            </div>
        </form>
    );
};

export default LoginAndRegisterForm;