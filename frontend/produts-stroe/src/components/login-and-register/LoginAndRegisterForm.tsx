import { Link } from "react-router-dom";

type propsTypes = {
    operation: string,
    path: string,
    option: string,
    title: string
}

const LoginAndRegisterForm = ({ title, operation, path, option }: propsTypes): JSX.Element => {
    return (
        <form className=" flex flex-col gap-6">
            <h1 className=" text-center font-medium text-xl">{title}</h1>
            <input className=" rounded-sm px-6 py-1" type="text" placeholder="Email " />
            <input className=" rounded-sm px-6 py-1" type="password" placeholder="Password" />
            <button onClick={(e) => e.preventDefault()} className=" p-2 bg-sky-600 text-white cursor-pointer active:bg-sky-700">{operation}</button>
            <div className=" text-center">
                <Link to={path} className=" text-sky-600 underline font-medium">{option}</Link>
            </div>
        </form>
    );
};

export default LoginAndRegisterForm;