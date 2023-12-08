import config from "../../config/config"
import axios from "axios"
import api from "../../components/api"
import userslice from "../../store/slices/userslice"

const BASEURL = config.BASEURL

export const getNews = async () => {
    console.log("api get news")
    try {
        console.log("trying api get news")
        const response = await api.get(config.newsLink)
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const sendProfilePhoto = async (photo) => {
    try {
        const formData = new FormData();
        const file = new File([photo],'newProfile.img',{type:"image/jpeg"})
        formData.append('profile_picture',file);
        const response = await api.put(BASEURL + config.updateProfilePhoto,formData,{
            headers:{
                'Content-Type':'multipart/form-data',
            }
        })
        console.log(response);
        return response;

    } catch (error) {

    }
}

export const getHoldings = async () =>{
    console.log("ggetting holdings")
    try {
        console.log("Trying to get holdings of the  user")
        const response = await api.get(BASEURL+ config.holdingApiLink)
        console.log(response.data)
        return response;
    } catch (error) {
        console.log(error)
        throw(error)
    }
}

export const getUser = async()=>{
    console.log("getting user details")
    try {
        console.log("in trying")
        const response = await api.get(config.userDetails)
        console.log(response.data)
        return response;
    } catch (error) {
        console.log(error)
        throw(error)
    }
}