import React from 'react'
import logo from '../../assets/logo/logo.png'
function EnterOtp() {
  return (
    <>
      <div className=" absolute top-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
          <div>
            <p className="text-white text-sm font-bold">Cryptbee</p>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default EnterOtp