import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsClose } from '../../store/slices/coinslice';
import { sellCoin } from '../../services/apiservices.jsx/apiintegration';

const SellPopup = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector((state) => state.coin.isOpen);
    const [amount, setAmount] = useState('');
    const currentCoin = useSelector((state) => state.coin.currentCoin);
    const currentPrice = 0;

    const handleSell = async () => {
        try {
            console.log("trying to sell", amount)
            const response = await sellCoin(currentCoin, currentPrice, amount)
            console.log(response)
        } catch (error) {
            console.log(error)
            throw (error)
        } finally {
            dispatch(setIsClose())
        }

        onClose();
    };

    const onClose = () => {
        setAmount('')
        dispatch(setIsClose())
    }

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Enter Amount</h2>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border rounded p-2 mb-4 text-black"
                />
                <div className="flex justify-between">
                    <button onClick={handleSell} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Sell
                    </button>
                    <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellPopup;
