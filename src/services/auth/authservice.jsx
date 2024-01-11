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

export const signUpUser = async ( email, password ) => {
    try {
      console.log(`Began Sign Up Process For ${email} ${password}`);
      
      const response = await axios.post(
        BASEURL+ config.signUpLink,
        {
          "email": email,
          "password": password
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        }
      );
  
      const output = response.data;
      output.statusCode = response.status;
      
      console.log(output);
      return output;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error
        console.log(error.response?.data || error.message);
        return error.response?.data || error.message;
      } else if (error instanceof Error) {
        // Other types of errors
        console.log(error.message);
        return error.message;
      }
    }
  };

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

export const verifyPan = async ({ email, name, pan }) => {
    try {
        console.log(`verifying pan of email: ${email}, name: ${name}, pan: ${pan}`)
        const response = await api.post(BASEURL + config.panLink, { 'email': email, 'pan_number': pan, 'name': name },
            {
                headers: {
                    'content-type': 'application/json'
                },
            })
        console.log(response.data);
        return response;

    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const verifyEmail = async (email, token) => {
    try {
        console.log("trying to verify email")
        const response = await axios.post(BASEURL + config.verificationCheckerLink, {
            "email": email,
            "token": token,
            'onapp': false
        },
            {
                headers: {
                    'content-type': 'application/json'
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
        const response = await api.put(config.verifyTwoFactor, { otp },
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

export const enableTwoFa = async () => {
    console.log("2fa")
    try {
        console.log("2fa trying")
        const response = await api.put(config.enableTwoFactor,
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

export const disableTwoFa = async () => {
    console.log("disable2fa")
    try {
        console.log("trying disable2fa")
        const response = await api.put(config.disableTwoFactor, {
            headers: {
                'content-type': 'application/json'
            },
        })
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

