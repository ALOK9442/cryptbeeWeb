import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../../config/config';
import { setCoins } from '../../../store/slices/coinslice';
function InvestTablAll() {
  const [data, setData] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const dispatch = useDispatch();
  const URL = config.WEBSOCKETURL
  console.log(URL)

  useEffect(() => {
    const ws = new WebSocket(URL);
    const sendMessage = (message) => {

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
      else {
        console.log("not open")
      }
    }
    const cleanup = () => {
      console.log("closed");
      ws.close();
    }
    ws.onopen = () => {
      console.log("opened");
      console.log(accessToken)
      ws.send(accessToken)
    }
    ws.onmessage = async (e) => {
      console.log("blah", e.data)
      const value = e.data;
      console.log("value", value)
      setData(value);
      if (value === "invalid token") {
        console.log("invalid token");
      } else if (value === "authorised, enter ALL or name of the coin ,PROFIT to get current holdings") {
        console.log("all")
        ws.send("ALL");
      } 
      else {
        console.log('Received data:', value);
        dispatch(setCoins(value));
      }
    }
    // ws.onmessage = (e) => {
    //   const value = e.data;
    //   console.log('Data after sending "ALL":', value);
    //   // Handle the data after sending "ALL"
    // }
    // ws.onclose = () => {
    //   cleanup();
    // };

    return () => {
      cleanup();
    };
  }, [accessToken]);


  // useEffect(() => {
  //   allCoinsSocket(accessToken);
  //   const ws = allCoinsSocket(accessToken);
  //   // closeWebSocket WebSocket connection when component unmounts
  //   return () => {
  //     console.log('closed');
  //     ws.close(); // Invoke the cleanUp function to close the WebSocket
  //   };
  // }, [accessToken]);

  return <div>InvestTablAll</div>;
}

export default InvestTablAll;
