import React, { useEffect, useState } from 'react'
import { getTransactions } from '../../../../services/apiservices.jsx/apiintegration'
import config from '../../../../config/config'

function TransactionHistory() {
  const URL = config.WEBSOCKETURL
  const accessTokenItem = localStorage.getItem("accessToken");
  const [transactionData, setTransactionData] = useState()
  const [wallet, setWallet] = useState()
  const [holdings, setHoldings] = useState()
  const [total, setTotal] = useState()

  const fetchTransactionsHistory = async () => {
    const response = await getTransactions();
    // console.log(response.data.transactions[0])
    const value = response.data.transactions
    // console.log(value)
    if (response) {
      // console.log(value)
      setTransactionData(value)
      // console.log(transactionData)
    }
  }



  useEffect(() => {
    fetchTransactionsHistory()

    const ws = new WebSocket(URL);

    ws.onopen = () => {
      console.log("opened")
      ws.send(accessTokenItem)
    }

    ws.onmessage = (e) => {
      console.log(e.data)
      const value = e.data;
      // console.log("value", value.wallet)
      if (value === "invalid token") {
        console.log("invalid token");
        // try {
        //   const newAccessToken = await renewTokenAndSend();
        //   console.log("new access", newAccessToken)
        //   ws.send(newAccessToken)
        // } catch (error) {
        //   console.log(error);
        //   // Handle error appropriately, e.g., redirect to login page
        // }
      } else if (value === "authorised, enter ALL or name of the coin ,PROFIT to get current holdings") {
        ws.send("PROFIT");
      }
      else {
        // console.log("wallet information", value)
        const response = JSON.parse(e.data);
        console.log(response.wallet)
        setWallet(response.wallet)
        console.log(wallet)
        setHoldings(response.holdings_value)
        console.log(holdings)
        setTotal(response.total)
        console.log(total)
      }
    }
    const cleanUp = () => {
      console.log("closed");
      ws.close();
    }
    return () => {
      cleanUp();
    };
    // }

  }, [accessTokenItem])

  const totalLoss = 0;
  const totalProfit = 0;

  const profitAndLoss = () => {

  }

  return (
    <>
      <div className='w-80'>
        <div className='space-y-4 mt-8 w-80'>
          <div className='justify-between'>
            Total Loss  <span>{totalLoss}</span>
          </div>
          <div>
            <p className='text-xs'>Total Wallet Balance</p>
            <div className='text-3xl'>{totalProfit}</div>
          </div>
          <div>
            <p className='text-xs'>Total Standings  </p>
            <div className='text-3xl'>{totalProfit}</div>
          </div>
        </div>
        <p className='text-3xl'>Transaction History</p>
        <div className='space-y-6 mt-4 max-h-[20rem] overflow-y-auto'>
          {
            transactionData && transactionData.map((item, index) => (
              <div key={index} className='bg-black border-solid h-16 flex items-center border-2 rounded-md text-s text-left truncate'>
                <p>{item}</p>
              </div>
            )
            )
          }
        </div>
      </div>
    </>
  )
}

export default TransactionHistory