import React, { useEffect, useState, useRef } from 'react';
import config from '../../config/config';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ChartCombined = ({coin}) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Coin Prices',
        backgroundColor: 'rgba(75,192,192,1)',
        fill: false,
        lineTension: 0.5,
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [],
      },
    ],
  });

  const chartOptions = {
    title: {
      display: false,
      text: 'Class Strength',
      fontSize: 20,
    },
    legend: {
      display: false,
      position: 'right',
    },
  };

  const accessToken = localStorage.getItem('accessToken');
  const URL = config.WEBSOCKETURL;
  const currentCoin = localStorage.getItem('currentCoin');

  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket(URL);

    const cleanup = () => {
      console.log('closed');
      wsRef.current.close();
    };

    wsRef.current.onopen = () => {
      console.log('opened');
      console.log(accessToken);
      wsRef.current.send(accessToken);
    };

    wsRef.current.onmessage = async (e) => {
      console.log('blah', e.data);
      const value = e.data;
      console.log('value', value);

      if (value === 'invalid token') {
        console.log('invalid token');
      } else if (value === 'authorised, enter ALL or name of the coin, PROFIT to get current holdings') {
        console.log('all');
        wsRef.current.send(coin);
      } else {
        const newData = value;
        console.log('Received data:', newData);
        const parsedData = JSON.parse(newData);
        console.log(parsedData.data.Price);

        setChartData((prevChartData) => {
          // Keeping only the latest 5 time points
          const latestLabels = [...prevChartData.labels, new Date().toLocaleTimeString()].slice(-5);
          const latestPrices = [...prevChartData.datasets[0].data, parsedData.data.Price].slice(-5);

          return {
            ...prevChartData,
            labels: latestLabels,
            datasets: [
              {
                ...prevChartData.datasets[0],
                data: latestPrices,
              },
            ],
          };
        });
      }
    };

    return () => {
      cleanup();
    };
  }, [URL, accessToken, coin]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      wsRef.current.send(coin);
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [coin]);

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartCombined;
