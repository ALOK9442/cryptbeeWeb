import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    photo :"https://crypt-bee.centralindia.cloudapp.azure.com/media/profile.jpg",
    name : "",
    email : "",
    pan : "",
    phone:"",
    phoneVerified:false,
    twoFactor:false,
    panVerify:false,
    wallet : 0,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers :{
        
    }
})