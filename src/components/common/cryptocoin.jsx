import React from 'react'
import { Link } from 'react-router-dom';
import Button from './button';


const CryptoCoin = React.forwardRef(function CryptoCoin({
  name = "",
  fullName = "",
  imageUrl = "",
  currentPrice = "",
  currentHolding = "",
  ...props
}, ref) {
  const floatValue = parseFloat(currentHolding);
  const roundedDown = Math.floor(floatValue * 100) / 100;
  const currentValue = roundedDown.toFixed(2);
  console.log(currentValue);
  return (
    <>
      <Link to="/home/coins">
        <div className="flex flex-row justify-between items-center bg-black p-2 mt-2 rounded-md  ml-4 mr-4">
          <div className="flex flex-row items-center">
            <img src={`https://www.${imageUrl}`} alt={name} className="w-8 h-8 mr-2" />
            <div className="flex flex-col">
              <span className="text-white text-s">{fullName}</span>
              <span className="text-gray-400 text-s">{name}</span>
              <span className="text-green-500 text-s">{currentValue}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-s">${currentPrice}</span>
            <button className="text-s w-16 rounded-lg bg-amber-500 p-2">sell</button>
          </div>
        </div>
      </Link>
    </>
  )
}
)
export default CryptoCoin