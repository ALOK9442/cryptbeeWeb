import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCoin: "",
    coins: [],
    isOpen: false,
}

const coinSlice = createSlice({
    name: "coin",
    initialState,
    reducers: {
        setCurrentCoin: (state, action) => {
            state.currentCoin = action.payload;
        },
        setCoins: (state, action) => {
            state.coins = action.payload;
        },
        setIsOpen: (state, action) => {
            state.isOpen = true;
        },
        setIsClose: (state, action) => {
            state.isOpen = false;
        }
    }
})

export const { setCurrentCoin, setCoins, setIsClose, setIsOpen } = coinSlice.actions;
export default coinSlice.reducer;