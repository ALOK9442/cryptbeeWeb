// ChartCombined.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../config/config';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const chartData = {
  labels: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  datasets: [
    {
      label: 'Class Strength',
      backgroundColor: [
        'Indigo',
        'Purple',
        'Yellow',
        'Teal',
        'Red',
        'Navy',
        'Brown',
      ],
      fill: false,
      lineTension: 0.5,
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [10, 14, 17, 16, 19, 16, 17],
    },
  ],
};

const chartOptions = {
  title: {
    display: true,
    text: 'Class Strength',
    fontSize: 20,
  },
  legend: {
    display: true,
    position: 'right',
  },
};

const URL = config.WEBSOCKETURL
useEffect(() => {
  const ws = new WebSocket(URL);

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
    //   setData(value);
    if (value === "invalid token") {
      console.log("invalid token");
    } else if (value === "authorised, enter ALL or name of the coin ,PROFIT to get current holdings") {
      console.log("all")
      ws.send(currentCoin);
    }
    else {
      console.log('Received data:', value);
      // dispatch(setCoins(value));
    }
  }
  return () => {
    cleanup();
  };
}, [])
const ChartCombined = () => {
  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartCombined;
