import config from "../../config/config"
import axios from "axios"
import api from "../../components/api"
import userslice from "../../store/slices/userslice"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"

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
        const fileName = photo.name.replace(/\.[^/.]+$/, "");
        formData.append('profile_picture', photo, `${fileName}.jpg`);
        console.log(typeof (formData))
        const response = await api.put(config.updateProfilePhoto, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        console.log(response);
        return response;

    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const getHoldings = async () => {
    console.log("ggetting holdings")
    try {
        console.log("Trying to get holdings of the  user")
        const response = await api.get(BASEURL + config.holdingApiLink)
        console.log(response.data)
        return response;
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const getUser = async () => {
    console.log("getting user details")
    try {
        console.log("in trying")
        const response = await api.get(config.userDetails)
        console.log(response.data)
        return response;
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const watchings = async (coinName) => {
    try {
        console.log("watching")
        const response = await api.get(config.inWatchlist + coinName,
            {
                headers: {
                    'content-type': 'application/json'
                },
            }
        )
        console.log(response.data)
        return response
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const modifyWatchlist = async (msg, currentCoin) => {
    try {
        console.log(`modifying watchlist ${msg} ${currentCoin}`)
        if (msg === 'add') {
            console.log("adding")
            const response = await api.post(config.modifyWatchlist, {
                "add": true,
                "watchlist": currentCoin
            },
                {
                    headers: {
                        'content-type': 'application/json'
                    },
                }
            )
            console.log(response)
            return response
        } else {
            console.log("removing")
            const response = await api.post(config.modifyWatchlist, {
                "remove": true,
                "watchlist": currentCoin
            },
                {
                    headers: {
                        'content-type': 'application/json'
                    },
                }
            )
            console.log(response)
            return response
        }
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const getTransactions = async () => {
    try {
        console.log("trying to get transactions history")
        const response = api.get(config.transactionLink,
            {
                headers: {
                    'content-type': 'application/json'
                },
            }
        )
        console.log(response.data)
        return response
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const getCoinDetails = async (coinName) => {
    try {
        console.log(`trying to get coin details${coinName}`)
        const response = await api.get(config.coinDetailsLink + coinName,
            {
                headers: {
                    'content-type': 'application/json'
                },
            }
        )
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const buyCoin = async (coinName, quantity) => {
    try {
        console.log(`trying to buy coin ${coinName} ${quantity}`)
        const response = await api.post(config.buyCoinLink, {
            coinName, quantity
        },
            {
                headers: {
                    'content-type': 'application/json'
                },
            }
        )
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export const sellCoin = async (coinName, quantity, amount) => {
    try {
        console.log(`trying to sell coin ${coinName} ${quantity} ${amount}`)
        const response = await api.post(config.sellCoinLink, {
            coinName, quantity, amount
        },
            {
                headers: {
                    'content-type': 'application/json'
                },
            }
        )
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        throw (error)
    }
}