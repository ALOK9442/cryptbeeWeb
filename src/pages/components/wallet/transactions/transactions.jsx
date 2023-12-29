import React, { useEffect, useState } from 'react'
import { getTransactions } from '../../../../services/apiservices.jsx/apiintegration'
import config from '../../../../config/config'
import soldIcon from '../../../../assets/illustrations/sold_icon.svg'
import boughtIcon from '../../../../assets/illustrations/bought_icon.svg'

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

  return (
    <>
      <div className='w-60 sm:w-80'>
        <div className='space-y-4 mt-8 w-60 sm:w-80'>
          <div className='flex justify-between'>
            {
              (wallet + holdings) - 10000 > 0 ? <p className='text-amber-500 text-xl'>Total Profit</p> : <p className='text-amber-500 text-xl'>Total Loss</p>
            }
            {
              (wallet + holdings) - 10000 > 0 ? <p className='text-green-500'>{(wallet + holdings - 10000).toFixed(2)}</p> : <p className='text-red-500'>{(wallet + holdings - 10000).toFixed(2)}</p>
            }
          </div>
          <div>
            <p className='text-xs'>Total Wallet Balance</p>
            <div className='text-3xl'>{wallet !== undefined ? wallet.toFixed(4) : ""}</div>
          </div>
          <div>
            <p className='text-xs text-amber-500'>Total Standings  </p>
            <div className='text-3xl'>{total !== undefined ? total.toFixed(2) : ''}</div>
          </div>
        </div>
        <p className='text-3xl mt-6'>Transaction History</p>
        <div className='space-y-6 mt-4 max-h-[16rem] overflow-y-auto'>
          {
            transactionData && transactionData.map((item, index) => (
              <div key={index} className='bg-black border-solid flex items-center border-2 rounded-md text-s text-left truncate'>
                <p className='flex'>{item[0] === 'B' ? <img src={boughtIcon} className='w-6 h-6' /> : <img src={soldIcon} className='w-6 h-6' />}{item}</p>
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