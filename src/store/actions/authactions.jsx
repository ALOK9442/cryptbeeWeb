import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config/config";

const URL = config.BASEURL;

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(`${URL}/api/auth/login`, { email, password }, response)
            localStorage.setItem('token', data.token)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const userRegister = createAsyncThunk(
    'user/register',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post(`${URL}/api/auth/register`, { email, password }, response)
            localStorage.setItem('token', data.token)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)