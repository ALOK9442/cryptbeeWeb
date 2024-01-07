import React, { useState } from 'react';
import Input from '../common/input';
import Button from '../common/button';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import logo from "../../assets/logo/logo.png"; // Adjust the path to your logo image
import { useDispatch, useSelector } from 'react-redux';
import { verifyPan } from '../../services/auth/authservice';
import { panVerified } from '../../store/slices/userslice';

function VerifyPan() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector(state => state.user.email)
  console.log(email)
  const onSubmit = async (data) => {
    console.log(`trying to verify pan ${data.name},${data.panNumber}`)
    const types = data.panNumber
    console.log(typeof types)
    const response = await verifyPan({"email":email, "name":data.name, "pan":data.panNumber})
    console.log(response.data)
    if (response.status === 200) {
      dispatch(panVerified(response.data))
    }
    // console.log(data);
  };

  return (
    <>
      <div className="flex items-center justify-center mt-6 mx-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
          <div>
            <p className="text-white text-sm font-bold">Cryptbee</p>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center w-full mt-20'>
        <div className="mx-auto w-full max-w-md rounded-xl p-12 border border-white mt-6">
          <h2 className="text-center text-2xl font-bold leading-tight">
            Enter Personal Details
          </h2>
          <p className="mt-2 text-center text-base text-white/60">
            Verify Pan Number To Trade
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-8 mb-10 w-80'>
            <div className='space-y-6'>
              <Input
                label="Full Name"
                placeholder="Enter your Full Name"
                type="text"
                className='w-full p-2 bg-transparent text-white'
                {...register('name', {
                  required: true,
                })}
              />
              <Input
                label="Pan Number"
                placeholder="Enter your Pan Number"
                type="text"
                className='w-full p-2 bg-transparent text-white'
                {...register('panNumber', {
                  required: true,
                  pattern: {
                    value: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                    message: 'Enter a valid PAN number',
                  },
                })}
              />
              <div className="flex space-x-4">
                {/* <Link to="/home" className="flex-1 block"> */}
                <Button type="submit" className="flex-1 bg-amber-500 p-3">
                  <p className='text-2xl font-bold leading-6 tracking-wide text-center'>Continue</p>
                </Button>
                {/* </Link> */}
                {/* <Link to="/home" > */}
                <Button className="w-full bg-gray-500 p-3">
                  <p className='text-2xl font-bold leading-6 tracking-wide text-center'>Skip</p>
                </Button>
                {/* </Link> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default VerifyPan;
