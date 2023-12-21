import axios from "axios";
import config from "../../config/config";
import api from "../../components/api";
import { useSelector } from "react-redux";
// import { createAsyncThunk } from "@reduxjs/toolkit";

const BASEURL = config.BASEURL
// const userEmail = useSelector(state=>state.user.email)
// anshumannandan.com/auth/login/

export const userLogin = async (email, password) => {
    try {
        console.log("trying to signIn");
        const response = await axios.post(BASEURL + config.signInLink,
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response.data.message)
        return response;
    } catch (error) {
        console.log(error);
        throw (error);
    }
}

export const signUpUser = async (email, password) => {
    try {
        console.log("trying to signUp");
        const response = await axios.post(BASEURL + config.signUpLink,
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response;
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const sendEmailOtp = async (email) => {
    try {
        console.log(`sending otp to email: ${email}`);
        const response = await axios.post(BASEURL + config.sendEmailOtpLink,
            { email },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response.data.message[0]);
        return response;
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const verifyEmailOtp = async (email, otp) => {
    try {
        console.log(`began verifying email otp ${email}, ${otp}`)
        const response = await axios.post(BASEURL + config.verifyEmailOtpLink, {
            email, otp
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        console.log(response.data.message)
        return response
    } catch (error) {
        console.log(error)
        throw (error);
    }
}

export const resetPassword = async (email, otp, password) => {
    try {
        console.log(`trying to resetpassword ${email}`)
        const response = await axios.patch(BASEURL + config.resetPassLink,
            {
                email,
                otp,
                password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        console.log(response.data)
        return response;
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const verifyPan = async (email, pan, name) => {
    try {
        console.log(`verifying pan of email: ${email}`)
        let response;
        if (pan && name) {
            response = await api.post(BASEURL + config.panLink, { email, pan, name })
        } else if (!pan && name) {
            response = await api.post(BASEURL + config.panLink, { email, name })
        } else {
            response = await api.post(BASEURL + config.panLink, { email, name })
        }
        console.log(response.status);
        return response;

    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const forgotpassword = async ({ email, otp, password }) => {
    try {
        const response = await axios.patch(BASEURL + config.resetPassLink, {
            email, otp, password
        },
            {
                headers: {
                    'content-type': 'application/json'
                },
            }
        )
        console.log(response)
        return response;
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const changepassword = async (password, newpassword) => {
    console.log("changing password")
    try {
        console.log("trying password")
        const response = await api.put(config.changePasswordLink, {
            'password': password,
            'newpassword': newpassword
        },
            {
                headers: {
                    'content-type': 'application/json'
                },
            },
        )
        console.log(response)
        return response;
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const checkVerification = async () => {
    console.log("checking verification")

}

export const twoFactor = async (phoneNumber) => {
    console.log("newtwwofactor")
    try {
        console.log("trying two factor")
        const response = await api.post(config.newTwoFactor, {
            phoneNumber
        },
            {
                headers: {
                    'content-type': 'application/json'
                },
            }
        )
        console.log(response.data)
        return response
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const twoFactorVerification = async (otp) => {
    console.log("twofactorverification")
    try {
        console.log("Trying two factor verification")
        const response = await api.put(config.verifyTwoFactor, { otp })
        console.log(response.data)
        return response
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const enableTwoFa = async () => {
    console.log("2fa")
    try {
        console.log("2fa trying")
        const response = await api.put(config.enableTwoFactor)
        console.log(response.data)
        return response
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const disableTwoFa = async () => {
    console.log("disable2fa")
    try {
        console.log("trying disable2fa")
        const response = await api.put(config.disableTwoFactor)
        console.log(response.data)
        return response
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const twoFactorLogin = async (otp, userEmail) => {
    console.log("twofactorlogin")
    try {
        console.log("tryingtwofactorlogin")
        const response = await axios.post(BASEURL + config.loginTwoFactorVerify, {
            otp, userEmail
        })
        console.log(response.data)
        return response
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const watchings = async (coinName) => {
    try {
        console.log("watching")
        const response = await api.get(config.inWatchlist + coinName)
        console.log(response.data)
        return response
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const getTransactions = async () => {
    try {
        console.log("trying to get transactions history")
        const response = api.get(config.transactionLink)
        console.log(response.data)
        return response
    } catch (error) {
        console.log(error)
        throw (error)
    }
}