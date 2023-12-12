import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../common/input';
import Button from '../common/button';
import logo from '../../assets/logo/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { resetPassword } from '../../services/auth/authservice';

function SetPassword() {
  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const email = useSelector(state => state.user.email)
  const otpValue = useSelector(state => state.user.otp)

  const handlePasswordChange = (value) => {
    setPasswordError('');
    const isValid = /^(?=.*[A-Z])(?=.*[!@#$%^&*()-=_+[\]{}|;':",.<>?])(?=.*[0-9]).{8,}$/.test(value);
    if (!isValid) {
      setError('password', {
        type: 'manual',
        message: 'Enter a valid password',
      });
    } else {
      setError('password');
    }
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPasswordError('');
    const passwordValue = watch('password');
    if (passwordValue !== value) {
      setConfirmPasswordError('Passwords do not match');
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

    if (data.password !== data.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    try {
      console.log(email)
      const response = await resetPassword(email, otpValue, data.password)
      navigate('/')
    } catch (error) {
      console.log(error)
      throw (error)
    }
  };

  const passwordInputType = showPassword ? 'text' : 'password';
  const confirmPasswordInputType = showConfirmPassword ? 'text' : 'password';

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
            <div>
              <p className="text-white text-sm font-bold">Cryptbee</p>
            </div>
          </div>
        </div>
        <div>
          <p className='font-bold text-3xl mb-6 flex items-center'>Set Password</p>
          <div className='flex items-center justify-center'>
            <form onSubmit={handleSubmit(onClick)} className='space-y-8 border border-white rounded-md p-12 w-80'>
              <div className="relative">
                <Input
                  label="Password"
                  type={passwordInputType}
                  placeholder="Enter Your New Password"
                  {...register("password", {
                    required: 'Password is required',
                  })}
                  onChange={(e) => handlePasswordChange(e.target.value)}
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
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={confirmPasswordInputType}
                  placeholder="Confirm Your Password"
                  {...register("confirmPassword", {
                    required: 'Confirm Password is required',
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
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
              {confirmPasswordError && (
                <p className="text-red-500">{confirmPasswordError}</p>
              )}
              <Button
                type='submit'
                className='w-full'
              >
                <p>Continue</p>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SetPassword;
