import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import backgroundimage from "../assets/background.png"
import { Link, useNavigate } from 'react-router-dom'
import Input from '../common/input'
import Button from '../common/button'
import { useForm } from 'react-hook-form'
import { login as authLogin, logout } from '../../store/slices/authslice'
// import axios from 'axios'
import { userLogin } from '../../services/auth/authservice'
import logo from "../../assets/logo/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import store from '../../store/store'
import { setOtp, userDetails } from '../../store/slices/userslice'
import { getUser } from '../../services/apiservices.jsx/apiintegration'

function Login() {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, watch } = useForm();
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(store.dispatch(logout()))
        dispatch(store.dispatch(setOtp('')))
    }, [])

    const handleLogin = async (data) => {
        setError("");
        try {
            console.log("trying on login page");
            const response = await userLogin(data.email, data.password);
            if (response) {
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            console.log(response.data.refresh);
            console.log(response.data.access);
            console.log(response.data.message)
            dispatch(authLogin(response.data));
            const result = await getUser();
            console.log("result", result.data)
            dispatch(userDetails(result.data));
            setValue("email", "");
            setValue("password", "");
            navigate('/home')
            }
            else {
                setError("Invalid email or password.");
            }
        } catch (error) {
            console.log(error);
            setError("Invalid email or password.");
        }
    };

    const passwordInputType = showPassword ? "text" : "password";

    return (
        <>
            <div className="mt-4 absolute top-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
                    <div>
                        <p className="text-white text-sm font-bold">Cryptbee</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center w-full mt-24'>
                <div className=" rounded-xl p-12 border border-white">
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                    {error && <p className="mt-8 text-center text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit(handleLogin)} className='mt-8 w-full md:w-80'>
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
                                        validate: {
                                            matchPattern: (value) =>
                                                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(value) ||
                                                "Enter a valid password",
                                        },
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2"
                                >
                                    {showPassword
                                        ? <FontAwesomeIcon icon={faEye} />
                                        : <FontAwesomeIcon icon={faEyeSlash} />}
                                </button>
                            </div>
                            <div className="text-right text-sm text-white">
                                <Link to="/forgot-password/email" className="hover:underline">
                                    Forgot Password
                                </Link>
                            </div>
                            {/* <Link to='/home'> */}
                            <Button
                                type="submit"
                                className="w-full">
                                <p className='text-2xl font-bold leading-6 tracking-wide text-center'>Sign in</p>
                            </Button>
                            {/* </Link> */}
                            <p className="mt-2 text-center text-base text-white">
                                Don&apos;t have an account?&nbsp;
                                <Link
                                    to="/signup"
                                    className="font-medium text-primary transition-all duration-200 hover:underline"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;