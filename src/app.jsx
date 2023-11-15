import { useState } from 'react'
import './app.css'
import Login from './components/login'

function App() {

  
  return (
    <>
      <div className='text-3xl font-bold underline'>
        CryptBee
        <Login/>
      </div>
    </>
  )
}

export default App
