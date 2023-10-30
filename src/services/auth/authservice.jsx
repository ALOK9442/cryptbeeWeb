import { createApi } from '@reduxjs/toolkit/query'
import axios from 'axios'
import config from '../../config/config'

const BASEURL = config.BASEURL

const axiosBaseQuery = ({ baseUrl }) => async ({ url, method, data, params, headers }) => {
    try {
        const result = await axios({
            url: baseUrl + url,
            method,
            data,
            params,
            headers,
        })

        return { data: result.data }
    } catch (axiosError) {
        const error = axiosError
        return {
            error: {
                status: error.response?.status,
                error: error.response?.data || error.message,
            },
        }
    }
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery({ baseUrl: BASEURL }),
    endpoints: (builder) => ({
        getDetails: builder.query({
            query: (userId) => ({
                url: `/api/auth/${userId}`,
                method: 'GET',
            
            }),
        }),
        // userLogin: builder.mutation({
        //     query: ({ email, password }) => ({
        //         url: '/api/auth/login',
        //         method: 'POST',
        //         data: { email, password },
        //     }),
        // }),
        // userRegister: builder.mutation({
        //     query: ({ email, password }) => ({
        //         url: '/api/auth/register',
        //         method: 'POST',
        //         data: { email, password },
        //     }),
        // }),
    }),
})