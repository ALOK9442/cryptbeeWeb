import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser } from '../../services/auth/authservice';
import { setEmail } from '../../store/slices/authslice';
import Input from '../common/input';
import Button from '../common/button';
import logo from "../../assets/logo/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();
    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignup = async (data) => {
        setError("");
        try {
            console.log("trying to signup on signup page");
            const response = await signUpUser(data.email, data.password);
            if (response) {
                console.log(response.data.messsage[0]);
                console.log(data.email);
                dispatch(setEmail(data.email));
                setValue("email", "");
                setValue("password", "");
                navigate(`/verifymail?email=${data.email}`);
            }
        } catch (error) {
            console.log(error);
            setError("Something went wrong. Please try again."); // Update the error message accordingly
        }
    }

    const passwordInputType = showPassword ? "text" : "password";
    const confirmPasswordInputType = showConfirmPassword ? 'text' : 'password';

    return (
        <>
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
                    <div>
                        <p className="text-white text-sm font-bold">Cryptbee</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center w-full mt-20'>
                <div className="mx-auto w-full max-w-lg rounded-xl p-10 border border-white">
                    <h2 className="text-center text-2xl font-bold leading-tight">Create your account</h2>
                    {error && <p className="mt-8 text-center text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit(handleSignup)} className='mt-8 w-80'>
                        <div className='space-y-5 bg-color-orange'>
                            <Input
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
                            <div className='relative'>
                                <Input
                                    label='Password'
                                    type={passwordInputType}
                                    placeholder='Enter your password'
                                    {...register('password', {
                                        required: true,
                                    })}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute top-1/2 right-3 transform -translate-y-1/2'
                                >
                                    {showPassword
                                        ? <FontAwesomeIcon icon={faEye} />
                                        : <FontAwesomeIcon icon={faEyeSlash} />}
                                </button>
                            </div>
                            <div className='relative'>
                                <Input
                                    label='Confirm Password'
                                    type={confirmPasswordInputType}
                                    placeholder='Enter your password again'
                                    {...register('confirmPassword', {
                                        required: true,
                                    })}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className='absolute top-1/2 right-3 transform -translate-y-1/2'
                                >
                                    {showConfirmPassword ?
                                        <FontAwesomeIcon icon={faEye} />
                                        : <FontAwesomeIcon icon={faEyeSlash} />}
                                </button>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-amber-500 p-3">
                                <p className=' text-2xl font-bold leading-6 tracking-wide text-center'>Sign up</p>
                            </Button>
                            <p className="mt-2 text-center text-base text-white">
                                Already have any account?&nbsp;
                                <Link
                                    to="/"
                                    className="font-medium text-primary transition-all duration-200 hover:underline"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;
