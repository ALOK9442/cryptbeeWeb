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
        const { access: accessToken } = store.getState().auth;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        console.log(config.accessToken)
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
        console.log("error:",error)
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("trying for refresh token")
                const { refresh: refreshToken } = store.getState().auth;
                const response = await axios.post(config.BASEURL + config.renewTokenLink, { refreshToken });
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                store.dispatch(login({ access: response.data.access, refresh: response.data.refresh }));
                return api(originalRequest);
            } catch (error) {
                console.log("logout")
                store.dispatch(logout());
                throw error;
            }
        }
        throw error;
    }
);

export default api;
