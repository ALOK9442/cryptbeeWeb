import React from 'react'
import { Link } from 'react-router-dom'

function InvestTabNav() {
  return (
    <div>
      <div className='flex justify-around w-screen'>
        <Link to="">
          <h1>All</h1>
        </Link>
        <Link to="">
          <h1>MyHoldings</h1>
        </Link>
        <Link to="">
          <h1>Watchlist</h1>
        </Link>
      </div>
    </div>
  )
}

export default InvestTabNav