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
    otp:"",
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        panVerified: (state, action) => {
            state.panVerify = true
            state.name = action.payload.name
            state.pan = action.payload.pan
        },

        updateProfilePhoto:(state,action) =>{
            state.photo = action.payload.photo
        },

        setForgotPassEmail: (state, action) => {
            state.email = action.payload;
        },

        setOtp:(state,action)=>{
            state.otp = action.payload
        }
    }
})

export const { panVerified, updateProfilePhoto,setForgotPassEmail,setOtp } = userSlice.actions

export default userSlice.reducer