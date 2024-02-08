import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { errorChecker, handelSendLoginAndRegisterFormData } from "../handelers/handelers";
import ErrorModel from "../ui-models/ErrorModel";

const RegistrationFrom = () => {
  const navigates = useNavigate()
  const [isError, setIsError] = useState({ status: false, message: '' });
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
  });

  return (
    <form className=" flex flex-col gap-6">
      <h1 className=" text-center font-medium text-xl">Register</h1>
     
      <div className="outline-form-input">
         <input onChange={(e) => setFormData({ ...formData, userName: e.target.value })} className=" input-form" type="text" placeholder="" />
         <label htmlFor="User Name" className="input-form-label">User Name</label>
      </div>
    
     <div className="outline-form-input">
       <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} className=" input-form" type="text" placeholder="" />
       <label htmlFor="Email" className="input-form-label">Email</label>
     </div>
     
      <div className="outline-form-input">
         <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} className=" input-form" type="password" placeholder="" />
         <label htmlFor="password" className="input-form-label">Password</label>
      </div>
        <select onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="select rounded-sm px-6 py-1">
          <option hidden>Role</option>
          <option>admin</option>
          <option>user</option>
        </select>
      <ErrorModel display={isError.status} message={isError.message}/>
      <button onClick={(e) => {
        e.preventDefault()
        errorChecker(
          handelSendLoginAndRegisterFormData('http://localhost:8000/auth/register', formData, navigates),
          setIsError
        )
      }} className=" p-2 bg-sky-600 text-white cursor-pointer active:bg-sky-700">Register</button>
      <div className=" text-center">
        <Link to={'/login'} className=" text-sky-600 underline font-medium">Login</Link>
      </div>
    </form>
  );
};

export default RegistrationFrom;