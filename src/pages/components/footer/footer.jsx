import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
    return (
            <div className='flex justify-evenly bg-black rounded-xl p-4 left-2 right-2 z-10 text-amber-500'>
                <Link to="/home">
                    <h1>Home</h1>
                </Link>
                <Link to="/home/invest">
                    <h1>Invest</h1>
                </Link>
                <Link to="/home/wallet">
                    <h1>Wallet</h1>
                </Link>
                <Link to="/home/profile">
                    <h1>Profile</h1>
                </Link>
            </div>
    )
}

export default Footer