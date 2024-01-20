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
    console.log("resending otp ",email)
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
      <div className=" absolute top-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-y-6">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
          <div>
            <p className="text-white text-sm font-bold">Cryptbee</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>check for otp</p>
        </div>
        <div>
          <p>Enter the OTP sent to your email address</p>
        </div>
        <form onSubmit={handleSubmit(handleClick)}>
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
          <Button type='submit'>Verify</Button>
        </form>
      </div>
    </>
  )
}

export default EnterOtp