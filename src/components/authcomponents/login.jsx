import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import backgroundimage from "../assets/background.png"
import { Link } from 'react-router-dom'
import Input from '../common/input'
import Button from '../common/button'
import { useForm } from 'react-hook-form'
import { login as authLogin } from '../../store/slices/authslice'
// import axios from 'axios'
import { userLogin } from '../../services/auth/authservice'

function Login() {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, watch } = useForm();
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (data) => {
        setError("");
        try {
            console.log("trying on login page");
            const response = await userLogin(data.email, data.password);
            if (response) {
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                dispatch(authLogin(response.data));
                console.log(response.data.refresh);
                console.log(response.data.access);
                setValue("email", "");
                setValue("password", "");
            }
        } catch (error) {
            console.log(error);
            setError("Invalid email or password."); // Update the error message accordingly
        }
    };

    const passwordInputType = showPassword ? "text" : "password";

    return (
        <div className='flex items-center justify-center w-full'>
            <div className=" rounded-xl p-12 border border-white">
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-white/60">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="mt-8 text-center text-red-500">{error}</p>}
                <form onSubmit={handleSubmit(handleLogin)} className='mt-8'>
                    <div className='space-y-6'>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />
                        <div className="relative">
                            <Input
                                label="Password"
                                type={passwordInputType}
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <div className="text-right text-sm text-white">
                            <Link to="/forgot-password" className="hover:underline">
                                Forgot Password
                            </Link>
                        </div>
                        <Button
                            type="submit"
                            className="w-full">
                            <p className='text-2xl font-bold leading-6 tracking-wide text-center'>Sign in</p>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;