import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Input from '../../../../../components/common/input';
import Button from '../../../../../components/common/button';
import { twoFactor } from '../../../../../services/auth/authservice';
import mobilepageImage from '../../../../../assets/illustrations/mobile_page_illustration.svg'

function TwoFactorVerifyMobile() {

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log("in submit")
        console.log(data.phoneNumber)
        try {
            const response = await twoFactor(data.phoneNumber)
            console.log(response)
        } catch (error) {
            console.log(error)
            throw (error)
        }
    }

    return (
        <div className='mt-8'>
            <div>
                <img src={mobilepageImage} alt='mobile_page_illustration' className='w-60 h-60' />
            </div>
            <p className='mt-4'>Verify With Mobile Number</p>
            <div className='mt-8'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <Input
                        label="Phone Number"
                        type="text"
                        placeholder="Enter Phone Number"
                        {...register('phoneNumber', { required: true })}
                    />
                    <Button type="submit"
                        className='w-full'>
                        Verify
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default TwoFactorVerifyMobile