import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
    const handleClick = () => {
        console.log("clicked")
    }
    return (
        <div>
            <div className='flex items-center justify-evenly bg-black rounded-xl p-4 sticky bottom-0 left-2 right-2 z-10 text-amber-500'>
                <Link to="/home">
                    <h1>Home</h1>
                </Link>
                <Link to="/home/invest">
                    <h1 onClick={()=>handleClick()}>Invest</h1>
                </Link>
                <Link to="/home/wallet">
                    <h1>Wallet</h1>
                </Link>
                <Link to="/home/profile">
                    <h1>Profile</h1>
                </Link>
            </div>
        </div>
    )
}

export default Footer