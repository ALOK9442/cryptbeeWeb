import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./slices/authslice";

const store = configureStore({
    reducer: {
        auth: authreducer,

    },
});

export default store;