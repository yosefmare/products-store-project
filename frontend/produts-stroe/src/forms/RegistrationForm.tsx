import { Link } from "react-router-dom";

const RegistrationFrom = () => {
  return (
    <form className=" flex flex-col gap-6">
      <h1 className=" text-center font-medium text-xl">Register</h1>
      <input className=" rounded-sm px-6 py-1" type="text" placeholder="Email " />
      <input className=" rounded-sm px-6 py-1" type="password" placeholder="Password" />
      <select className=" select rounded-sm px-6 py-1">
        <option selected hidden>role</option>
        <option>admin</option>
        <option>user</option>
      </select>
      <button onClick={(e) => e.preventDefault()} className=" p-2 bg-sky-600 text-white cursor-pointer active:bg-sky-700">Register</button>
      <div className=" text-center">
        <Link to={'/login'} className=" text-sky-600 underline font-medium">Login</Link>
      </div>
    </form>
  );
};

export default RegistrationFrom;