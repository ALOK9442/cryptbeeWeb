import React from 'react'
import forgotpassillustration from '../../assets/illustrations/forget_pass_illustration.svg';
import { useForm } from 'react-hook-form';
import Input from '../common/input';
import logo from "../../assets/logo/logo.png";
import Button from '../common/button';

function SendEmail() {
    const { register, handleSubmit } = useForm()

    const handleClick = async () => {

    }
    return (
        <>
            <div className='space-y-6'>
                <div className='mb-6'>
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className="flex items-center mb-12">
                            <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
                            <div>
                                <p className="text-white text-sm font-bold">Cryptbee</p>
                            </div>
                        </div>
                    </div>
                    <div className='space-y-1'>
                        <div className='flex items-center justify-center'>
                            <img src={forgotpassillustration} alt='forget password illustration' />
                        </div>
                        <div className='flex items-center justify-center'>
                            <p className='text-white text-2xl font-bold'>Forgot Password?</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <p>Don't worry. It happens to the best of us.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit(handleClick)} className='mt-8 w-80 space-y-6'>
                        <Input
                            label="Email"
                            type="text"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />
                        <Button
                            type='submit'
                            className='w-full'>
                            send otp
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SendEmail