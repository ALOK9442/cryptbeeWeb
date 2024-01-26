import React from 'react'
import logo from '../../assets/logo/logo.png'
import Input from '../common/input'
import Button from '../common/button'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { verifyEmailOtp } from '../../services/auth/authservice'
import { useNavigate } from 'react-router'
import { sendEmailOtp } from '../../services/auth/authservice'
import { setOtp } from '../../store/slices/userslice'

function EnterOtp() {
  const dispatch = useDispatch()
  const { handleSubmit, register } = useForm();
  const email = useSelector(state => state.user.email)
  const navigate = useNavigate()
  console.log(email)
  const handleClick = async (data) => {
    const otpValue = data.otp;
    console.log("verifying otp on otp page", typeof (otpValue))
    try {
      console.log("trying1")
      const response = await verifyEmailOtp(email, otpValue)
      console.log(response)
      dispatch(setOtp(otpValue))
      navigate("/set-password")
    } catch (error) {
      console.log(error)
      throw (error)
    }
  }

  const handleResend = async () => {
    console.log("resending otp ", email)
    try {
      const response = await sendEmailOtp(email)
      console.log(response.data)
    } catch (error) {
      console.log(error)
      throw (error)
    }
  }

  return (
    <>
      <div className="flex items-center justify-center mt-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
          <div>
            <p className="text-white text-sm font-bold">Cryptbee</p>
          </div>
        </div>
      </div>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="rounded-xl p-12 border border-white ">
          <p>Enter the OTP sent to your email address</p>

          <form onSubmit={handleSubmit(handleClick)} className='mt-8 w-full md:w-80 space-y-4'>
            <Input
              label="OTP"
              placeholder="Enter your OTP"
              type="otp"
              {...register("otp", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\d{4}$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <p>Didn&apos;t get the OTP? <span onClick={handleResend} style={{ cursor: 'pointer', color: 'orange' }}>RESEND</span></p>
            <Button type='submit'
              className='w-full'
            >Verify</Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EnterOtp