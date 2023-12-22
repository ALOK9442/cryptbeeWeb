import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHoldings, getNews, getUser } from '../../../services/apiservices.jsx/apiintegration';
import { getCoinDetails } from '../../../services/apiservices.jsx/apiintegration';
import { useNavigate } from 'react-router-dom';
import { setCurrentCoin } from '../../../store/slices/coinslice';


function UserHolding() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [holdings, setHoldings] = useState([]);

    const authStatus = useSelector(state => state.auth.isAuthenticated);
    console.log(authStatus);
    const panStatus = useSelector(state => state.user.panVerify)
    console.log(panStatus)

    const onClick = async(value) => {
        console.log(value)
        const response = await getCoinDetails(value)
        console.log(response.data)
        localStorage.setItem("currentCoin",value)
        dispatch(setCurrentCoin(value))

        // navigate(`/coin/${value}`)
        navigate("/home/coins")     
    }

    useEffect(() => {
        console.log("1")
        const getUserHolding = async () => {
            console.log("getuserholding")
            try {
                console.log("trying to get holdings")
                const response = await getHoldings();
                const output = response.data;
                console.log("output",output)
                setHoldings(response.data.MyHoldings)
            } catch (error) {
                console.log(error)
            }
        }

        console.log("2")
            getUserHolding();
    }, []);


    return (

        <div className='space-y-2 mt-2'>
            <div className=''>
                <h1> My Holdings</h1>
            </div>
            <div className='flex flex-wrap space-x-2'>
                {holdings &&
                    holdings.map((item, index) => (
                        <div key={index} className='mt-4'>
                            <img src={`https://www.${item[1]}`} alt='coin-img' className='w-12 h-12' onClick={(e)=>{onClick(item[0])}} />
                        </div>
                    ))
                }
            </div>
        </div>

    );

}

export default UserHolding;
