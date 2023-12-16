import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";
import userReducer from "./slices/userslice";
import coinReducer from "./slices/coinslice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        coin: coinReducer,
    },
});

export default store;