import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
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
    const { register,handleSubmit } = useForm()
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
                return response.data.message;
            }
        } catch (error) {
            console.log(error)
            throw (error)
        }
    }
    return (
        <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    {/* <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    > */}
                        Sign Up
                    {/* </Link> */}
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(handleLogin)} className='mt-8'>
            <div className='space-y-5'>
                <input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <button
                type="submit"
                className="w-full"
                >Sign in</button>
            </div>
        </form>
        </div>
    </div>
    )
}

export default Login