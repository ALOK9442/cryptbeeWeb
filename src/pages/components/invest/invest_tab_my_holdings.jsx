import React, { useEffect, useState } from 'react'
import { getCoinDetails, getHoldings } from '../../../services/apiservices.jsx/apiintegration';
import CryptoCoin from '../../../components/common/cryptocoin';
import { useNavigate } from 'react-router-dom';
import { get } from 'react-hook-form';

function MyHoldings() {
    const navigate = useNavigate()
    const [currentPrice, setCurrentPrice] = useState();
    const [holding, setHolding] = useState([]);
    const [name, setName] = useState([]);
    const [fullName, setFullName] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [holdingValue, setHoldingValue] = useState();

    const getCoinName = async (coinName) => {
        try {
            const response = await getCoinDetails(coinName)
            console.log(response.data)
            setName(response.data.FullName)
            console.log(name)
        }
        catch (error) {
            console.log(error)
            throw (error)
        }
    }
    useEffect(() => {
        const getCoinHoldings = async () => {
            try {
                const response = await getHoldings()
                console.log(response.data.MyHoldings[0][1])
                setHoldingValue(response.data.MyHoldings)
                setName(response.data.MyHoldings[0][0])
                console.log(response.data.MyHoldings[0][0])
                {
                    holdingValue && holdingValue.map((item, index) => {
                        console.log(item[0])
                        getCoinName(item[0])
                    })
                }
            } catch (error) {
                console.log(error)
                throw (error)
            }
        }
        getCoinHoldings()
    }, [])

    // const handleSellClick = () => {
    //     console.log("Sell Clicked")
    // }

    return (
        <div className='mt-8 overflow-y-auto h-3/5 scrollbar-hide sm:w-80 w-screen min-w-0'>
            {
                holdingValue && holdingValue.map((item, index) => (
                    
                        <div key={index}  className='w-80'>
                            <CryptoCoin
                                key={index}
                                name={item[0]}
                                fullName={item[0]}
                                imageUrl={item[1]}
                                currentPrice={0}
                                currentHolding={item[2]}
                            />
                        </div>

                ))
            }
        </div>
    )
}

export default MyHoldings