import React from 'react';
import { Outlet } from 'react-router-dom';
import backgroundImage from './assets/background.png'; // Replace with the correct path

const App = () => {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
