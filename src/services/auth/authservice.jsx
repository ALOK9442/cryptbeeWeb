import axios from "axios";
import config from "../../config/config";
import api from "../../components/api";
// import { createAsyncThunk } from "@reduxjs/toolkit";

const BASEURL = config.BASEURL

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

export const sendEmailOtp = async ({ email }) => {
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

export const verifyEmailOtp = async ({ email, otp }) => {
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

export const resetPassword = async ({ email, otp, password }) => {
    try {
        console.log(`trying to resetpassword ${email} ${otp}${password}`)
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
        console.log(response.data.message)
        return response;
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const verifyPan = async ({ email, pan, name }) => {
    try {
        console.log(`verifying pan of email: ${email}`)
        let response;
        if (pan && name) {
            response = await api.post(BASEURL + config.verifyPan, { email, pan, name })
        } else if (!pan && name) {
            response = await api.post(BASEURL + config.verifyPan, { email, name })
        } else {
            response = await api.post(BASEURL + config.verifyPan, { email, name })
        }
        if (response.status === 200) {
            if (pan && name) {

            }
        }
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const renewToken = async () => {
    const refresh = localStorage.getItem('refreshtoken')
    console.log(refresh)
    try {
        console.log("getting a new refresh token")
        const response = await axios.post(BASEURL + config.renewTokenLink, { refresh })
        console.log(refresh.data.access)
        localStorage.setItem("refreshtoken",response.data.access)
    } catch (error) {

    }
}