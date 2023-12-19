import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCoin:"",
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

export const {setCurrentCoin,setCoins} = coinSlice.actions;
export default coinSlice.reducer;