import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../../components/common/input';
import Button from '../../../../../components/common/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { changepassword } from '../../../../../services/auth/authservice';


function SetPass() {
    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const email = useSelector(state => state.user.email)


    const handleConfirmPasswordChange = (value) => {
        setConfirmPasswordError('');
        const isValid = /^(?=.*[A-Z])(?=.*[!@#$%^&*()-=_+[\]{}|;':",.<>?])(?=.*[0-9]).{8,}$/.test(value);
        if (!isValid) {
            setError('newPassword', {
                type: 'manual',
                message: 'Enter a valid password',
            });
        } else {
            setError('newPassword');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onClick = async (data) => {
        setPasswordError('');
        setConfirmPasswordError('');
        const oldPass = data.password
        const newPass = data.newPassword
        console.log(oldPass)
        console.log(newPass)

        try {
            console.log(email)
            const response = await changepassword(oldPass, newPass)
            console.log(response.data.message[0])
            navigate('/home/security')
        } catch (error) {
            console.log(error)
            throw (error)
        }
    };

    const passwordInputType = showPassword ? 'text' : 'password';
    const confirmPasswordInputType = showConfirmPassword ? 'text' : 'password';

    return (
        <>
            <div className="flex flex-col items-center justify-center mt-8 border-4 border-zinc-950 p-4 bg-zinc-950 rounded-xl">
                <div>
                    <p className='font-bold text-3xl flex items-center justify-center'>Set Password</p>
                    <div className='flex items-center justify-center'>
                        <form onSubmit={handleSubmit(onClick)} className='space-y-8 p-12 w-80'>
                            <div className="relative">
                                <Input
                                    label="Old Password"
                                    type={passwordInputType}
                                    placeholder="Enter Your Old Password"
                                    {...register("password", {
                                        required: 'Password is required',
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className="top-1/2 right-3 transform -translate-y-1/2 absolute"
                                >
                                    {showPassword
                                        ? <FontAwesomeIcon icon={faEye} />
                                        : <FontAwesomeIcon icon={faEyeSlash} />}
                                </button>
                            </div>

                            <div className="relative">
                                <Input
                                    label="New Password"
                                    type={confirmPasswordInputType}
                                    placeholder="Enter Your New Password"
                                    {...register("newPassword", {
                                        required: 'New Password is required',
                                    })}
                                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowConfirmPassword}
                                    className="top-1/2 right-3 transform -translate-y-1/2 absolute"
                                >
                                    {showConfirmPassword
                                        ? <FontAwesomeIcon icon={faEye} />
                                        : <FontAwesomeIcon icon={faEyeSlash} />}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <p className="text-red-500">{errors.newPassword.message}</p>
                            )}
                            <Button
                                type='submit'
                                className='w-full'
                            >
                                <p>Save</p>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SetPass;
