import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCoin:"",
    holdingIndex,
    watchListIndex
}

const coinSlice = createSlice ({
    name:"coin",
    initialState,
    reducers:{
        buyCoin :(state,action)=>{
            state.currentCoin= action.payload.currentCoin
        }   
    }
})