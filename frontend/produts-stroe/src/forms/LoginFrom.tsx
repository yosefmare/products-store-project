import { Link } from "react-router-dom";
import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import ErrorModel from "../ui-models/ErrorModel";
import { useAppDispatch, useAppSelector } from "../app/hooks/hooks";
import { auth } from "../features/api/authAsyncThunk.api";


export const submitAuthForms = (endPoint: string, data: FormEvent<HTMLFormElement>, dispatchFunction: Function) => {
    const formData = new FormData(data.currentTarget);
    dispatchFunction(auth({ endPoint, formData }))

}

export const LoginForm = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const authSlice = useAppSelector((state) => state.authSlice)
    const navigates = useNavigate()

    useEffect(() => {
        if (authSlice.success) {
            navigates('/products')
        }
    }, [authSlice.success])

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            submitAuthForms('http://localhost:8000/auth/login', e, dispatch)
        }} encType='multipart/form-data' className=" flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-center">Login</h1>

            <div className="outline-form-input">
                <input name="email" className="input-form" type="text" placeholder="" />
                <label htmlFor="Email" className="input-form-label">Email</label>
            </div>

            <div className="outline-form-input">
                <input name="password" className="input-form" type="password" placeholder="" />
                <label htmlFor="Password" className="input-form-label">Password</label>
            </div>
            <ErrorModel display={authSlice.error ? true : false} message={authSlice.error ? authSlice.error : ''} />
            <button type="submit" className=" p-2 bg-sky-600 text-white cursor-pointer active:bg-sky-700">Login</button>
            <div className=" text-center">
                <Link to={'/register'} className=" text-sky-600 underline font-medium">Register</Link>
            </div>
        </form>
    );
};
