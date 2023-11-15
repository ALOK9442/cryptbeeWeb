import axios from "axios";
import config from "../../config/config";
// import { createAsyncThunk } from "@reduxjs/toolkit";

const BASEURL = config.BASEURL

export const userLogin = async (email, password) => {
    try {
        console.log("trying to signIn");
        const response = await axios.post(BASEURL + config.signInLink, { email, password });
        console.log(response.data.message)
        return response;
    } catch (error) {
        console.log(error);
        throw (error);
    }
}

export const signUpUser = async (email, password) => {
    try {
        console.log("trying to signUp");
        const response = await axios.post(BASEURL + config.signUpLink, { email, password });
        return response;
    } catch (error) {
        console.log(error)
        throw (error)
    }
}