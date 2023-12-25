import React, { useEffect, useState } from 'react'
import { getHoldings } from '../../../services/apiservices.jsx/apiintegration';
import CryptoCoin from '../../../components/common/cryptocoin';
import { set } from 'react-hook-form';

function MyHoldings() {
    const [currentPrice, setCurrentPrice] = useState();
    const [holding, setHolding] = useState([]);
    const [name, setName] = useState();
    const [fullName, setFullName] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [holdingValue, setHoldingValue] = useState();

    useEffect(() => {
        const getCoinHoldings = async () => {
            try {
                const response = await getHoldings()
                console.log(response.data.MyHoldings[0][1])
                setHoldingValue(response.data.MyHoldings)
            } catch (error) {
                console.log(error)
                throw (error)
            }
        }
        getCoinHoldings()
    }, [])
    return (
        <div className='mt-4 overflow-y-auto h-screen scrollbar-hide sm:w-80 w-screen min-w-0'>
            {
                holdingValue && holdingValue.map((item, index) => (
                    <div key={index}>
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