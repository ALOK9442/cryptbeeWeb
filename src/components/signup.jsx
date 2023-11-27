import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { signUpUser } from '../services/auth/authservice'
import { setEmail } from '../store/slices/authslice'
// import { logout as SignUp } from '../store/slices/authslice'

function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const navigate = useNavigate()
    const { register, handleSubmit, setValue } = useForm()
    const [error, setError] = useState()
    

    // useEffect(() => {
    //     setValue("email", "");
    //     setValue("password", "")
    // }, [])
    
    const handleSignup = async (data) => {
        setError("")
        try {
            console.log("trying to signup on signup page");
            const response = await signUpUser(data.email, data.password);
            if (response) {
                console.log(response.data.messsage[0]);
                console.log(data.email);
                dispatch(setEmail(data.email))
                setValue("email", "");
                setValue("password", "")
                navigate(`/verifymail?email=${data.email}`);
            }
        } catch (error) {
            console.log(error)
            // throw (error)
        }
    }
    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className="mx-auto w-full max-w-lg rounded-xl p-10 border border-black/10"
            >
                <h2 className="text-center text-2xl font-bold leading-tight">create your account</h2>
                <p className="mt-2 text-center text-base text-white/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(handleSignup)} className='mt-8'>
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
                        <input
                            label="password: "
                            type="password"
                            className='w-full w-full rounded-lg flex items-center px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded-t-md border border-gray-300 outline-none focus:outline-none focus:ring focus:border-amber-500'
                            placeholder="Enter your password again"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <button
                            type="submit"
                            className="w-full bg-amber-500 p-3">
                            <p className=' text-2xl font-bold leading-6 tracking-wide text-center'>Sign up</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp