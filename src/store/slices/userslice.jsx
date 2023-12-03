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
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        panVerified: (state, action) => {
            state.panVerify = true
            state.fullname = action.payload.fullname
            state.pan = action.payload.pan
        }
    }
})

export const { panVerified } = userSlice.actions

export default userSlice.reducer