import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks/hooks'
import ErrorModel from '../ui-models/ErrorModel'
import { useEffect } from 'react'
import { submitAuthForms } from './functions/forms.submite'

const RegistrationFrom = () => {
  const navigates = useNavigate()
  const authSlice = useAppSelector((state) => state.authSlice)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (authSlice.success) {
      navigates('/products')
    }
  }, [authSlice.success])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submitAuthForms('http://localhost:8000/auth/register', e, dispatch)
        console.log(authSlice)
      }}
      encType="multipart/form-data"
      className=" flex flex-col gap-6"
    >
      <h1 className="text-2xl font-bold text-center">Register</h1>

      <div className="outline-form-input">
        <input
          required
          name="userName"
          className=" input-form"
          type="text"
          placeholder=""
        />
        <label htmlFor="User Name" className="input-form-label">
          User Name
        </label>
      </div>

      <div className="outline-form-input">
        <input
          required
          name="email"
          className=" input-form"
          type="text"
          placeholder=""
        />
        <label htmlFor="Email" className="input-form-label">
          Email
        </label>
      </div>

      <div className="outline-form-input">
        <input
          required
          name="password"
          className=" input-form"
          type="password"
          placeholder=""
        />
        <label htmlFor="password" className="input-form-label">
          Password
        </label>
      </div>
      <select required name="role" className="select rounded-sm px-6 py-1">
        <option disabled selected hidden>
          Role
        </option>
        <option>admin</option>
        <option>user</option>
      </select>
      <ErrorModel
        display={authSlice.error ? true : false}
        message={authSlice.error ? authSlice.error : ''}
      />
      <button
        type="submit"
        className=" p-2 bg-sky-600 text-white cursor-pointer active:bg-sky-700"
      >
        Register
      </button>
      <div className=" text-center">
        <Link to={'/login'} className=" text-sky-600 underline font-medium">
          Login
        </Link>
      </div>
    </form>
  )
}

export default RegistrationFrom
