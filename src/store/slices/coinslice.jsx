import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCoin:"",
    holdingIndex,
    watchListIndex,
    coins:[],
}

const coinSlice = createSlice ({
    name:"coin",
    initialState,
    reducers:{
        setCurrentCoin :(state,action)=>{
            state.currentCoin= action.payload;
        },  
        setCoins:(state,action)=>{
            state.coins=action.payload;
        },
    }
})