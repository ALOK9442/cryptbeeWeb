import React, { useEffect, useState } from 'react'
import { getCoinDetails } from '../../services/auth/authservice'
import { useSelector } from 'react-redux'

function CoinDetails() {
    const [coinName, setCoinName] = useState("")
    const [coinPrice, setCoinPrice] = useState("")
    const [changePct, setChangePct] = useState("")
    const [coinImg, setCoinImg] = useState("")
    const [coinDescription, setCoinDescriptiond] = useState("")

    const currentCoin = useSelector(state => state.coin.currentCoin)
    useEffect(() => {
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
            <div>
                <img src={`https://www.${coinImg}`} alt='coin-img' className='w-12 h-12' />
                <h1>{coinName}</h1>
                <h1>{coinPrice}</h1>
                <h1>{changePct}</h1>
                <h1>{coinDescription}</h1>
            </div>
        </>
    )
}

export default CoinDetails