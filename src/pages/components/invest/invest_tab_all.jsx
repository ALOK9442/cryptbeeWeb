import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../../config/config';
import { setCoins } from '../../../store/slices/coinslice';
import InvestTabNav from './invest_tab_nav';
import CryptoCoin from '../../../components/common/cryptocoin';


function InvestTablAll() {
  const [data, setData] = useState();
  const accessToken = localStorage.getItem('accessToken');
  const dispatch = useDispatch();
  const URL = config.WEBSOCKETURL
  // console.log(URL)

  useEffect(() => {
    const ws = new WebSocket(URL);
    const sendMessage = (message) => {

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
      else {
        // console.log("not open")
      }
    }
    const cleanup = () => {
      // console.log("closed");
      ws.close();
    }
    ws.onopen = () => {
      // console.log("opened");
      // console.log(accessToken)
      ws.send(accessToken)
    }
    ws.onmessage = async (e) => {
      const value = e.data;
      // const response = JSON.parse(e.data);
      // console.log("blah", response[0].Name)

      console.log(typeof value)
      if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
        const firstNameOfFirstCoin = value.data[0].Name;
        console.log(1)
        console.log(firstNameOfFirstCoin);
      }

      if (value === "invalid token") {
        // console.log("invalid token");
      } else if (value === "authorised, enter ALL or name of the coin ,PROFIT to get current holdings") {
        // console.log("all")
        ws.send("ALL");
      }
      else {
        // console.log('Received data:', value);
        dispatch(setCoins(value));
      }
    }
    return () => {
      cleanup();
    };
  }, [accessToken]);

  // console.log("in data field", data)


  return (
    <div>
      <div>
        {data && data.map((item, index) => (
          <div key={index}>
            <CryptoCoin
              name={item.Name}
              fullName={item.FullName}
              imageUrl={item.ImageURL}
              currentPrice={item.Price}
              currentHolding={item.Coins}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default InvestTablAll;
