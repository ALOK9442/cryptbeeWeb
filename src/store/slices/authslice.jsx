import { createSlice, isAction } from "@reduxjs/toolkit"

// const accesstoken = localStorage.getItem('accesstoken') ? localStorage.getItem('accesstoken') : null
// const refreshtoken = localStorage.getItem('refreshtoken') ? localStorage.getItem('refreshtoken') : null
const initialState = {
    isAuthenticated,
    accesstoken,
    refreshtoken,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            isAuthenticated = true;
            state.accesstoken = action.payload.access;
            state.refreshtoken = action.payload.refresh;
        },
        logout: (state, action) => {
            isAuthenticated = false;
            state.accesstoken = null;
            state.refreshtoken = null;
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer