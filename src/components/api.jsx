import axios from "axios";
import store from "../store/store";
import { login, logout } from "../store/slices/authslice";
import config from "../config/config";

const api = axios.create({
    baseURL: config.BASEURL,
})

api.interceptors.request.use(
    (config) => {
        const { access: accessToken } = store.getState().auth;
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=> {
        throw(error)
    }
);
api.interceptors.response.use(
    (response)=>{
        return response;
    },
    async (error) =>{
        const originalRequest = error.config;
        if(error.response.status===401 && !originalRequest._retry){
            originalRequest._retry = true;

            try {
                const {refresh: refreshToken} = store.getState().auth;
                const response = await axios.post(baseURL+config.renewTokenLink,{refreshToken})
                localStorage.setItem("token",response.data);
                originalRequest.headers.Authorization = `Bearer${response.data.access}`
                store.dispatch(login({access}))
                return(api(originalRequest))
            }catch(error){
                store.dispatch(logout())
                throw(error)
            }
        }
        throw(error)
    }
);

export default api