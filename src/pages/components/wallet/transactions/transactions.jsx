import React, { useEffect, useState } from 'react'
import { getTransactions } from '../../../../services/apiservices.jsx/apiintegration'

function TransactionHistory() {
  const [transactionData, setTransactionData] = useState()

  useEffect(() => {
    const fetchTransactionsHistory = async () => {

      const response = await getTransactions();
      console.log(response.data.transactions[0])
      const value = response.data.transactions
      console.log(value)
      if (response) {
        console.log(value)
        setTransactionData(value)
        console.log(transactionData)
      }
    }
    fetchTransactionsHistory()
  }, [])

  return (
    <div>
      {
        transactionData && transactionData.map((item, index) => (
          <div key={index}>
            <p>{item}</p>
          </div>
        )
        )
      }
    </div>
  )
}

export default TransactionHistory