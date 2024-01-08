import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHoldings, getNews, getUser } from '../../../services/apiservices.jsx/apiintegration';
import { getCoinDetails } from '../../../services/apiservices.jsx/apiintegration';
import { useNavigate } from 'react-router-dom';
import { setCurrentCoin } from '../../../store/slices/coinslice';
import panVerifyImage from "../../../assets/illustrations/pan.svg"
import Button from '../../../components/common/button';

function UserHolding() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [holdings, setHoldings] = useState([]);

    const authStatus = useSelector(state => state.auth.isAuthenticated);
    console.log(authStatus);
    const panStatus = useSelector(state => state.user.panVerify)
    console.log(panStatus)

    const onClick = async (value) => {
        console.log(value)
        const response = await getCoinDetails(value)
        console.log(response.data)
        localStorage.setItem("currentCoin", value)
        dispatch(setCurrentCoin(value))

        // navigate(`/coin/${value}`)
        navigate("/home/coins")
    }

    const onClickPan = async () => {
        navigate("/verify-pan")
    }

    useEffect(() => {
        console.log("1")
        const getUserHolding = async () => {
            console.log("getuserholding")
            try {
                console.log("trying to get holdings")
                const response = await getHoldings();
                const output = response.data;
                console.log("output", output)
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
            {
                !panStatus ?
                    (
                        <div className='flex flex-col w-1/2 space-y-4'>
                            <div className=''>
                                <img src={panVerifyImage} alt='pan' className='w-full h-auto' />
                            </div>
                            <div className='justify-center items-center'>
                                <Button className='w-full'
                                    onClick={onClickPan}
                                >Verify your pan</Button>
                            </div>
                        </div>
                    ) :
                    (
                        <div className='flex flex-wrap flex-col space-x-2 space-y-2'>
                            <div className=''>
                                <h1> My Holdings</h1>
                            </div>
                            {
                                holdings.length > 0 ? (
                                    <div>
                                        {
                                            holdings.map((item, index) => (
                                                <div key={index} className='mt-4'>
                                                    <img src={`https://www.${item[1]}`} alt='coin-img' className='w-12 h-12' onClick={(e) => { onClick(item[0]) }} />
                                                </div>

                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div className='font-bold text-xl'>
                                        <h1>No Coins, Go Buy Some</h1>
                                    </div>
                                )
                            }
                        </div>
                    )
            }

        </div>

    );

}

export default UserHolding;
