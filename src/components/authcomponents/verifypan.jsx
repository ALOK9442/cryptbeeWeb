import React from 'react';
import Input from '../common/input';
import Button from '../common/button';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function VerifyPan() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle your form submission
    console.log(data);
  };

  return (
    <div className='flex items-center justify-center w-full'>
      <div className="mx-auto w-full max-w-md rounded-xl p-10 border border-white/10">
        <h2 className="text-center text-2xl font-bold leading-tight">
          Enter Personal Details
        </h2>
        <p className="mt-2 text-center text-base text-white/60">
          Verify Pan Number To Trade
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 mb-10'>
          <div className='space-y-6'>
            <Input
              label="Full Name"
              placeholder="Enter your Full Name"
              type="text"
              className='w-full p-2 bg-transparent text-white'
              {...register('fullName', {
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
            <Link to="/home">
              <Button type="submit" className="flex-1 bg-amber-500 p-3">
                <p className='text-2xl font-bold leading-6 tracking-wide text-center'>Continue</p>
              </Button>
              </Link>
              <Link to="/home" className="flex-1 block">
                <Button className="w-full bg-gray-500 p-3">
                  <p className='text-2xl font-bold leading-6 tracking-wide text-center'>Skip</p>
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyPan;
