import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { sendFormData } from "../handelers/handelers";

const RegistrationFrom = () => {
  const navigates = useNavigate()
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });

  return (
    <form className=" flex flex-col gap-6">
      <h1 className=" text-center font-medium text-xl">Register</h1>
      <input onChange={(e) => setFormData({ ...formData, userName: e.target.value })} className=" rounded-sm px-6 py-1" type="text" placeholder="userName " />
      <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} className=" rounded-sm px-6 py-1" type="text" placeholder="Email " />
      <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} className=" rounded-sm px-6 py-1" type="password" placeholder="Password" />
      <select onChange={(e) => setFormData({ ...formData, role: e.target.value })} className=" select rounded-sm px-6 py-1">
        <option hidden>role</option>
        <option>admin</option>
        <option>user</option>
      </select>
      <button onClick={(e) => {
        e.preventDefault()
        sendFormData('http://localhost:8000/auth/register', formData, navigates)
      }} className=" p-2 bg-sky-600 text-white cursor-pointer active:bg-sky-700">Register</button>
      <div className=" text-center">
        <Link to={'/login'} className=" text-sky-600 underline font-medium">Login</Link>
      </div>
    </form>
  );
};

export default RegistrationFrom;