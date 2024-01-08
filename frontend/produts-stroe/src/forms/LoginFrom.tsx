import { Link } from "react-router-dom";
import { sendFormData } from "../handelers/handelers";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const LoginAndRegisterForm = (): JSX.Element => {
    const navigates = useNavigate()
    const [formData, setFormData] = useState({email: "", password: ''});
    
    return (
        <form className=" flex flex-col gap-6">
            <h1 className=" text-center font-medium text-xl">Login</h1>
            <input onChange={(e) => setFormData({...formData, email: e.target.value})} className=" rounded-sm px-6 py-1" type="text" placeholder="Email " />
            <input onChange={(e) => setFormData({...formData, password: e.target.value})} className=" rounded-sm px-6 py-1" type="password" placeholder="Password" />
            <button onClick={(e) => {
                e.preventDefault()
                sendFormData('http://localhost:8000/auth/login', formData, navigates)
            }} className=" p-2 bg-sky-600 text-white cursor-pointer active:bg-sky-700">Login</button>
            <div className=" text-center">
                <Link to={'/register'} className=" text-sky-600 underline font-medium">Register</Link>
            </div>
        </form>
    );
};

export default LoginAndRegisterForm;