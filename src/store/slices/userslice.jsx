import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    photo: "https://crypt-bee.centralindia.cloudapp.azure.com/media/profile.jpg",
    name: "",
    fullname: "",
    email: "",
    pan: "",
    phone: "",
    phoneVerified: false,
    twoFactor: false,
    panVerify: false,
    wallet: 0,
    otp: "",
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        userDetails: (state, action) => {
            state.photo = action.payload.profile_picture;
            state.name = action.payload.name;
            state.panVerify = action.payload.pan_verification;
            state.pan = action.payload.pan_number;
            state.wallet = action.payload.walltet;
            state.email = action.payload.email;
        },

        panVerified: (state, action) => {
            state.panVerify = true
            state.name = action.payload.name
            state.pan = action.payload.pan_number
        },

        updateProfilePhoto: (state, action) => {
            state.photo = action.payload.profile_picture
        },

        setForgotPassEmail: (state, action) => {
            state.email = action.payload;
        },

        setOtp: (state, action) => {
            state.otp = action.payload
        },

        checkVerification: (state, action) => {
            state.panVerify = true;
            state.pan = action.payload.pan;
        }
    }
})

export const { panVerified, updateProfilePhoto, setForgotPassEmail, setOtp, checkVerification, userDetails } = userSlice.actions

export default userSlice.reducer