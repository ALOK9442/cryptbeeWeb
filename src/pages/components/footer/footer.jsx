import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
            <div className='flex justify-evenly bg-black rounded-xl p-4 left-2 right-2 z-10 text-amber-500'>
                <Link to="/home" className='footer'>
                    <h1>Home</h1>
                </Link>
                <Link to="/home/invest" className='footer'>
                    <h1>Invest</h1>
                </Link>
                <Link to="/home/wallet" className='footer'>
                    <h1>Wallet</h1>
                </Link>
                <Link to="/home/profile" className='footer'>
                    <h1>Profile</h1>
                </Link>
            </div>
    )
}

export default Footer