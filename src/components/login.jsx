import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import backgroundimage from "../assets/background.png"
import { Link } from 'react-router-dom'
import Input from './common/input'
import Button from './common/button'
import { useForm } from 'react-hook-form'
import { login as authLogin } from '../store/slices/authslice'
// import axios from 'axios'
import { userLogin } from '../services/auth/authservice'

function Login() {
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm()
    const [error, setError] = useState()

    const handleLogin = async (data) => {
        setError("")
        try {
            console.log("trying on login page");
            const response = await userLogin(data.email, data.password);
            if (response) {
                localStorage.setItem("accessToken", response.data.access)
                localStorage.setItem("refreshToken", response.data.refresh)
                dispatch(authLogin(response.data))
                console.log(response.data.refresh);
                console.log(response.data.access);
                // return response.data.message;
                setValue("email", "");
                setValue("password", "")
            }
        } catch (error) {
            console.log(error)
            throw (error)
        }
    }
    return (
        <div
            className='flex items-center justify-center w-full'
            // style={{
            //     backgroundImage:`url(${backgroundimage})`
            // }}
        >
            <div className="mx-auto w-full max-w-lg rounded-xl p-10 border border-black/10"
            // style={{
            //     backgroundImage:`url(${backgroundimage})`
            // }}
            >
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-white/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                    Sign Up
                    </Link>
                </p>
                {error && <p className="mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(handleLogin)} className='mt-8'>
                    <div className='space-y-5 bg-color-orange'>
                        <input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            className='w-full rounded-lg flex items-center px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded-t-md border border-gray-300 outline-none focus:outline-none focus:ring focus:border-amber-500'
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <input
                            label="password: "
                            type="password"
                            className='w-full w-full rounded-lg flex items-center px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded-t-md border border-gray-300 outline-none focus:outline-none focus:ring focus:border-amber-500'
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <button
                            type="submit"
                            className="w-full bg-amber-500 p-3">
                            <p className=' text-2xl font-bold leading-6 tracking-wide text-center'>Sign in</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login