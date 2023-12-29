import React, { useEffect, useState } from 'react'
import { getCoinDetails, getHoldings } from '../../../services/apiservices.jsx/apiintegration';
import CryptoCoin from '../../../components/common/cryptocoin';
import { useNavigate } from 'react-router-dom';


function MyHoldings() {
    const [name, setName] = useState(() => {
        // Initialize the state with the stored value from local storage or an empty array
        const storedNames = JSON.parse(localStorage.getItem('coinNames')) || [];
        return storedNames;
    });
    const [holdingValue, setHoldingValue] = useState();

    const getCoinName = async (coinName) => {
        try {
            const response = await getCoinDetails(coinName)
            // console.log(response.data)
            console.log(name)
            return response.data.FullName;
            
        }
        catch (error) {
            console.log(error)
            throw (error)
        }
    }

    const getCoinHoldings = async () => {
        try {
            const response = await getHoldings()
            console.log(response.data.MyHoldings[0][1])
            setHoldingValue(response.data.MyHoldings)
            console.log(response.data.MyHoldings[0][0])
        } catch (error) {
            console.log(error)
            throw (error)
        }
    }
    useEffect(() => {

        getCoinHoldings()
    }, [])

    useEffect(() => {
        const updateCoinNames = async () => {
            if (holdingValue) {
                try {
                    const coinNames = await Promise.all(
                        holdingValue.map(async (item) => {
                            const coinName = item[0];
                            const fullName = await getCoinName(coinName);
                            return fullName;
                        })
                    );

                    setName(coinNames);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        updateCoinNames();
    }, [holdingValue]);

    useEffect(() => {
        localStorage.setItem('coinNames', JSON.stringify(name));
    }, [name]);
    // const handleSellClick = () => {
    //     console.log("Sell Clicked")
    // }

    return (
        <div className='mt-8 overflow-y-auto h-3/5 scrollbar-hide sm:w-80 w-screen min-w-0'>
            {
                holdingValue && holdingValue.map((item, index) => (

                    <div key={index} className='w-80' >
                        <CryptoCoin
                            key={index}
                            name={item[0]}
                            fullName={name[index]}
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