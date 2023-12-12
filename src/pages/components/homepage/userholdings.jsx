import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHoldings, getNews, getUser } from '../../../services/apiservices.jsx/apiintegration';
import { useId } from 'react';

function UserHolding() {
    const dispatch = useDispatch();
    const [holdings, setHoldings] = useState([]);

    const authStatus = useSelector(state => state.auth.isAuthenticated);
    console.log(authStatus);
    const id = useId();
    const panStatus = useSelector(state => state.user.panVerify)
    // const panStatus = true;
    console.log(panStatus)

    useEffect(() => {
        console.log("1")
        const getUserHolding = async () => {
            console.log("getuserholding")
            try {
                console.log("trying to get holdings")
                const response = await getHoldings();
                const output = response.data;
                console.log(output)
                setHoldings(response.data.MyHoldings)
            } catch (error) {
                console.log(error)
            }
        }

        console.log("2")
        //call both userholdings and fetchNews function if the 
        // if (authStatus && panStatus) {
            getUserHolding();
        // }
    }, []);

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return (

        <div className='space-y-2 mt-2'>
            <div className=''>
                <h1> My Holdings</h1>
            </div>
            <div className='flex flex-wrap space-x-2'>
                {holdings &&
                    holdings.map((item, index) => (
                        <div key={index} className='mt-4'>
                            <img src={`https://www.${item[1]}`} alt='coin-img' className='w-12 h-12' />
                        </div>
                    ))
                }
            </div>
        </div>

    );

}

export default UserHolding;
