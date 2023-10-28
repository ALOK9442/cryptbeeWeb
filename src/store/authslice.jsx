import { createSlice } from "@reduxjs/toolkit"
import { userLogin } from "./authactions"
import { userRegister } from "./authactions"

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null
const initialState = {
    user: null,
    token,
    loading: false,
    error: null,
    success: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) {
            state.user = action.payload
        },
        logout(state) {
            state.user = null
            state.token = null
            state.success = null
            state.error = null
            state.loading = false
            localStorage.removeItem('token')
        }
    },
    extraReducers: {
        [userLogin.pending]: (state, action) => {
            state.loading = true
            state.error = null
        },
        [userLogin.fulfilled]: (state, action) => {
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.token
            state.success = true
        },
        [userLogin.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [userRegister.pending]: (state, action) => {
            state.loading = true
            state.error = null
        },
        [userRegister.fulfilled]: (state, action) => {
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.token
            state.success = true
        },
        [userRegister.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer