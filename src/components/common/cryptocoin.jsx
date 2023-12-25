import React from 'react'


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
  const ans = roundedDown.toFixed(2);
  console.log(ans);
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center">
        <img src={`https://www.${imageUrl}`} alt={name} className="w-8 h-8 mr-2" />
        <div className="flex flex-col">
          <span className="text-white text-sm">{fullName}</span>
          <span className="text-gray-400 text-xs">{name}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-white text-sm">${currentPrice}</span>
        <span className="text-green-500 text-xs">{ans}</span>
      </div>
    </div>
  )
}
)
export default CryptoCoin