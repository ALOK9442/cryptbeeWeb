import axios from "axios";
import store from "../store/store";
import { login, logout } from "../store/slices/authslice";
import config from "../config/config";

const api = axios.create({
    baseURL: config.BASEURL,
})

// checking that the calls reaching to api interceptors
console.log("in the api interceptor")
api.interceptors.request.use(
    (config) => {
        console.log("in the request")
        // const { access: accessToken } = store.getState().auth.accesstoken;
        const accessTokenItem = localStorage.getItem("accessToken");
        if (accessTokenItem !== null) {
            const accessToken = accessTokenItem;
            console.log("in the access token", accessToken)
            if (accessToken) {
                console.log(accessToken)
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        console.log(config.headers)
        return config;
    },
    (error) => {
        console.log(error)
        throw error;
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log("Error Response:", error);

        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("Trying for refresh token");
                // const { refresh: refreshToken } = store.getState().auth;
                const refreshTokenItem = localStorage.getItem("refreshToken");
                console.log(refreshTokenItem)
                const response = await axios.post(config.BASEURL + config.renewTokenLink, { refreshToken: refreshTokenItem });
                localStorage.setItem("accessToken", response.data.access);
                console.log("new access", response.data.access)
                console.log("new refresh", response.data.refresh)
                localStorage.setItem("refreshToken", response.data.refresh);
                originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                store.dispatch(login({ access: response.data.access, refresh: response.data.refresh }));
                return api(originalRequest);
            } catch (refreshError) {
                console.log("Error refreshing token:", refreshError);
                store.dispatch(logout());
                throw refreshError;
            }
        }
        throw error;
    }
);

export default api;
