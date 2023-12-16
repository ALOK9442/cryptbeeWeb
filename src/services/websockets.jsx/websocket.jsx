import config from "../../config/config";
import config from "../../config/config";
import api from "../../components/api";
import { useDispatch } from "react-redux";
import { setCoins } from "../../store/slices/coinslice";

const BASEURL = config.BASEURLWS;
const dispatch = useDispatch();

const renewTokenAndSend = async () => {
    const refreshTokenItem = localStorage.getItem("refreshToken");
    try {
        const response = await api.post(config.renewTokenLink, { refreshTokenItem });
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        return response.data.access;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const allCoinsSocket = ( accessToken) => {

    const sendMessage = (message) => {
        if (socket.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    }
    const ws = new WebSocket(BASEURL);
    ws.onopen = () => {
        console.log("opened");
        ws.send(accessToken)
    }
    ws.onmessage = (e) => {
        console.log(e.data)
        const value = e.data;
        if (value == "invalid token") {
            console.log("invalid token")
            renewTokenAndSend();
        } else if (value ==
            "authorised, enter ALL or name of the coin ,PROFIT to get current holdings") {
            sendMessage("ALL");
        } else {
            // const data = JSON.parse(value);
            // console.log(data)
            // dispatch(setCoins(data));
            console.log('Received data:', value);
            dispatch(setCoins(value));
        }
    }
    const cleanup = () => {
        console.log("closed");
        ws.close();
    }
    return { cleanup };

}

export const singleCoinSocket = (accessToken, coin) => {
    const ws = new WebSocket(BASEURL);
    const sendMessage = (message) => {
        if (socket.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    }
    ws.onopen = () => {
        console.log("opened");
        ws.send(accessToken)
    }
    ws.onmessage = (e) => {
        console.log(e.data)
        const value = e.data;
        if (value == "invalid token") {
            console.log("invalid token")
            renewTokenAndSend();
        } else if (value ==
            "authorised, enter ALL or name of the coin ,PROFIT to get current holdings") {
            sendMessage("PROFIT")
        } else {
            console.log('Received data:', value);
            dispatch(setCoins(value));
        }
    }
    const cleanup = () => {
        console.log("closed");
        ws.close();
    }
    return { cleanup };

}


export const walletSocket = (accessToken) => {
    const ws = new WebSocket(BASEURL);
    const sendMessage = (message) => {
        if (socket.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    }
    ws.onopen = () => {
        console.log("opened");
        ws.send(accessToken)
    }
    ws.onmessage = (e) => {
        console.log(e.data)
        const value = e.data;
        if (value == "invalid token") {
            console.log("invalid token")
            renewTokenAndSend();
        } else if (value ==
            "authorised, enter ALL or name of the coin ,PROFIT to get current holdings") {
            dispatch(setCurrentCoin(value));
        } else {
            console.log('Received data:', value);
            dispatch(setCoins(value));
        }
    }
    const cleanup = () => {
        console.log("closed");
        ws.close();
    }
    return { cleanup };
}