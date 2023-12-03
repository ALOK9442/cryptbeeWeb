import { createSlice, isAction } from "@reduxjs/toolkit"

const accesstoken = localStorage.getItem('accesstoken') ? localStorage.getItem('accesstoken') : null
const refreshtoken = localStorage.getItem('refreshtoken') ? localStorage.getItem('refreshtoken') : null
const initialState = {
    isAuthenticated: null,
    accesstoken,
    refreshtoken,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.accesstoken = action.payload.access;
            state.refreshtoken = action.payload.refresh;
        },
        logout: (state, action) => {
            state.isAuthenticated = false;
            state.accesstoken = null;
            state.refreshtoken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        }
    }
})

export const { login, logout, setEmail } = authSlice.actions

export default authSlice.reducer