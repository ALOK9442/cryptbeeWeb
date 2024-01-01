import React from 'react'
import { Link } from 'react-router-dom'

function InvestTabNav() {

  return (
    <div>
      <div className='flex justify-around w-screen'>
        <div>
          <Link to="" className='focus:underline focus:text-amber-500'>
            <h1>All</h1>
          </Link>
        </div>
        <div>
          <Link to="/home/invest/my-holdings" className='focus:underline focus:text-amber-500'>
            <h1>MyHoldings</h1>
          </Link>
        </div>
        <div>
          <Link to="watchlist" className='focus:underline focus:text-amber-500'>
            <h1 >Watchlist</h1>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InvestTabNav