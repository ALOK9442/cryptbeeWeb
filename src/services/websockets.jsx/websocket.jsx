import config from "../../config/config";
import config from "../../config/config";
import axios from "axios";
import store from "../../redux/store";
import api from "../../components/api";

const BASEURL = config.BASEURLWS;

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

const allCoinsSocket = (url, accessToken) => {
    const ws = new WebSocket(BASEURL + url);

    ws.onopen = () => {
        console.log("opened");
        ws.send(accessToken)
    }
    ws.onmessage = (e) => {
        console.log(e.data)
        const value = e.data;
        if (value == "connection established, send token to recieve data") {
            
          } else if (value == "invalid token") {
            
          } else if (value ==
              "authorised, enter ALL or name of the coin ,PROFIT to get current holdings") {
            
          } else {
           
          }
    }
    const cleanup = () => {
        console.log("closed");
        ws.close();
    }
    return { cleanup };

}

