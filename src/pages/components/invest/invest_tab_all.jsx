import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../../config/config';
import { setCoins } from '../../../store/slices/coinslice';
import CryptoCoinInvest from '../../../components/common/crypto_coin_invest';


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
        console.log("not open")
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
      try{
      const value = e.data;
      console.log(value)
      console.log(typeof (value))

      if (value === "invalid token") {
        // console.log("invalid token");
      } else if (value === "authorised, enter ALL or name of the coin ,PROFIT to get current holdings") {
        // console.log("all")
        ws.send("ALL");
      }
      else {
        // console.log('Received data:', value);
        const response = JSON.parse(e.data);
      // const responseData = JSON.parse(value);
      console.log(typeof response.data)
      console.log(response.data[0].FullName);
      setData(response.data);
        dispatch(setCoins(value));
      }
    }catch(error){
      console.log(error)
    }
  }
    return () => {
      cleanup();
    };
  }, [accessToken]);



  return (
      <div className='mt-8 overflow-y-auto scrollbar-hide sm:w-80 w-screen min-w-0'>
        {data && data.map((item, index) => (
          <div key={index}>
            <CryptoCoinInvest
              name={item.Name}
              fullName={item.FullName}
              imageUrl={item.ImageURL}
              currentPrice={item.Price}
              currentHolding={item.ChangePct}
            />
          </div>
        ))}
      </div>
  )
}

export default InvestTablAll;
