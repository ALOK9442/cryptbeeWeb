import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null,
    isAuth: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuth = true
        },

        setToken(state, action) {
            state.token = action.payload
        },
        
        logout(state) {
            state.user = null
            state.token = null
            state.isAuth = false
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer