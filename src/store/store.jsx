import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";
import userReducer from "./slices/userslice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
});

export default store;