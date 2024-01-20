import React, { useState } from 'react';
import { buyCoin } from '../../services/apiservices.jsx/apiintegration';
import { useDispatch, useSelector } from 'react-redux';
import { setIsClose } from '../../store/slices/coinslice';
import Input from './input';


const BuyPopup = () => {
    const dispatch = useDispatch()
    const [amount, setAmount] = useState('');
    const isOpen = useSelector((state) => state.coin.isOpen);
    const currentCoin = localStorage.getItem("currentCoin")
    // console.log(amount)
    const handleChange = async(e) =>{
        setAmount(e.target.value)
    }
    const handleBuy = async () => {
        console.log(amount)
        console.log(currentCoin)
        try {
            console.log("trying to buy", amount)
            const response = await buyCoin(currentCoin, amount)
            console.log(response)
            console.log(amount)
        } catch (error) {
            console.log(error)
            throw (error)
        } finally {
            dispatch(setIsClose())
        }

        // Close the pop-up
        onClose();
    };

    const onClose = () => {
        setAmount('')
        dispatch(setIsClose())
    }

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-black p-8 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Do you want to buy</h2>
                <h2>Current Price</h2>
                <Input
                    type="number"
                    label="Amount"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-4 text-white"
                />
                <h2>Total Coins</h2>
                <div className="flex justify-between">
                    <button onClick={handleBuy} className="bg-amber-500 text-black px-4 py-2 rounded hover:bg-green-600">
                        Buy
                    </button>
                    <button onClick={onClose} className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyPopup;
