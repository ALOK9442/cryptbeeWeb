import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function InvestTablAll() {
  const [data, setData] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket('ws://cryptbee.anshumannandan.tech:8001');
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
      // else if (value === "connection established, send token to recieve data") {
      //   console.log("sending token")
      //   console.log("accessss",accessToken)
      //   ws.send(accessToken)
      // } 
      else {
        // const data = JSON.parse(value);
        // console.log(data)
        // dispatch(setCoins(data));
        console.log('Received data:', value);
        // dispatch(setCoins(value));
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

  return <div>InvestTablAll</div>;
}

export default InvestTablAll;
