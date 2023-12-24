import React, { useEffect, useState } from 'react'
import { getCoinDetails } from '../../services/apiservices.jsx/apiintegration'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import ChartCombined from './chart'
import { singleCoinSocket } from '../../services/websockets.jsx/websocket'
import config from '../../config/config'

function CoinDetails() {
    const [coinName, setCoinName] = useState("")
    const [coinPrice, setCoinPrice] = useState("")
    const [changePct, setChangePct] = useState("")
    const [coinImg, setCoinImg] = useState("")
    const [coinDescription, setCoinDescriptiond] = useState("")
    const accessToken = localStorage.getItem("accessToken")
    const currentCoin = localStorage.getItem("currentCoin") 
    const URL = config.WEBSOCKETURL


    useEffect(() => {
        
        console.log("in the coin details")
        const fetchCoinDetails = async () => {
            try {
                console.log("coin details")
                const response = await getCoinDetails(currentCoin);
                setCoinName(response.data.Name)
                setCoinPrice(response.data.Price)
                setChangePct(response.data.ChangePct)
                setCoinImg(response.data.Image)
                setCoinDescriptiond(response.data.Description)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        console.log(currentCoin)
        fetchCoinDetails()
       
    }, [])

    return (
        <>
            <div className='space-y-6 mt-8'>
                <div className='flex space-x-3 items-center'>
                    <img src={`https://www.${coinImg}`} alt='coin-img' className='w-12 h-12' />
                    <h1>{coinName}</h1>
                </div>
                {/* <ChartCombined /> */}
                <div className='flex space-x-6'>
                    <p>Prices</p>
                    <h1>{coinPrice}</h1>
                    <h1 className={`text-${changePct >= 0 ? 'green-500' : 'red-500'}`}>
                    <FontAwesomeIcon icon={changePct >= 0 ? faArrowUp:faArrowDown} />
                    {changePct}%</h1>
                </div>
                <p className=''>About</p>
                <div className='max-w-md mx-auto h-80 w-lg p-4 pl-0 scrollbar-hidden overflow-auto'>
                    <h1 className="text-1">{coinDescription}</h1>
                </div>
            </div>
        </>
    )
}

export default CoinDetails